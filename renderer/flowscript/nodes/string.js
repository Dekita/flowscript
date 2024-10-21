
import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNode } from "./basecore";

// helper classes
class FS_StringNode extends FS_DataNode {
    static category = 'STRING'
    static description = 'String Operation'
}
class FS_StringInOutNode extends FS_StringNode {
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'Output', type: 'string' },
    ];
}

export class createString extends FS_StringNode {
    static priority = 9;
    static label = 'Create String';
    static inputPins = [
        { label: 'String', type: 'string', default: 'Hello World', disableHandle: true  },
    ];
    static outputPins = [
        { label: 'String', type: 'string' },
    ];
    static async execution({inputValues}) {
        return inputValues?.String;
    }
}

export class createText extends FS_StringNode {
    static priority = 9;
    static label = 'Create Text';
    static inputPins = [
        { label: 'String', type: 'text', default: 'Large Hello World', disableHandle: true },
    ];
    static outputPins = [
        { label: 'String', type: 'string' },
    ];
    static async execution({inputValues}) {
        return inputValues?.String;
    }
}

export class wildcardToString extends FS_StringNode {
    static label = 'Wildcard To String';
    static inputPins = [
        { label: 'Input', type: 'wildcard', default: 'Hello World' },
    ];
    static outputPins = [
        { label: 'Result', type: 'boolean' },
        { label: 'String', type: 'string' },
    ];
    static async execution({inputValues}) {
        try {
            return [true, inputValues.Input.toString()];
        } catch (error) {
            return [false, error.message];
        }
    }
}

export class stringToUpperCase extends FS_StringInOutNode {
    static label = 'To Upper Case';
    static async execution({inputValues}) {
        return inputValues?.Input.toUpperCase();
    }
}

export class stringToLowerCase extends FS_StringInOutNode {
    static label = 'To Lower Case';
    static async execution({inputValues}) {
        return inputValues?.Input.toLowerCase();
    }
}

export class stringToCamelCase extends FS_StringInOutNode {
    static label = 'To Camel Case';
    static async execution({inputValues}) {
        const inString = inputValues.Input || '';
        const words = inString.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join('');
    }
}

export class stringToSnakeCase extends FS_StringInOutNode {
    static label = 'To Snake Case';
    static async execution({inputValues}) {
        return inputValues.Input.replace(/ /g, '_');
    }
}

export class stringToKebabCase extends FS_StringInOutNode {
    static label = 'To Kebab Case';
    static async execution({inputValues}) {
        return inputValues.Input.replace(/ /g, '-');
    }
}

export class stringToUrlEncoded extends FS_StringInOutNode {
    static label = 'To URL Encoded';
    static async execution({inputValues}) {
        return encodeURIComponent(inputValues.Input);
    }
}

export class stringToUrlDecoded extends FS_StringInOutNode {
    static label = 'To URL Decoded';
    static async execution({inputValues}) {
        return decodeURIComponent(inputValues.Input);
    }
}

export class stringToUriEncodedComponent extends FS_StringInOutNode {
    static label = 'To URI Encoded Component';
    static async execution({inputValues}) {
        return encodeURIComponent(inputValues.Input);
    }
}

export class stringToUriDecodedComponent extends FS_StringInOutNode {
    static label = 'To URI Decoded Component';
    static async execution({inputValues}) {
        return decodeURIComponent(inputValues.Input);
    }
}

export class stringToBase64 extends FS_StringInOutNode {
    static label = 'To Base64';
    static async execution({inputValues}) {
        return btoa(inputValues.Input);
    }
}

export class stringFromBase64 extends FS_StringInOutNode {
    static label = 'From Base64';
    static async execution({inputValues}) {
        return atob(inputValues.Input);
    }
}

export class stringTrim extends FS_StringInOutNode {
    static label = 'Trim';
    static async execution({inputValues}) {
        return inputValues.Input.trim();
    }
}

