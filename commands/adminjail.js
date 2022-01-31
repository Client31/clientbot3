const Discord = require('discord.js')
const mysql = require('mysql');

exports.run = async (client, msg, args) => {
if(msg.author.id == "921481301498933269" || msg.author.id == "694568892571320380" || msg.author.id == "933440128569978911" || msg.author.id == "908740934680850473"){
	if (isNaN(args[1])) return msg.reply(":x: Jail süresi sadece sayı olabilir.");
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projectlua'
});

if(isNaN(args[0])){
	sorgu = connection.query(`SELECT * FROM characters WHERE charactername = '${args[0]}'`)
}else{
	sorgu = connection.query(`SELECT * FROM characters WHERE maskeno = '${args[0]}'`)
}
sorgu.on('result',function(row){
	var dbid = row['account'];
	var chName = row['charactername'];
		var sorgu2 = connection.query(`SELECT * FROM accounts WHERE id = '${dbid}'`);
		sorgu2.on('result',function(row2){
			var username = row2['username'];
	connection.connect(function (err) {
		if(!chName) return;
		let sqlSorgusu = `UPDATE accounts SET adminjail = '1', adminjail_time = '${args[1]}', adminjail_reason = '${args[2]}', adminjail_by = 'Discord' WHERE username = '${username}'`;
		  connection.query(sqlSorgusu, function (err, results) {
				const logEmbed = new Discord.MessageEmbed()
				.setColor("WHITE")
				.setDescription(`${msg.author} tarafından **${chName}**(${username}) kişisine **${args[1]}** dakika jail atıldı.`)
				.setTimestamp()
			msg.channel.send(logEmbed)	
		  });
	});
})
})
};
};
 

exports.help = {
name:`pjail`,
description:`Jail Verir`
}