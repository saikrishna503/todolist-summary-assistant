const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.summarizeAndSend = async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos.length) {
      return res.status(400).json({ error: 'No todos to summarize' });
    }

    const todoText = todos.map((t, index) => `${index + 1}. ${t.todo}`).join('\n');
    const prompt = `Summarize the following tasks clearly and concisely:\n${todoText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = completion.choices[0].message.content;

    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *Todo Summary:*\n${summary}`,
    });

    res.status(200).json({ message: 'Summary sent to Slack successfully' });
  } catch (error) {
    console.error('Error in summarizeAndSend:', error.message);
    res.status(500).json({ error: 'Failed to summarize and send to Slack' });
  }
};
