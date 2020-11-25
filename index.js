const Discord = require('discord.js');

const bot = new Discord.Client();


const prefix = '*';

bot.once('ready', () => {
    console.log('Liutonium is online!');
    bot.user.setActivity('*help', { type: "LISTENING"})
     .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
     .catch(console.error);
     
});


bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot)return;
    
    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    if(command === 'ping'){
      
      message.channel.send({embed: {
        color: 0xFF1493,
        fields: [{
          name: "Pong!",
          value:  Math.round(bot.ws.ping)+"ms" }
        ]
      }
    })
    } else if (command === 'hello') {
     message.reply('Yup Hi !');
   }
    else if(command === 'info'){
      message.channel.send('version 1.0 : Currently under development');
    }
    else if(command === 'developer'){
      message.channel.send('https://www.youtube.com/channel/UCLrrqmgnoIJMy_Vl4tRNilQ');
    }
    else if(command === 'avatar'){
      let embed = new Discord.MessageEmbed()
      if(!message.mentions.users.first()) {
          embed.setTitle('Your avatar');
          embed.setDescription(`Links:\n[png](${message.author.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${message.author.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${message.author.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${message.author.displayAvatarURL({format: "webp", size: 2048})})`);
          embed.setColor(0xFF5733);
          embed.setTimestamp();
          embed.setFooter(message.author.username);
          embed.setImage(message.author.displayAvatarURL({size: 2048, dynamic: true}));
          message.channel.send(embed);
      } else {
          let user = message.mentions.users.first();
          embed.setTitle(`${user.username}'s avatar`);
          embed.setDescription(`Links:\n[png](${user.displayAvatarURL({format: "png", size: 2048})}) | [jpg](${user.displayAvatarURL({format: "jpg", size: 2048})}) | [gif](${user.displayAvatarURL({format: "gif", size: 2048, dynamic: true})}) | [webp](${user.displayAvatarURL({format: "webp", size: 2048})})`);
          embed.setColor(0xFF1493);
          embed.setTimestamp();
          embed.setFooter(user.username);
          embed.setImage(bot.users.cache.get(user.id).displayAvatarURL({size: 2048, dynamic: true}));
          message.channel.send(embed);
    }
  }
  else if(command === 'help'){
    message.channel.send({embed :{
      color:(0xFF1493),
      fields:[{
        name :"Prefix : *",
        value: "Commands : info, ping, avatar , hello .More on the way"}
      ]
    }
    }) }
    
});
bot.login(process.env.token);

   