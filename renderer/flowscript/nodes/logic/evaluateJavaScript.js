
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Evaluate JavaScript';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Result', type: 'wildcard' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        // perform the logic for the node
        let result;
        try {
            // todo: this is a security risk,
            // improve it by importing eval code from game engine <3
            result = await eval(inputValues.Input);
        } catch (error) {
            result = error;
        }

        // Call the next node
        await triggerNextNode('ExecOut');
    }
}