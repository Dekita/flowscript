
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

const createLoggerID = nodeid => `create-countlog-preview-${nodeid}`;

const countCache = {};

const COUNT_TIMER_ACTIONS = ['count', 'reset', 'delete'];

export default class {
    static label = 'Log Count';
    static color = 'var(--dek-info-normal)';
    static category = 'Console';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Label', type: 'string', default: '' },
        { label: 'Action', type: 'choice', default: 0, options: COUNT_TIMER_ACTIONS },
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

        let count = 0;
        switch (COUNT_TIMER_ACTIONS[inputValues.Action]) {
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
            toggleLoggerDisplay(`${inputValues.Label}: ${count}`);
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

