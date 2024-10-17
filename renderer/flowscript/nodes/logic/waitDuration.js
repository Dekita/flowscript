
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Wait For Duration';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Duration', type: 'number', default: 200, min: 0, max: 10000 },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        const duration = inputValues.Duration;
        await new Promise(resolve => setTimeout(resolve, duration));

        await triggerNextNode('ExecOut');
    }
}