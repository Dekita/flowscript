
import { FS_DataNode } from "./basecore";

// base class used for all JSON nodes
class JSONBaseNode {
    static color = 'var(--dek-success-normal)';
    static category = 'JSON';
    static description = 'JSON operation';
    static inputPins = [];
    static outputPins = [];
    static async execution({inputValues}) {
        return null;
    }
}

export class objectToStringJSON extends JSONBaseNode {
    static label = 'Object To String';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'object', default: '' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        try {
            const string = JSON.stringify(inputValues.Input, null, 4);
            setOutputValue('Success', true);
            setOutputValue('Output', string);
        } catch (error) {
            setOutputValue('Success', false);
            setOutputValue('Output', error.message);
        }
        await triggerNextNode('ExecOut');
    }
}

export class stringToObjectJSON extends JSONBaseNode {
    static label = 'String To Object';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'Output', type: 'object' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        try {
            const object = JSON.parse(inputValues.Input);
            setOutputValue('Success', true);
            setOutputValue('Output', object);
        } catch (error) {
            setOutputValue('Success', false);
            setOutputValue('Output', error.message);
        }
        await triggerNextNode('ExecOut');
    }
}
