
import logExecutingNodeData from '@flowscript/utils/log-node';
import BSImage from 'react-bootstrap/Image';
import React from 'react';

// const image_cache = {};
const createImageID = nodeid => `create-image-preview-${nodeid}`;

export default class {
    static label = 'Create Image';
    static color = 'var(--dek-success-normal)';
    static category = 'IMAGE';
    static inputPins = [
        { label: 'ImageURL', type: 'string', default: '' },
    ];
    static outputPins = [
        { label: 'ImageObject', type: 'object' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({id, inputValues}) {
        await logExecutingNodeData(this, ...arguments);

        const image_id = createImageID(id);
        const image = document.getElementById(image_id) || new Image();
        image.src = inputValues?.ImageURL;
        return image;

    }
    static JSX = ({id}) => {
        const image_id = createImageID(id);
        return <BSImage 
            src="https://placehold.co/420x180?text=Image+Preview"
            id={image_id} 
            alt="Image" 
            thumbnail 
            fluid 
        />
    }
}