import logExecutingNodeData from '@flowscript/utils/log-node';

// This is a simple example of an EventNode that can be used 
export default class {
    static label = 'Create Object';
    static color = 'var(--dek-success-normal)';
    static category = 'OBJECT';
    static inputPins = [
        // { label: 'Number', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Object', type: 'object' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({inputValues}) {
        await logExecutingNodeData(this, ...arguments);
        
        // return Object.create(Object);
        return {};
    }
}
