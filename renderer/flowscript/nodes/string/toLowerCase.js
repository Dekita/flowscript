
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'To Lower Case';
    static color = 'var(--dek-info-normal)';
    static category = 'STRING';
    static inputPins = [
        // { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        // { label: 'ExecOut', type: 'exec' },
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        const inString = inputValues.Input || '';
        return inString.toLowerCase();
        // setOutputValue('Output', inString.toLowerCase());

        // // Call the next connected node based on the exec pin label
        // await triggerNextNode('ExecOut');
    }
}

