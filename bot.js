const commando = require('discord.js-commando');
const discord = require('discord.js');
const szinek = require('./colours.json')
const emo = require("./emoji.json")
const moment = require('moment')
var kliens = new commando.Client ({
    owner: '393380978766381061',
    disabledEvryone: true,
    commandPrefix: '!',
    invite: 'https://discord.gg/wUXP5UX',
    unknownCommandResponse: false
});

//registry
kliens.registry.registerGroup("parancsok", "Parancsok");
kliens.registry.registerDefaults();
//kliens.registry.registerGroups();
kliens.registry.registerCommandsIn(__dirname + "/commands");
//registry vége 

//Mennyi az idő -----------------------
moment.locale("hu")
kliens.on("message", message => {
  if (message.content.toLowerCase() === prefix + 'time?') {
    const sTime = new discord.RichEmbed()
    .setTitle(moment().format('YYYY, MMMM, hh:mm:ss'))
    .addField("Pontos idő?:", "Év: " + moment().format("YYYY") + "\n" + "Hónap: " + moment().format("MMMM") + "\n" + moment().format("hh:mm:ss") )
    .addField("Nap vegéig még: ", moment().endOf('day').fromNow())
    .addField("Minden egyben ??? ", moment().format('LLLL'))
    message.channel.send(sTime)
  }
})

//mennyi az idő Vége -------------------------


// -------------------------##########userinfo##########------------------------------- \\

kliens.on("message", message => {
  if (message.content.toLowerCase() === prefix + "userinfo") {
    const uembed = new discord.RichEmbed()
    .setColor(szinek.világos_kék)
    .setTitle("User Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username} Info: `, message.author.displayAvatarURL)
    .addField("**UserName:**", `${message.author.username}`, true)
    .addField("**#ID:**", `${message.author.discriminator}`, true)
    .addField("**DevID:**", `${message.author.id}`, true)
    .addField("**SztátUsZ:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${moment(message.author.createdAt).format('YYYY, MMMM, hh:mm:ss')}`, true)
    .setFooter(`${kliens.user.username} | Creator: !/Mééz\!MateHUN!/Mééz\!`, kliens.user.displayAvatarURL);
    message.channel.send({embed: uembed});
  }
})

// -------------------------##########userinfo##########------------------------------- \\

// -------------------------##########Report##########------------------------------- \\

kliens.on("message", async message => {
  if(message.author.kliens) return;
  if(message.channel.type === 'dm') return;
  
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1);

  if (cmd === `${prefix}report`) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channelsend("Nem talált felhasználó!");
    let reson = args.join(" ").slice(22);

    let reportEmbed = new discord.RichEmbed()
    .setDescription("Reports")
    .setColor(szinek.világos_piros)
    .addField('Reportólt user ', `${rUser} ID: ${rUser.id}`)
    .addField('reportot küldte: ', `${message.author} ID: ${rUser.id}`)
    .addField('Time: ', moment().format('YYYY, MMMM, hh:mm:ss'))
    .addField('Indok: ', reson)
    let repch = message.guild.channels.find(channel => channel.name === 'reportlog')
    message.channel.send("Reportodat el küldtük!")
    repch.send(reportEmbed)
    return;
  }
})

// -----------------------------##########Report#########--------------------------------- \\


//Chat Moderation -----------------------------------------------------
kliens.on("message", message => {
    if (message.author.bot) return;
    if (message.author.id === "674997482609967116") return;

    let szavak = ["discord.gg/", "kurva", "kurva anyád", "gyökér", "cigány", "geci", "bazdmeg", "kutya", "anyád", "balfasz", "baszott", "bazd", "fuck", "mother", "shit", "motherfucker", "fasz", "pina", "te retkes idota", "idiota", "faszopó", "köcsög", "bolond", "buzi", "nyomorék", "nyomorék", "bazd", "bazdmeg", "basz", "baszadék", "nyomo", "anyukád", "maradvány", "Kulák", "picsa"]
    let talalt = false;
    for (var a in szavak) {
         if (message.content.toLowerCase().includes(szavak[a].toLowerCase())) talalt = true;
    }
    if (talalt) {
    message.delete();
    let time = new Date();
    console.log("Csunya szót írtXD :: "+message.author.tag + "\n" + moment().format('LLLL'));
    message.author.send(`Na szasz tesóm Tudod te, hogy mit írtál ? Ne beszélj mán csunyán naaa Köszi puszi`);
    }
});

