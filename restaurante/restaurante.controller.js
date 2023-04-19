
import Restaurante from './restaurante.model';

export async function getRestaurante(req,res) {
  // const { name } = req.query;

  const restaurantes = await Restaurante.find(req.query);

  res.status(200).json(restaurantes);
}

export async function createRestaurante(req, res) {
  try {
    const { name } = req.body;
    const restaurante = new Restaurante({ name });
    const resultado = await restaurante.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchRestaurante(req, res) {
  res.status(200).json({});
}

export async function deleteRestaurante(req, res) {
  res.status(200).json({});
}