
import { FS_DataNode } from "./basecore";

// base class used for all JSON nodes
class baseLoopNode {
    static color = 'var(--dek-info-normal)';
    static category = 'LOOPS';
    static description = 'Loop operation';
    static inputPins = [];
    static outputPins = [];
    static async execution({inputValues}) {
        return null;
    }
}

export class iterateArray extends baseLoopNode {
    static label = 'Loop Array Elements';
    static description = 'Iterate over an array';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'array', default: null },
    ];
    static outputPins = [
        { label: 'onIteration', type: 'exec' },
        { label: 'LoopNumber', type: 'number' },
        { label: 'Element', type: 'wildcard' },
        { label: 'onFinish', type: 'exec' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        for (let index = 0; index < inputValues.Input.length; index++) {
            setOutputValue('LoopNumber', index);
            setOutputValue('Element', inputValues.Input[index]);
            await triggerNextNode('onIteration');
        }
        await triggerNextNode('onFinish');
    }
}

export class iterateNumberTimes extends baseLoopNode {
    static label = 'Loop (number of times)';
    static description = 'Loop a number of times';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Loops', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'onIteration', type: 'exec' },
        { label: 'LoopNumber', type: 'number' },
        { label: 'onFinish', type: 'exec' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        for (let index = 0; index < inputValues.Loops; index++) {
            setOutputValue('LoopNumber', index);
            await triggerNextNode('onIteration');
        }
        await triggerNextNode('onFinish');
    }
}

export class iterateObjectProperties extends baseLoopNode {
    static label = 'Loop Object Properties';
    static description = 'Iterate over an object properties';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'object', default: null },
        { label: 'NeedHasOwn', type: 'boolean', default: true },
    ];
    static outputPins = [
        { label: 'onIteration', type: 'exec' },
        { label: 'PropName', type: 'string' },
        { label: 'PropValue', type: 'wildcard' },
        { label: 'onFinish', type: 'exec' },
    ];
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        for (const propName in inputValues.Input) {
            if (inputValues.NeedHasOwn && !inputValues.Input.hasOwnProperty(propName)) continue;
            setOutputValue('PropName', propName);
            setOutputValue('PropValue', inputValues.Input[propName]);
            await triggerNextNode('onIteration');
        }
        await triggerNextNode('onFinish');
    }
}