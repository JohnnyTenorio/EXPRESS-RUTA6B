import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.expressruta = '/api/';

        //Middlewars
        this.middlewares();

        this.routes();

    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes() {
        //localhost:000/api/ejemplo
        this.app.use(this.expressruta, indexRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}