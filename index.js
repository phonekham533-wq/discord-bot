const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ตรวจสอบการตั้งค่า API Key และ Token
if (!process.env.DISCORD_TOKEN || !process.env.GEMINI_API_KEY) {
    console.error("ไอ้เหี้ย! ลืมใส่ DISCORD_TOKEN หรือ GEMINI_API_KEY ใน Environment Variables ของ Railway เปล่าวะ ไปเช็คด่วน!");
    process.exit(1);
}

// ตั้งค่าบอท Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// ตั้งค่า Gemini AI (ใช้ gemini-1.5-flash ตัวล่าสุด)
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: "มึงคือบอทอัจฉริยะสารพัดประโยชน์ ปากหมานิดๆ กวนโอ๊ยแบบเพื่อนซี้ ห้ามพูดจาทางการเด็ดขาด!"
});

client.once('ready', () => {
    console.log(`ไอ้เหี้ย! บอท ${client.user.tag} ออนไลน์และพร้อมป่วนแล้วโว้ย! 🚀`);
});

client.on('messageCreate', async (message) => {
    // ถ้าข้อความมาจากบอทด้วยกันเอง ให้ข้าม
    if (message.author.bot) return;

    try {
        // แสดงสถานะกำลังพิมพ์
        await message.channel.sendTyping();

        // ส่งข้อความไปถาม Gemini
        const prompt = message.content;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // ส่งคำตอบกลับไปที่ Discord
        await message.reply(text);

    } catch (error) {
        console.error("Error Handling:", error);
        await message.reply("ระบบรวนว่ะเพื่อน สมองช็อตแป๊บ 555");
    }
});

// ล็อกอินเข้าสู่ระบบ Discord
client.login(process.env.DISCORD_TOKEN);
