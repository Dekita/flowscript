
import { FS_DataNode } from "./basecore";
import BSImage from 'react-bootstrap/Image';
// import React from 'react';


// const image_cache = {};
const createImageID = nodeid => `create-image-preview-${nodeid}`;

// base class used for all JSON nodes
class imageBaseNode {
    static color = 'var(--dek-success-normal)';
    static category = 'IMAGE';
    static description = 'IMAGE operation';
    static inputPins = [
        { label: 'ImageIn', type: 'object' },
    ];
    static outputPins = [
        { label: 'ImageOut', type: 'object' },
    ];
    static async execution({inputValues}) {
        return null;
    }
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
    static label = 'Create Image';
    static description = 'Create an image from URL or Base64 String';
    static inputPins = [
        { label: 'ImageURL', type: 'string', default: '' },
    ];
    // literal node cannot trigger next node via triggerNextNode
    // also: should return the direct data to be passed to the next node
    static async execution({id, inputValues}) {
        const image_id = createImageID(id);
        const image = document.getElementById(image_id) || new Image();
        image.src = inputValues?.ImageURL;
        return image;
    }
}

// export class resizeImage extends imageOperationNode {
//     static label = 'Resize Image';
//     static description = 'Resize an image';
//     static inputPins = [
//         { label: 'ExecIn', type: 'exec' },
//         { label: 'ImageIn', type: 'object' },
//         { label: 'Width', type: 'number', default: 420 },
//         { label: 'Height', type: 'number', default: 180 },
//     ];
//     // literal node cannot trigger next node via triggerNextNode
//     // also: should return the direct data to be passed to the next node
//     static async execution({id, inputValues, setOutputValue, triggerNextNode}) {
//         await logExecutingNodeData(this, ...arguments);

//         const image_id = createImageID(id);
//         const image = document.getElementById(image_id) || new Image();
//         image.width = inputValues?.Width;
//         image.height = inputValues?.Height;
//         // return image;
//         setOutputValue('ImageOut', image);
//         await triggerNextNode('ExecOut');        
//     }
// }

// export class cropImage extends imageOperationNode {
//     static label = 'Crop Image';
//     static description = 'Crop an image';
//     static inputPins = [
//         { label: 'ExecIn', type: 'exec' },
//         { label: 'ImageIn', type: 'object' },
//         { label: 'X', type: 'number', default: 0 },
//         { label: 'Y', type: 'number', default: 0 },
//         { label: 'Width', type: 'number', default: 420 },
//         { label: 'Height', type: 'number', default: 180 },
//     ];
//     // literal node cannot trigger next node via triggerNextNode
//     // also: should return the direct data to be passed to the next node
//     static async execution({id, inputValues, setOutputValue, triggerNextNode}) {
//         await logExecutingNodeData(this, ...arguments);

//         const image_id = createImageID(id);
//         const image = document.getElementById(image_id) || new Image();
//         image.width = inputValues?.Width;
//         image.height = inputValues?.Height;
//         // return image;
//         setOutputValue('ImageOut', image);
//         await triggerNextNode('ExecOut');        
//     }
// }

// export class rotateImage extends imageOperationNode {
//     static label = 'Rotate Image';
//     static description = 'Rotate an image';
//     static inputPins = [
//         { label: 'ExecIn', type: 'exec' },
//         { label: 'ImageIn', type: 'object' },
//         { label: 'Angle', type: 'number', default: 90 },
//     ];
//     // literal node cannot trigger next node via triggerNextNode
//     // also: should return the direct data to be passed to the next node
//     static async execution({id, inputValues, setOutputValue, triggerNextNode}) {
//         await logExecutingNodeData(this, ...arguments);

//         const image_id = createImageID(id);
//         const image = document.getElementById(image_id) || new Image();
//         image.style.transform = `rotate(${inputValues?.Angle}deg)`;
//         // return image;
//         setOutputValue('ImageOut', image);
//         await triggerNextNode('ExecOut');        
//     }
// }

// export class flipImage extends imageOperationNode {
//     static label = 'Flip Image';
//     static description = 'Flip an image';
//     static inputPins = [
//         { label: 'ExecIn', type: 'exec' },
//         { label: 'ImageIn', type: 'object' },
//         { label: 'Horizontal', type: 'boolean', default: false },
//         { label: 'Vertical', type: 'boolean', default: false },
//     ];
//     // literal node cannot trigger next node via triggerNextNode
//     // also: should return the direct data to be passed to the next node
//     static async execution({id, inputValues, setOutputValue, triggerNextNode}) {
//         await logExecutingNodeData(this, ...arguments);

//         const image_id = createImageID(id);
//         const image = document.getElementById(image_id) || new Image();
//         image.style.transform = `scale(${inputValues?.Horizontal ? -1 : 1}, ${inputValues?.Vertical ? -1 : 1})`;
//         // return image;

//         setOutputValue('ImageOut', image);
//         await triggerNextNode('ExecOut');        
//     }
// }