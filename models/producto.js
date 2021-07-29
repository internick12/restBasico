
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: { type: String, unique: true,required: [true, 'El nombre es obligatorio'] },
    estado: { type: Boolean, default: true, required: true },
    usuario: { type: Schema.Types.ObjectId,  ref: 'Usuario', default: true },
    precio: { type: Number, default: 0 },
    categoria: { type: Schema.Types.ObjectId,  ref: 'Categoria', default: true },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true }

});

ProductoSchema.methods.toJSON = function() {
    const{ __v, estado,...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema);