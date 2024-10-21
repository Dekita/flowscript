
import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNode } from "./basecore";

class BaseNumberNode extends FS_DataNode {
    static category = 'NUMBER';
    static description = 'Number Node';
}

class NumberInNode extends BaseNumberNode {
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
}

class NumberOutNode extends BaseNumberNode {
    static outputPins = [
        { label: 'Number', type: 'number' },
    ];
}

class NumberInOutNode extends NumberInNode {
    static outputPins = [
        { label: 'Number', type: 'number' },
    ];
}

class NumberInBoolOutNode extends NumberInNode {
    static outputPins = [
        { label: 'Result', type: 'boolean' },
    ];
}

class WildcardInBoolOutNode extends FS_DataNode {
    static category = 'NUMBER';
    static inputPins = [
        { label: 'Input', type: 'wildcard', default: null },
    ];
    static outputPins = [
        { label: 'Result', type: 'boolean' },
    ];
}





export class createNumber extends NumberInOutNode {
    static priority = 9;
    static label = 'Create Number';
    static description = 'Create a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0, disableHandle: true },
    ];
    static async execution({inputValues}) {
        return Number(inputValues?.Number);
    }
}

export class numberGetInfinity extends NumberOutNode {
    static label = 'Get Infinity';
    static description = 'Get Infinity value';
    static async execution({inputValues}) {
        return Infinity;
    }
}

export class numberIsFinite extends NumberInBoolOutNode {
    static label = 'Is Finite';
    static description = 'Check if number is finite';
    static async execution({inputValues}) {
        return isFinite(inputValues.Number);
    }
}

export class numberIsNaN extends WildcardInBoolOutNode {
    static label = 'Is NaN';
    static description = 'Check if input is NaN';
    static async execution({inputValues}) {
        return isNaN(inputValues.Input);
    }
}

export class numberIsNumber extends WildcardInBoolOutNode {
    static label = 'Is A Number';
    static description = 'Check if input is a number';
    static async execution({inputValues}) {
        return !isNaN(inputValues.Input);
    }
}

export class numberIsSafeInteger extends NumberInBoolOutNode {
    static label = 'Is Safe Integer';
    static description = 'Check if input is a safe integer';
    static async execution({inputValues}) {
        return Number.isSafeInteger(inputValues.Number);
    }
}

export class numberRandom extends NumberInOutNode {
    static label = 'Random';
    static description = 'Generate a random number\n{0.0 - 1.0}';
    static async execution() {
        return Math.random();
    }
}

export class numberRandomInteger extends NumberInOutNode {
    static label = 'Random Integer';
    static description = 'Generate a random integer\n{within given range}';
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
    static description = 'Generate a random float\n{within given range}';
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

export class numberLessThan extends NumberInBoolOutNode {
    static label = '< {Less Than}';
    static description = 'Check if number is less than another number';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 < inputValues.Number2;
    }
}

export class numberLessThanEqual extends NumberInBoolOutNode {
    static label = '<= {Less Than Equal}';
    static description = 'Check if number is less than or equal to another number';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 <= inputValues.Number2;
    }
}

export class numberEqual extends NumberInBoolOutNode {
    static label = '=== {Equal}';
    static description = 'Check if number is equal to another number';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 === inputValues.Number2;
    }
}

export class numberNotEqual extends NumberInBoolOutNode {
    static label = '!== {Not Equal}';
    static description = 'Check if number is not equal to another number';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 !== inputValues.Number2;
    }
}

export class numberGreaterThanEqual extends NumberInBoolOutNode {
    static label = '>= {Greater Than Equal}';
    static description = 'Check if number is greater than or equal to another number';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 >= inputValues.Number2;
    }
}

export class numberGreaterThan extends NumberInBoolOutNode {
    static label = '> {Greater Than}';
    static description = 'Check if number is greater than another number';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 > inputValues.Number2;
    }
}

export class numberAdd extends NumberInOutNode {
    static label = '+ {Add}';
    static description = 'Add two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 + inputValues.Number2;
    }
}

export class numberSubtract extends NumberInOutNode {
    static label = '- {Subtract}';
    static description = 'Subtract two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 - inputValues.Number2;
    }
}

export class numberMultiply extends NumberInOutNode {
    static label = '* {Multiply}';
    static description = 'Multiply two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 * inputValues.Number2;
    }
}

export class numberDivide extends NumberInOutNode {
    static label = '/ {Divide}';
    static description = 'Divide two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 1 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 / inputValues.Number2;
    }
}

export class numberModulo extends NumberInOutNode {
    static label = '% {Modulo}';
    static description = 'Get the modulo of two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 1 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 % inputValues.Number2;
    }
}

export class numberIncrement extends NumberInOutNode {
    static label = '++ {Increment}';
    static description = 'Increment a number by 1';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return parseInt(inputValues.Number) + 1;
    }
}

export class numberDecrement extends NumberInOutNode {
    static label = '-- {Decrement}';
    static description = 'Decrement a number by 1';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return parseInt(inputValues.Number) - 1;
    }
}

export class numberNegate extends NumberInOutNode {
    static label = 'Negate';
    static description = 'Negate a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return -inputValues.Number;
    }
}

