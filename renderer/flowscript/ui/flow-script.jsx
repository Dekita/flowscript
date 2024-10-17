
import React, { useCallback } from 'react';

import { 
    ReactFlow, 
    Panel, 
    MiniMap, 
    Controls, 
    ControlButton,
    Background, 
    useNodesState, 
    useEdgesState, 
    addEdge, 
    useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import FlowSettingsModal from '@components/modals/flow-settings';
import * as CommonIcons from '@config/common-icons';
import useLocalization from '@hooks/useLocalization';

import FlowScriptAPI from '@flowscript/api';
import BaseNode from '@flowscript/ui/base-node';

import { useFlowSettings } from '@flowscript/ui/flow-settings';
import AddNodePanel from '@flowscript/ui/node-panel';
import MainNavbar from '@components/core/navbar';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {pinTypeColors} from '../utils/color-map';


const nodeTypes = Object.keys(FlowScriptAPI.nodeDefinitions).reduce((acc, type) => {
    return { ...acc, [type]: BaseNode };
}, {});


const initialNodes = [
    FlowScriptAPI.nodeFactory('runFlowScript'),
];

const initialEdges = [
    // FlowScriptAPI.edgeFactory('node-3', 'node-4')
];

const edgeStyle = { strokeWidth: 3 };


export function Flow({ThemeController}) {
    const [showModal, setShowModal] = React.useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodeIndex, setSelectedNodeIndex] = React.useState(null);
    const [selectedNodes, setSelectedNodes] = React.useState([]);

    const { t } = useLocalization();

    const [nodePortalPosition, setNodePortalPosition] = React.useState({ x: 0, y: 0 });
    const [nodePortalVisible, setNodePortalVisible] = React.useState(false);
    const [portalConnectionType, setPortalConnectionType] = React.useState(null);
    const [isDraggingPin, setIsDraggingPin] = React.useState(false);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

    const { flowSettings, updateFlowSetting } = useFlowSettings();

    // const [flowSettings, setFlowSettings] = React.useState(initialSettings);
    // const updateFlowSetting = React.useCallback((key, value) => {
    //     setFlowSettings(data => ({ ...data, [key]: value }));
    // }, [setFlowSettings]);


    // This will be called once React Flow is initialized
    const onInit = (instance) => {
        setReactFlowInstance(instance);  
    }; 
    
    // Track selected nodes
    const onSelectionChange = ({ nodes }) => {
        setSelectedNodes(nodes);
    };

    const updateNode = React.useCallback((nodeID, data) => {
        setNodes((nds) => nds.map((node) => {
            if (node.id !== nodeID) return node;
            return { ...node, ...data };
        }));
    }, [setNodes]);

    const selectNodesById = React.useCallback((selectedNodeIds) => {
        setNodes((currentNodes) =>
          currentNodes.map((node) => ({
            ...node,
            selected: selectedNodeIds.includes(node.id), // Mark node as selected if its ID is in the list
          }))
        );
    }, [setNodes]);

    const focusViewportOnSelectedNodes = React.useCallback(() => {
        const selectedNodes = nodes.filter((node) => node.selected);
      
        if (selectedNodes.length > 0) {
            const xValues = selectedNodes.map((node) => node.position.x + (node.measured.width/2));
            const yValues = selectedNodes.map((node) => node.position.y + (node.measured.height/2));
            const minX = Math.min(...xValues);
            const minY = Math.min(...yValues);
            const maxX = Math.max(...xValues);
            const maxY = Math.max(...yValues);
            const nodeBounds = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY,
            };
            const fitviewOptions = { bounds: nodeBounds, padding: 0.25 };
            reactFlowInstance.fitView(fitviewOptions);
            console.log('Focusing on:', nodeBounds);

        }
    }, [reactFlowInstance]);

    const onConnect = React.useCallback((connection) => {
        if (!FlowScriptAPI.isValidConnection(connection, edges, setEdges)) return;
        const { source, target, sourceHandle, targetHandle } = connection;
        // Check if the current node is the target (receiver)
        if (target) {
            console.log(`Connected as target: ${target} (input pin ${targetHandle})`);
            // Handle the connection logic when this node is the target
        }
        // handle the case where this node is the source
        if (source) {
            console.log(`Connected as source: ${source} (output pin ${sourceHandle})`);
            // Handle the connection logic when this node is the source
        }
        setEdges((eds) => {
            const node = FlowScriptAPI.findNode(source, nodes);
            const handleData = FlowScriptAPI.splitHandle(sourceHandle);
            // pinTypeColors[handleData.pinType];
            // FlowScriptAPI.findPinByData()
            // console.log({node, handleData});
            return addEdge({ ...connection, style: { ...edgeStyle,
                stroke: pinTypeColors[handleData.pinType] ?? node.data.nodeColor,
                opacity: 0.25,
            }}, eds);
        });
    }, [edges, setEdges, nodes]);

    // Handle right-click (context menu) on edges to delete them
    const onEdgeContextMenu = React.useCallback((event, edge) => {
        event.preventDefault(); // Prevent the default browser context menu
        setEdges((eds) => eds.filter((e) => e.id !== edge.id)); // Remove the clicked edge
    }, [setEdges]);


    const onContextMenu = React.useCallback((event, connectionType) => {
        event.preventDefault(); // Prevent the default context menu
        // console.log('Context Menu:', event, connectionType);
        const navbarHeight = 0;
        const offset = { x: 0, y: 0 };
        const x = event.clientX + offset.x;
        const y = event.clientY - navbarHeight + offset.y;

        console.log('Show Node Portal:', { x, y, connectionType });

        setPortalConnectionType(connectionType);
        setNodePortalPosition({ x, y });
        setNodePortalVisible(true);
    }, [setNodePortalPosition, setNodePortalVisible, setPortalConnectionType]);

    // setIsDraggingPin

    const onConnectStart = React.useCallback((event, connection) => {
        setIsDraggingPin(true);
    }, [setIsDraggingPin]);


    const onConnectEnd = React.useCallback((event, connection) => {
        if (connection.toHandle) {
            setIsDraggingPin(false);
            return;
        }
        const { id } = connection.fromHandle;
        const handleData = FlowScriptAPI.splitHandle(id);
        onContextMenu(event, handleData.pinType);
        // allow onClickGraph to hide the node portal
        // again after we show it from above context menu call
        requestAnimationFrame(() => {
            setIsDraggingPin(false);
        });
    }, [onContextMenu, setIsDraggingPin]);


    const onClickGraph = React.useCallback((event) => {
        if (nodePortalVisible && !isDraggingPin) {
            setNodePortalPosition({ x: 0, y: 0 });
            setNodePortalVisible(false);
        }
    }, [nodePortalVisible, isDraggingPin]);
    
    const onClickNode = React.useCallback((event, node) => {
        const foundNode = nodes.find((n) => n.id === node.id);
        const index = nodes.indexOf(foundNode);
        setSelectedNodeIndex(index);
        selectNodesById([node.id]);
        focusViewportOnSelectedNodes();
        // node.selected = true;
        console.log('clicked', foundNode.id, index, node, foundNode);
    }, [nodes]);

    // const addNode = React.useCallback((type) => {
    //     const newNode = FlowScriptAPI.nodeFactory(type);
    //     setNodes((nds) => [...nds, newNode]);
    // }, [setNodes]);


    const fitviewOptions = { padding: 0.25, duration: 500 };

    const resetGraphToDefault = React.useCallback(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
        setTimeout(() => reactFlowInstance.fitView(fitviewOptions));
    }, [setNodes, setEdges, reactFlowInstance]);

    const loadGraphFromFile = React.useCallback(async() => {
        console.log('Loading Graph from File');
        const extensions = ["flowscript.json"];
        const result = await window.ipc.invoke('open-file-dialog', {
            title: t("load-flowscript-graph"),
            filters: [{ name: "Flowscript", extensions }],
            properties: ['openFile'],
        });
        console.log({result})
        if (!result.cancelled && !!result.filePaths[0]) {
            const basepath = '';//await window.ipc.invoke('get-path', 'app');
            const json = await window.palhub('readJSON', basepath, result.filePaths[0]);
            console.log({ json });
            setNodes(json.nodes);
            setEdges(json.edges);
            // after loading the graph, fit the view to the new graph
            setTimeout(() => reactFlowInstance.fitView(fitviewOptions));
        }
    }, [reactFlowInstance]);

    const saveGraphToFile = React.useCallback(async() => {
        console.log('Saving Graph to File');
        const dataToSave = { nodes, edges };
        const textToCopy = JSON.stringify(dataToSave, null, 4);

        // await navigator.clipboard.writeText(textToCopy)

        const basepath = await window.ipc.invoke('get-path', 'app');
        const filename = 'flow-graph.flowscript.json';
        await window.palhub('writeJSON', basepath, dataToSave, filename);
        console.log({ basepath, filename, textToCopy });

        const extensions = ["flowscript.json"];
        const result = await window.ipc.invoke('save-file-dialog', {
            title: t("save-flowscript-graph"),
            filters: [{ name: "Flowscript", extensions }],
            // properties: ['openFile'],
        });
        console.log({result})
        if (!result.cancelled && !!result.filePath) {
            await window.palhub('writeJSON', '', dataToSave, result.filePath);
        }
    }, [nodes, edges]);

    const showFlowSettings = React.useCallback(() => {
        setShowModal(true);
    }, [setShowModal]);

    const hideNodePortal = React.useCallback(() => {
        setNodePortalVisible(false);
    }, [setNodePortalVisible]);

    const onProcessNodeGraph = React.useCallback(async () => {
        await FlowScriptAPI.processGraph({nodes, edges});
    }, [nodes, edges]);

    // Callback for when nodes are deleted
    const onNodesDelete = (deletedNodes) => {
        console.log('Deleted nodes:', deletedNodes);
        // You can perform additional actions here when nodes are deleted
    };

    const [isInteractive, setIsInteractive] = React.useState(true);
    const toggleInteractivity = React.useCallback(() => {
        setIsInteractive((prev) => !prev);
    }, [setIsInteractive]);

    // Delete nodes when the "Delete" key is pressed
    // React.useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         console.log(event)
    //         const deleteKeys = ['Delete', 'Backspace'];
    //         if (deleteKeys.includes(event.code) && selectedNodes.length) {
    //             // event.preventDefault();
    //             // event.stopPropagation();
    //             setEdges((eds) => eds.filter((edge) => !selectedNodes.includes(edge.source) && !selectedNodes.includes(edge.target)));
    //             setNodes((nds) => nds.filter((node) => !selectedNodes.includes(node)));
    //         }
    //     };
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => window.removeEventListener('keydown', handleKeyDown);
    // }, [selectedNodes, setNodes, setEdges]);

    const gridSize = flowSettings?.gridSize?.value ?? 20;
    const gridSnap = flowSettings?.gridSnap ?? true;

    // console.log(flowSettings);

    return <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeContextMenu={onEdgeContextMenu}
        onPaneContextMenu={onContextMenu}
        // onContextMenu={onContextMenu}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onPaneClick={onClickGraph}
        onNodeClick={onClickNode}
        proOptions={{ hideAttribution: true }}
        nodeTypes={nodeTypes}
        colorMode="dark"
        snapToGrid={gridSnap}
        snapGrid={[gridSize, gridSize]}
        fitView={true}
        onInit={onInit}
        onlyRenderVisibleElements={true}
        onSelectionChange={setSelectedNodes}
        onNodesDelete={onNodesDelete}
        deleteKeyCode={['Delete', 'Backspace']}
        connectionRadius={24}
        // connectionLineType="smoothstep"
        // elevateEdgesOnSelect={true}

        nodesDraggable={isInteractive}
        nodesConnectable={isInteractive}
        elementsSelectable={isInteractive}        
    >
        <MiniMap 
            style={{backgroundColor: 'var(--dek-darker-3)'}}
            ariaLabel="FlowScript MiniMap"
            nodeColor={(node) => node.data.nodeColor}
            maskColor="var(--dek-darker-2)"
            position={['bottom-left', 'bottom-right'][flowSettings.minimapPos]} 
            pannable={flowSettings.minimapPan}
            zoomable={flowSettings.minimapZoom}
        />
        {/* <Controls 
            style={{backgroundColor: 'var(--dek-darker-3)'}}
            position={['bottom-right', 'bottom-left'][flowSettings.minimapPos]} 
        /> */}
        <CustomControls {...{isInteractive, toggleInteractivity}}/>
        
        <Background gap={gridSize} />

        <Panel position="top-center" className='w-100 m-0'>
            <div className='theme-bg selection-secondary'>
                <MainNavbar {...{
                    onProcessNodeGraph, 
                    resetGraphToDefault,
                    loadGraphFromFile,
                    saveGraphToFile,
                    showFlowSettings,
                    FlowScriptAPI,
                }} />
            </div>
        </Panel>


        {nodePortalVisible && <AddNodePanel {...{nodePortalPosition, hideNodePortal, onClickNode, portalConnectionType, flowSettings}} />}
        {/* <Panel position="top-center" className='bg-darkest radius9 p-2'>
        </Panel> */}
        <FlowSettingsModal {...{
            show: showModal,
            setShow: setShowModal,
            flowSettings,
            updateFlowSetting,
            ThemeController,
        }}/>
    </ReactFlow>;
}


