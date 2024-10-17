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

    const spanStyles = { color: '#E0E4E8', fontSize: '0.75rem', lineHeight: '.75rem' };
    const spanStyleL = { ...spanStyles, marginLeft: '.25rem' };
    const spanStyleR = { ...spanStyles, marginRight: '.25rem' };
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

    return <div className='d-flex px-1' style={pinStyle}>
        <div className=''>
            <Handle
                id={id}
                type={ioType === 'input' ? 'target' : 'source'}
                position={pinPosition}
                style={variablePinStyle(pin.type)}
                onContextMenu={(event) => onPinContextMenu(event, id)}
            />
            <span className='' style={spanStyle}>{pin.label}</span>
        </div>
        {pinHasValue && !pinConnected && <ENVEntry
            value={pin.value ?? pin.default ?? ''}
            // onClick={onClickPathInput}
            updateSetting={onUpdatePinValue}
            name={t(`pins.labels.${pin.label}`)}
            tooltip={t(`pins.tooltips.${pin.label}`)}
            noLabel={true}
            skinny={true}
        />}
    </div>

}