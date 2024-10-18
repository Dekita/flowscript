
import { FS_DataNode } from "./basecore";

class baseLogicNode {
    static label = 'Base Logic Node';
    static color = 'var(--dek-primary-normal)';
    static category = 'LOGIC';
    static inputPins = [];
    static outputPins = [];
    static async execution() {
        throw new Error('Execution method not implemented');
    }
}

export class checkCondition extends baseLogicNode {
    static label = 'Check Condition';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Boolean', type: 'boolean', default: true },
    ];
    static outputPins = [
        { label: 'onTrue', type: 'exec' },
        { label: 'onFalse', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        await triggerNextNode(inputValues.Boolean ? 'onTrue' : 'onFalse');
    }
}

export class evaluateJavaScript extends baseLogicNode {
    static label = 'Evaluate JavaScript';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Result', type: 'wildcard' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        try {
            // perform the logic for the node
            // todo: this is a security risk,
            // improve it by importing eval code from game engine <3
            const result = await eval(inputValues.Input);
            setOutputValue('Result', result);
        } catch (error) {
            setOutputValue('Result', error);
        }
        await triggerNextNode('ExecOut');
    }
}

export class waitDuration extends baseLogicNode {
    static label = 'Wait For Duration';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Duration', type: 'number', default: 200, min: 0, max: 10000 },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        const duration = inputValues.Duration;
        await new Promise(resolve => setTimeout(resolve, duration));
        await triggerNextNode('ExecOut');
    }
}

export class waitForPromise extends baseLogicNode {
    static label = 'Wait For Promise';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Promise', type: 'promise', default: null },
    ];
    static outputPins = [
        { label: 'OnResolve', type: 'exec' },
        { label: 'OnReject', type: 'exec' },
    ];
    static async execution({inputValues, triggerNextNode}) {
        const thePromise = inputValues.Promise;
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
