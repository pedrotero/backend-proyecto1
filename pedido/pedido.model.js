const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema(
    {
      // campos
      restId: { type: mongoose.Schema.Types.ObjectId, ref:"restaurante", required: true, immutable: true, validate:{
        validator: async function (id){
          const user = await mongoose.model("restaurante").findById(id);
          if(!user) throw new Error("Restaurante no existe");}
      }},
      productosIds: [{ type: [mongoose.Schema.Types.ObjectId], ref:"producto", validate:{
        validator: async function (_id){
          const prod = await mongoose.model("producto").findById(_id);
          if(!prod) throw new Error("producto no existe");}
      }}],
      clienteId: { type: mongoose.Schema.Types.ObjectId, ref:"usuario", required: true, immutable: true, validate:{
        validator: async function (id){
          const user = await mongoose.model("usuario").findById(id);
          if(!user|| user.type!= 1) throw new Error("Usuario no existe o no es un cliente");}
      }},
      domiId: { type: mongoose.Schema.Types.ObjectId, ref:"usuario", validate:{
        validator: async function (id){
          const user = await mongoose.model("usuario").findById(id);
          if(!user|| user.type!= 2) throw new Error("Usuario no existe o no es un cliente");}
      }},
      estado: {type: String, default: "creado", enum:["creado", "enviado", "aceptado", "recibido", "endireccion", "realizado"]},
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  export default mongoose.model('pedido', pedidoSchema);