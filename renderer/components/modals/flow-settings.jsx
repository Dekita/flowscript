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

export default function FlowSettingsModal({show,setShow, flowSettings, updateFlowSetting}) {
    const { t, tA, changeLanguage, language, VALID_LANGUAGES } = useLocalization();
    const { requiredModulesLoaded, commonAppData } = useCommonChecks();
    const isDevEnvironment = checkIsDevEnvironment();

    const { isDesktop } = useScreenSize();
    const onCancel = React.useCallback(() => setShow(false), []);
    const fullscreen = !isDesktop;
    const headerText = t('flowscript.settings-head');
    // const height = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 3)";
    const maxHeight = fullscreen ? "calc(100vh - 96px)" : "calc(100vh / 4 * 2)";
    const modalOptions = {show, setShow, onCancel, headerText, showX: true};
    return <DekCommonAppModal {...modalOptions}>
        {/* <div type="DekBody" className="d-grid p-3 px-4"> */}
        <div type="DekBody" className='d-block p-2 px-3 overflow-y-auto' style={{maxHeight}}>
            {flowSettings && Object.keys(flowSettings).map((key, idx) => {
                if (key === 'minimapPos') return null;
                const value = flowSettings[key]?.value ?? flowSettings[key];
                let limits = null;
                if (flowSettings[key].value !== undefined) {
                    limits = flowSettings[key];
                }
                return <ENVEntry
                    key={idx}
                    name={t(`flowscript.${key}-name`)}
                    value={value}
                    limits={limits}
                    tooltip={t(`flowscript.${key}-desc`)}
                    updateSetting={(name, value) => {
                        if (limits) updateFlowSetting(key, {...limits, value});
                        else updateFlowSetting(key, value);
                    }}
                />
            })}

            <ENVEntryLabel name={t('flowscript.minimapPos-name')} tooltip={t('flowscript.minimapPos-desc')} />
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
            />

            {isDevEnvironment && <React.Fragment>
                <ENVEntryLabel
                    name={t('/settings.options.language.name')}
                    tooltip={t('/settings.options.language.desc')}
                />
                <DekChoice
                    className="pb-3"
                    choices={VALID_LANGUAGES}
                    active={VALID_LANGUAGES.indexOf(language)}
                    onClick={(i, value) => changeLanguage(value)}
                />
            </React.Fragment>}
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





function SettingsPage_ApplicationCustomize() {
    const { t } = useLocalization();
    const { requiredModulesLoaded } = useCommonChecks();

    // app options implemented by DEAP <3
    const [settings, setSettings] = React.useState({
        'auto-boot': false,
        'auto-play': false,
        'auto-tiny': false,
        'tiny-tray': false,
    });
    const updateConfig = React.useCallback(async (key, value) => {
        if (!requiredModulesLoaded) return;
        console.log('updating config', key, value);
        await window.ipc.invoke('set-config', key, value);
        setSettings((current) => ({ ...current, [key]: value }));
    }, [requiredModulesLoaded]);

   // load initial settings from store
   React.useEffect(() => {
        if (!requiredModulesLoaded) return;
        (async () => { setSettings({
            'auto-boot': await window.uStore.get('auto-boot', false),
            'auto-play': await window.uStore.get('auto-play', false),
            'auto-tiny': await window.uStore.get('auto-tiny', false),
            'tiny-tray': await window.uStore.get('tiny-tray', false),
        })})();
    }, [requiredModulesLoaded]);

    return <React.Fragment>
        <div className="row mb-2">
            <div className="col-12 col-lg-4">
                <ENVEntry
                    value={settings['auto-boot']}
                    updateSetting={(n, v) => updateConfig('auto-boot', v)}
                    name={t('/settings.options.auto-boot.name')}
                    tooltip={t('/settings.options.auto-boot.desc')}
                />
            </div>
            <div className="col-12 col-lg-4">
                <ENVEntry
                    value={settings['auto-tiny']}
                    updateSetting={(n, v) => updateConfig('auto-tiny', v)}
                    name={t('/settings.options.auto-tiny.name')}
                    tooltip={t('/settings.options.auto-tiny.desc')}
                />
            </div>
            <div className="col-12 col-lg-4">
                <ENVEntry
                    value={settings['tiny-tray']}
                    updateSetting={(n, v) => updateConfig('tiny-tray', v)}
                    name={t('/settings.options.tiny-tray.name')}
                    tooltip={t('/settings.options.tiny-tray.desc')}
                />
            </div>
        </div>
    </React.Fragment>;
}

function SettingsPage_Theme({ThemeController}) {
    const { requiredModulesLoaded, commonAppData } = useCommonChecks();
    const game_id = commonAppData?.selectedGame?.id;
    const { t, tA } = useLocalization();

    if (!requiredModulesLoaded) return null;
    return <React.Fragment>
        <ENVEntryLabel
            name={t('/settings.options.theme-color.name')}
            tooltip={t('/settings.options.theme-color.desc')}
        />
        <DekChoice
            className="pb-3 mt-1"
            choices={ThemeController.themes}
            active={ThemeController.theme_id}
            onClick={(i, value) => ThemeController.setThemeID(value)}
        />
        <ENVEntryLabel
            name={t('/settings.options.theme-image.name')}
            tooltip={t('/settings.options.theme-image.desc')}
        />
        <DekChoice
            className="pb-3"
            disabled={false}
            active={ThemeController.bg_id}
            choices={tA(`games.${game_id}.theme-images`)}
            onClick={(i, value) => ThemeController.setBgID(i)}
        />        
    </React.Fragment>
}
