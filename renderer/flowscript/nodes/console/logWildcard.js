
// This is a simple example of an EventNode that can be used 
import logExecutingNodeData from '@flowscript/utils/log-node';

const createLoggerID = nodeid => `create-logger-preview-${nodeid}`;


export default class {
    static label = 'Log Wildcard';
    static color = 'var(--dek-info-normal)';
    static category = 'Console';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'Output', type: 'wildcard', default: null },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
    ];
    static async execution({id, inputValues, triggerNextNode}) {
        await logExecutingNodeData(this, ...arguments);

        console.info(this.label, 'Output:', inputValues.Output);
        const logger_id = createLoggerID(id);
        const logger = document.getElementById(logger_id);
        if (logger) {
            const json = JSON.stringify(inputValues.Output, null, 4);
            logger.innerText = json;
        }
        
        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
    static JSX = ({id}) => {
        const logger_id = createLoggerID(id);
        const loggerStyle = {
            // backgroundColor: 'var(--dek-info-light)',
            // color: 'var(--dek-info-dark)',
            // padding: '0.5rem',
            borderRadius: 0,
            overflow: 'auto',
            maxHeight: '128px',
            maxWidth: '100%',
        };
        return <pre id={logger_id} className='mb-0' style={loggerStyle}>
            {/* Output will be displayed here */}
        </pre>
    }    
}

