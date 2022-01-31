const Discord = require('discord.js')

exports.run = (client, message, args) => { 
if (message.member.permissions.has("ADMINISTRATOR")){
	const aktifEmbed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("**Sunucumuz sorunsuz şekilde aktif edilmiştir. \nAktif olan herkesi sunucumuza bekliyoruz. \nSunucu IP Adresimiz: '213.226.119.28'**")
		.setThumbnail(client.user.avatarURL({dynamic: true, type: 'png'}))
		.setImage("https://i.hizliresim.com/mqd4vf3.jpg")
		.setTimestamp()
		message.channel.send({content: "||@everyone||", embed: aktifEmbed})
}else return message.reply(`:x: Bunu yapabilmek için yetkin yok!`)
};

exports.conf = {
    aliases: ['aktif']
}
exports.help = {
    name: "aktif"
}