
async function handle_select_menu(interaction, debug){
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
    }
    else { // debug
        var oyunlar_dict = {
            "oyun_seçim_1": "967907740733308950",
            "oyun_seçim_2": "967909335705456750",
        }
    }
    if (interaction.customId === "oyun_seçim"){
        interaction.deferReply({ephemeral: true});
        var roles_to_remove = []
        for (var role in oyunlar_dict){
            var role_to_remove = interaction.guild.roles.cache.get(oyunlar_dict[role])
            if (role_to_remove) roles_to_remove.push(role_to_remove)
        }
        await interaction.guild.members.cache.get(interaction.user.id).roles.remove(roles_to_remove)
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
module.exports = { handle_select_menu }