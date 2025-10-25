import mongoose from 'mongoose';

let isConectedJohnny = false;

const conectarMongoDBJ = async () => {
    if (isConectedJohnny) {
        console.log("Ya esta conectada la base de datos señor Tenorio".yellow);
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConectedJohnny = true;
        console.log('Conectado a la BD señor Tenorio'.bgGreen);
    } catch (error) {
        console.log("Error al conectar a la BD".red);
    }
}

const db = mongoose.connection;

db.on('error', (error) => {
    isConectedJohnny = false;
    console.log('Error al conectar a MongoDB'.red);
});

db.once('open', () => {
    isConectedJohnny = true;
});

db.on('disconnected', ()=>{
    isConectedJohnny = false;
    console.log('Desconectado de MongoDB'.yellow);
});

process.on('SIGINT', async ()=>{
    await mongoose.connection.close();
    console.log('MongoDB se ha desconectado'.yellow);
    process.exit(0);
});

export {conectarMongoDBJ, isConectedJohnny};