function CustomControls({isInteractive, toggleInteractivity}) {
    const { flowSettings } = useFlowSettings();
    const ReactFlow = useReactFlow();
    const { t } = useLocalization();
    const controlsOpts = {
        // orientation: 'horizontal',
        style: { backgroundColor: 'var(--dek-darker-3);' },
        position: ['bottom-right', 'bottom-left'][flowSettings.minimapPos],
        showInteractive: false,
        showFitView: false,
        showZoom: false, 
    }
    const iconOptions = {
        width: '1.6rem',
        height: '1.6rem',
        fill: 'currentColor',
        style: { opacity: 0.5 }
    }
    const btnOptions = {
        className: 'btn btn-dark border-0 radius0 hover-secondary p-1',
    }

    const InteractiveIcon = isInteractive ? CommonIcons.unlock : CommonIcons.lock;
    const delay = { show: 100, hide: 250 };

    const ButtonWrapper = ({locTextID, children}) => {
        const delay = { show: 100, hide: 250 };
        return <OverlayTrigger placement='left' delay={delay} overlay={<Tooltip className="">
                <small className='px-2'>{t(locTextID)}</small>
            </Tooltip>}>{children}
        </OverlayTrigger>
    }

    return <Controls {...controlsOpts}>
        <ButtonWrapper locTextID='controls.zoomin'>
            <div {...btnOptions} onClick={() => ReactFlow.zoomIn()}>
                <CommonIcons.plus {...iconOptions} />
            </div>
        </ButtonWrapper>
        <ButtonWrapper locTextID='controls.zoomout'>
            <div {...btnOptions} onClick={() => ReactFlow.zoomOut()}>
                <CommonIcons.minus {...iconOptions} />
            </div>
        </ButtonWrapper>
        <ButtonWrapper locTextID='controls.fitview'>
            <div {...btnOptions} onClick={() => ReactFlow.fitView({padding: 0.5})}>
                <CommonIcons.jitter {...iconOptions} />
            </div>
        </ButtonWrapper>
        <ButtonWrapper locTextID='controls.interactivity'>
            <div {...btnOptions} onClick={toggleInteractivity}>
                <InteractiveIcon {...iconOptions} />
            </div>
        </ButtonWrapper>
    </Controls>;
}
