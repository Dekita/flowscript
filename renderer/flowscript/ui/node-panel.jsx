
import React from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';

import * as CommonIcons from '@config/common-icons';


import { Panel, useReactFlow } from '@xyflow/react';
import FlowScriptAPI from '@flowscript/api';
import SmallStrong from '@components/core/smstr';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MarkdownRenderer from '@components/markdown/renderer';
import BBCodeRenderer from '@components/core/bbcode';

export default function AddNodePanel({portalConnectionType, nodePortalPosition, hideNodePortal, onClickNode, flowSettings}) {
    // const reactFlow = useReactFlow();
    const [searchText, setSearchText] = React.useState('');
    const [contextSensitive, setContextSensitive] = React.useState(true);

    const onChangeSearchText = React.useCallback((e) => {
        setSearchText(e.target.value);
    }, [setSearchText]);

    const portalStyle = React.useMemo(()=>{
        const windW = window.innerWidth - 24;
        const windH = window.innerHeight - 124;
        const w = 320;
        const h = 420;
        let {x, y} = nodePortalPosition;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + w > windW) x = windW - w;
        if (y + h > windH) y = windH - h;
        return {
            position: 'absolute',
            transform: `translate(${x}px, ${y}px)`,
            width: w,
            maxHeight: h,
            borderRadius: flowSettings.nodeBorderRadius.value,
        };
    }, [nodePortalPosition, flowSettings]);
    
    const sortedDefinitions = React.useMemo(()=>{
        const defaultCategory = 'Undefined';
        return Object.keys(FlowScriptAPI.nodeDefinitions).sort((a, b) => {
            const definitionA = FlowScriptAPI.nodeDefinitions[a];
            const definitionB = FlowScriptAPI.nodeDefinitions[b];
            const categoryA = definitionA.category ?? defaultCategory;
            const categoryB = definitionB.category ?? defaultCategory;
            if (categoryA === categoryB) {
                if (definitionA.priority !== definitionB.priority) {
                    return definitionB.priority - definitionA.priority;
                }
                return definitionA.label.localeCompare(definitionB.label);
            }
            return categoryA.localeCompare(categoryB);
        });
    }, []);
    
    const possibleCategories = React.useMemo(()=>{
        const filteredDefinitions = sortedDefinitions.filter((type) => {
            const definition = FlowScriptAPI.nodeDefinitions[type];
            const category = definition.category.toLowerCase();
            const label = definition.label.toLowerCase();
            const lowerSearch = searchText.trim().toLowerCase();
            if (lowerSearch) {
                if (category.includes(lowerSearch)) return true;
                if (label.includes(lowerSearch)) return true;
                // if (definition.description.toLowerCase().includes(lowerSearch)) return true;
                return false;
            }

            if (portalConnectionType && contextSensitive) {
                if (definition.inputPins.some(pin => pin.type === portalConnectionType)) return true;
                return false;
            } 

            return !!!lowerSearch;
        });
        return filteredDefinitions.reduce((acc, type) => {
            const definition = FlowScriptAPI.nodeDefinitions[type];
            const category = definition.category.toLowerCase();
            if (!acc[category]) acc[category] = [];
            if (!acc[category].includes(type)) acc[category].push(type);
            return acc;
        }, {});
    }, [sortedDefinitions, searchText, contextSensitive]);

    const onClickContextToggle = React.useCallback(() => {
        setContextSensitive(!contextSensitive);
    }, [contextSensitive, setContextSensitive]);

    // Convert the click position to flow graph coordinates
    return <Panel>
        <div className="card border border-2 border-success p-0" style={portalStyle}>
            <div className='row'>
                <div className='col'>
                    <SmallStrong className='px-2' text={'All Possible Nodes'} />
                </div>
                <div className='col-auto'>
                    {portalConnectionType && <SimpleCheckbox 
                        text={`with ${portalConnectionType} input`} 
                        checked={contextSensitive} 
                        disabled={!portalConnectionType}
                        onClick={onClickContextToggle} 
                    />}
                </div>
            </div>
            <hr className='m-0 text-success'/>
            <div className='card-header p-0'>
                <input type="text" className="form-control form-dark border-0 radius0" placeholder="Search Nodes" onChange={onChangeSearchText} />
            </div>
            <hr className='m-0 text-success'/>           
            <div className='card-body d-grid p-0 overflow-y-auto'>
                {Object.keys(possibleCategories).map((category, catIndex) => {
                    const catNodes = possibleCategories[category];
                    return <NodeListGroup 
                        key={category}
                        category={category}
                        catNodes={catNodes}
                        nodePortalPosition={nodePortalPosition}
                        hideNodePortal={hideNodePortal}
                        onClickNode={onClickNode}
                    />;
                })}
            </div>
        </div>
    </Panel>;
}

