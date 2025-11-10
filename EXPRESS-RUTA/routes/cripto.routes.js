import { Router } from "express";
import {
  getAllCriptos,
  getCriptoById,
  postCripto,
  putCripto,
  deleteCripto
} from "../controllers/cripto.controller.js";

const cripto = Router();

cripto.get('/', getAllCriptos);
cripto.get('/:id', getCriptoById);
cripto.post('/', postCripto);
cripto.put('/:id', putCripto);
cripto.delete('/:id', deleteCripto);

export default cripto;
