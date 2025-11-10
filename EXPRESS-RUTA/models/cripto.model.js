import mongoose from "mongoose";

const criptoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  simbolo: {
    type: String,
    required: true,
  },
  precioUSD: {
    type: Number,
    required: true,
  },
  capitalizacion: {
    type: Number,
    required: false,
  },
  descripcion: {
    type: String,
    required: false,
  },
});

const Criptomoneda = mongoose.model('Criptomoneda', criptoSchema);
export default Criptomoneda;
