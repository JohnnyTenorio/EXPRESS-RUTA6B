import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/conexion.js';


export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.expressruta = '/api/';

        this.conectarDBMongo();

        //Middlewars
        this.middlewares();

        this.routes();

    }
    async conectarDBMongo(){
        if(!db.isConectedJohnny){
            await db.conectarMongoDBJ();
        }
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes() {
        //localhost:000/api/ejemplo
        this.app.use(this.expressruta, indexRoutes);
        this.app.use((req, res) =>{
            res.status(404).json({
                msg: 'Ruta no encontrada'
            });
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', `${this.port}` .bgBlack);
        })
    }
}