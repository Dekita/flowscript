
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Check Condition';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Boolean', type: 'boolean', default: true },
    ];
    static outputPins = [
        { label: 'onTrue', type: 'exec' },
        { label: 'onFalse', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // Call the next node
        const trigger = inputValues.Boolean ? 'onTrue' : 'onFalse';
        await triggerNextNode(trigger);
    }
}