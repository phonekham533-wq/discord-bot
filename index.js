const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const genai = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genai.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: "มึงคือบอทอัจฉริยะสารพัดประโยชน์ ปากหมานิดๆ กวนโอ๊ยแบบเพื่อนซี้ ห้ามพูดจาทางการเด็ดขาด!"
});

client.once('ready', () => {
    console.log(`[JARVIS System]: Logged in successfully as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    try {
        await message.channel.sendTyping();

        const prompt = message.content;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (text.length > 2000) {
            const chunks = text.match(/[\s\S]{1,2000}/g);
            for (const chunk of chunks) {
                await message.reply(chunk);
            }
        } else {
            await message.reply(text);
        }

    } catch (error) {
        console.error('[Error Handling]: เกิดข้อผิดพลาด:', error);
        await message.reply('ระบบรวนว่ะเพื่อน สมองช็อตแป๊บ 555');
    }
});

client.login(DISCORD_TOKEN);
