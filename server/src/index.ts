import express, {Request,Response,Application} from 'express';
import dbConfig from './config/db.config';
import db from './models';

const cors = require("cors");

const app:Application = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});

app.get("/api", (req:Request, res:Response):void => {
    res.json({ message: "Hello from server!" });
});

const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
    .then(() => {
        console.log('Connected to mongodb');
        initial();
    })
    .catch((err: Error) => {
        console.error('Connection error ', err);
        process.exit();
    })

function initial() {
    Role.estimatedDocumentCount((err: Error, count: number) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save((err: unknown) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save((err: unknown) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save((err: unknown) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}