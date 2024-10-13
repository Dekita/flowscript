
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Is Finite Number';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [
        { label: 'Input', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Result', type: 'boolean' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        return isFinite(inputValues.Input);
    }
}
