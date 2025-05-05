const { default: ollama } = require('ollama');

async function runChat() {
  try {
    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [{ role: 'user', content: "Give a one word answer for the origin of the name Francine" }],
    });
    console.log(response.message.content.replace(".",""));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

runChat();