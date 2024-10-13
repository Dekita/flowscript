import React from 'react';

import { Handle, Position, useReactFlow, useHandleConnections } from '@xyflow/react';

import { ENVEntry, ENVEntryLabel } from '@components/modals/common';
import useLocalization from '@hooks/useLocalization';

import {pinTypeColors} from '../utils/color-map';

const roundPinStyle = {
    borderRadius: '50%',
    width: '12px',
    height: '12px',
};




const variablePinStyle = (pinType) => ({
    backgroundColor: pinTypeColors[pinType],
    ...roundPinStyle,
});
  

export default function CommonPin({nodeID, pin, ioType, index, onPinContextMenu}) {
    const id = `node-${nodeID}-${ioType}-${index}-${pin.type}`;
    const pinStyles = { marginBottom: '4px', position: 'relative' };
    const pinStyleL = { ...pinStyles, textAlign: 'left' };
    const pinStyleR = { ...pinStyles, textAlign: 'right' };
    const isInput = ioType === 'input';
    const pinStyle = isInput ? pinStyleL : pinStyleR;

    const spanStyles = { color: '#E0E4E8', fontSize: '12px' };
    const spanStyleL = { ...spanStyles, marginLeft: '15px' };
    const spanStyleR = { ...spanStyles, marginRight: '15px' };
    const spanStyle = isInput ? spanStyleL : spanStyleR;

    const pinPosition = isInput ? Position.Left : Position.Right;

    // const [pinValue, setPinValue] = React.useState(pin.value ?? pin.default ?? '');
    // const [pinConnected, setPinConnected] = React.useState(false);
    const { t, tA } = useLocalization();
    const reactFlow = useReactFlow();

    // used to determine if the pin is connected & hide/show the value input
    const connections = useHandleConnections({type: 'target', id});
    const pinConnected = connections.length > 0;

    // used to update the main flow when pin value changes. 
    const onUpdatePinValue = React.useCallback((name, newval) => {
        const node = reactFlow.getNode(nodeID);
        reactFlow.updateNode(nodeID, {
            data: {
                ...node.data,
                inputPins: node.data.inputPins.map((p, i) => {
                    if (i === index) return { ...p, value: newval };
                    return p;
                }),
            },
        });
        // setPinConnected(reactFlow.getEdges().find(e => e.source === id) !== undefined);
    }, [reactFlow]);

    const pinHasValue = isInput && pin.type !== 'exec';

    // const pinHasConnection = isInput && params?.data?.connections?.some(c => c.target === id);

    return <div className='px-1' style={pinStyle}>
        <Handle
            id={id}
            type={ioType === 'input' ? 'target' : 'source'}
            position={pinPosition}
            style={variablePinStyle(pin.type)}
            onContextMenu={(event) => onPinContextMenu(event, id)}
        />
        <span style={spanStyle}>{pin.label}</span>
        {pinHasValue && !pinConnected && <ENVEntry
            value={pin.value ?? pin.default ?? ''}
            // onClick={onClickPathInput}
            updateSetting={onUpdatePinValue}
            name={t(`pins.labels.${pin.label}`)}
            tooltip={t(`pins.tooltips.${pin.label}`)}
            noLabel={true}
        />}
    </div>

}