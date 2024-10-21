
import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNode } from "./basecore";

class BaseDateNode extends FS_DataNode {
    static category = 'DATE / TIME';
}

export class createDate extends BaseDateNode {
    static priority = 9;
    static label = 'Create Date';
    static inputPins = [
        { label: 'String', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'Date', type: 'date' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.String) return new Date();
        return new Date(inputValues.String);
    }
}

export class getYear extends BaseDateNode {
    static label = 'Get Year';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Year', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getFullYear();
    }
}

export class getMonth extends BaseDateNode {
    static label = 'Get Month';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Month', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getMonth();
    }
}

export class getDate extends BaseDateNode {
    static label = 'Get Date';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Day', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getDate();
    }
}

export class getDay extends BaseDateNode {
    static label = 'Get Day of Week';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Day of Week', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getDay();
    }
}

export class getHours extends BaseDateNode {
    static label = 'Get Hours';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Hours', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getHours();
    }
}

export class getMinutes extends BaseDateNode {
    static label = 'Get Minutes';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Minutes', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getMinutes();
    }
}

export class getSeconds extends BaseDateNode {
    static label = 'Get Seconds';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Seconds', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getSeconds();
    }
}

export class getMilliseconds extends BaseDateNode {
    static label = 'Get Milliseconds';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Milliseconds', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getMilliseconds();
    }
}

export class getTime extends BaseDateNode {
    static label = 'Get Time';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Time', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getTime();
    }
}

export class getTimezoneOffset extends BaseDateNode {
    static label = 'Get Timezone Offset';
    static inputPins = [
        { label: 'Date', type: 'date', default: null },
    ];
    static outputPins = [
        { label: 'Offset', type: 'number' },
    ];
    static async execution({inputValues, triggerNextNode, setOutputValue}) {
        if (!inputValues.Date) return 0;
        if (!(inputValues.Date instanceof Date)) return 0;
        return inputValues.Date.getTimezoneOffset();
    }
}




