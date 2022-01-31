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

var sorgu = connection.query(`SELECT * FROM accounts WHERE username = '${args[0]}'`);
sorgu.on('result',function(row){
	var bakiye = row['bakiyeMiktari'];
	var acName = row['username'];
	connection.connect(function (err) {
		if(!acName) return;
		let eklencekBakiye = Number(args[1])+Number(bakiye)
		let sqlSorgusu = `UPDATE accounts SET bakiyeMiktari = '${eklencekBakiye}' WHERE username = '${args[0]}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setThumbnail("https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/ca3f5dc6a7ab4a222b0f1ad100a88b8c/large.gif")
				.setDescription(`${msg.author} tarafından **${acName}** isimli hesaba **${args[1]}₺** bakiye eklendi. \nHesabın güncel bakiyesi: **${eklencekBakiye.toLocaleString()}**`)
				.setTimestamp()
			msg.channel.send(logEmbed)				
		  });
	});
})
};
};
 

exports.help = {
name:`bakiyeekle`,
description:`Bakiye Verir`
}