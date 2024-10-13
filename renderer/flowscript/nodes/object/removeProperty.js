
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Remove Property';
    static color = 'var(--dek-success-normal)';
    static category = 'OBJECT';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Object', type: 'object', default: null },
        { label: 'PropName', type: 'string', default: "" },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Object', type: 'object' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        const updatedObj = inputValues.Object || {};
        delete updatedObj[inputValues.PropName];

        // set the output value to be read by next node in chain
        setOutputValue('Object', updatedObj);

        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}