import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Generate Image with DALL-E';
    static color = 'var(--dek-info-normal)';
    static category = 'GPT';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'API Key', type: 'string', default: '' }, // API Key for DALL-E
        { label: 'Prompt', type: 'string', default: '' }, // Input prompt for DALL-E image generation
        { label: 'ImageSize', type: 'string', default: '1024x1024' }, // Image size: 256x256, 512x512, or 1024x1024
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'ImageURL', type: 'string' }, // DALL-E generated image URL
    ];

    static async execution({ inputValues, setOutputValue, triggerNextNode }) {
        await logExecutingNodeData(this, ...arguments);

        const apiKey = inputValues['API Key'] ?? '';
        const apiUrl = 'https://api.openai.com/v1/images/generations';

        const imagePrompt = {
            prompt: inputValues.Prompt, // The prompt for DALL-E to generate an image
            n: 1, // Number of images to generate
            size: inputValues.ImageSize ?? '1024x1024', // Default to 1024x1024 if not provided
        };

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(imagePrompt),
            });

            const data = await res.json();
            // Store the generated image URL in the output pin
            setOutputValue('ImageURL', data.data[0].url);
            setOutputValue('Success', true);
        } catch (error) {
            setOutputValue('ImageURL', error.message);
            setOutputValue('Success', false);
        }

        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}
