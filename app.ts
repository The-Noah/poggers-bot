import {Client} from "https://deno.land/x/cordeno/mod.ts";

try{
  await Deno.stat("poggers.json");
}catch(err){
  if(err instanceof Deno.errors.NotFound){
    await Deno.writeTextFile("poggers.json", JSON.stringify([]));
  }
}

const config = JSON.parse(await Deno.readTextFile("config.json")) as {
  clientId: string,
  token: string,
  interval: number
};
const poggers = JSON.parse(await Deno.readTextFile("poggers.json")) as string[];

const sendPoggers = () => {
  for(const userId of poggers){
    client.http.post(`/channels/${userId}/messages`, {
      content: "Poggers.",
      tts: false
    });
  }

  setTimeout(sendPoggers, config.interval * 1000);
};

const client = new Client({token: config.token});
console.log(`invite URL: https://discord.com/oauth2/authorize?client_id=${config.clientId}&scope=bot`);

sendPoggers();

for await(const ctx of client){
  if(ctx.event !== "MESSAGE_CREATE" || ctx.data.author.bot){
    continue;
  }

  const content = ctx.data.content.toLowerCase().trim();
  const sender = ctx.data.channel_id;
  const index = poggers.indexOf(sender);

  if(content === "status"){
    ctx.reply(`Currently ${index > -1 ? "enabled" : "disabled"}.`);
    continue;
  }else if(content === "enable"){
    if(index > -1){
      ctx.reply("Already enabled.");
      continue;
    }

    poggers.push(sender);
    ctx.reply("Enabled.");
  }else if(content === "disable"){
    if(index === -1){
      ctx.reply("Not enabled.");
      continue;
    }

    poggers.splice(index, 1);
    ctx.reply("Disabled.");
  }else{
    ctx.reply("You can only `enable` or `disable`.");
    continue;
  }

  Deno.writeTextFile("poggers.json", JSON.stringify(poggers));
}
