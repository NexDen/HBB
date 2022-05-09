var { token } = require("./HBB.json")
var { Discord, Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require("discord.js")
/*
katılmada otorol ver +
tepki-rol ekleme +

/info
*/


//// repl.it açık tutma
// const {http} = require("http")
// const express = require("express")
// const app = express()
// app.get("/", (request, response) => {
//     console.log(Date.now() + " Ping tamamdır.")
//     response.sendStatus(200)
// })



var debug = false;


var { mesaj_log , komut_log , düzenle_log } = require("./fonksiyonlar/log_messages.js")

var {handle_command} = require("./fonksiyonlar/handle_commands.js")

var {handle_select_menu} = require("./fonksiyonlar/handle_select_menus.js")

var {handle_button} = require("./fonksiyonlar/handle_buttons.js");

const { handle_message } = require("./fonksiyonlar/handle_messages");

const { handle_member_add, handle_member_leave } = require("./fonksiyonlar/handle_member.js");

var {registerCommands} = require("./fonksiyonlar/deploy-commands.js")

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
    düzenle_log(oldMessage, newMessage, client)
    })

client.on("interactionCreate", async interaction => {
    console.log(interaction)
    if (interaction.isCommand()) {
        handle_command(interaction)
    } 
    if (interaction.isSelectMenu()){
        handle_select_menu(interaction, debug)
    }
    if (interaction.isButton()){
        handle_button(interaction, debug)   
    }
})
client.on("modalSubmit", async (modal) => {
    console.log($```
    LABEL1: ${modal.getTextInputValue('test1_1')}
    LABEL2: ${modal.getTextInputValue('test1_2')}
    ```)
})

client.on("guildCreate", async guild => {
    console.log(guild)
    await registerCommands(guild)
})

client.on("guildMemberAdd", async member => {
    handle_member_add(member, debug)
})

client.on("guildMemberRemove", async member => {
    handle_member_leave(member, debug)
})

client.on("messageCreate", async message =>{
    
    // if (message.author.id === "852611178466115584"){ // erolun tüm mesajlarına kes de
    //     return await message.channel.send("kes")
    // 
    handle_message(message, client, debug)
})




client.login(token)