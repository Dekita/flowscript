
import { FS_DataNode } from "./basecore";

// Base class used for all boolean nodes
class singleInputBooleanNodeBase extends FS_DataNode{
    static category = 'BOOLEAN';
    static inputPins = [
        { label: 'Boolean', type: 'boolean', default: false },
    ];
    static outputPins = [
        { label: 'Boolean', type: 'boolean' },
    ];
    static async execution({inputValues}) {
        return null;
    }
}

// Base class used for all boolean nodes with two boolean inputs
class twinInputBooleanNodeBase extends singleInputBooleanNodeBase {
    static inputPins = [
        { label: 'BooleanA', type: 'boolean', default: false },
        { label: 'BooleanB', type: 'boolean', default: false },
    ];
}

export class createBoolean extends singleInputBooleanNodeBase {
    static label = 'Create Boolean';
    static description = 'Create a boolean value';
    static async execution({inputValues}) {
        return inputValues?.Boolean;
    }
}

export class LogicalAND extends twinInputBooleanNodeBase {
    static label = '&& {and}';
    static description = 'Logical AND';
    static async execution({inputValues}) {
        return inputValues.BooleanA && inputValues.BooleanB;
    }
}

export class LogicalOR extends twinInputBooleanNodeBase {
    static label = '|| {or}';
    static description = 'Logical OR (A or B)';
    static async execution({inputValues}) {
        return inputValues.BooleanA || inputValues.BooleanB;
    }
}

export class LogicalXOR extends twinInputBooleanNodeBase {
    static label = '^ {xor}';
    static description = 'Logical XOR (A or B)\n{but not both}';
    static async execution({inputValues}) {
        return !!(inputValues.BooleanA ? !inputValues.BooleanB : inputValues.BooleanB);
    }
}

export class LogicalNOT extends singleInputBooleanNodeBase {
    static label = '! {not}';
    static description = 'Logical NOT\n(flip the boolean value)';
    static async execution({inputValues}) {
        return !inputValues?.Boolean;
    }
}

export class equalsBoolean extends twinInputBooleanNodeBase {
    static label = '=== {equals}';
    static description = 'Check Boolean A Equals B';
    static async execution({inputValues}) {
        return inputValues.BooleanA === inputValues.BooleanB;
    }
}

export class notEqualsBoolean extends twinInputBooleanNodeBase {
    static label = '!== {not equals}';
    static description = 'Check Boolean Not Equals';
    static async execution({inputValues}) {
        return inputValues.BooleanA !== inputValues.BooleanB;
    }
}

