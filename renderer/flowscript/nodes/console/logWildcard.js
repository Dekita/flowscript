
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Log Wildcard';
    static color = 'var(--dek-info-normal)';
    static category = 'Console';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Output', type: 'wildcard', default: null },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        console.info(this.label, 'Output:', inputValues.Output);

        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}

