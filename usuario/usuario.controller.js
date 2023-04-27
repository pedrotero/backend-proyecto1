
import Usuario from './usuario.model';

export async function getUsuario(req,res) {
  try {
    const {_id, email, password} = req.query;
    if(_id){

      const usuarios = await Usuario.findOne({isDeleted: false, _id});
      res.status(200).json(usuarios);
    }else if(email && password){
      const usuarios = await Usuario.findOne({isDeleted: false, email, password});
      res.status(200).json(usuarios);
    }else{
      res.status(400).json({message: "Parámetros incompletos o inválidos"})
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
  
}

export async function createUsuario(req, res) {
  try {
    const { email, name, password, cell, addr, type } = req.body;
    const usuario = new Usuario({ email, name, password, cell, addr, type });
    const resultado = await usuario.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchUsuario(req, res) {
  try {

    const {_id, ...values} = req.body;
    const resultado = await Usuario.findOneAndUpdate({_id, isDeleted: false}, values,{ new: true, runValidators: true});
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }


  
}

export async function deleteUsuario(req, res) {
  try {
    const {_id} = req.body;
    const resultado = await Usuario.findOneAndUpdate({_id, isDeleted: false},{"isDeleted":true},{ new: true, runValidators: true})
    res.status(200).json({resultado});
  } catch (err) {
    res.status(500).json(err);
  }
}