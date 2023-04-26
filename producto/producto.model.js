const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
    {
      // campos
      restId: { type: mongoose.Schema.Types.ObjectId, ref:"restaurante", required: true, validate:{
        validator: async function (id){
          const rest = await mongoose.model("restaurante").findById(id);
          if(!rest || rest?.isDeleted) throw new Error("Restaurante no existe");}
      }},
      categoria: {type: String, required: true},
      precio: { type: Number, required: true},
      name: { type: String, required: true},
      desc: { type: String, required: true},
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export default mongoose.model('producto', productoSchema);