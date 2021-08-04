import mongoose from 'mongoose';

const wordSchema = mongoose.Schema({
    palabra: String,
    definicion: String
}, {collection: 'palabras_definidas'});

const DefinedWords = mongoose.model('DefinedWords', wordSchema);

export default DefinedWords;