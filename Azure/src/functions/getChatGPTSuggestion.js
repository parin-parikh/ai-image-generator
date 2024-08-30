const { app } = require('@azure/functions');
const openai = require('../../lib/openai');

app.http('getChatGPTSuggestion', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are an assistant that generates prompts for DALL·E.' },
            { role: 'user', content: 'Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.' }
        ],
        max_tokens: 100,
        temperature: 0.9, 
    });

    context.log(`Http function processed request for url "${request.url}"`);

    const responseText = response.choices[0].message.content;

    return { body: responseText };
  },
});
