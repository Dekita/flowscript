import logExecutingNodeData from '@flowscript/utils/log-node';

export default class {
    static label = 'Speak With ChatGPT';
    static color = 'var(--dek-info-normal)';
    static category = 'GPT';
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
        await logExecutingNodeData(this, ...arguments);

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
