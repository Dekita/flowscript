
import { nodeCategoryColors } from '@flowscript/utils/color-map';

// base class used for all JSON nodes
export class FSNode {
    // rarely used properties
    static priority = 0; // used for sorting within node panel
    static highlander = false; // there can be only one
    // generic node properties
    static color = 'var(--dek-info-normal)'; // css color used for the node
    static category = 'DEFAULT'; // category used for sorting the node within panel
    static description = ''; // description of the node shown when hovering
    static inputPins = [];  // pins in eg: { label: 'ExecIn', type: 'exec' }
    static outputPins = []; // pins out eg: { label: 'ExecOut', type: 'exec' }
    static async execution({inputValues, setOutputValue, triggerNextNode}) {
        throw new Error('Execution method not implemented');
    }
    // [optional] JSX
    // static JSX({id}) {
    //     return null;
    // }
}


/**
* Event nodes are nodes that are triggered by external/defined events
* they should have only ONE output pin of type 'exec', 
* they should have NO input pins of type 'exec'!! 
* they can have multiple input/output pins of other types.
*/
export class FS_EventNode extends FSNode {
    static color = nodeCategoryColors.EVENT;
    static category = 'EVENT';
    static highlander = true; 
    static inputPins = [];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
}
/**
* Execution nodes are nodes that are triggered by other nodes
* and then run some logic that may take some time to complete.
* they should have ONE input pin of type 'exec',
* they should have ONE output pin of type 'exec',
* they can have multiple input/output pins of other types.
*/
export class FS_ExecutionNode extends FSNode {
    static color = nodeCategoryColors.EXECUTION;
    static category = 'EXECUTION';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
}
/**
* Logic nodes are essentially flow helper nodes such as if, else, while, for, etc.
* they should have ONE input pin of type 'exec',
* they may have a variable number of output pins of type 'exec',
* they can have multiple input/output pins of other types.
*/
export class FS_LogicNode extends FSNode {
    static color = nodeCategoryColors.LOGIC;
    static category = 'LOGIC';
    static inputPins = [];
    static outputPins = [];
}
/**
* Data nodes are nodes that deal with primitive data manipulation.
* such as basic math/string operations, date/time operations, etc.
* they should have NO input pins of type 'exec',
* they should have NO output pins of type 'exec',
* they can have multiple input/output pins of other types.
* their execution method should return the data to be passed to the next node.
* their execution logic should complete quickly.
*/
export class FS_DataNode extends FSNode {
    static color = nodeCategoryColors.DATA;
    static category = 'DATA';
    static inputPins = [];
    static outputPins = [];
}