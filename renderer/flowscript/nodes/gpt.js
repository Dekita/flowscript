
import { FS_DataNode } from "./basecore";

// base class used for all JSON nodes
class GPTBaseNode {
    static color = 'var(--dek-success-normal)';
    static category = 'GPT';
    static description = 'GPT operation';
    static inputPins = [];
    static outputPins = [];
    static async execution({inputValues}) {
        return null;
    }
}

export class speakWithGPT extends GPTBaseNode {
    static label = 'Speak With ChatGPT';
    static description = 'Speak with oneof OpenAI\'s ChatGPT models';
    static inputPins = [
        { label: 'ExecIn', type: 'exec' },
        { label: 'API Key', type: 'string', default: '' }, // API Key for ChatGPT
        { label: 'Model', type: 'string', default: 'gpt-4' }, // Model for ChatGPT
        { label: 'Message', type: 'string', default: '' }, // Input message for ChatGPT
    ];
    static outputPins = [
        { label: 'ExecOut', type: 'exec' },
        { label: 'Success', type: 'boolean' },
        { label: 'Response', type: 'string' }, // ChatGPT's response
    ];
    static async execution({ inputValues, setOutputValue, triggerNextNode }) {
        const apiKey = inputValues['API Key'] ?? '';
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const messagePrompt = {
            model: inputValues.Model ?? 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: inputValues.Message }],
            max_tokens: 100,
        };

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(messagePrompt),
            });

            const data = await res.json();
            // Store ChatGPT's response in the output pin
            setOutputValue('Response', data.choices[0].message.content);
            setOutputValue('Success', true);
        } catch (error) {
            setOutputValue('Response', error.message);
            setOutputValue('Success', false);
        }

        // Call the next connected node based on the exec pin label
        await triggerNextNode('ExecOut');
    }
}

export class dalleGenerateImageGPT extends GPTBaseNode {
    static label = 'Generate Image with DALL-E';
    static description = 'Generate an image using OpenAI\'s DALL-E model';
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
