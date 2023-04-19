const mongoose = require('mongoose');

const restauranteSchema = mongoose.Schema(
    {
      // campos
      name: { type: String, required: true},
      tags: { type: [String], required: true},
      addr: { type: String, required: true},
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export default mongoose.model('restaurante', restauranteSchema);