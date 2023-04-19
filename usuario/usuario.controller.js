
import Usuario from './usuario.model';

export async function getUsuario(req,res) {
  // const { name } = req.query;

  const usuarios = await Usuario.find(req.query);

  res.status(200).json(usuarios);
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

    const {_id, ...update} = req.body;
    const resultado = await Usuario.findByIdAndUpdate(_id, update,{ new: true, runValidators: true})
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }


  
}

export async function deleteUsuario(req, res) {
  try {
    const {_id} = req.params;
    const resultado = await Usuario.findByIdAndUpdate(_id,{"isDeleted":true})
    res.status(200).json({resultado});
  } catch (err) {
    res.status(500).json(err);
  }
}