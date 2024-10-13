
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'String To Object';
    static color = 'var(--dek-info-normal)';
    static category = 'JSON';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'Output', type: 'object' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        try {
            const json = JSON.parse(inputValues.Input);
            setOutputValue('Success', true);
            setOutputValue('Output', json);
        } catch (error) {
            setOutputValue('Success', false);
            setOutputValue('Output', error);
        }

        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}

