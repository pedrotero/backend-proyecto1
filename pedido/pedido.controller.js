
import Pedido from './pedido.model';

export async function getPedido(req,res) {
  try {
    const {_id, date1, date2, ...query} = req.query;
    const {clienteId, domiId, restId} = query;
    if (_id) {
      const result = await Pedido.findOne({_id, isDeleted: false});
      res.status(200).json(result);
    }else if (clienteId || domiId || restId || (date1 && date2)) {
      const result = await Pedido.find({...query, fechaCreacion: {$gt: date1, $lt: date2}, isDeleted: false});
      res.status(200).json(result);
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function createPedido(req, res) {
  try {
    const { restId, clienteId} = req.body;
    const pedido = new Pedido({restId, clienteId});
    const resultado = await pedido.save();
    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
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
    const {_id} = req.body;
    const resultado = await Pedido.findByIdAndUpdate(_id,{isDeleted: true},{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}