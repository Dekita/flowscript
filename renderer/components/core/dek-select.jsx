/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################

<DekSelect onChange={(event, value)=>{}}>
    <dekItem text='Option 1' active/>
    <dekItem text='Option 2'/>
    <dekItem text='Option 3'/>
    <dekItem text='Option 4'/>
</DekSelect> 
*/

import { useState, useRef, useMemo, useEffect, Children } from 'react';

// import styles from '../styles/dekselect.module.css';
import IconDown from '@svgs/fa5/solid/arrow-down.svg';
import IconList from '@svgs/fa5/solid/list-ul.svg';

function useOnClickOutside(ref, callback) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                if (callback) callback(event);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

export default function DekSelect({
    children,
    onChange,
    active_id,
    uid,
    disableInput = false,
    skinny = false,
    style = {
        // height: 24,
    },
}) {
    const child_array = Children.toArray(children);
    const active = useMemo(()=>child_array.find((c, index) => {
        return c.props.active || active_id === index;
    }), [child_array, active_id]);
    const selected_text = useMemo(()=>{
        if (!active) return 'not-selected';
        return active?.props?.children || active?.props?.text;
    }, [active]);
    const [showUL, setShowUL] = useState(false);

    // const ref = useOnClickOutside((e)=>{
    //     console.log('ref-e:', uid === e.target?.id);
    //     setShowUL(false);
    // });

    const ref = useRef(null);
    useOnClickOutside(ref, () => setShowUL(false));

    // when main element is clicked
    const onClickElement = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (disableInput) return;
        setShowUL((old) => !old);
    };
    // when list item is clicked
    const onClickItem = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const index = [].slice
            .call(event.target.parentNode.children)
            .indexOf(event.target);
        // setSelected(event.target.innerText);
        onChange(event, selected_text, event.target.innerText, index);
        setShowUL(false);
    };

    const IconComponent = showUL ? IconDown : IconList;

    const skinnySizes = {
        fontSize: skinny ? '.75rem' : '.75rem',
        lineHeight: skinny ? '.75rem' : '.75rem',
        minHeight: skinny ? '24px' : '42px',
    }
    
    const mainclasses = [
        'form-control form-control-sm btn-select dekselect-secondary p-0 ms-1',
        showUL ? 'active' : '',
    ].join(' ');

    const ulStyles = {
        top: skinny? '20px' : '40px',
    }

    const iconProperties = {
        width: skinny ? 12: 16,
        height: skinny ? 12: 16,
        fill: 'currentColor',
    }

    const smallStyles = skinny ? {
        fontSize: '.75rem',
        lineHeight: '.75rem',
        padding: '0.2rem 0.5rem',
    } : {};

    return <div
        className={mainclasses}
        onClick={onClickElement}
        disabled={disableInput}
        style={{...style, ...skinnySizes}}
        ref={ref}
        id={uid}>
        <small className='btn-select-value' style={smallStyles}>{selected_text}</small>
        <span className='btn-select-arrow text-center'>
            <IconComponent {...iconProperties} />
        </span>
        <ul className={showUL ? 'd-block thin-scroller' : 'd-none'} style={ulStyles}>
            {child_array.map((child) => {
                return <li id={child.props.id} key={child.key || child.props.id} onClick={onClickItem}>
                    {child.props.children ?? (child.props.text || child.key)}
                </li>;
            })}
        </ul>
    </div>;
}
