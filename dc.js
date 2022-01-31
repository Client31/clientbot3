/* Identification */
const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const fs = require('fs');
const data = require('quick.db');
const db = require('quick.db');
const express = require('express');
const app = express();
const ayarlar = require("./settings.json");
const ms = require("ms");
const queue = new Map();
let prefix = settings.prefix;

app.get("/", (req, res) => {
  res.send("I Logged!");
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./commands/${file}`);
    let cmdFileName = file.split(".")[0];
    client.commands.set(cmd.help.name, cmd);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
    };
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag} şuan aktif.`);
});

client.on("message", async msg => {
	if(msg.author.bot) return;
    if (msg.content.toLowerCase() === 'sa') {
		if(msg.channel.type === "dm") return;
            const embed = new Discord.MessageEmbed() 
      .setColor("RANDOM")
      .setDescription(`**Aleyküm Selam hoşgeldin ${msg.author}**`)
        msg.channel.send(embed)
    }
});

const { MessageButton } = require('discord-buttons');

client.on('clickButton', async (button) => {
  if(button.id == "VatanRoleplayKayıt"){
    if(!button.clicker.member.roles.cache.has("925461915566759956")){
      button.clicker.member.roles.remove("925461916766322728")
      button.clicker.member.roles.add("925461915566759956")
      button.reply.send("Başarılı şekilde sunucuya kayıt oldunuz, iyi eğlenceler.", {ephemeral: true})
    }else{
      button.reply.send("Sunucu kaydınız zaten yapılmış. Bir sorun ile karşılaştıysanız yetkililere ulaşınız.", {ephemeral: true})
    }  
  }
	if(button.id == "oyuncuŞikayet"){
      var kanallar = button.guild.channels.cache.array()
		kanallar.forEach(b => {
          talepAçık = db.get(`talepaçtı_${b.id}`)
		})
        if(talepAçık !== button.clicker.member.id){
        let kişi = button.clicker.member;
        let yetkili = "925461894297444383"
        const buttons = [];
        buttons.push(new MessageButton()
        .setStyle('red')
        .setEmoji('886206219574984704')
        .setLabel("Kapat")
        .setID("TicketKapat"));
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:hype:869496938867875860>**${kişi.user.username}, Oyuncu şikayetleri için destek oluşturdunuz. \nYönetim Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
		.setFooter("Yanlış Açtıysanız Lütfen Aşağıdaki Butona Basarak Talebinizi Kapatınız.")
        .setTimestamp()
        button.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: button.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {kanal.send(`${button.clicker.member},${button.guild.roles.cache.get(yetkili)}`,{embed: embed, buttons: buttons}).then(msg => db.set(`talepaçtı_${msg.channel.id}`, button.clicker.member.id));
      button.reply.send(`Merhaba ${button.clicker.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, {ephemeral: true});
     })
      }else{button.reply.send(`Merhaba ${button.clicker.member}, Zaten bir destek talebiniz bulunuyor.`, {ephemeral: true})}	 	  
	}
	if(button.id == "interiorTalep"){
      var kanallar = button.guild.channels.cache.array()
		kanallar.forEach(b => {
          talepAçık = db.get(`talepaçtı_${b.id}`)
		})
        if(talepAçık !== button.clicker.member.id){
        let kişi = button.clicker.member;
        let yetkili = "925461894297444383"
        const buttons = [];
        buttons.push(new MessageButton()
        .setStyle('red')
        .setEmoji('886206219574984704')
        .setLabel("Kapat")
        .setID("TicketKapat"));
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:hype:869496938867875860>**${kişi.user.username}, İnterior Talebi için destek oluşturdunuz. \nYönetim Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
		.setFooter("Yanlış Açtıysanız Lütfen Aşağıdaki Butona Basarak Talebinizi Kapatınız.")
        .setTimestamp()
        button.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: button.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {kanal.send(`${button.clicker.member},${button.guild.roles.cache.get(yetkili)}`,{embed: embed, buttons: buttons}).then(msg => db.set(`talepaçtı_${msg.channel.id}`, button.clicker.member.id));
      button.reply.send(`Merhaba ${button.clicker.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, {ephemeral: true});
     })
      }else{button.reply.send(`Merhaba ${button.clicker.member}, Zaten bir destek talebiniz bulunuyor.`, {ephemeral: true})}	 	  
	}	
	if(button.id == "donateSorular"){
      var kanallar = button.guild.channels.cache.array()
		kanallar.forEach(b => {
          talepAçık = db.get(`talepaçtı_${b.id}`)
		})
        if(talepAçık !== button.clicker.member.id){
        let kişi = button.clicker.member;
        let yetkili = "925461894297444383"
        const buttons = [];
        buttons.push(new MessageButton()
        .setStyle('red')
        .setEmoji('886206219574984704')
        .setLabel("Kapat")
        .setID("TicketKapat"));
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:hype:869496938867875860>**${kişi.user.username}, Donate Soruları için destek oluşturdunuz. \nYönetim Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
		.setFooter("Yanlış Açtıysanız Lütfen Aşağıdaki Butona Basarak Talebinizi Kapatınız.")
        .setTimestamp()
        button.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: button.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {kanal.send(`${button.clicker.member},${button.guild.roles.cache.get(yetkili)}`,{embed: embed, buttons: buttons}).then(msg => db.set(`talepaçtı_${msg.channel.id}`, button.clicker.member.id));
      button.reply.send(`Merhaba ${button.clicker.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, {ephemeral: true});
     })
      }else{button.reply.send(`Merhaba ${button.clicker.member}, Zaten bir destek talebiniz bulunuyor.`, {ephemeral: true})}	 	  
	}	
	if(button.id == "discordSorunlar"){
      var kanallar = button.guild.channels.cache.array()
		kanallar.forEach(b => {
          talepAçık = db.get(`talepaçtı_${b.id}`)
		})
        if(talepAçık !== button.clicker.member.id){
        let kişi = button.clicker.member;
        let yetkili = "925461894297444383"
        const buttons = [];
        buttons.push(new MessageButton()
        .setStyle('red')
        .setEmoji('886206219574984704')
        .setLabel("Kapat")
        .setID("TicketKapat"));
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:hype:869496938867875860>**${kişi.user.username}, Discord Sorunları için destek oluşturdunuz. \nYetkili Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
		.setFooter("Yanlış Açtıysanız Lütfen Aşağıdaki Butona Basarak Talebinizi Kapatınız.")
        .setTimestamp()
        button.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: button.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {kanal.send(`${button.clicker.member},${button.guild.roles.cache.get(yetkili)}`,{embed: embed, buttons: buttons}).then(msg => db.set(`talepaçtı_${msg.channel.id}`, button.clicker.member.id));
      button.reply.send(`Merhaba ${button.clicker.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, {ephemeral: true});
     })
      }else{button.reply.send(`Merhaba ${button.clicker.member}, Zaten bir destek talebiniz bulunuyor.`, {ephemeral: true})}	 	  
	}
	if(button.id == "diğerŞikayet"){
      var kanallar = button.guild.channels.cache.array()
		kanallar.forEach(b => {
          talepAçık = db.get(`talepaçtı_${b.id}`)
		})
        if(talepAçık !== button.clicker.member.id){
        let kişi = button.clicker.member;
        let yetkili = "925461894297444383"
        const buttons = [];
        buttons.push(new MessageButton()
        .setStyle('red')
        .setEmoji('886206219574984704')
        .setLabel("Kapat")
        .setID("TicketKapat"));
        const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<a:hype:869496938867875860>**${kişi.user.username}, Diğer Sorunlarınız için destek oluşturdunuz. \nYetkili Ekibimiz en kısa sürede sizinle iletişime geçecektir. \nLütfen sabırla bekleyiniz ve şikayet SS'lerinizi hazırlayınız.**\n`)
		.setThumbnail(client.user.avatarURL())
		.setFooter("Yanlış Açtıysanız Lütfen Aşağıdaki Butona Basarak Talebinizi Kapatınız.")
        .setTimestamp()
        button.guild.channels.create(`destek-${kişi.user.username}`, {
          type: 'text',
          permissionOverwrites: [{ id: client.user.id, allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','EMBED_LINKS','ATTACH_FILES','ADD_REACTIONS','MENTION_EVERYONE','MANAGE_MESSAGES', 'SEND_MESSAGES']}, {id: button.guild.id, deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE']}, { id: kişi.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }, { id: yetkili, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']}]
        }).then(kanal => {kanal.send(`${button.clicker.member},${button.guild.roles.cache.get(yetkili)}`,{embed: embed, buttons: buttons}).then(msg => db.set(`talepaçtı_${msg.channel.id}`, button.clicker.member.id));
      button.reply.send(`Merhaba ${button.clicker.member}, Destek talebiniz oluşturulmuştur. ${kanal}`, {ephemeral: true});
     })
      }else{button.reply.send(`Merhaba ${button.clicker.member}, Zaten bir destek talebiniz bulunuyor.`, {ephemeral: true})}	 	  
	}	
	else if("TicketKapat" == button.id){
      if(button.channel){
      button.channel.delete()
      }
    }
})

      const Gamedig = require('gamedig');
  client.on("message", async mesaj => {
    const ever = ["785912936492302397"]
    if (ever.some(word => mesaj.content.includes(word))) {
      if(mesaj.author.id == "785912936492302397") return;
	  mesaj.delete({timeout: 7500})
    Gamedig.query({
    type: 'mtasa',
    host: '213.226.119.28',
    }).then((state) => {
        const embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .setTitle("**Lotus Roleplay Sunucu İstatistikleri**")
        .setThumbnail(mesaj.guild.iconURL({dynamic: true, type: 'png'}))
        .addField('Sunucu IP: ', "```213.226.119.28```")
        .addField('Aktif Oyuncu Sayısı: ', '```' + state.raw.numplayers + '/' + state.maxplayers + '```')
        .addField('Gecikme Süresi (ms): ', '```' + state.ping + '```')
        .setFooter(`${mesaj.author.tag} tarafından istendi.`, mesaj.author.avatarURL({ dynamic: true, format: 'png', size: 1024}))
        mesaj.channel.send(embed).then(s => s.delete({timeout: 7500}))
    });
    }
});

setInterval (function () {
    Gamedig.query({
    type: 'mtasa',
    host: '213.226.119.28',
    }).then((state) => {
		if(state.raw.numplayers == 0){
		client.user.setActivity('IP: 213.226.119.28:22003',{type: "WATCHING"})
		}else{
		client.user.setActivity('Aktif Oyuncu: ' + state.raw.numplayers,{type: "WATCHING"})
		}
    });
}, 3000); 

const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projectlua'
});

connection.connect(function (err) {
  if (err) throw err;

  console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');

});


client.login(settings.key);
require('discord-buttons')(client);
