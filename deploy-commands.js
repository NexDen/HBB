const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./sema.json');
// const { clientId, guildId, token } = require('./nexbot.json');
// const { clientId, guildId, token } = require('./TURFAN.json');
const { clientId, token } = require("./HBB.json")

const commands = [
    
    new SlashCommandBuilder().setName("info").setDescription("Bir Kişi Hakkında Bilgi Verir."),

    new SlashCommandBuilder().setName("komutları_güncelle").setDescription("Komutları Günceller"),

    // new SlashCommandBuilder().setName("çal").setDescription("Müzik Çalar").addStringOption(option => option.setName("şarkı").setRequired(true).setDescription("Müzik Adı")),

    new SlashCommandBuilder().setName("ping").setDescription("Botun Çalışıp Çalışmadığını Gösterir"),
    new SlashCommandBuilder().setName("sil").setDescription("Mesajları Siler").addIntegerOption(option => option.setName("sayı").setMinValue(2).setMaxValue(100).setRequired(true).setDescription("Kaç Adet Mesaj Silinsin?")),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
module.exports = async function registerCommands(guild){
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guild.id),
                { body: commands },
            );
            console.log('Komutlar eklendi.');
            
                
        } catch (error) {
            console.error(error);
        }
    })();
}