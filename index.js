const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.includes('สวัสดี')) {
        try {
            await message.reply('ว่าไงเพื่อน!');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการตอบข้อความ: ', error);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
