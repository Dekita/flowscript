import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Run FlowScript';
    static color = 'var(--dek-danger-normal)';
    static category = 'EVENT';
    static highlander = true;

    static inputPins = [

    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}