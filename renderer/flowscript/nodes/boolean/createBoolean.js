
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Create Boolean';
    static color = 'var(--dek-success-normal)';
    static category = 'BOOLEAN';
    static inputPins = [
        { label: 'Boolean', type: 'boolean', default: false },
    ];
    static outputPins = [
        { label: 'Boolean', type: 'boolean' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({inputValues}) {
        await logExecutingNodeData(this, ...arguments);
        return inputValues?.Boolean;
    }
}
