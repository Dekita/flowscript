import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Loop Array Elements';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'array', default: null },
    ];
    static outputPins = [
        { label: 'onIteration', type: 'exec' },
        { label: 'LoopNumber', type: 'number' },
        { label: 'Element', type: 'wildcard' },
        { label: 'onFinish', type: 'exec' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        
        // perform the logic for the node
        for (let index = 0; index < inputValues.Input.length; index++) {
            setOutputValue('LoopNumber', index);
            setOutputValue('Element', inputValues.Input[index]);
            await triggerNextNode('onIteration');
        }

        // Call the next node
        await triggerNextNode('onFinish');
    }
}