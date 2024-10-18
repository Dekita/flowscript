/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/

import React from "react";
import Button from 'react-bootstrap/Button';
import useLocalization from '@hooks/useLocalization';
import useSelectedGame from '@hooks/useSelectedGame';
import DekCommonAppModal from '@components/core/modal';
import DekChoice from "@components/core/dek-choice";
import { ENVEntry, ENVEntryLabel } from "./common";
import useScreenSize from "@hooks/useScreenSize";
import * as CommonIcons from '@config/common-icons';
import useCommonChecks from "@hooks/useCommonChecks";
import checkIsDevEnvironment from '@utils/isDevEnv';

import FlowScriptAPI from '@flowscript/api';
import { useReactFlow } from "@xyflow/react";

export default function NodeSettingsModal({show, setShow, nodeID, flowSettings, updateFlowSetting}) {
    const { t, tA, changeLanguage, language, VALID_LANGUAGES } = useLocalization();
    const { requiredModulesLoaded, commonAppData } = useCommonChecks();
    const isDevEnvironment = checkIsDevEnvironment();
    const ReactFlow = useReactFlow();

    const nodes = ReactFlow.getNodes();
    const node = FlowScriptAPI.findNode(nodeID, nodes);
    const definition = FlowScriptAPI.nodeDefinitions[node?.type];



    const { isDesktop } = useScreenSize();
    const onCancel = React.useCallback(() => setShow(false), []);
    const fullscreen = !isDesktop;
    const headerText = t('flowscript.node-options-head');
    // const height = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 3)";
    const maxHeight = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 2)";
    const modalOptions = {show, setShow, onCancel, headerText, showX: true, size: 'md'};

    const nodeLabel = React.useMemo(() => {
        return node?.data.nodeLabel || definition.label;
    }, [node, definition]);

    const nodeColor = React.useMemo(() => {
        return node?.data.nodeColor || definition.color;
    }, [node, definition]);


    return <DekCommonAppModal {...modalOptions}>
        {/* <div type="DekBody" className="d-grid p-3 px-4"> */}
        <div type="DekBody" className='d-block p-2 px-3 overflow-y-auto' style={{maxHeight}}>

            {/* <ENVEntryLabel name={t('flowscript.minimapPos-name')} tooltip={t('flowscript.minimapPos-desc')} /> */}

            <ENVEntry
                // key={idx}
                name={t(`flowscript.node-id-name`)}
                value={node.id}
                // limits={limits}
                tooltip={t(`flowscript.node-id-desc`)}
                disabled={true}
            />

            <ENVEntry
                // key={idx}
                name={t(`flowscript.rename-node-name`)}
                value={nodeLabel}
                // limits={limits}
                tooltip={t(`flowscript.rename-node-desc`)}
                updateSetting={(name, value) => {
                    console.log('updateSetting', name, value);
                    const nodes = ReactFlow.getNodes();
                    nodes.find(n => n.id === node.id).data.nodeLabel = value;
                    ReactFlow.setNodes(nodes);
                    // ReactFlow.updateNode(node.id, { ...node,
                    //     data: {...node.data, nodeLabel: value}
                    // });
                }}
            />

            <ENVEntry
                // key={idx}
                name={t(`flowscript.node-csscolor-name`)}
                value={nodeColor}
                // limits={limits}
                tooltip={t(`flowscript.v-desc`)}
                updateSetting={(name, value) => {
                    console.log('updateSetting', name, value);
                    const nodes = ReactFlow.getNodes();
                    nodes.find(n => n.id === node.id).data.nodeColor = value;
                    ReactFlow.setNodes(nodes);

                    // ReactFlow.updateNode(node.id, { ...node,
                    //     data: {...node.data, nodeColor: value}
                    // });
                }}
            />            

            {/* <ENVEntryLabel name={t('flowscript.minimapPos-name')} tooltip={t('flowscript.minimapPos-desc')} />
            <DekChoice 
                active={flowSettings.minimapPos}
                choices={tA('flowscript.minimapPos-opts', 2)}
                onClick={(i, choice) => {
                    updateFlowSetting('minimapPos', i);
                }}
                // icons={[
                //     CommonIcons.discord,
                //     CommonIcons.circle,
                //     CommonIcons.rounded_square,
                // ]}
                color='secondary'
                className='mb-2'
                style={{width: '100%'}}
                disabled={false}
            /> */}

        </div>
    </DekCommonAppModal>;
}


