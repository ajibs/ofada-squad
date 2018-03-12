# Food Order Bot
A Slack bot for making food orders.

## Continue Development
Clone the repo, run the following in your app:
```
git clone https://github.com/ajibs/ofada-squad.git
```

Navigate to the root folder of the project, run the following command in your terminal:
```
cd ofada-squad
```

## With Docker
To setup the app locally if you have docker installed, do the following:

Create an app on [slack API](https://api.slack.com/apps) and change the `TOKEN` property in the  `.env.sample` file to the `OAuth Access token` issued to the new app on slack.

Rebuild the project:
```
npm run build
```

Start the services:
```
docker-compose up
```

Visit `localhost:4000` in your browser, you should see: `Hello World`




## Without Docker 
You will need [Node.js](https://nodejs.org) `v8.9.4` installed.

### Setup Config and Database
Create a `.env` file, run the following in your terminal: 
```
cp .env.sample .env
```

Create an app on [slack API](https://api.slack.com/apps) and change the `TOKEN` property in the  `.env` to the `OAuth Access token` issued to the new app on slack.

Create a database on [mlab](https://mlab.com) and change the `DATABASE` property in the  `.env` file.

### Install Dependencies and Run
Run the following in your terminal
```
npm install
```

Then:
```
npm run dev
```

Visit `localhost:8000` in your browser, you should see: `Hello World`


