
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Is A Number';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [
        // { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'wildcard', default: null },
    ];
    static outputPins = [
        // { label: 'ExecOut', type: 'exec' },
        { label: 'Result', type: 'boolean' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        return !isNaN(inputValues.Input);
        // return typeof inputValues.Input === 'number';
    }
}
