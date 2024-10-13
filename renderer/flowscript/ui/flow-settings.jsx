
import React from 'react';

const initialSettings = {
    gridSnap: true,
    gridSize: {value: 20, min: 8, max: 64, step: 2},
    nodeBorder: true, 
    nodeBorderRadius: {value: 0, min: 0, max: 20, step: 1},
}

const FlowSettingsContext = React.createContext();

// FlowSettings Provider component
export const FlowSettingsProvider = ({ children }) => {
    const [flowSettings, setFlowSettings] = React.useState(initialSettings);
    const updateFlowSetting = React.useCallback((key, value) => {
        setFlowSettings(data => ({ ...data, [key]: value }));
    }, [setFlowSettings]);

    const exposed = { flowSettings, updateFlowSetting };
    return <FlowSettingsContext.Provider value={exposed}>
        {children}
    </FlowSettingsContext.Provider>;
};

// Export actual hook to useLocalization
export function useFlowSettings() {
    return React.useContext(FlowSettingsContext);
}
