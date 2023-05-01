
import Pedido from './pedido.model';
import Restaurante from '../restaurante/restaurante.model.js';
import Producto from '../producto/producto.model.js';
export async function getPedido(req,res) {
  try {
    const {_id, date1, date2, ...query} = req.query;
    const {clienteId, domiId, restId} = query;
    if (_id) {
      const result = await Pedido.findOne({_id, isDeleted: false});
      res.status(200).json(result);
    }else if (date1 && date2) {
      if (clienteId || domiId || restId) {
        const result = await Pedido.find({...query, createdAt: {$gt: date1, $lt: date2}, isDeleted: false});
      res.status(200).json(result);
      }else{
        const result = await Pedido.find({createdAt: {$gt: date1, $lt: date2}, isDeleted: false});
        res.status(200).json(result);
      }
    }
    else if (clienteId || domiId || restId) {
      const result = await Pedido.find({...query, isDeleted: false});
      res.status(200).json(result);
    }else{
      const result = await Pedido.find({estado: {$in:["creado","enviado"]},isDeleted:false});
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


//profe, intenté de todas las formas posibles con map y esas vainas pero se quedaban en promise :(. Tocó con for 🤢😫😥😨😱😭😰😧
async function calctotal(productosIds){
  let tot = 0;
  for (const prodid of productosIds) {
    tot+= await Producto.findById(prodid).then(prod => prod.precio)
  }
  return tot
}


export async function patchPedido(req, res) {
  try {

    const {_id, productosIds, ...values} = req.body;
    const pedido = await Pedido.findById(_id);
    
    if (pedido.estado == "creado") {
      if (productosIds) {
        const total = await calctotal(productosIds);
        const {estado} = values;
        const resultado = await Pedido.findOneAndUpdate({_id, isDeleted: false},{productosIds,estado, total},{ new: true, runValidators: true});
        res.status(200).json(resultado);
      }else{
        const {estado} = values;
        const resultado = await Pedido.findOneAndUpdate({_id, isDeleted: false},{estado},{ new: true, runValidators: true});
        res.status(200).json(resultado);
      }
      
      
    }else if (pedido.estado == "enviado") {
      const {domiId} = values;
      const resultado = await Pedido.findOneAndUpdate({_id, isDeleted: false},{domiId,estado: "aceptado"},{ new: true, runValidators: true});
      res.status(200).json(resultado);
    }else {
      const {estado} = values;
      const resultado = await Pedido.findOneAndUpdate({_id, isDeleted: false},{estado},{ new: true, runValidators: true});
      if (estado=="realizado") {
        const {restId} = resultado;
        await Restaurante.findByIdAndUpdate(restId,{$inc:{pedidoCount: 1}});
      }
      res.status(200).json(resultado);
    }
    
  } catch (err) {
    console.log(err)
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