function NodeListGroup({ category, catNodes, nodePortalPosition, hideNodePortal, onClickNode }) {
    const [open, setOpen] = React.useState(false);
    const el_index = `node-list-${category}`;
    const common = {fill:'currentColor', width:'1rem', height:'1rem'};
    return <React.Fragment>


        {catNodes.length > 0 && <span 
            className='badge bg-success w-100 radius0 text-start cursor-pointer hover-dark'
            onClick={() => setOpen(!open)}
            aria-controls={el_index}
            aria-expanded={open}>
            {open && <CommonIcons.arrow_down {...common} />}
            {!open && <CommonIcons.arrow_right {...common} />}
            <span className='px-1'>{category}</span>
        </span>}
        <Collapse in={open}>
            <ul id={el_index} className='list-group radius0'>
                {catNodes.map((type, key) => <NodeListItem 
                    key={key} type={type} 
                    spawnPosition={nodePortalPosition} 
                    hideNodePortal={hideNodePortal}
                    onClickNode={onClickNode}
                />)}
            </ul>
        </Collapse>    
    </React.Fragment>;
}

function NodeListItem({type, spawnPosition, hideNodePortal, onClickNode}) {
    const reactFlow = useReactFlow();
    const definition = FlowScriptAPI.nodeDefinitions[type];
    const buttonClasses = 'list-group-item list-group-item-action btn-dark border-0 hover-success py-1 px-2';
    const onClick = React.useCallback(() => {
        if (definition.highlander) {
            const finder = (node) => node.type === type;
            const existingNode = reactFlow.getNodes().find(finder);
            if (existingNode) {
                console.log('Node already exists:', existingNode);
                onClickNode(null, existingNode);
                hideNodePortal();
                return;
            }
        }
        // updat3 spawn position based onr eact flow viewport: 
        const {x, y, zoom} = reactFlow.getViewport();
        const updatedSpawnPosition = {
            x: (spawnPosition.x - x) / zoom,
            y: (spawnPosition.y - y) / zoom,
        };
        const newNode = FlowScriptAPI.nodeFactory(type, updatedSpawnPosition);
        if (!newNode) return;
        reactFlow.addNodes(newNode);
        hideNodePortal();
        console.log('Added Node:', newNode);
    }, [reactFlow, type, spawnPosition, hideNodePortal, onClickNode]);

    const delay = { show: 250, hide: 100 };
    // const buttonClasses = 'list-group-item list-group-item-action btn-dark border-0 hover-success py-1 px-2';

    const placement = spawnPosition.x < window.innerWidth / 2 ? 'right' : 'left';

    return <OverlayTrigger placement={placement} delay={delay} overlay={<Tooltip className="" >
            <BBCodeRenderer className='' bbcodeText={`[b]${definition.category}[/b]\n${definition.description?.trim()}`} />
            {/* <MarkdownRenderer className='p-5'>{definition.description?.trim()}</MarkdownRenderer> */}
        </Tooltip>}>
        <button className={buttonClasses} onClick={onClick}>
            <small>{definition.label}</small>
        </button>
    </OverlayTrigger>;
}

function SimpleCheckbox({checked=false, text='Checkbox', onClick=()=>{}, disabled=false}) {
    const common = {fill:'currentColor', width:'1rem', height:'1rem'};
    let commonClasses = "btn btn-success border-0 radius0 p-0 pb-1 px-2 text-end";
    commonClasses += disabled ? ' disabled' : '';
    return <div className={commonClasses} disabled={disabled} onClick={onClick}>
        {checked && <CommonIcons.check_square {...common} />}
        {!checked && <CommonIcons.close {...common} />}
        <small className='px-2'>{text}</small>
    </div>;
}