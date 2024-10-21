/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/
import * as CommonIcons from '@config/common-icons';
import { useCallback, useMemo, useState } from 'react';

export default function DekChoice({
    active=0,
    choices=[1, 4, 9],
    onClick = () => {},
    labels=choices,
    icons=[null,null],
    color='secondary',
    className = '',
    style = {},
    disabled=false,
    skinny=false,
}) {

    // const [activeID, setActiveID] = useState(active);
    
    return <div className={'' + className} style={{ ...style }}>
        <div className={`btn-group ${skinny? 'btn-group-sm' : ''} dek-choice w-100`} role="group">
            {choices.map((choice, i) => {
                const Icon = icons[i];
                const isActive = active === i;
                let deClass = 'w-100 btn '+(isActive ? `btn-${color}` : `btn-dark hover-${color}`)+(disabled?' disabled':'');
                deClass += (skinny ? ' p-0' : '');


                const deClick = ()=> {
                    if (disabled) return;
                    // setActiveID(i);
                    onClick(i,choice);
                }
                return <div key={i} className={deClass} onClick={deClick} disabled={disabled}>
                    {Icon ? <Icon fill='currentColor' height='1rem' /> : labels[i]}
                </div>
            })}
        </div>
        {/* {!!text && <p className='d-inline px-2'>{text}</p>} */}
    </div>
}
