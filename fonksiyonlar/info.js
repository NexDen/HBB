const { Client, Attachment, Message, MessageEmbed } = require("discord.js")
module.exports = async function info(interaction){
    var kullanıcı = interaction.user
    var hesap_oluşturma_zamanı = kullanıcı.createdTimestamp
    var pfp_url = kullanıcı.avatarURL
    var isim = kullanıcı.username

    const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${isim}`)
    .setThumbnail(pfp_url)
    .addFields(
        { name: "Kullanıcı Adı", value: `${isim}`, inline: true },
        // { name: "Kullanıcı ID", value: `${kullanıcı.id}`, inline: true },
        { name: "Hesap Oluşturma Zamanı", value: `${timestamp_to_date(hesap_oluşturma_zamanı)}`, inline: true },
        )
    interaction.reply({
        embeds: [embed]
    })

}

function timestamp_to_date(timestamp){
    var date = new Date(timestamp)
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var date_string = `${day}/${month}/${year}`
    return date_string
}