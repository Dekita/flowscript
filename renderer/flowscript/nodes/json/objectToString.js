
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Object To String';
    static color = 'var(--dek-info-normal)';
    static category = 'JSON';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'object', default: '' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        try {
            const string = JSON.stringify(inputValues.Input, null, 4);
            setOutputValue('Success', true);
            setOutputValue('Output', string);
        } catch (error) {
            setOutputValue('Success', false);
            setOutputValue('Output', error.message);
        }

        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}

