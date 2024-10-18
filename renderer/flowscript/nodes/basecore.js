
// base class used for all JSON nodes
export class FSNode {
    static color = 'var(--dek-info-normal)';
    static category = 'DEFAULT';
    static description = '';
    static inputPins = [];
    static outputPins = [];
    static async execution({inputValues}) {
        return null;
    }
    // [optional] JSX
    // static JSX({id}) {
    //     return null;
    // }
}

export class FS_EventNode extends FSNode {
    static color = 'var(--dek-danger-normal)';
    static category = 'EVENT';
    static description = 'Event operation';
    static inputPins = [];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        await triggerNextNode('ExecOut');
    }
}

export class FS_ExecutionNode extends FSNode {
    static color = 'var(--dek-info-normal)';
    static category = 'EXECUTION';
    static description = 'Execution operation';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        await triggerNextNode('ExecOut');
    }
}

export class FS_LogicNode extends FSNode {
    static color = 'var(--dek-warning-normal)';
    static category = 'LOGIC';
    static description = 'Logic operation';
    static inputPins = [];
    static outputPins = [];
    static async execution({inputValues}) {
        return null;
    }
}

export class FS_DataNode extends FSNode {
    static color = 'var(--dek-success-normal)';
    static category = 'DATA';
    static description = 'Data operation';
    static inputPins = [];
    static outputPins = [];
    static async execution({inputValues}) {
        return null;
    }
}