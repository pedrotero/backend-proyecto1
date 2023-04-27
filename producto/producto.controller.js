
import Producto from './producto.model';

export async function getProducto(req,res) {
  const {_id, categoria, restId} = req.query
  if (_id) {
    const result = await Producto.find({_id,isDeleted:false});
    res.status(200).json(result);
  }else if (categoria || restId) {
    const result = await Producto.find({categoria, restId, isDeleted:false});    
    res.status(200).json(result);
  }else{
    res.status(400).json({message: "Parámetros incompletos o inválidos"})
  }
}

export async function createProducto(req, res) {
  try {
    const { name, precio, categoria, desc, restId } = req.body;
    const producto = new Producto({ name, precio, categoria, desc, restId });
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
  try {
    const {_id} = req.body;
    const resultado = await Producto.findOneAndUpdate(_id,{"isDeleted":true},{ new: true, runValidators: true})
    res.status(200).json({resultado});
  } catch (err) {
    res.status(500).json(err);
  }
}