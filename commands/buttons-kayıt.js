const Discord = require('discord.js')
const { MessageButton } = require('discord-buttons');


exports.run = async(client, message, args) => {
    if(message.author.id !=="339855245599309824") return;

const embed = new Discord.MessageEmbed()
    .setColor("ffffff")
    .setDescription(`Sunucumuza Hoşgeldiniz Discord Adresine Kayıt Olmak İçin <a:OnayLrp:877982156109004840> Emojisine Basmanız Yeterlidir`)
    .setImage(message.guild.iconURL({dynamic: true, type: 'png', size: 1024}))
const buttons = [];
buttons.push(new MessageButton()
    .setStyle('grey')
    .setEmoji('877982156109004840')
    .setID("VatanRoleplayKayıt"));
message.channel.send(embed, {buttons: buttons}) 
}

exports.conf = {
    aliases: ['kayıt']
}
exports.help = {
    name: "kayıt"
}