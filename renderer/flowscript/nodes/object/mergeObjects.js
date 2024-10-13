
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Merge Objects';
    static color = 'var(--dek-success-normal)';
    static category = 'OBJECT';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Object A', type: 'object', default: null },
        { label: 'Object B', type: 'object', default: null },
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
        const objA = inputValues['Object A'] || {};
        const objB = inputValues['Object B'] || {};
        const updatedObj = { ...objA, ...objB };
        // set the output value to be read by next node in chain
        setOutputValue('Object', updatedObj);
        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}