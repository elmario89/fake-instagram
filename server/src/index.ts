import express, {Request,Response,Application} from 'express';
import dbConfig from './config/db.config';
import db from './models';
import routes from './routes/auth.routes';

const cors = require("cors");

const app:Application = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req:Request, res:Response):void => {
    res.json({ message: "Hello from server!" });
});

const User = db.user;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
    .then(() => {
        console.log('Connected to mongodb');
        initial();

        app.listen(PORT, ():void => {
            console.log(`Server Running here 👉 https://localhost:${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error('Connection error ', err);
        process.exit();
    })

function initial() {
    User.estimatedDocumentCount((err: Error, count: number) => {
        if (!err && count === 0) {
            new User({
                userName: "Mikhail",
                email: "urine89@mail.ru",
                password: "221221",
                posts: [{ text: "Some post is going to be here!"}]
            }).save((err: unknown) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added user with posts!");
            });
        }
    });
}

routes(app);
