import express, {Request,Response,Application} from 'express';

const app:Application = express();
const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)

    // Pass to next layer of middleware
    next();
});

app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});

app.get("/api", (req:Request, res:Response):void => {
    res.json({ message: "Hello from server!" });
});