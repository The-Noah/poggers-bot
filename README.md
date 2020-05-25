# Poggers Bot

Downloaded: `deno run --allow-net --allow-read=config.json,poggers.json --allow-write=poggers.json app.ts`

Without downloading: `deno run --allow-net --allow-read=config.json,poggers.json --allow-write=poggers.json https://denopkg.com/The-Noah/poggers-bot/app.ts`

## `config.json`

You must have a Discord application for the bot. You can create a new one [here](https://discord.com/developers/applications).

| Property   | Description |
| ---------- | ----------- |
| `clientId` | Client ID of Discord application. |
| `token`    | Token of Discord application bot. |
| `interval` | How often to send messages (in seconds). |

[MIT License](LICENSE).
