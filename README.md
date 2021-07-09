# country_viewer_app
Country Viewer App that leverages the REST Countries API

## To Run

You need node and npm installed to run this app. They can be downloaded [here](https://nodejs.org/en/download/).
After downloading, you'll have to install the dependencies in both the `client` and `server` folders.

```
cd client
npm install -y
cd ../server
npm install -7
```

Now everything is ready to run! We need to start both the client and the server. I'm sure there's a better way to do this,
but I've just been opening two terminals and running the backend server and the client from there.

For the server:

```
cd server
node server
```

For the client:

```
cd client
npm start
```

And the app should be up and running. The client can be accessed at `http://localhost:3000`.
