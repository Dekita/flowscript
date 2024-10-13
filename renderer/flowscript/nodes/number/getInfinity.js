
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Get Infinity';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [

    ];
    static outputPins = [
        { label: 'Result', type: 'number' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        return Infinity;
    }
}
