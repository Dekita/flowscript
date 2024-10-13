import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Loop Object Properties';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'object', default: null },
        { label: 'NeedHasOwn', type: 'boolean', default: true },
    ];
    static outputPins = [
        { label: 'onIteration', type: 'exec' },
        { label: 'PropName', type: 'string' },
        { label: 'PropValue', type: 'wildcard' },
        { label: 'onFinish', type: 'exec' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        
        // perform the logic for the node
        for (const propName in inputValues.Input) {
            if (inputValues.NeedHasOwn && !inputValues.Input.hasOwnProperty(propName)) continue;
            setOutputValue('PropName', propName);
            setOutputValue('PropValue', inputValues.Input[propName]);
            await triggerNextNode('onIteration');
        }

        // Call the next node
        await triggerNextNode('onFinish');
    }
}