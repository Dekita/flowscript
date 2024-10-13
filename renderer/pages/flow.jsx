/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/
import React from 'react';
import { Flow } from '@flowscript/ui/flow-script';
import { FlowSettingsProvider } from '@flowscript/ui/flow-settings';

export default function ActualFlowScript() {
    return <FlowSettingsProvider>
        <Flow />
    </FlowSettingsProvider>
}