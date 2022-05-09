var {MessageEmbed} = require("discord.js")
async function handle_member_add(member, debug){
    console.log(member)
    console.log("zort")
    if (debug) {var role = member.guild.roles.cache.find(role => role.name === "unr")}
    else {var role = member.guild.roles.cache.find(role => role.name === "◈ | Unregistered")}
    if (role) {
        await member.roles.add(role)
    }

    if (debug){
        var kanal = member.guild.channels.cache.find(channel => channel.name === "debug7")
    } else {
        var kanal = member.guild.channels.cache.find(channel => channel.name === "giriş-çıkış-log")
    }
    var isim = member.user.username
    var tag = member.user.discriminator
    var pfp = member.user.avatarURL()
    if (!pfp) pfp = member.user.defaultAvatarURL
    var hesap_açılış_zamanı = timestamp_to_date(member.user.createdTimestamp)
    console.log(`[KATILIM] ${isim}#${tag}`)
    

    var embed = new MessageEmbed()
    .setTitle(`Yeni Üye Girişi`)
    .setDescription(`${isim}#${tag}`)
    .setThumbnail(pfp)
    .setColor("#00ffff")
    .addFields(
        {
            name: "Hesap Açılış Zamanı",
            value: hesap_açılış_zamanı
        },
        // {name: "Giriş Tarihi", value: member.joinedAt},

    )
    .setAuthor("HBB")
    kanal.send({embeds: [embed]})
}

async function handle_member_leave(member, debug){
    if (debug){
        var kanal = member.guild.channels.cache.find(channel => channel.name === "debug7")
    } else {
        var kanal = member.guild.channels.cache.find(channel => channel.name === "giriş-çıkış-log")
    }
    var isim = member.user.username
    var tag = member.user.discriminator
    console.log(`[ÇIKIŞ] ${isim}#${tag}`)
    await kanal.send(`${isim}#${tag} Çıkış Yaptı. o7`)
}

function timestamp_to_date(timestamp){
    var date = new Date(timestamp)
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var date_string = `${day}/${month}/${year}`
    return date_string
}
module.exports = {handle_member_add , handle_member_leave}