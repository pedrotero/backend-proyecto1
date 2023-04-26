
import Producto from './producto.model';

export async function getProducto(req,res) {

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
  try {
    const { _id, ...values } = req.body;
    const resultado = await Producto.findOneAndUpdate({_id, isDeleted: false},values, { new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch (err){
    res.status(500).json(err);
  }
  
}

export async function deleteProducto(req, res) {
  res.status(200).json({});
}