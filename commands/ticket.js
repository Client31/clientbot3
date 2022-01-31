const Discord = require('discord.js')
const { MessageButton } = require('discord-buttons');
var mesajButtons = [
  {label: "Oyuncu Şikayetleri", renk: "red", emojiler: "926208977929388052", ButtonID: "oyuncuŞikayet"},
  {label: "İnterior Talepleri", renk: "grey", emojiler: "🏠", ButtonID: "interiorTalep"},
  {label: "Donate Soruları", renk: "blurple", emojiler: "905527628860100610", ButtonID: "donateSorular"},
  {label: "Discord Sorunları", renk: "grey", emojiler: "905580782830116884", ButtonID: "discordSorunlar"},
  {label: "Diğer Şikayetler", renk: "green", emojiler: "917865865783963658", ButtonID: "diğerŞikayet"},
]


exports.run = async(client, message, args) => {
    if(message.author.id !=="339855245599309824") return;
const embed = new Discord.MessageEmbed()
    .setColor("ffffff")
	.setTitle("<a:Lrpelmas:880615138460336230> Lotus Roleplay | Destek Talebi")
    .setDescription("```Merhaba arkadaşlar.\nOkul dolayısıyla yetkili kadromuz geç saatlere kadar aktif kalamıyor ve sabah erken giremiyor bu sebeple destek talebi saatleri 16.30’da açılacak ve 23.00’da kapanacaktır. Belirtilen saatler dışında açılan taleplerin yanıtlanması uzun sürebilir.\nBu süreçte anlayışlı olmanızı diliyorum. Sizleri seviyoruz.``` \n\n\nKurallar;\n**1  - Ticket açtığınız zaman lütfen **<@&925461906456727562>** dışında bulunan rolleri etiketlemeyin.\n2 - Gereksiz ticket açanlara işlem uygulanacaktır.\n3 - Ticket üzerinden size yardımcı olmaya çalışan **<@&925461906456727562>** arkadaşlara lütfen kibar bir dil kullanın.\n\nLotus Roleplay Yönetim Kadrosu**")
	.setImage("https://i.hizliresim.com/1nvrnhq.png")
    const buttons = [];
    mesajButtons.forEach(data => {
      buttons.push(new MessageButton()
	  .setLabel(data.label)
      .setStyle(data.renk)
      .setEmoji(data.emojiler)
      .setID(data.ButtonID));
    });
message.channel.send(embed, {buttons: buttons}) 
}

exports.conf = {
    aliases: ['ticket']
}
exports.help = {
    name: "ticket"
}