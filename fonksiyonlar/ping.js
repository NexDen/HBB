async function ping(interaction){
    // calculate time difference
    var start = interaction.createdAt.getTime();
    var end = new Date().getTime()
    var time = Math.abs(end - start)
    // use last 2 digits of time
    var time_str = time.toString().slice(-2)
    
    await interaction.reply(
        { 
            content: "Pong! `" + time_str + "` ms", 
            ephemeral: true
        })
}
module.exports = ping