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
import { ENVEntry } from "./common";
import useScreenSize from "@hooks/useScreenSize";

export default function FlowSettingsModal({show,setShow, flowSettings, updateFlowSetting}) {
    const onCancel = React.useCallback(() => setShow(false), []);
    const { isDesktop } = useScreenSize();
    const { t, tA } = useLocalization();
    const fullscreen = !isDesktop;
    const headerText = t('modals.flow-settings.head');
    // const height = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 3)";
    const maxHeight = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 2)";
    const modalOptions = {show, setShow, onCancel, headerText, showX: true};
    return <DekCommonAppModal {...modalOptions}>
        {/* <div type="DekBody" className="d-grid p-3 px-4"> */}
        <div type="DekBody" className='d-block p-2 px-3 overflow-y-auto' style={{maxHeight}}>
            {flowSettings && Object.keys(flowSettings).map((key, idx) => {
                const value = flowSettings[key]?.value ?? flowSettings[key];
                let limits = null;
                if (flowSettings[key].value !== undefined) {
                    limits = flowSettings[key];
                }
                return <ENVEntry
                    key={idx}
                    name={key}
                    value={value}
                    limits={limits}
                    tooltip={t(`General.${key}.desc`)}
                    updateSetting={(name, value) => {
                        if (limits) updateFlowSetting(name, {...limits, value});
                        else updateFlowSetting(name, value);
                    }}
                />
            })}
        </div>
        {/* <div type="DekFoot" className='d-flex w-100 gap-3'>
            <Button
                variant='danger'
                className='col p-2 px-3'
                disabled={false}
                onClick={onCancel}>
                <strong>{t('common.cancel')}</strong>
            </Button>
            <Button
                variant='success'
                className='col p-2 px-3'
                disabled={false}
                onClick={onClickPlayVanillaPalworld}>
                <strong>{t('common.confirm')}</strong>
            </Button>
        </div> */}
    </DekCommonAppModal>;
}
