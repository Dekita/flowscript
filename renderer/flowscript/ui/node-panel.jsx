
import React from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';


import { Panel, useReactFlow } from '@xyflow/react';
import FlowScriptAPI from '@flowscript/api';

export default function AddNodePanel({portalConnectionType, nodePortalPosition, hideNodePortal, onClickNode}) {
    const reactFlow = useReactFlow();

    const [searchText, setSearchText] = React.useState('');

    const onChangeSearchText = React.useCallback((e) => {
        setSearchText(e.target.value);
    }, [setSearchText]);

    const portalStyle = React.useMemo(()=>{

        const windW = window.innerWidth - 24;
        const windH = window.innerHeight - 128;


        const w = 320;
        const h = 420;

        let {x, y} = nodePortalPosition;
        // const viewport = reactFlow.getViewport();
        // update position to ensure it fits within the react-flow viewport

        // const {width, height} = reactFlow.getRect();
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + w > windW) x = windW - w;
        if (y + h > windH) y = windH - h;

        return {
            position: 'absolute',
            transform: `translate(${x}px, ${y}px)`,
            width: w,
            maxHeight: h,
        };
    }, [nodePortalPosition]);
    

    const sortedDefinitions = React.useMemo(()=>{
        const defaultCategory = 'Undefined';
        return Object.keys(FlowScriptAPI.nodeDefinitions).sort((a, b) => {
            const definitionA = FlowScriptAPI.nodeDefinitions[a];
            const definitionB = FlowScriptAPI.nodeDefinitions[b];
            const categoryA = definitionA.category ?? defaultCategory;
            const categoryB = definitionB.category ?? defaultCategory;
            if (categoryA === categoryB) return definitionA.label.localeCompare(definitionB.label);
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

            if (portalConnectionType) {
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
    }, [sortedDefinitions, searchText]);

    console.log(nodePortalPosition)

    // Convert the click position to flow graph coordinates
    return <Panel>
        <div className="card border border-2 border-success p-0" style={portalStyle}>
            <div className='card-header p-0'>
                <input type="text" className="form-control form-dark" placeholder="Search Nodes" onChange={onChangeSearchText} />
            </div>
            <div className='card-body d-grid p-0 overflow-y-auto'>
                {Object.keys(possibleCategories).map((category, catIndex) => {
                    const catNodes = possibleCategories[category];
                    return <NodeListGroup 
                        key={catIndex}
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
    return <React.Fragment>
        {catNodes.length > 0 && <span className='badge bg-success w-100 radius0 text-start'>{category}</span>}
        <ul className='list-group radius0' >
            {catNodes.map((type, key) => <NodeListItem 
                key={key} type={type} 
                spawnPosition={nodePortalPosition} 
                hideNodePortal={hideNodePortal}
                onClickNode={onClickNode}
            />)}
        </ul>
    </React.Fragment>;
}


function NodeListItem({type, spawnPosition, hideNodePortal, onClickNode}) {
    const reactFlow = useReactFlow();
    const definition = FlowScriptAPI.nodeDefinitions[type];
    const buttonClasses = 'list-group-item list-group-item-action btn-dark border-0 hover-success';

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

    return <button className={buttonClasses} onClick={onClick}>{definition.label}</button>;
}
