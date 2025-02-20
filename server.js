import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { EventEmitter } from 'events';
import database from './db/database.js';
import sportRoutes from './routes/sportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//UTILITIES
EventEmitter.defaultMaxListeners = 30;
app.use(express.json());
app.use(morgan('combined'));

//ROUTES
app.use('/sport', sportRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

//MIDDLEWARE FOR ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
    });
});

database
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
