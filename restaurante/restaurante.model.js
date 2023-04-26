const mongoose = require('mongoose');

const restauranteSchema = mongoose.Schema(
    {
      // campos
      usuarioId: { type: mongoose.Schema.Types.ObjectId, ref:"usuario", required: true, validate:{
        validator: async function (id){
          const user = await mongoose.model("usuario").findById(id);
          if(!user|| user?.type!= 0 || user?.isDeleted) throw new Error("Usuario no existe o no es administrador de restaurante");}
        }},
      name: { type: String, required: true},
      tags: { type: [String], required: true},
      addr: { type: String, required: true},
      pedidoCount: { type: Number, default: 0},
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export default mongoose.model('restaurante', restauranteSchema);