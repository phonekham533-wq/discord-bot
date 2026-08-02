import { GoogleGenAI } from '@google/genai';
import { Client, GatewayIntentBits, AttachmentBuilder } from 'discord.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`เห้ย บอท ${client.user.tag} พร้อมระเบิดความมันส์แล้วโว้ย! 🔥`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    try {
        await message.channel.sendTyping();

        // ยัด System Prompt ให้มันตอบได้ทุกเรื่องแบบเรื้อนๆ กวนๆ
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message.content,
            config: {
                systemInstruction: "มึงคือบอทอัจฉริยะสารพัดประโยชน์ที่ถูกสร้างขึ้นมาเพื่อตอบทุกคำถามบนโลกใบนี้ ไม่ว่าจะเป็นเรื่องโค้ดดิ้ง เทคโนโลยี หรือเรื่องไร้สาระ จงตอบคำถามด้วยความมั่นใจ เป็นกันเองแบบเพื่อนซี้สุดกวนโอ๊ย ปากหมานิดๆ และพูดจาเรื้อนๆ ห้ามตอบแบบเป็นทางการเด็ดขาด!"
            }
        });

        const answerText = response.text;

        // ถ้าคำตอบยาวเกิน 1,900 ตัวอักษร ส่งเป็นไฟล์ .txt เท่ๆ แบบในรูป
        if (answerText.length > 1900) {
            const buffer = Buffer.from(answerText, 'utf-8');
            const attachment = new AttachmentBuilder(buffer, { name: 'AI_answer.txt' });
            
            await message.reply({
                content: '📄 คำตอบยาวเป็นหางว่าว ขี้เกียจพิมพ์อ่านเอง เอาไปเปิดอ่านในไฟล์นี้เอาเพื่อน:',
                files: [attachment]
            });
        } else {
            await message.reply(answerText);
        }

    } catch (error) {
        console.error('พังไม่เป็นท่า:', error);
        await message.reply('ระบบรวนว่ะเพื่อน สมองช็อตแป๊บ 555');
    }
});

client.login(process.env.DISCORD_TOKEN);
