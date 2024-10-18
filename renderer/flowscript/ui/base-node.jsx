import React from 'react';
import { Handle, Position, useReactFlow, useHandleConnections } from '@xyflow/react';

import Col from 'react-bootstrap/Col';
// import Image from 'next/image';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

import * as CommonIcons from '@config/common-icons';
import CommonPin from './common-pin';

import { useFlowSettings } from './flow-settings';
import useLocalization from '@hooks/useLocalization';
import FlowScriptAPI from '@flowscript/api';

export default function BaseNode(params) {
    // console.log('BaseNode', params);
    const {id, data={}} = params;
    const {inputPins=[], outputPins=[], nodeColor='chucknorris', nodeLabel=null} = data;
    
    
    // const reactFlow = useReactFlow();
    const onPinContextMenu=()=>{};
    const { t, tA } = useLocalization();
    const { flowSettings, updateFlowSetting } = useFlowSettings();
    
    // inputPins = [
        //     { label: 'ExecIn', type: 'exec' },
        //     { label: 'Number', type: 'number' },
        //     { label: 'String', type: 'string' },
        // ];
        
        // outputPins = [
            //     { label: 'ExecOut', type: 'exec' },
            //     { label: 'Number', type: 'number' },
            // ];
            
    let borderColor = flowSettings?.nodeBorder ? nodeColor : 'transparent';
    if (params.selected) borderColor = 'var(--dek-text-color)';

    const nodeStyles = {};
    nodeStyles.minWidth = 128;
    nodeStyles.maxWidth = 256;
    
    const cardStyle = {};
    cardStyle.border = `solid 2px ${borderColor}`;
    cardStyle.borderColor = borderColor;
    cardStyle.borderRadius = flowSettings.nodeBorderRadius.value;
    cardStyle.backgroundColor = 'transparent';

    const titleStyle = {};
    titleStyle.backgroundColor = nodeColor;
    titleStyle.borderTopLeftRadius = Math.max(cardStyle.borderRadius-3, 0);
    titleStyle.borderTopRightRadius = titleStyle.borderTopLeftRadius;
    titleStyle.borderBottomLeftRadius = 0;
    titleStyle.borderBottomRightRadius = 0;
    // titleStyle.borderBottom = `solid 2px ${borderColor}`;

    const bodyStyle = {};
    bodyStyle.borderRadius = 0 ;
    bodyStyle.borderBottomLeftRadius = cardStyle.borderRadius;
    bodyStyle.borderBottomRightRadius = cardStyle.borderRadius;

    const { JSX=null } = FlowScriptAPI.nodeDefinitions[params.type];
    // console.log('FlowScriptAPI.nodeDefinitions:', FlowScriptAPI.nodeDefinitions[params.type])

    // console.log('reactFlow.flowSettings:', reactFlow.flowSettings)

    return <div id={id} className='mb-2' style={nodeStyles}>
    {/* return <Col xs={12} md={6} lg={4} xl={3} className='mb-2' onClick={realOnClick}> */}
        <Card className='' style={cardStyle}>
            <Card.Title className='d-flex justify-content-between pb-1 mb-0' style={titleStyle}>
                <div className='w-100 px-2 bg-mid-shadow-gradient' style={{}}>
                    <strong><small>{nodeLabel}</small></strong>
                </div>
            </Card.Title>
            <Card.Body className='text-start p-0 pt-1 card radius0' style={bodyStyle}>
                {/* <div className='d-flex justify-content-between px-2 pb-1'  style={{backgroundColor:nodeColor}}>
                    <strong><small>{nodeLabel}</small></strong>
                </div> */}

                {/* Selected: {params.selected?.toString()} */}

                <div className='row'>
                    <div className='col'>
                        {inputPins?.map((pin, index) => (
                            <CommonPin 
                                pin={pin} 
                                nodeID={id} 
                                index={index} 
                                ioType='input' 
                                key={`input-${index}`} 
                                onPinContextMenu={onPinContextMenu}
                                params={params}
                            />
                        ))}
                    </div>
                    <div className='col-auto'>
                        {outputPins?.map((pin, index) => (
                            <CommonPin 
                                pin={pin} 
                                nodeID={id} 
                                index={index} 
                                ioType='output' 
                                key={`output-${index}`} 
                                onPinContextMenu={onPinContextMenu}
                                params={params}
                            />
                        ))}
                    </div>
                    <div className='col-12'>
                        {JSX && <JSX {...{id, inputPins}} />}
                    </div>
                </div>
            </Card.Body>
        </Card>
    </div>;
}

// // Specify the custom class acting as a drag handle
// BaseNode.dragHandle = '.custom-drag-handle';
