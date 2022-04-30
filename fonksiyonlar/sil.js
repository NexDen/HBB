const { Permissions, DiscordAPIError } = require("discord.js")
module.exports = async function sil(interaction){
    var member = interaction.member
    var sayı = interaction.options.getInteger("sayı")
    if (sayı > 100){
        await interaction.reply("100 adetden fazla mesaj silinemez. 100 adet siliniyor.")
    }
    sayı = Math.min(sayı, 100)
    sayı = Math.max(2, sayı)
    console.log(sayı)
    var kanal = interaction.channel
    if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        try{
            kanal.messages.fetch({ limit: sayı }).then(messages => {
            messages.forEach(message => message.delete())
            }).then( async ()=> await interaction.reply(`${sayı} tane mesaj siliniyor...`))
        }
        catch(e){
            if (e instanceof DiscordAPIError){
                await interaction.editReply("14 günden önce gönderilmiş mesajlar silinemez! (Discord'un suçu)")
                return;
            }
        }
        interaction.deleteReply();
    }
}