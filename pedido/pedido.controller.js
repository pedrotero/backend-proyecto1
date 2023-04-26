
import Pedido from './pedido.model';

export async function getPedido(req,res) {
  try {
    const pedidos = await Pedido.findOne({isDeleted: false, ...req.query});
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function createPedido(req, res) {
  try {
    const { rest, clienteId} = req.body;
    const pedido = new Pedido(rest, clienteId);
    const resultado = await pedido.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchPedido(req, res) {
  try {

    const {_id, ...values} = req.body;
    const resultado = await Pedido.findByIdAndUpdate({_id, isDeleted: false},values,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
  
}

export async function deletePedido(req, res) {
  try {
    const {_id} = req.params;
    const resultado = await Pedido.findByIdAndUpdate(_id,{isDeleted: true},{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}