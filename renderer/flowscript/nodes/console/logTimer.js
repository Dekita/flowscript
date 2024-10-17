
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

const createLoggerID = nodeid => `create-timelog-preview-${nodeid}`;

const timeCache = {};

const TIMER_ACTIONS = ['start', 'log', 'stop'];

export default class {
    static label = 'Log Timer';
    static color = 'var(--dek-info-normal)';
    static category = 'Console';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Label', type: 'string', default: '' },
        { label: 'Action', type: 'choice', default: 0, options: TIMER_ACTIONS },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({id, inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        const logger_id = createLoggerID(id);
        const toggleLoggerDisplay = (text) => {
            const logger = document.getElementById(logger_id);
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

        let elapsed = 0;
        switch (TIMER_ACTIONS[inputValues.Action]) {
            case 'start':
                // console.time(inputValues.Label);
                timeCache[inputValues.Label] = performance.now();
                break;
            case 'log':
                // console.timeLog(inputValues.Label);
                elapsed = performance.now() - timeCache[inputValues.Label];
                break;
            case 'stop':
                // console.timeEnd(inputValues.Label);
                elapsed = performance.now() - timeCache[inputValues.Label];
                delete timeCache[inputValues.Label];
                break;
            default:
                console.error('Invalid Action:', inputValues.Action);
                break;
        }

        if (elapsed > 0) {
            toggleLoggerDisplay(`${inputValues.Label}: ${elapsed.toFixed(2)}ms`);
        } else {
            toggleLoggerDisplay(null);
        }
        
        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
    static JSX = ({id}) => {
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

