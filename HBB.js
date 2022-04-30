var { token } = require("./HBB.json")
// var { token } = require("./nexbotmüzik.json")
var { Discord, Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js")
/*
katılmada otorol ver +
tepki-rol ekleme +

/info
*/

// const {http} = require("http")
// const express = require("express")
// const app = express()
// app.get("/", (request, response) => {
//     console.log(Date.now() + " Ping tamamdır.")
//     response.sendStatus(200)
// })



var debug = false;

var registerCommands = require("./deploy-commands.js")
var info = require("./fonksiyonlar/info.js")
var ping = require("./fonksiyonlar/ping.js")
var sil = require("./fonksiyonlar/sil.js")


// var {çal} = require("./fonksiyonlar/müzik_çalma.js")
if (!debug){ // HBB
    var oyunlar_dict = {
        "oyun_seçim_1": "967872467832025148",
        "oyun_seçim_2": "967872477210488962",
        "oyun_seçim_3": "967872472445759498",
        "oyun_seçim_4": "967872463025369139",
        "oyun_seçim_5": "967872458646491247",
        "oyun_seçim_6": "967872453948899409",
        "oyun_seçim_7": "967911298341941308",
        "oyun_seçim_8": "967911165181177926",
    }
    
    var sevgi_dict = {
        "ilişki_1":"967872433321300058",
        "ilişki_2":"967872437922435133",
    }
    var Unregistered = "967872514296512562"
    var Registered = "967894214815932477"
    var Erkek = "967872371358838845"
    var Kız = "967872366677995570"
}
else { // debug
    var oyunlar_dict = {
        "oyun_seçim_1": "967907740733308950",
        "oyun_seçim_2": "967909335705456750",
    }
    var sevgi_dict = {
        "ilişki_1":"968224800801697832",
        "ilişki_2":"968224819747381338",
    }
    var Unregistered = "968215060906405908"
    var Registered = "968215092476911687"
    var Erkek = "968223202138521660"
    var Kız = "968243580919500831"
}
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_MEMBERS", Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})


client.once('ready', () => { 
    console.log(`${client.user.username}'a bağlanıldı!'`)
    if (debug){
        console.log("Debug Modu Açık!")
    }
    else {
        console.log("HBB Modu Açık!")
    }
    // while (true){
    //     kişi_sayısı = client.guilds.cache.get("967871220307599440").memberCount
    //     client.user.setPresence({ activity: {name: `${kişi_sayısı} kişi`}, type:"WATCHING" } )
    //     sleep(5000)
    // }
});

client.on("error", error => {
    console.log("HATA", error)
})
client.on("messageUpdate", async (oldMessage, newMessage) =>{
    var tür = ""
    if (oldMessage.author.username === client.user.username){
        tür = "[KOMUT-CEVAP-DÜZENLEME]"
    }
    else {
        tür = "[MESAJ-DÜZENLEME]"
    }
    console.log(`${tür} / ${oldMessage.guild} / #${oldMessage.channel.name} / ${oldMessage.author.username}: ${oldMessage.content} -> ${newMessage.content}`)
}
)

client.on("interactionCreate", async interaction => {
    console.log(interaction)
    if (interaction.isCommand()) {
        var çıkış = `[KOMUT] / ${interaction.guild} / #${interaction.channel.name} / ${interaction.user.username}: /${interaction.commandName} `
        var args = ""
        interaction.options.data.forEach(option =>{
            args += `[${option.name}: ${option.value}] `
        })
        çıkış += args
        console.log(çıkış)
        if (interaction.commandName === "komutları_güncelle"){
            if (interaction.user.id !== "721832519338819616") return interaction.reply({content: "kes", ephemeral: true})
            await registerCommands(interaction.guild)
            await interaction.reply(
                { 
                    content: "Komutlar Başarıyla Güncellendi.", 
                    ephemeral: true
                })
        }
        if (interaction.commandName === "info") await info(interaction)
        if (interaction.commandName === "ping") await ping(interaction)
        if (interaction.commandName === "sil") await sil(interaction)
        } 
    
    
        if (interaction.isSelectMenu()){
        if (interaction.customId === "oyun_seçim"){
            interaction.deferReply({ephemeral: true});
            var roller = []
            for (var role in oyunlar_dict){
                var role_to_remove = interaction.guild.roles.cache.get(oyunlar_dict[role])
                if (role_to_remove) roller.push(role_to_remove)
            }
            interaction.guild.members.cache.get(interaction.user.id).roles.remove(roller)
            var roller = []
            for (var index in interaction.values){
                var role = interaction.guild.roles.cache.find(role => role.id === oyunlar_dict[interaction.values[index]])
                if (role) roller.push(role)
                console.log(role)
            if (role){ 
                await interaction.member.roles.add(roller)
            }
            }
            await interaction.followUp(
                { 
                    content: "Oyun Seçimlerin Başarıyla Güncellendi.", 
                    ephemeral: true
                })
            }
        }
        if (interaction.isButton()){
            if (interaction.customId.startsWith("kayıt_kabul")){
                await interaction.member.roles.add(Registered)
                await interaction.member.roles.remove(Unregistered)
                cinsiyet = interaction.customId.slice(-1)
                if (cinsiyet === "1"){
                    await interaction.member.roles.add(Erkek)
                    await interaction.member.roles.remove(Kız)
                }
                if (cinsiyet === "2"){
                    await interaction.member.roles.add(Kız)
                    await interaction.member.roles.remove(Erkek)
                }

                await interaction.reply(
                    { 
                        content: "Kaydınız Başarıyla Tamamlandı.", 
                        ephemeral: true
                    })
            }
            if (interaction.customId.startsWith("ilişki")){
                var ilişki_id = interaction.customId
                var ilişki_role = interaction.guild.roles.cache.find(role => role.id === sevgi_dict[ilişki_id])
                if (ilişki_role){
                    for (var key in sevgi_dict){
                        var role = interaction.guild.roles.cache.get(sevgi_dict[key])
                        if (role) await interaction.member.roles.remove(role)
                    }
                    await interaction.member.roles.add(ilişki_role)
                }
                await interaction.reply(
                    { 
                        content: "İlişki Durumu Başarıyla Güncellendi.", 
                        ephemeral: true
                    })
            }
            if (interaction.customId === "temizle_oyunlar"){
                await interaction.deferReply({ephemeral: true})
                var roller = []
                for (var role_ in oyunlar_dict){
                    role_ = oyunlar_dict[role_]
                    var role_to_remove = interaction.guild.roles.cache.find(role => role.id === role_)
                    if (role_to_remove) roller.push(role_to_remove)
                }
                interaction.guild.members.cache.get(interaction.user.id).roles.remove(roller)
                await interaction.followUp(
                    {
                        content: "Oyun Seçimlerin Başarıyla Temizlendi.",
                        ephemeral: true
                    }
                )
            }
        }
})
    

client.on("guildCreate", async guild => {
    console.log(guild)
    await registerCommands(guild)
})

client.on("guildMemberAdd", async member => {
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
    console.log(isim, tag, pfp, hesap_açılış_zamanı)
    

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
    

})

client.on("guildMemberRemove", async member => {
    console.log(member)
    if (debug){
        var kanal = member.guild.channels.cache.find(channel => channel.name === "debug7")
    } else {
        var kanal = member.guild.channels.cache.find(channel => channel.name === "giriş-çıkış-log")
    }
    var isim = member.user.username
    var tag = member.user.discriminator
    await kanal.send(`${isim}#${tag} Çıkış Yaptı. o7`)
})

client.on("messageCreate", async message =>{
    
    // if (message.author.id === "852611178466115584"){ // erolun tüm mesajlarına kes de
    //     return await message.channel.send("kes")
    // }
    
    if (debug){
        if (message.author.id !== "721832519338819616") return;
        if (message.guild.id !== "961714430461227028") return;
    }   // test sunucusu

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

    if (message.content === "oyun_oda_ayarla"){
        if (message.guild.id !== "961714430461227028") return;
        if (!debug) {
            var kanal = message.guild.channels.cache.find(kanal => kanal.name === "◈・oyun-seçimi")
        }
        else {
            var kanal = message.guild.channels.cache.find(kanal => kanal.name === "debug3")
        }
        
        var row1 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("oyun_seçim")
                .setPlaceholder("Oyun Seçin")
                .setMaxValues(8)
                .addOptions([
                    {
                        label: "Valorant",
                        value: "oyun_seçim_1"
                    },
                    {
                        label: "PUBG: Battlegrounds",
                        value: "oyun_seçim_2"
                    },
                    {
                        label: "Minecraft",
                        value: "oyun_seçim_3"
                    },
                    {
                        label: "Among Us",
                        value: "oyun_seçim_4"
                    },
                    {
                        label: "League of Legends",
                        value: "oyun_seçim_5"
                    },
                    {
                        label: "Counter Strike: Global Offensive",
                        value: "oyun_seçim_6"
                    },
                    {
                        label: "Grand Theft Auto V",
                        value: "oyun_seçim_7"
                    },
                    {
                        label: "Fortnite",
                        value: "oyun_seçim_8"
                    },
                ]),)
        var row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Temizle")
                .setStyle("DANGER")
                .setCustomId("temizle_oyunlar")
            )
        await kanal.send({content:"Oynadığınız Oyunları Seçiniz.", components: [row1, row2]})
    }
    if (message.content === "kayıt_oda_ayarla"){
        if (message.guild.id !== "961714430461227028") return;
        if (debug){var kanal = message.guild.channels.cache.find(kanal => kanal.name === "debug4")}
        else {var kanal = message.guild.channels.cache.find(kanal => kanal.name === "◈・register-chat")}
        var row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("kayıt_kabul1")
                .setLabel("Erkek Rolü İçin")
                .setStyle("PRIMARY"),
                new MessageButton()
                .setCustomId("kayıt_kabul2")
                .setLabel("Kadın Rolü İçin")
                .setStyle("PRIMARY")
            )
        await kanal.send({content:"Sunucuya Katılmak İçin Tıklayınız. Botun Çalışmaması Halinde Yetkililer İle İletişime Geçiniz.", components: [row1]})
    }
    if (message.content === "ilişki_oda_ayarla"){
        if (message.guild.id !== "961714430461227028") return;
        if (debug){var kanal = message.guild.channels.cache.find(kanal => kanal.name === "debug6")}
        else {var kanal = message.guild.channels.cache.find(kanal => kanal.name === "◈・ilişki-seçimi")}
        var row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("ilişki_1")
                .setLabel("Sevgilim Var")
                .setStyle("DANGER"),
                new MessageButton()
                .setCustomId("ilişki_2")
                .setLabel("Sevgilim Yok")
                .setStyle("PRIMARY"),
            )
        await kanal.send({content:"Seçiminizi Yapınız. Botun Çalışmaması Halinde Yetkililer İle İletişime Geçiniz.", components: [row1]})
    }
})

function timestamp_to_date(timestamp){
    var date = new Date(timestamp)
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    var date_string = `${day}/${month}/${year}`
    return date_string
}


client.login(token)