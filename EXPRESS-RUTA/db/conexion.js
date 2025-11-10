import mongoose from 'mongoose';

let isConnectedCripto = false;

const conectarMongoDBCripto = async () => {
  if (isConnectedCripto) {
    console.log("Ya está conectada la base de datos".yellow);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnectedCripto = true;
    console.log('Conectado a MongoDB Atlas (Criptomonedas)'.bgGreen);
  } catch (error) {
    console.log("Error al conectar a la BD".red);
  }
};

const db = mongoose.connection;

db.on('error', () => {
  isConnectedCripto = false;
  console.log('Error al conectar a MongoDB'.red);
});

db.once('open', () => {
  isConnectedCripto = true;
});

db.on('disconnected', () => {
  isConnectedCripto = false;
  console.log('Desconectado de MongoDB'.yellow);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB se ha desconectado'.yellow);
  process.exit(0);
});

export { conectarMongoDBCripto, isConnectedCripto };
