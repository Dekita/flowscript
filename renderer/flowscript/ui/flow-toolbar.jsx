
import * as CommonIcons from '@config/common-icons';

export default function FlowToolbar({FlowScriptAPI, ...callbacks}) {
    // const reactFlow = useReactFlow();
    const commonIconProps = {
        fill: 'currentColor',
        height: '2rem',
        width: '2rem',
    }

    
    const CurrentFlowScriptIcon = FlowScriptAPI.IS_PROCESSING ? CommonIcons.stop : CommonIcons.terminal;

    console.log({FlowScriptAPI})

    return <div className='d-flex gap-2'>
        
        <button 
            className="btn btn-secondary w-100" 
            onClick={callbacks.onProcessNodeGraph}>
            <CurrentFlowScriptIcon {...commonIconProps} />
        </button>

        <button className="btn btn-primary w-100" onClick={callbacks.resetGraphToDefault}>
            <CommonIcons.plus {...commonIconProps} />
        </button>
        <button className="btn btn-primary w-100" onClick={callbacks.loadGraphFromFile}>
            <CommonIcons.disks {...commonIconProps} />
        </button>
        {/* <button className="btn btn-primary w-100" onClick={()=>{}}>
            <CommonIcons.history {...commonIconProps} />
        </button> */}
        <button className="btn btn-primary w-100" onClick={callbacks.saveGraphToFile}>
            <CommonIcons.download {...commonIconProps} />
        </button>
        {/* <button className="btn btn-primary w-100" onClick={()=>{}}>
            <CommonIcons.brackets {...commonIconProps} />
        </button> */}
        <button className="btn btn-secondary w-100" onClick={callbacks.showFlowSettings}>
            <CommonIcons.cog {...commonIconProps} />
        </button>
    </div>
}
