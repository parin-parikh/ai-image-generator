const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // Use the environment variable correctly
});

module.exports = openai;
