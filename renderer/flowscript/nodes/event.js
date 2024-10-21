
import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNode } from "./basecore";

// triggers the specified event, if the node is found.
// which then runs the flowscript from that node.
// if the node is not found, nothing happens.
// if the node is found, but the flowscript is not found, nothing happens.
// if the node is found, and the flowscript is found, the flowscript is run.
// the Result output pin will be true if the node was found, false if not.
export class triggerEventNode extends FS_ExecutionNode {
    static label = 'Trigger Event Node';
    static category = 'EVENT';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'string', default: 'id or class name' },
        { label: 'FindBy', type: 'choice', default: 0, options: ['id', 'class'] },
    ]
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Result', type: 'boolean' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue, processNode, findNode, findNodeByType}) {
        let node = null;
        switch (inputValues.FindBy) {
            case 0: node = findNode(inputValues.Input); break;
            case 1: node = findNodeByType(inputValues.Input); break;
        }
        if (node) await processNode(node);
        setOutputValue('Result', !!node);
        await triggerNextNode('ExecOut');
    }
}




export class runFlowScript extends FS_EventNode {
    static label = 'Run FlowScript';
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        await triggerNextNode('ExecOut');
    }
}

export class runTesticle extends FS_EventNode {
    static label = 'Run TestEvent';
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        await triggerNextNode('ExecOut');
    }
}