export class stringTrimStart extends FS_StringInOutNode {
    static label = 'Trim Start';
    static async execution({inputValues}) {
        return inputValues.Input.trimStart();
    }
}

export class stringTrimEnd extends FS_StringInOutNode {
    static label = 'Trim End';
    static async execution({inputValues}) {
        return inputValues.Input.trimEnd();
    }
}

export class stringSlice extends FS_StringInOutNode {
    static label = 'Slice';
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
        { label: 'Start', type: 'number', default: 0 },
        { label: 'End', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Input.slice(inputValues.Start, inputValues.End);
    }
}

export class stringSubstring extends FS_StringInOutNode {
    static label = 'Substring';
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
        { label: 'Start', type: 'number', default: 0 },
        { label: 'End', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Input.substring(inputValues.Start, inputValues.End);
    }
}

export class stringCharAt extends FS_StringInOutNode {
    static label = 'Char At';
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
        { label: 'Index', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Input.charAt(inputValues.Index);
    }
}

export class stringCharCodeAt extends FS_StringInOutNode {
    static label = 'Char Code At';
    static inputPins = [
        { label: 'Input', type: 'string', default: '' },
        { label: 'Index', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.Input.charCodeAt(inputValues.Index);
    }
}

export class stringConcat extends FS_StringInOutNode {
    static label = 'Concat';
    static inputPins = [
        { label: 'StringA', type: 'string', default: '' },
        { label: 'StringB', type: 'string', default: '' },
    ];
    static async execution({inputValues}) {
        return inputValues.StringA.concat(inputValues.StringB);
    }
}

export class stringIncludes extends FS_StringInOutNode {
    static label = 'Includes';
    static inputPins = [
        { label: 'String', type: 'string', default: '' },
        { label: 'Search', type: 'string', default: '' },
    ];
    static async execution({inputValues}) {
        return inputValues.String.includes(inputValues.Search);
    }
}

export class stringIndexOf extends FS_StringInOutNode {
    static label = 'Index Of';
    static inputPins = [
        { label: 'Search', type: 'string', default: '' },
        { label: 'Start', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.String.indexOf(inputValues.Search, inputValues.Start);
    }
}

export class stringParseInt extends FS_StringInOutNode {
    static label = 'Parse Integer';
    static description = 'Parse input to integer';
    static outputPins = [
        { label: 'Number', type: 'number' },
    ];
    static async execution({inputValues}) {
        return parseInt(inputValues.Input);
    }
}

export class stringParseFloat extends FS_StringInOutNode {
    static label = 'Parse Float';
    static description = 'Parse input to float';
    static outputPins = [
        { label: 'Number', type: 'number' },
    ];
    static async execution({inputValues}) {
        return parseFloat(inputValues.Input);
    }
}

export class stringReplace extends FS_StringInOutNode {
    static label = 'Replace';
    static inputPins = [
        { label: 'String', type: 'string', default: '' },
        { label: 'Search', type: 'string', default: '' },
        { label: 'Replacer', type: 'string', default: '' },
    ];
    static async execution({inputValues}) {
        return inputValues.String.replace(inputValues.Search, inputValues.Replace);
    }
}

export class stringReplaceAll extends FS_StringInOutNode {
    static label = 'Replace All';
    static inputPins = [
        { label: 'String', type: 'string', default: '' },
        { label: 'Search', type: 'string', default: '' },
        { label: 'Replacer', type: 'string', default: '' },
    ];
    static async execution({inputValues}) {
        return inputValues.String.replaceAll(inputValues.Search, inputValues.Replace);
    }
}

export class stringSplit extends FS_StringInOutNode {
    static label = 'Split';
    static inputPins = [
        { label: 'String', type: 'string', default: '' },
        { label: 'Separator', type: 'string', default: ',' },
    ];
    static outputPins = [
        { label: 'Array', type: 'array' },
    ];
    static async execution({inputValues}) {
        return inputValues.String.split(inputValues.Separator);
    }
}
