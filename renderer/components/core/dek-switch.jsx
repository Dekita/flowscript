/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/
import * as CommonIcons from 'config/common-icons';
import React from 'react';

const DEFAULT_ICONS = {
    enabled: CommonIcons.tog_enabled,
    disabled: CommonIcons.tog_disabled,
};

export default function DekSwitch({
    text = '',
    checked = false,
    onClick = () => {},
    icons = DEFAULT_ICONS,
    style = {},
    className = '',
    color='secondary',
    labels=['On','Off'],
    maxIconWidth=null,
    skinny=false,
}) {
    // const [active, setActive] = useState(checked);
    const Icon = checked ? icons.enabled : icons.disabled;
    const onClickedBox = React.useCallback(() => {
        const newval = !checked;
        onClick(newval);
        return newval;

        // setActive(v => {
        //     const newval = !v;
        //     onClick(newval);
        //     return newval;
        // });
    }, [checked]);

    // overwrite text if labels exist:
    text = labels[checked ? 0 : 1] ?? text;

    return <React.Fragment>
        <div className={'' + className} style={{ ...style }}>
            <div className='btn-group dek-switch w-100' role="group" style={{minWidth: 92}} onClick={onClickedBox} >
                <div className={`btn btn-dark hover-${color} text-center`+(skinny?' p-0':' py-2')} style={{minWidth: '36px', maxWidth: maxIconWidth}}>
                    <Icon fill='currentColor' width='1rem' height='1rem' style={{marginTop:-4}} />
                </div>
                <div className={'w-100 btn '+(checked ? `btn-${color}` : `btn-dark hover-${color}`)+(skinny?' p-0' : ' py-2')}>
                    {skinny ? <small>{text}</small> : text}
                </div>
            </div>
            {/* {!!text && <p className='d-inline px-2'>{text}</p>} */}
        </div>
    </React.Fragment>
}
