
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Wildcard To String';
    static color = 'var(--dek-info-normal)';
    static category = 'STRING';
    static inputPins = [
        // { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'wildcard', default: null },
    ];
    static outputPins = [
        // { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        try {
            const outString = inputValues.Input.toString()
            return [true, outString];
        } catch (error) {
            return [false, error.message];
        }
        // // perform the logic for the node
        // try {
        //     const outString = inputValues.Input.toString()
        //     setOutputValue('Success', true);
        //     setOutputValue('Output', outString);
        // } catch (error) {
        //     setOutputValue('Success', false);
        //     setOutputValue('Output', error.message);
        // }

        // // Call the next connected node based on the exec pin label
        // await triggerNextNode('ExecOut');
    }
}

