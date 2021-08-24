import mongoose from 'mongoose';

const wordSchema = mongoose.Schema({
    palabra: String,
    definicion: String
}, {collection: 'palabras_definidas2'});

const DefinedWords = mongoose.model('DefinedWords', wordSchema);

export default DefinedWords;