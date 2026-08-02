const { Client, GatewayIntentBits } = require('discord.js');

// สร้าง Client พร้อม Intent ที่จำเป็นสำหรับการอ่านและตอบข้อความ
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

// ดักจับข้อความที่ถูกส่งเข้ามาในเซิร์ฟเวอร์
client.on('messageCreate', async (message) => {
    // ป้องกันไม่ให้บอทตอบกลับข้อความของตัวเอง (กันลูปนรก)
    if (message.author.bot) return;

    // ตัวอย่าง: ถ้าพิมพ์ว่า "สวัสดี" ให้บอทตอบว่า "ว่าไงเพื่อน!"
    if (message.content === 'สวัสดี') {
        try {
            await message.reply('ว่าไงเพื่อน!');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการตอบกลับข้อความ:', error);
        }
    }
});

// เชื่อมต่อบอทเข้ากับ Discord โดยดึง Token จาก Railway
client.login(process.env.DISCORD_TOKEN);
