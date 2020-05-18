const commands = require("discord.js-commando");
let prefix = "!";
class igenNemCommand extends commands.Command
{
    constructor(kliens)
    {
        super(kliens, {
            name: "in",
            group: "parancsok",
            memberName: "igennem",
            description: "Ez egy Igen NEm  be írod !in <kérdés> és a bot ad egy random választ"
        });
    }
        
    async run(message, args)
    {
        if (!message.content.startsWith(prefix)) return;
            
        var veletlen = [
            "Igen",
            "Nem",
            "Talán"
        ];

        if (args[1], message.channel.send(veletlen[Math.floor(Math.random() * veletlen.length)] + " " + message.author.toString()));
        else message.channel.send("használat !in (kérdés) a bottol random választ fogsz kapni")
        return;
    }
}

module.exports = igenNemCommand;