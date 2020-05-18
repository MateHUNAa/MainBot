const commands = require("discord.js-commando");
let prefix = "!";
class IgazHamisCommand extends commands.Command
{
    constructor(kliens)
    {
        super(kliens, {
            name: "ih",
            group: "parancsok",
            memberName: "igazhamis",
            description: "Ez egy igaz Hamis be írod !ih <kérdés> és a bot ad egy random választ"
        });
    }
        
    async run(message, args)
    {
        if (!message.content.startsWith(prefix)) return;
            
        var veletlen = [
            "Igaz",
            "Hamis",
            "Talán"
        ];

        if (args[1], message.channel.send(veletlen[Math.floor(Math.random() * veletlen.length)] + " " + message.author.toString()));
        else message.channel.send("használat !ih (kérdés) a bottol random választ fogsz kapni")
        return;
    }
}

module.exports = IgazHamisCommand;