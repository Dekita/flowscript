
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Random Integer';
    static color = 'var(--dek-info-normal)';
    static category = 'NUMBER';
    static inputPins = [
        // { label: 'ExecIn', type: 'exec' },
        { label: 'Min', type: 'number', default: 0 },
        { label: 'Max', type: 'number', default: 100 },
    ];
    static outputPins = [
        // { label: 'ExecOut', type: 'exec' },
        { label: 'Output', type: 'number' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        const { Min, Max } = inputValues;
        const output = Math.floor(Math.random() * (Max - Min + 1) + Min);
        return output;

        // setOutputValue('Output', output);

        // // Call the next connected node based on the exec pin label
        // await triggerNextNode('ExecOut');
    }
}
