import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Loop (number of times)';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Loops', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'onIteration', type: 'exec' },
        { label: 'LoopNumber', type: 'number' },
        // { label: 'item', type: 'wildcard' },
        { label: 'onFinish', type: 'exec' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        
        // perform the logic for the node
        for (let index = 0; index < inputValues.Loops; index++) {
            setOutputValue('LoopNumber', index);
            await triggerNextNode('onIteration');
        }

        // Call the next node
        await triggerNextNode('onFinish');
    }
}