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
    disabled=false,
    skinny=false,
}) {
    // const [active, setActive] = useState(checked);
    const Icon = checked ? icons.enabled : icons.disabled;
    const onClickedBox = React.useCallback(() => {
        if (disabled) return;
        const newval = !checked;
        onClick(newval);
        return newval;

        // setActive(v => {
        //     const newval = !v;
        //     onClick(newval);
        //     return newval;
        // });
    }, [checked, disabled, onClick]);

    // overwrite text if labels exist:
    text = labels[checked ? 0 : 1] ?? text;

    const checkboxButtonClasses = [
        `btn btn-dark hover-${color} text-center`,
        disabled ? 'disabled' : '',
        skinny ? 'p-0' : 'py-2',
    ].join(' ');

    const textButtonClasses = [
        'w-100 btn',
        checked ? `btn-${color}` : `btn-dark hover-${color}`,
        disabled ? 'disabled' : '',
        skinny ? 'p-0' : 'py-2',
    ].join(' ');

    return <React.Fragment>
        <div className={'' + className} style={{ ...style }}>
            <div className='btn-group dek-switch w-100' role="group" style={{minWidth: 92}} onClick={onClickedBox} >
                <div className={checkboxButtonClasses} disabled={disabled} style={{minWidth: '36px', maxWidth: maxIconWidth}}>
                    <Icon fill='currentColor' width='1rem' height='1rem' style={{marginTop:-4}} />
                </div>
                <div className={textButtonClasses} disabled={disabled}>
                    {skinny ? <small>{text}</small> : text}
                </div>
            </div>
            {/* {!!text && <p className='d-inline px-2'>{text}</p>} */}
        </div>
    </React.Fragment>
}
