
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';
import { parse } from 'dotenv';

export default class {
    static label = 'Parse Float';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'Output', type: 'number' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        return parseFloat(inputValues.Input);
    }
}
