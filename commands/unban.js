const discord = require('discord.js')
exports.run = async(client, message, args) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`:x: Bunu yapabilmek için yetkin yok!`).then( msg => msg.delete({timeout: 5000}))

	let ban = await message.guild.fetchBans();
	
	let unbanEmbed = new discord.MessageEmbed()
	let id = args[0]
	if(!id){
		unbanEmbed.setColor("RED")
		unbanEmbed.setDescription("Lütfen bir user ID giriniz.")
		message.delete();
		return message.channel.send(unbanEmbed).then(m => m.delete({timeout: 5000}))		
	}
    if (!ban.get(id)) {
      let notbannedembed = new discord.MessageEmbed()
        .setDescription("<:megafon:812623149602308117> Kullanıcı yasaklanmadı veya böyle bir kişi yok!")
        .setColor("RED");
      message.channel.send(notbannedembed);

      return;
    }	
	if(message.guild.members.unban(id)){
		let kisi = await client.users.fetch(id)
		unbanEmbed.setColor("GREEN")
		unbanEmbed.setAuthor(`${kisi.tag} adlı kullanıcının yasaklanması kaldırıldı`, kisi.avatarURL({dynamic: true}))
	} else {
		unbanEmbed.setDescription("Başarısız giden bir şeyler oldu.")
		message.channel.send(unbanEmbed).then(m => m.delete({timeout: 5000}))
		message.delete();
	}
	message.channel.send(unbanEmbed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'unban',
  description: 'Herhangi bir kullanıcının IDsini belirterek yasapı kaldırabilirsiniz',
  usage: 'unban <id>'
}