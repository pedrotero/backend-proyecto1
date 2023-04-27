
import Restaurante from './restaurante.model';

export async function getRestaurante(req,res) {
  const {_id, namestr, tags} = req.query;
  if (_id) {
    const result = await Restaurante.findOne({_id, isDeleted:true});
    res.status(200).json(result);
  }else if(namestr || cat){
    name = { $regex: /namestr/, $options: "i"}
    const result = await Restaurante.find({name,isDeleted: false, tags: { $all: tags}}).sort((restA,restB) => {restB.pedidoCount - restA.pedidoCount});
    res.status(200).json(result);
  }else{
    res.status(400).json({message: "Parámetros incompletos o inválidos"})
  }
  

  res.status(200).json(result);
}

export async function createRestaurante(req, res) {
  try {
    const { usuarioId, name, tags, addr } = req.body;
    const restaurante = new Restaurante({ usuarioId, name, tags, addr });
    const resultado = await restaurante.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchRestaurante(req, res) {
  try {

    const {_id, ...values} = req.body;
    const resultado = await Restaurante.findOneAndUpdate({_id, isDeleted: false}, values,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteRestaurante(req, res) {
  try {
    const {_id} = req.body;
    const resultado = await Restaurante.findOneAndUpdate(_id,{"isDeleted":true},{ new: true, runValidators: true})
    res.status(200).json({resultado});
  } catch (err) {
    res.status(500).json(err);
  }
}