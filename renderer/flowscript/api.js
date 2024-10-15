import * as nodeDefinitions from '@flowscript/definitions';


const VERBOSE_LOG = false;
const logv = (...args) => VERBOSE_LOG && console.log(...args);


const generateUniqueId = () => {
    return `node${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

const generateCustomPosition = () => {
    return { x: Math.random() * 1000, y: Math.random() * 1000 };
};

const nodeFactory = (type, spawnPosition) => {
    const id = generateUniqueId();
    const definition = nodeDefinitions[type];
    if (!definition) throw new Error(`Node type "${type}" not found.`);
    console.log('spawning with position:', spawnPosition);
    return {
        id,
        type,
        position: spawnPosition ?? generateCustomPosition(),
        // Specify the custom class acting as a drag handle
        dragHandle: '.card-title',
        data: {
            inputPins: definition.inputPins ?? [],
            outputPins: definition.outputPins ?? [],
            nodeColor: definition.color ?? 'var(--dek-info-normal)',
            nodeLabel: definition.label ?? type,
        },
    };
};

const edgeFactory = (source, target) => {
    return { id: `e${source}-${target}`, source, target };
};

// const initialNodes = [
//     nodeFactory('onRunLogic'),
//     nodeFactory('onCheckCondition'),
//     nodeFactory('onConsoleLog'),
//     nodeFactory('onConsoleLog'),
//     nodeFactory('literalString'),
// ];

// const initialEdges = [
//     // edgeFactory('node-3', 'node-4')
// ];

// examples:
// node-1-output-0-exec
// node-2-input-1-number
const splitHandle = (handle = '') => {
    const [ignore, nodeID, ioType, pinIndex, pinType] = handle.split('-');
    return { nodeID, ioType, pinIndex, pinType };
};

const deleteEdge = (edgeID, edges) => {
    return edges.filter((e) => e.id !== edgeID);
};

// Connection Validation: Only allow connections if the pin types match
const isValidConnection = (connection, edges, setEdges) => {
    const { source, sourceHandle, target, targetHandle } = connection;
    if (source === target) return false; // Prevent self-connections

    const sourceData = splitHandle(sourceHandle);
    const targetData = splitHandle(targetHandle);
    logv({ sourceData, targetData });

    // if input/output types are the same, return false
    if (sourceData.ioType === targetData.ioType) return false;

    // if exec output pin, then ensure only one connection from the source pin exists
    // const getCurrentConnections = (handle) => edges.filter((e) => e.sourceHandle === handle);
    // const currSourceConnections = getCurrentConnections(sourceHandle);
    // const currTargetConnections = getCurrentConnections(targetHandle);

    const currSourceConnections = edges.filter((e) => e.sourceHandle === sourceHandle);
    const currTargetConnections = edges.filter((e) => e.targetHandle === targetHandle);

    logv({ edges, currSourceConnections, currTargetConnections });

    const pinTypesMatch = sourceData.pinType === targetData.pinType;
    const targetPinWildcard = targetData.pinType === 'wildcard';
    if (!targetPinWildcard && !pinTypesMatch) return false;

    if (sourceData.ioType === 'output' && sourceData.pinType === 'exec') {
        if (currSourceConnections.length) {
            const existing = currSourceConnections.shift();
            setEdges(deleteEdge(existing.id, edges));
            return true;
        }
    }
    if (targetData.ioType === 'input' && targetData.pinType !== 'exec') {
        logv('Checking Target Connections:', currTargetConnections);
        if (currTargetConnections.length) {
            const existing = currTargetConnections.shift();
            setEdges(deleteEdge(existing.id, edges));
            return true;
        }
    }

    // Return true if the pinTypes match
    return targetPinWildcard || pinTypesMatch;
};

const findNode = (nodeID, nodes) => {
    return nodes.find((n) => n.id === nodeID);
};

const findNodeByType = (type, nodes) => {
    return nodes.find((n) => n.type === type);
};

const findPinByLabel = (label, pins) => {
    return pins.find((p) => p.label === label);
};

const findPinByType = (type, pins) => {
    return pins.find((p) => p.type === type);
};

const findPinByID = (id, pins) => {
    return pins.find((p) => p.id === id);
};

const findPinIndexByLabel = (label, pins) => {
    return pins.findIndex((p) => p.label === label);
};

const findPinByData = (pins, nodeID, ioType, index, pinType) => {
    const id = `node-${nodeID}-${ioType}-${index}-${pinType}`;
    return findPinByID(id, pins);
};

const processGraph = async ({ nodes, edges }) => {
    console.log('\n\n-------------\nProcessing Node Graph');
    logv({ nodes, edges });

    const startNode = findNodeByType('runFlowScript', nodes);
    if (!startNode) return console.error('No Start Node Found');

    const resultsCache = {};
    const outputsCache = {};

    const processNode = async (node) => {
        logv('Processing Node:', node);
        const definition = nodeDefinitions[node.type];
        if (!definition) return console.error('No Definition Found for Node:', node.type);

        const inputPins = node.data.inputPins;
        const outputPins = node.data.outputPins;

        const inputValues = inputPins.filter(pin => pin.type !== 'exec').reduce((acc, pin) => {
            return { ...acc, [pin.label]: pin.value ?? pin.default };
        }, {});
        // sort edges based on definition to ensure they are processed in order
        const inputEdges = edges.filter((e) => e.target === node.id).sort((a, b) => {
            const aData = splitHandle(a.targetHandle);
            const bData = splitHandle(b.targetHandle);
            return aData.pinIndex - bData.pinIndex;
        });
        // const inputValues = {};

        for (const inputEdge of inputEdges) {
            const sourceNode = findNode(inputEdge.source, nodes);
            if (!sourceNode) return console.error('Source Node not found:', inputEdge.source);
            const sourceData = splitHandle(inputEdge.sourceHandle);
            const sourcePin = sourceNode.data.outputPins[sourceData.pinIndex];
            // get the target data (current node's input pin data) from the edge's target handle
            const targetData = splitHandle(inputEdge.targetHandle);
            const targetPin = node.data.inputPins[targetData.pinIndex];

            if (!targetPin) return console.error('Source Pin not found:', sourceNode, sourceData);
            if (targetPin.type !== 'exec') {
                // console.log('setting input value:');
                logv({ targetPin, sourceNode, inputEdge, targetData });
                if (!outputsCache[sourceNode.id] && !resultsCache[sourceNode.id]) {
                    if (!sourceNode.data.outputPins.find(p => p.type === 'exec')) {
                        resultsCache[sourceNode.id] = await processNode(sourceNode);
                    }
                }
                if (outputsCache[sourceNode.id] !== undefined) {
                    logv('setting from output cache:', outputsCache[sourceNode.id], targetPin, sourcePin);
                    inputValues[targetPin.label] = outputsCache[sourceNode.id][sourcePin.label];
                }
                if (resultsCache[sourceNode.id] !== undefined) {
                    if (Array.isArray(resultsCache[sourceNode.id])) {
                        logv('ARRAY setting from results cache:', resultsCache[sourceNode.id][sourceData.pinIndex]);//resultsCache[sourceNode.id], targetPin, sourcePin);
                        inputValues[targetPin.label] = resultsCache[sourceNode.id][sourceData.pinIndex];
                    } else  {
                        logv('setting from results cache:', resultsCache[sourceNode.id], targetPin, sourcePin);
                        inputValues[targetPin.label] = resultsCache[sourceNode.id];
                    }
                }
                logv('set input value:', targetPin.label, inputValues[targetPin.label]);
            }
        }

        // sort edges based on definition to ensure they are processed in order
        const outputEdges = edges.filter((e) => e.source === node.id).sort((a, b) => {
            const aData = splitHandle(a.sourceHandle);
            const bData = splitHandle(b.sourceHandle);
            return aData.pinIndex - bData.pinIndex;
        });

        const outputValues = outputsCache[node.id] ?? {};
        const outputFunctions = {};

        for (const outputEdge of outputEdges) {
            const targetNode = findNode(outputEdge.target, nodes);
            const targetData = splitHandle(outputEdge.targetHandle);
            if (!targetNode) return console.error('Target Node not found:', outputEdge.target);
            const sourcePin = node.data.outputPins[targetData.pinIndex];
            if (sourcePin?.type !== 'exec') continue;
            outputFunctions[sourcePin.label] = async () => await processNode(targetNode);
        }

        logv({
            inputPins,
            outputPins,
            inputValues,
            outputValues,
            outputFunctions,
        });

        // callback to trigger the next node in the chain, based on
        // the output function for the connectedPinLabel, which defaults to 'ExecOut'
        const triggerNextNode = async (connectedPinLabel = 'ExecOut') => {
            logv('Triggering Next Node:', connectedPinLabel);
            await outputFunctions?.[connectedPinLabel]?.();
        };

        const setOutputValue = (label, value) => {
            logv('Setting Output Value:', label, value);
            outputsCache[node.id] = outputsCache[node.id] ?? {};
            outputsCache[node.id][label] = value;
        }

        // perform the actual node execution
        const executionData = {id: node.id, inputValues, setOutputValue, triggerNextNode};
        resultsCache[node.id] = await definition.execution(executionData);
        
        logv({resultsCache, outputsCache});

        // return the results of the node execution to be used by the next node
        // this is only used for 'literal' nodes that return a value directly!
        // All other nodes should use the setOutputValue method to set the output value
        // which will be passed to the next node in the chain
        return resultsCache[node.id];
    };

    await processNode(startNode);
};

export default {
    nodeFactory,
    edgeFactory,
    nodeDefinitions,
    isValidConnection,
    findNode,
    findNodeByType,
    findPinByLabel,
    findPinByType,
    findPinByID,
    findPinIndexByLabel,
    findPinByData,
    processGraph,
    splitHandle,
};
