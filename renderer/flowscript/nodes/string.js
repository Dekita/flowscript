
import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNodeFS_DataNode } from "./basecore";

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
        { label: 'Value', type: 'wildcard', default: 'Hello World' },
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
        return inputValues?.String.toUpperCase();
    }
}

export class stringToLowerCase extends FS_StringInOutNode {
    static label = 'To Lower Case';
    static async execution({inputValues}) {
        return inputValues?.String.toLowerCase();
    }
}

export class stringToCamelCase extends FS_StringInOutNode {
    static label = 'To Camel Case';
    static async execution({inputValues}) {
        const inString = inputValues.String || '';
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
        return inputValues.String.replace(/ /g, '_');
    }
}

export class stringToKebabCase extends FS_StringInOutNode {
    static label = 'To Kebab Case';
    static async execution({inputValues}) {
        return inputValues.String.replace(/ /g, '-');
    }
}

export class stringToUrlEncoded extends FS_StringInOutNode {
    static label = 'To URL Encoded';
    static async execution({inputValues}) {
        return encodeURIComponent(inputValues.String);
    }
}

export class stringToBase64 extends FS_StringInOutNode {
    static label = 'To Base64';
    static async execution({inputValues}) {
        return btoa(inputValues.String);
    }
}

export class stringFromBase64 extends FS_StringInOutNode {
    static label = 'From Base64';
    static async execution({inputValues}) {
        return atob(inputValues.String);
    }
}

export class stringTrim extends FS_StringInOutNode {
    static label = 'Trim';
    static async execution({inputValues}) {
        return inputValues.String.trim();
    }
}

export class stringTrimStart extends FS_StringInOutNode {
    static label = 'Trim Start';
    static async execution({inputValues}) {
        return inputValues.String.trimStart();
    }
}

export class stringTrimEnd extends FS_StringInOutNode {
    static label = 'Trim End';
    static async execution({inputValues}) {
        return inputValues.String.trimEnd();
    }
}

export class stringSlice extends FS_StringInOutNode {
    static label = 'Slice';
    static inputPins = [
        { label: 'Start', type: 'number', default: 0 },
        { label: 'End', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.String.slice(inputValues.Start, inputValues.End);
    }
}

export class stringSubstring extends FS_StringInOutNode {
    static label = 'Substring';
    static inputPins = [
        { label: 'Start', type: 'number', default: 0 },
        { label: 'End', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.String.substring(inputValues.Start, inputValues.End);
    }
}

export class stringCharAt extends FS_StringInOutNode {
    static label = 'Char At';
    static inputPins = [
        { label: 'Index', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.String.charAt(inputValues.Index);
    }
}

export class stringCharCodeAt extends FS_StringInOutNode {
    static label = 'Char Code At';
    static inputPins = [
        { label: 'Index', type: 'number', default: 0 },
    ];
    static async execution({inputValues}) {
        return inputValues.String.charCodeAt(inputValues.Index);
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


