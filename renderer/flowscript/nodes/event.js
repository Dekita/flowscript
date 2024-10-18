
import { FS_DataNode } from "./basecore";

export class runFlowScript {
    static label = 'Run FlowScript';
    static color = 'var(--dek-danger-normal)';
    static category = 'EVENT';
    static highlander = true; // only one instance of this node can exist in the flow
    static inputPins = [];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        await triggerNextNode('ExecOut');
    }
}