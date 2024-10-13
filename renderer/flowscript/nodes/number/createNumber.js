
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Create Number';
    static color = 'var(--dek-success-normal)';
    static category = 'NUMBER';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Number', type: 'number' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({inputValues}) {
        await logExecutingNodeData(this, ...arguments);
        return inputValues?.Number;
    }
}