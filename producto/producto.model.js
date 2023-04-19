const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
    {
      // campos
      
      isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export default mongoose.model('producto', productoSchema);