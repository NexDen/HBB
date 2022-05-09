async function handle_button(interaction, debug){
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
    }
    // DEPRECATED: KAYIT WTCHR A AKTARILDI
    // if (interaction.customId.startsWith("kayıt_kabul")){
    //     await interaction.member.roles.add(Registered)
    //     await interaction.member.roles.remove(Unregistered)
    //     cinsiyet = interaction.customId.slice(-1)
    //     if (cinsiyet === "1"){
    //         await interaction.member.roles.add(Erkek)
    //         await interaction.member.roles.remove(Kız)
    //     }
    //     if (cinsiyet === "2"){
    //         await interaction.member.roles.add(Kız)
    //         await interaction.member.roles.remove(Erkek)
    //     }

    //     await interaction.reply(
    //         { 
    //             content: "Kaydınız Başarıyla Tamamlandı.", 
    //             ephemeral: true
    //         })
    // }
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
module.exports = {handle_button}