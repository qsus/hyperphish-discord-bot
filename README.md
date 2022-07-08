# hyperphish-discord-bot
Get rid of scammers trying to steal users discord credentials / money on your server by sending fake phishing links!
Uses https://api.hyperphish.com/gimme-domains to check domains.
## Usage
Invite the bot to your server using this link: https://discord.com/api/oauth2/authorize?client_id=894662139040649236&permissions=9216&scope=bot
That's it! No configuring needed. From now on, the bot will automatically detect phishing links and remove them.
## Setup
1. Clone the repo
2. Rename .env.example to .env and fill in the token
3. Start with `node index.js`