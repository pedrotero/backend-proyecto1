
import Producto from './producto.model';

export async function getProducto(req,res) {
  // const { name } = req.query;

  const productos = await Producto.find(req.query);

  res.status(200).json(productos);
}

export async function createProducto(req, res) {
  try {
    const { name } = req.body;
    const producto = new Producto({ name });
    const resultado = await producto.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchProducto(req, res) {
  res.status(200).json({});
}

export async function deleteProducto(req, res) {
  res.status(200).json({});
}