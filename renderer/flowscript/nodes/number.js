
import { FS_DataNode } from "./basecore";

class BaseNumberNode extends FS_DataNode {
    static category = 'NUMBER';
    static description = 'Number Node';
}

class NumberInNode extends BaseNumberNode {
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
}

class NumberInOutNode extends NumberInNode {
    static outputPins = [
        { label: 'Number', type: 'number' },
    ];
}

export class createNumber extends NumberInOutNode {
    static label = 'Create Number';
    static description = 'Create a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0, disableHandle: true },
    ];
    static async execution({inputValues}) {
        return inputValues?.Number;
    }
}

export class numberGetInfinity extends NumberInOutNode {
    static label = 'Get Infinity';
    static description = 'Get Infinity value';
    static async execution({inputValues}) {
        return Infinity;
    }
}

export class numberIsFinite extends NumberInNode {
    static label = 'Is Finite';
    static description = 'Check if number is finite';
    static async execution({inputValues}) {
        return isFinite(inputValues.Number);
    }
}

export class numberIsNumber extends NumberInNode {
    static label = 'Is A Number';
    static description = 'Check if input is a number';
    static async execution({inputValues}) {
        return !isNaN(inputValues.Number);
    }
}

export class numberIsSafeInteger extends NumberInNode {
    static label = 'Is Safe Integer';
    static description = 'Check if input is a safe integer';
    static async execution({inputValues}) {
        return Number.isSafeInteger(inputValues.Number);
    }
}

export class numberParseInt extends NumberInNode {
    static label = 'Parse Integer';
    static description = 'Parse input to integer';
    static async execution({inputValues}) {
        return parseInt(inputValues.Number);
    }
}

export class numberParseFloat extends NumberInNode {
    static label = 'Parse Float';
    static description = 'Parse input to float';
    static async execution({inputValues}) {
        return parseFloat(inputValues.Number);
    }
}


export class numberRandom extends NumberInOutNode {
    static label = 'Random';
    static description = 'Generate a random number';
    static async execution() {
        return Math.random();
    }
}

export class numberRandomInteger extends NumberInOutNode {
    static label = 'Random Integer';
    static description = 'Generate a random integer';
    static inputPins = [
        { label: 'Min', type: 'number', default: 0 },
        { label: 'Max', type: 'number', default: 100 },
    ];
    static async execution({inputValues}) {
        return Math.floor(Math.random() * (inputValues.Max - inputValues.Min + 1)) + inputValues.Min;
    }
}

export class numberRandomFloat extends NumberInOutNode {
    static label = 'Random Float';
    static description = 'Generate a random float';
    static inputPins = [
        { label: 'Min', type: 'number', default: 0 },
        { label: 'Max', type: 'number', default: 100 },
    ];
    static async execution({inputValues}) {
        return Math.random() * (inputValues.Max - inputValues.Min) + inputValues.Min;
    }
}

export class numberRestrictNumber extends NumberInOutNode {
    static label = 'Restrict Number';
    static description = 'Restrict number within a range';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Min', type: 'number', default: 0 },
        { label: 'Max', type: 'number', default: 100 },
    ];
    static async execution({inputValues}) {
        return Math.min(Math.max(inputValues.Number, inputValues.Min), inputValues.Max);
    }
}

export class numberRound extends NumberInOutNode {
    static label = 'Round Number';
    static description = 'Round number to the nearest integer';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.round(inputValues.Number);
    }
}

export class numberCeil extends NumberInOutNode {
    static label = 'Ceil Number';
    static description = 'Round number up to the nearest integer';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.ceil(inputValues.Number);
    }
}

export class numberFloor extends NumberInOutNode {
    static label = 'Floor Number';
    static description = 'Round number down to the nearest integer';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.floor(inputValues.Number);
    }
}

export class numberAbs extends NumberInOutNode {
    static label = 'Absolute Number';
    static description = 'Get the absolute value of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.abs(inputValues.Number);
    }
}

export class numberPow extends NumberInOutNode {
    static label = 'Power of Number';
    static description = 'Raise a number to the power of another number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Power', type: 'number', default: 2 },
    ];
    static async execution({inputValues}) {
        return Math.pow(inputValues.Number, inputValues.Power);
    }
}

export class numberSqrt extends NumberInOutNode {
    static label = 'Square Root';
    static description = 'Get the square root of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.sqrt(inputValues.Number);
    }
}

export class numberSin extends NumberInOutNode {
    static label = 'Sine';
    static description = 'Get the sine of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.sin(inputValues.Number);
    }
}

export class numberCos extends NumberInOutNode {
    static label = 'Cosine';
    static description = 'Get the cosine of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.cos(inputValues.Number);
    }
}

export class numberTan extends NumberInOutNode {
    static label = 'Tangent';
    static description = 'Get the tangent of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.tan(inputValues.Number);
    }
}

export class numberAsin extends NumberInOutNode {
    static label = 'Arc Sine';
    static description = 'Get the arc sine of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.asin(inputValues.Number);
    }
}

export class numberAcos extends NumberInOutNode {
    static label = 'Arc Cosine';
    static description = 'Get the arc cosine of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.acos(inputValues.Number);
    }
}

export class numberAtan extends NumberInOutNode {
    static label = 'Arc Tangent';
    static description = 'Get the arc tangent of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.atan(inputValues.Number);
    }
}

export class numberAtan2 extends NumberInOutNode {
    static label = 'Arc Tangent 2';
    static description = 'Get the arc tangent of a number';
    static inputPins = [
        { label: 'Y', type: 'number', default: 0 },
        { label: 'X', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.atan2(inputValues.Y, inputValues.X);
    }
}

export class numberLog extends NumberInOutNode {
    static label = 'Logarithm';
    static description = 'Get the logarithm of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Base', type: 'number', default: 10 },
    ];
    static async execution({inputValues}) {
        return Math.log(inputValues.Number) / Math.log(inputValues.Base);
    }
}

export class numberLog10 extends NumberInOutNode {
    static label = 'Logarithm 10';
    static description = 'Get the base 10 logarithm of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.log10(inputValues.Number);
    }
}

export class numberLog2 extends NumberInOutNode {
    static label = 'Logarithm 2';
    static description = 'Get the base 2 logarithm of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.log2(inputValues.Number);
    }
}

export class numberExp extends NumberInOutNode {
    static label = 'Exponential';
    static description = 'Get the exponential of a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.exp(inputValues.Number);
    }
}

export class numberMin extends NumberInOutNode {
    static label = 'Minimum';
    static description = 'Get the minimum of two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.min(inputValues.Number1, inputValues.Number2);
    }
}

export class numberMax extends NumberInOutNode {
    static label = 'Maximum';
    static description = 'Get the maximum of two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return Math.max(inputValues.Number1, inputValues.Number2);
    }
}

export class numberClamp extends NumberInOutNode {
    static label = 'Clamp';
    static description = 'Clamp a number within a range';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Min', type: 'number', default: 0 },
        { label: 'Max', type: 'number', default: 100 },
    ];
    static async execution({inputValues}) {
        return Math.min(Math.max(inputValues.Number, inputValues.Min), inputValues.Max);
    }
}


