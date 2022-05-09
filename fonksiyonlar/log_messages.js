async function mesaj_log(message, client){
    var şuan = new Date(Date.now()).toLocaleTimeString("tr-TR")
    var tür = ""
    if (message.author.id === client.user.id){
        tür = "[KOMUT-CEVAP]"
    } 
    else if (message.attachments.size) { // direk message.attachments yazınca olmuyordu
        tür = "[EKLİ MESAJ]"
    } else {
        tür = "[MESAJ]"
    }
    console.log(`${tür} / ${şuan} / ${message.guild} / #${message.channel.name} / ${message.author.username}#${message.author.discriminator}: ${message.content}`)
}

async function komut_log(interaction){
    var çıkış = `[KOMUT] / ${interaction.guild} / #${interaction.channel.name} / ${interaction.user.username}: /${interaction.commandName} `
    var args = ""
    interaction.options.data.forEach(option =>{
        args += `[${option.name}: ${option.value}] `
    })
    çıkış += args
    console.log(çıkış)
}
async function düzenle_log(oldMessage, newMessage, client){
    var tür = ""
    if (oldMessage.author.username === client.user.username){
        tür = "[KOMUT-CEVAP-DÜZENLEME]"
    }
    else {
        tür = "[MESAJ-DÜZENLEME]"
    }
    console.log(`${tür} / ${oldMessage.guild} / #${oldMessage.channel.name} / ${oldMessage.author.username}#${oldMessage.author.discriminator}: ${oldMessage.content} -> ${newMessage.content}`)
}
module.exports = {
    mesaj_log , komut_log , düzenle_log
}