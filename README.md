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
Change directory into the config folder, from root directory run the following in your terminal:
```
cd config
```

Create a `development.json` and `default.json` file, run the following in your terminal: 
```json
cp development.sample.json development.json && cp default.sample.json default.json
```
Create an app on [slack API](https://api.slack.com/apps) and change the `token` property in the  `development.json` to the `OAuth Access token` issued to the new app on slack.

Create a database on [mlab](https://mlab.com) and change the `database` property in the  `default.json` file.

### Install Dependencies and Run
Run the following in your terminal
```bash
npm install && npm run dev
```