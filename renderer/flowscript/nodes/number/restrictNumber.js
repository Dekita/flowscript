
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Restrict Number';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [
        // { label: 'ExecIn', type: 'exec' },
        { label: 'Min', type: 'number', default: 0 },
        { label: 'Max', type: 'number', default: 100 },
        { label: 'Input', type: 'number', default: null },
    ];
    static outputPins = [
        // { label: 'ExecOut', type: 'exec' },
        { label: 'Output', type: 'number' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        const { Input, Min, Max } = inputValues;
        const output = Math.max(Min, Math.min(Max, Input));
        return output;

        // setOutputValue('Output', output);

        // // Call the next connected node based on the exec pin label
        // await triggerNextNode('ExecOut');
    }
}
