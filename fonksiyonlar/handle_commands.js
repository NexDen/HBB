const { Modal, TextInputComponent, showModal } = require("discord-modals")
var registerCommands = require("./deploy-commands.js")
var info = require("./info.js")
var ping = require("./ping.js")
var sil = require("./sil.js")
var {komut_log} = require("./log_messages")
var komut_dict = {
    "komutları_güncelle": registerCommands,
    "info": info,
    "ping": ping,
    "sil" : sil,
    "test" : test,
}
const modal = new Modal()
.setCustomId("test1")
.setTitle("BAŞLIK")
.addComponents(
    new TextInputComponent()
    .setCustomId("test1_1")
    .setLabel("LABEL-SHORT")
    .setStyle("SHORT")
    .setMinLength(1)
    .setPlaceholder("PLACEHOLDER-SHORT")
    .setRequired(true),
    new TextInputComponent()
    .setCustomId("test1_2")
    .setLabel("LABEL-LONG")
    .setStyle("LONG")
    .setMinLength(1)
    .setPlaceholder("PLACEHOLDER-LONG")
    .setRequired(true)
    )

    async function test(interaction, client){
        showModal(modal, {
            client: client,
            interaction: interaction
        })
    }
    

async function handle_command(interaction){
    var komut_isim = interaction.commandName
    var komut = komut_dict[komut_isim]
    if (komut_isim !== "komutları_güncelle"){
        komut(interaction);
    }
    else {
        if (interaction.user.id === "721832519338819616")
        {
            komut(interaction)
        } else {
            return interaction.reply({content: "kes", ephemeral: true})
        }
    }
    komut_log(interaction)
}
module.exports = {handle_command}