export class numberBitwiseNot extends NumberInOutNode {
    static label = '~ {Bitwise Not}';
    static description = 'Bitwise Not a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return ~inputValues.Number;
    }
}

export class numberBitwiseAnd extends NumberInOutNode {
    static label = '& {Bitwise And}';
    static description = 'Bitwise And two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 & inputValues.Number2;
    }
}

export class numberBitwiseOr extends NumberInOutNode {
    static label = '| {Bitwise Or}';
    static description = 'Bitwise Or two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 | inputValues.Number2;
    }
}

export class numberBitwiseXor extends NumberInOutNode {
    static label = '^ {Bitwise Xor}';
    static description = 'Bitwise Xor two numbers';
    static inputPins = [
        { label: 'Number1', type: 'number', default: 0 },
        { label: 'Number2', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number1 ^ inputValues.Number2;
    }
}

export class numberBitwiseLeftShift extends NumberInOutNode {
    static label = '<< {Bitwise Left Shift}';
    static description = 'Bitwise Left Shift a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Shift', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number << inputValues.Shift;
    }
}

export class numberBitwiseRightShift extends NumberInOutNode {
    static label = '>> {Bitwise Right Shift}';
    static description = 'Bitwise Right Shift a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Shift', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number >> inputValues.Shift;
    }
}

export class numberBitwiseZeroFillRightShift extends NumberInOutNode {
    static label = '>>> {Bitwise Zero Fill Right Shift}';
    static description = 'Bitwise Zero Fill Right Shift a number';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Shift', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number >>> inputValues.Shift;
    }
}

export class numberToFixed extends NumberInOutNode {
    static label = 'To Fixed';
    static description = 'Convert number to a fixed decimal string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Decimal', type: 'number', default: 2 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number.toFixed(inputValues.Decimal);
    }
}

export class numberToPrecision extends NumberInOutNode {
    static label = 'To Precision';
    static description = 'Convert number to a precision string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Precision', type: 'number', default: 2 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number.toPrecision(inputValues.Precision);
    }
}

export class numberToExponential extends NumberInOutNode {
    static label = 'To Exponential';
    static description = 'Convert number to an exponential string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
        { label: 'Decimal', type: 'number', default: 2 },
    ];
    static async execution({inputValues}) {
        return inputValues.Number.toExponential(inputValues.Decimal);
    }
}

export class numberToBinary extends NumberInOutNode {
    static label = 'To Binary';
    static description = 'Convert number to a binary string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues}) {
        return inputValues.Number.toString(2);
    }
}

export class numberFromBinary extends NumberOutNode {
    static label = 'From Binary';
    static description = 'Convert binary string to a number';
    static inputPins = [
        { label: 'String', type: 'string', default: '0' },
    ];
    static async execution({inputValues}) {
        return parseInt(inputValues.String, 2);
    }
}

export class numberToOctal extends NumberInOutNode {
    static label = 'To Octal';
    static description = 'Convert number to an octal string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues}) {
        return inputValues.Number.toString(8);
    }
}

export class numberFromOctal extends NumberOutNode {
    static label = 'From Octal';
    static description = 'Convert octal string to a number';
    static inputPins = [
        { label: 'String', type: 'string', default: '0' },
    ];
    static async execution({inputValues}) {
        return parseInt(inputValues.String, 8);
    }
}

export class numberToHex extends NumberInOutNode {
    static label = 'To Hex';
    static description = 'Convert number to a hexadecimal string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues}) {
        return inputValues.Number.toString(16);
    }
}

export class numberFromHex extends NumberOutNode {
    static label = 'From Hex';
    static description = 'Convert hexadecimal string to a number';
    static inputPins = [
        { label: 'String', type: 'string', default: '0' },
    ];
    static outputPins = [
        { label: 'Output', type: 'number' },
    ];
    static async execution({inputValues}) {
        return parseInt(inputValues.String, 16);
    }
}

export class numberToRoman extends NumberInOutNode {
    static label = 'To Roman';
    static description = 'Convert number to a roman numeral string';
    static inputPins = [
        { label: 'Number', type: 'number', default: 0 },
    ];
    static outputPins = [
        { label: 'Output', type: 'string' },
    ];
    static async execution({inputValues}) {
        const ROMAN_NUMBERS = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
        let str = '';
        let num = inputValues.Number;
        for (let i of Object.keys(ROMAN_NUMBERS)) {
            const q = Math.floor(num / ROMAN_NUMBERS[i]);
            num -= q * ROMAN_NUMBERS[i];
            str += i.repeat(q);
        }
        return str;
    }
}

export class numberFromRoman extends NumberInOutNode {
    static label = 'From Roman';
    static description = 'Convert roman numeral string to a number';
    static inputPins = [
        { label: 'String', type: 'string', default: 'I' },
    ];
    static outputPins = [
        { label: 'Output', type: 'number' },
    ];
    static async execution({inputValues}) {
        const ROMAN_NUMBERS = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        };
        let num = 0;
        for (let i of Object.keys(ROMAN_NUMBERS)) {
            while (inputValues.String.indexOf(i) === 0) {
                num += ROMAN_NUMBERS[i];
                inputValues.String = inputValues.String.replace(i, '');
            }
        }
        return num;
    }
}



