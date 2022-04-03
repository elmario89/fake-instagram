const http = require('http');
const app = require('./app');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

const port = process.env.PORT || 3001;
require('dotenv').config();

const server = http.createServer(app);

// server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // initial();
});

function initial() {
    User.estimatedDocumentCount(async (err: Error, count: number) => {
        if (!err && count === 0) {
            const encryptedPassword = await bcrypt.hash('221221', 10);

            new User({
                userName: 'Mikhail',
                email: 'urine89@mail.ru',
                password: encryptedPassword,
                posts: [
                    {
                        text: 'Some post is going to be here!',
                        creationDate: new Date()
                    }
                ],
                creationDate: new Date(),
            }).save((err: unknown) => {
                if (err) {
                    console.log('error', err);
                }
                console.log('Added user with posts!');
            });
        }
    });
}
