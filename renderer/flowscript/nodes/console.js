
import { FS_DataNode } from "./basecore";

const createLoggerID = nodeid => `logger-preview-${nodeid}`;
const CONSOLE_COUNT_ACTIONS = ['count', 'reset', 'delete'];
const CONSOLE_TIMER_ACTIONS = ['start', 'log', 'stop'];
const countCache = {};
const timerCache = {};

const toggleLoggerDisplay = (id, text) => {
    const logger = document.getElementById(createLoggerID(id));
    if (text) console.info(text);
    if (logger) {
        logger.innerText = text;
        if (text) {
            logger.classList.add('d-block');
            logger.classList.remove('d-none');
        } else {
            logger.classList.remove('d-block');
            logger.classList.add('d-none');
        }
    }
}

// base class used for all console (logging) nodes
class baseConsoleNode {
    static color = 'var(--dek-info-normal)';
    static category = 'CONSOLE';
    static description = 'Console operations';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({inputValues}) {
        return null;
    }
    static JSX({id}) {
        const logger_id = createLoggerID(id);
        const loggerStyle = {
            borderRadius: 0,
            overflow: 'auto',
            maxHeight: '128px',
            maxWidth: '100%',
        };
        return <pre id={logger_id} className='mb-0 d-none' style={loggerStyle}>
            {/* Output will be displayed here */}
        </pre>
    }    
}

export class logWildcardConsole extends baseConsoleNode {
    static label = 'Log Wildcard';
    static description = 'Logs the input value as a JSON string to the console';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Output', type: 'wildcard', default: null },
    ];
    static async execution({id, inputValues, triggerNextNode}) {
        if (!!inputValues.Output) {
            try {
                toggleLoggerDisplay(id, JSON.stringify(inputValues.Output, null, 4));
            } catch (error) {
                console.error(error);
                toggleLoggerDisplay(id, `Error: ${error.message}`);
            }
        } else {
            toggleLoggerDisplay(id, `null`);
        }        
        await triggerNextNode('ExecOut');
    } 
}

export class logCountConsole extends baseConsoleNode {
    static label = 'Log Count';
    static description = 'Count and log the number of times this node has been triggered with `label`';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Label', type: 'string', default: '' },
        { label: 'Action', type: 'choice', default: 0, options: CONSOLE_COUNT_ACTIONS },
    ];
    static async execution({id, inputValues, triggerNextNode}) {
        let count = 0;
        switch (CONSOLE_COUNT_ACTIONS[inputValues.Action]) {
            case 'count':
            countCache[inputValues.Label] = countCache[inputValues.Label] || 0;
            count = ++countCache[inputValues.Label];
            break;

            case 'reset':
            countCache[inputValues.Label] = 0;
            break;

            case 'delete':
            delete countCache[inputValues.Label];
            break;

            default:
            console.error('Invalid Action:', inputValues.Action);
            break;
        }
        if (countCache[inputValues.Label] !== undefined) {
            toggleLoggerDisplay(id, `${inputValues.Label}: ${count}`);
        } else {
            toggleLoggerDisplay(id, null);
        }
        await triggerNextNode('ExecOut');
    }
}

export class logTimerConsole extends baseConsoleNode {
    static label = 'Log Timer';
    static description = 'Log timer';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Label', type: 'string', default: '' },
        { label: 'Action', type: 'choice', default: 0, options: CONSOLE_TIMER_ACTIONS },
    ];
    static async execution({id, inputValues, triggerNextNode}) {
        let elapsed = 0;
        switch (CONSOLE_TIMER_ACTIONS[inputValues.Action]) {
            case 'start':
            // console.time(inputValues.Label);
            timerCache[inputValues.Label] = performance.now();
            break;

            case 'log':
            // console.timeLog(inputValues.Label);
            elapsed = performance.now() - timerCache[inputValues.Label];
            break;

            case 'stop':
            // console.timeEnd(inputValues.Label);
            elapsed = performance.now() - timerCache[inputValues.Label];
            delete timerCache[inputValues.Label];
            break;

            default:
            console.error('Invalid Action:', inputValues.Action);
            break;
        }
        if (elapsed > 0) {
            toggleLoggerDisplay(id, `${inputValues.Label}: ${elapsed.toFixed(2)}ms`);
        } else {
            toggleLoggerDisplay(id, null);
        }
        await triggerNextNode('ExecOut');
    }
}
