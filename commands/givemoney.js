const Discord = require('discord.js')
const mysql = require('mysql');

exports.run = async (client, msg, args) => {
if(msg.author.id == "921481301498933269" || msg.author.id == "694568892571320380" || msg.author.id == "933440128569978911" || msg.author.id == "908740934680850473"){
	if (isNaN(args[1])) return msg.reply(":x: Sadece sayı girebilirsin.");
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projectlua'
});

var sorgu = connection.query(`SELECT * FROM characters WHERE charactername = '${args[0]}'`);
sorgu.on('result',function(row){
	var money = row['money'];
	var chName = row['charactername'];
	connection.connect(function (err) {
		if(!chName) return;
		let eklencekBakiye = Number(args[1])+Number(money)
		let sqlSorgusu = `UPDATE characters SET money = '${eklencekBakiye}' WHERE charactername = '${args[0]}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setDescription(`${msg.author} tarafından **${chName}** isimli karaktere **${args[1]}₺** para verildi. \nKarakterin güncel parası: **${eklencekBakiye.toLocaleString()}**`)
				.setTimestamp()
			msg.channel.send(logEmbed)	
		  });
	});
})
};
};
 

exports.help = {
name:`givemoney`,
description:`para Verir`
}