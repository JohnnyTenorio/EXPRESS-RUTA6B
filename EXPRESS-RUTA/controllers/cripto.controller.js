import Criptomoneda from "../models/cripto.model.js";
import mongoose from "mongoose";

// Obtener todas las criptomonedas
export const getAllCriptos = async (req, res) => {
  try {
    const criptos = await Criptomoneda.find({}, { __v: 0 });
    if (criptos.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron criptomonedas' });
    }
    return res.status(200).json({ criptos });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las criptomonedas' });
  }
};

// Obtener una cripto por ID
export const getCriptoById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }
    const cripto = await Criptomoneda.findById(id);
    if (!cripto) {
      return res.status(404).json({ msg: 'Criptomoneda no encontrada' });
    }
    return res.status(200).json({ cripto });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener la criptomoneda' });
  }
};

// Crear una nueva cripto
export const postCripto = async (req, res) => {
  const body = req.body;
  const cripto = new Criptomoneda(body);
  try {
    const validationError = cripto.validateSync();
    if (validationError) {
      const errores = Object.values(validationError.errors).map(e => e.message);
      return res.status(400).json({ msg: errores });
    }

    await cripto.save();
    return res.status(201).json({ cripto });
  } catch (error) {
    res.status(500).json({ msg: 'Error al guardar la criptomoneda' });
  }
};

// Actualizar una cripto
export const putCripto = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const cripto = await Criptomoneda.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!cripto) {
      return res.status(404).json({ msg: 'Criptomoneda no encontrada' });
    }

    return res.status(200).json({ cripto });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar la criptomoneda' });
  }
};

// Eliminar una cripto
export const deleteCripto = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const cripto = await Criptomoneda.findByIdAndDelete(id);
    if (!cripto) {
      return res.status(404).json({ msg: 'Criptomoneda no encontrada' });
    }

    return res.status(200).json({ msg: 'Criptomoneda eliminada', cripto });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la criptomoneda' });
  }
};