//Chat Moderation vége ---------------------------------------------------


//Clear Chat -------------------------------------------------------------------
kliens.on("message", message => {
    let kuldo = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    if (message.content.startsWith(prefix + "cc")) {

        async function purge() {
            message.delete();
            if (!message.member.roles.find("name", "Mééz")) {
                message.channel.send("Nincs jogosultságod a használatához! :)))" + kuldo.toString());
                return;
            }
            if (isNaN(args[0])) {
                message.channel.send('Kérlek adj meg egy számot \n Használat :: !cc Szám');
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + 'Üzenet találva, törlés');

            message.channel.bulkDelete(fetched)
            .catch(error => console.log(`Error: ${error}`));
        }
        purge();
        message.channel.send("")
    }
});

//Clear Chat vége -----------------------------------------

kliens.on("message", message => {
    if (message.content.toLowerCase() === prefix + 'parancsok') {
      const embed = new discord.RichEmbed()
        .setThumbnail("https://i.pinimg.com/originals/38/08/b4/3808b458f7a0cd3ab88f6c653b290b61.gif ")
        .setTitle('Parancs lista :')
        .setColor(3447003)
        .addField("**!ih kérdés**", " Igaz Hamis ||| A Bot Csak [Igaz] és [Hamis] választ ad.")
        .addField("**!mennyi az idő ?**", "Meg mondja a pontos időt!")
        .addField("**!parancsok**", "Ez a lista")
        .addField("**!Version**", "A bot nak a Verziói és fejlesztési napló!")
        .addField("**!in Kérdés**", "Igen Nem ||| A Bot Csak [Igen] és [Nem] választ ad.")
        .addField("**!avatar**", "El küldi a bot az avatárod :D")
        .addField("**!botinfo**", "meg mutatja a bot infokat")
        .addField("**!report @player indok**", "Egyszerü report!")
        .addField("**!szerverinfo**", `${emo[":D"]} meg mutatja a szerver infokat/adatokat ${emo[":D"]}`)
        .addField("**!userinfo**", `meg mutatja az adataid `)
        .addField("**Idő:**", moment().format('hh:mm:ss'))
        .setAuthor(`Készítette:\n ${emo[":pipa"]} !/Mééz\!MateHUN!/Mééz\!#2427 ${emo[":pipa"]}`)
      message.channel.send(embed);
    }
});
//Parancsok vége --------------------------------

//Version ---------------------------------------
kliens.on("message", message => {
    if (message.content.toLowerCase() === prefix + 'version') {
      const versionembed = new discord.RichEmbed()
        .setThumbnail("https://i.pinimg.com/originals/38/08/b4/3808b458f7a0cd3ab88f6c653b290b61.gif")
        .setTitle('Version lista :')
        .setColor(szinek.zöld)
        .addField("**1.0.0**", "**°**Bot létre jötte")
        .addField("**1.2.0**", "**°**Autó moderáció!")
        .addField("**1.3.0**", "**°**Auto moderáció! javítva!")
        .addField("**1.4.0**", "**°**Fun Parncs be került [Igaz Hamis]")
        .addField("**1.5.0**", "**°**Igaz Hamis Bug Fixed\n **°**Logolás!")
        .addField("**1.6.0**", "**°**Még egy Fun parancs \n**°**Version list")
        .addField("**1.7.0**", "**°**Tag számláló!")
        .addField("**1.7.1**", "**°**Tag számláló Uppdated!")
        .addField("**1.7.3**", "**°**Új fun(misc) parancs :D")
        .addField("**1.8.0**", "**°**Be jött a Console Chatter \n **°**cserélödő status")
        .addField("**1.9.0**", "**°**Be jött a SzerverInfo parancs")
        .addField("**1.9.1**", "**°**Tag számláló fejlesztve!")
        .addField("**1.9.2**", "**°**Report parancs")
        .addField("**1.9.3**", "**°**Userinfo")
        .addField("**1.9*3**", "**°**Time?")
        .addField(`Parancsot meg hívta: ${message.author.toString()}`)
        .setAuthor("Készítette:\n !/Mééz\\!MateHUN!/Mééz\\!#2427", true, true)
      message.channel.send(versionembed);
    }
});

//Version Vége ----------------------------------

