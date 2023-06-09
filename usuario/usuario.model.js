const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema(
    {
      // campos
      email: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      password: { type: String, required: true, trim: true},
      cell: { type: Number, required: true},
      addr: { type: String, required: true, trim: true},
      type: { type: Number, required: true, enum: [0,1,2]},
      restauranteId: { type: String, default: null}, // 0: admin, 1: cliente, 2: domiciliario
      isDeleted: { type: Boolean, default: false },
      
    },
    { timestamps: true }
  );
  
  export default mongoose.model('usuario', usuarioSchema);