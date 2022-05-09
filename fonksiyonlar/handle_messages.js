var {mesaj_log} = require("./log_messages")
var { Modal, TextInputComponent, showModal } = require("discord-modals")
var {MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js")
var {registerCommands} = require("./deploy-commands.js")
var {clientId} = require("../HBB.json")
async function handle_message(message, client, debug){
    if (debug){
        if (message.author.id !== "721832519338819616") return;
        if (message.guild.id !== "961714430461227028") return;
        if (message.content === "komutları_güncelle_debug"){
            registerCommands("961714430461227028")
        }
    }   // test sunucusu
    mesaj_log(message, client)
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
    // DEPRECATED: KAYIT WTCHR A AKTARILDI
    // if (message.content === "kayıt_oda_ayarla"){
    //     if (message.guild.id !== "961714430461227028") return;
    //     if (debug){var kanal = message.guild.channels.cache.find(kanal => kanal.name === "debug4")}
    //     else {var kanal = message.guild.channels.cache.find(kanal => kanal.name === "◈・register-chat")}
    //     var row1 = new MessageActionRow()
    //         .addComponents(
    //             new MessageButton()
    //             .setCustomId("kayıt_kabul1")
    //             .setLabel("Erkek Rolü İçin")
    //             .setStyle("PRIMARY"),
    //             new MessageButton()
    //             .setCustomId("kayıt_kabul2")
    //             .setLabel("Kadın Rolü İçin")
    //             .setStyle("PRIMARY")
    //         )
    //     await kanal.send({content:"Sunucuya Katılmak İçin Tıklayınız. Botun Çalışmaması Halinde Yetkililer İle İletişime Geçiniz.", components: [row1]})
    // }
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
    
}

module.exports = {handle_message}