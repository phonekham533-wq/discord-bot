import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client, GatewayIntentBits, AttachmentBuilder } from 'discord.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: "มึงคือบอทอัจฉริยะสารพัดประโยชน์ที่ถูกสร้างขึ้นมาเพื่อตอบทุกคำถามบนโลกใบนี้ ไม่ว่าจะเป็นเรื่องโค้ดดิ้ง เทคโนโลยี หรือเรื่องไร้สาระ จงตอบคำถามด้วยความมั่นใจ เป็นกันเองแบบเพื่อนซี้สุดกวนโอ๊ย ปากหมานิดๆ และพูดจาเรื้อนๆ ห้ามตอบแบบเป็นทางการเด็ดขาด!"
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`ล็อกอินเข้ามาในร่าง ${client.user.tag} เรียบร้อย!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    try {
        await message.channel.sendTyping();

        const result = await model.generateContent(message.content);
        const answerText = result.response.text();

        if (answerTextจ
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
