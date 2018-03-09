# Food Order Bot
A Slack bot for making food orders.

## Continue Development
Clone the repo, run the following in your app:
```
git clone https://github.com/ajibs/ofada-squad.git
```

### Requirements 
You will need [Node.js](https://nodejs.org) v8.9.4 installed.

### Setup Config and Database
Create a `.env` file, run the following in your terminal: 
```
cp .env.sample .env
```

Create an app on [slack API](https://api.slack.com/apps) and change the `TOKEN` property in the  `.env` to the `OAuth Access token` issued to the new app on slack.

Create a database on [mlab](https://mlab.com) and change the `DATABASE` property in the  `.env` file.

### Install Dependencies and Run
Run the following in your terminal
```bash
npm install && npm run dev
```
