

import { FS_DataNode, FS_EventNode, FS_ExecutionNode, FS_LogicNode } from "./basecore";
import BSImage from 'react-bootstrap/Image';
// import React from 'react';


// const image_cache = {};
const createImageID = nodeid => `create-image-preview-${nodeid}`;

// base class used for all JSON nodes
class imageBaseNode extends FS_DataNode {
    static category = 'IMAGE';
    static inputPins = [
        { label: 'ImageIn', type: 'object' },
    ];
    static outputPins = [
        { label: 'ImageOut', type: 'object' },
    ];
    static JSX({id}) {
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

class imageOperationNode extends imageBaseNode {
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'ImageIn', type: 'object' },
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'ImageOut', type: 'object' },
    ];
}

export class createImage extends imageBaseNode {
    static priority = 9;
    static label = 'Create Image';
    static description = 'Create an image from URL or Base64 String';
    static inputPins = [
        { label: 'ImageURL', type: 'string', default: '' },
    ];
    static async execution({id, inputValues}) {
        const image_id = createImageID(id);
        const image = document.getElementById(image_id) || new Image();
        image.src = inputValues?.ImageURL;
        return image;
    }
}
