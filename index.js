const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.DISCORD_TOKEN || !process.env.GEMINI_API_KEY) {
    console.error("ไอ้เหี้ย! ลืมใส่ Token หรือ API Key ใน Railway!");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({ model: 'gemini-pro' });

client.once('ready', () => {
    console.log(`ไอ้เหี้ย! บอท ${client.user.tag} ออนไลน์และพร้อมป่วนแล้วโว้ย! 🚀`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    try {
        await message.channel.sendTyping();
        const result = await model.generateContent(message.content);
        const response = await result.response;
        await message.reply(response.text());
    } catch (error) {
        console.error("Error Handling:", error);
        await message.reply("ระบบรวนว่ะเพื่อน สมองช็อตแป๊บ 555");
    }
});

client.login(process.env.DISCORD_TOKEN);
