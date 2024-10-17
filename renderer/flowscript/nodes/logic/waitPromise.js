
import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Wait For Promise';
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Promise Object', type: 'object', default: null },
    ];
    static outputPins = [
        { label: 'OnResolve', type: 'exec' },
        { label: 'OnReject', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        const thePromise = inputValues['Promise Object'];
        if (!thePromise || !thePromise.then) {
            console.error('No Promise Object provided!');
            return;
        }
        try {
            await thePromise;
            await triggerNextNode('OnResolve');
        } catch (error) {
            console.error('Promise Rejected:', error);
            await triggerNextNode('OnReject');
        }
    }
}