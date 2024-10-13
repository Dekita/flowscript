import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Create String';
    static color = 'var(--dek-success-normal)';
    static category = 'STRING';
    static inputPins = [
        { label: 'String', type: 'string', default: 'Hello World' },
    ];
    static outputPins = [
        { label: 'String', type: 'string' },
        // { label: 'ExecOut', type: 'exec' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({inputValues}) {
        await logExecutingNodeData(this, ...arguments);
        return inputValues?.String;
    }
}