//Console Chatter -------------------------------

let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    kliens.channels.get(705091382108225547).send(x.join(" "));
});

//Console Chatter -------------------------------

//Changing Status -------------------------------

let activNum = 0;
setInterval(function() {
    if (activNum === 0 ) {
       kliens.user.setActivity("✅Creator:!/Mééz\\!MateHUN!/Mééz\\!#2427✅", {type: "WATCHING"});
       activNum = 1;
     } else if (activNum === 1) {
       kliens.user.setActivity("️✍️!help✍️", {type: "WATCHING"});
       activNum = 0;
     }
}, 10*1000);


//Changing Status -------------------------------

//server stats

setInterval(function(){ 
  kliens.channels.get("711518249749184512").setName(`Time: ${moment().format('hh:mm')}`)
}, 60*1000);


//member Counter --------------------------------

const serverStats = {
    guildID: '560863552441810945',
    totalUsersID: '710340600146296882',
    memberCountID: '710340850223415359',
    botCountID: '710340885933719562',
    timeID: "711518249749184512"
  }

  kliens.on("guildMemberAdd", member => {
    if(member.guild.id !== serverStats.guildID) return;
    kliens.channels.get(serverStats.totalUsersID).setName(`Total Users: ${member.guild.memberCount}`);
    kliens.channels.get(serverStats.memberCountID).setName(`member Count: ${member.guild.members.filter(m => !m.user.bot).size}`);
    kliens.channels.get(serverStats.botCountID).setName(`Bot Count: ${member.guild.members.filter(m => m.user.bot).size}`);
  });
  
  kliens.on("guildMemberRemove", member => {
    if(member.guild.id !== serverStats.guildID) return;
    kliens.channels.get(serverStats.totalUsersID).setName(`‍Total Users: ${member.guild.memberCount}`);
    kliens.channels.get(serverStats.memberCountID).setName(`member Count: ${member.guild.members.filter(m => !m.user.bot).size}`);
    kliens.channels.get(serverStats.botCountID).setName(`Bot Count: ${member.guild.members.filter(m => m.user.bot).size}`);
  });


//member counter --------------------------------


//idul ------------------------------------------
kliens.on("ready", () => {
    kliens.channels.get("711518249749184512").setName(`Time: ${moment().format('h:mm')}`)
    console.log("A Bot Sikeressen Elindult! Ekkor: " + moment().format("LLLL"));
    kliens.user.setActivity(" ");
});
//Inul vége ---------------------------------------------


//Segéd -------------------------------------------------
const prefix = "!"

kliens.login(process.env.BOT_TOKEN)

//Segéd vége --------------------------------------------


//INFOK Eleje -------------------
kliens.on("message", message => {
    if (message.content.toLowerCase() === prefix + 'botinfo') {
  const botembed = new discord.RichEmbed()
  .setTitle("Bot információ")
  .setColor("#25C675")
  .setThumbnail("https://i.pinimg.com/originals/38/08/b4/3808b458f7a0cd3ab88f6c653b290b61.gif")
  .addField("Bot név:", kliens.user.username)
  .addField("Bot létrehozásának a napja:", moment(kliens.user.createdAt).format('YYYY MMMM H:mm:s'))
  .addField("Szerverek:", kliens.guilds.size)
  
  message.channel.send(botembed);
  }
});

// SZERVER INFO!

kliens.on("message", message => {
    if (message.content.toLowerCase() === prefix + 'szerverinfo') {
  const serverembed = new discord.RichEmbed()
  .setTitle("Szerver információ")
  .setColor(szinek.világos_zöld)
  .setThumbnail("https://i.pinimg.com/originals/38/08/b4/3808b458f7a0cd3ab88f6c653b290b61.gif")
  .addField("**Szerver név:**",`**${message.guild.name}**`, true)
  .addField("**Szerver tulajdonos:**", `**${message.guild.owner.user.tag}**`, true)
  .addField("**Regio:**", `**${message.guild.region}**`)
  .addField("**Létszám:**", `__**Total Members:**__  **${message.guild.memberCount}** \n __**members:**__ **${message.guild.members.filter(m => !m.user.bot).size}** \n __**Botok:**__ **${message.guild.members.filter(m => m.user.bot).size}**`);
  message.channel.send(serverembed);
  }
});

//INFOK Vége --------------------
