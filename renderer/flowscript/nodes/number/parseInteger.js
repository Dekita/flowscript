
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Parse Integer';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
        { label: 'Radix', type: 'number', default: 10 },
    ];
    static outputPins = [
        { label: 'Output', type: 'number' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        return parseInt(inputValues.Input, inputValues.Radix);
    }
}
