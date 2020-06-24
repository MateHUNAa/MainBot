const Discord = require('discord.js');
exports.run = async (kliens, message, args, prefix, moment) =>
{   
    
    // if (message.author.id != '575342593630797825') return message.channel.send('Nincs jogosultásgod a használatára!: ' + message.author.toString())
        
    const channel = message.channel;   
    const kuldo = message.author.username;
    const server = message.guild;

    server.createRole({name: `${kuldo}`, color: 'RANDOM'}).then(r => {
        let mem = server.roles.find(r => r.name === `${kuldo}`)
        message.member.addRole(mem).catch(console.error)})
};