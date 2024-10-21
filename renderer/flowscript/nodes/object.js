
import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNode } from "./basecore";

class FS_BaseObjectNode extends FS_DataNode {
    static category = 'OBJECT';
    static description = 'Object manipulation nodes';
}

export class createObject extends FS_BaseObjectNode {
    static priority = 9;
    static label = 'Create Object';
    static outputPins = [
        { label: 'Object', type: 'object' },
    ];
    static async execution({inputValues}) {
        return {}; // Object.create(Object);
    }
}

export class objectGetProperty extends FS_BaseObjectNode {
    static label = 'Get Property';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Object', type: 'object', default: null },
        { label: 'PropName', type: 'string', default: "" },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Property', type: 'wildcard' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        setOutputValue('Property', inputValues.Object[inputValues.PropName]);
        await triggerNextNode('ExecOut');
    }
}

export class objectSetProperty extends FS_BaseObjectNode {
    static label = 'Set Property';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Object', type: 'object', default: null },
        { label: 'PropName', type: 'string', default: "" },
        { label: 'PropValue', type: 'wildcard', default: null },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Object', type: 'object' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);
        const updatedObj = inputValues.Object || {};
        updatedObj[inputValues.PropName] = inputValues.PropValue;
        setOutputValue('Object', updatedObj);
        await triggerNextNode('ExecOut');
    }
}

export class objectRemoveProperty extends FS_BaseObjectNode {
    static label = 'Remove Property';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Object', type: 'object', default: null },
        { label: 'PropName', type: 'string', default: "" },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Object', type: 'object' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        const updatedObj = inputValues.Object || {};
        delete updatedObj[inputValues.PropName];
        setOutputValue('Object', updatedObj);
        await triggerNextNode('ExecOut');
    }
}

export class objectMerge extends FS_BaseObjectNode {
    static label = 'Merge Objects';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'ObjectA', type: 'object', default: null },
        { label: 'ObjectB', type: 'object', default: null },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'ObjectOut', type: 'object' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        const objA = inputValues.ObjectA || {};
        const objB = inputValues.ObjectB || {};
        const updatedObj = { ...objA, ...objB };
        setOutputValue('ObjectOut', updatedObj);
        await triggerNextNode('ExecOut');
    }
}
