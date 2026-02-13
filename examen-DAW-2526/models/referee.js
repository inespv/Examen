// TODO Crea el esquema y modelo de los árbitros y asócialo a los partidos
import { mongoose,Schema } from "mongoose";

let refereesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    },
    licenseNumber: {
        type: Number,
        required: true,
        // que sea único ? 
    },
});

export default mongoose.model('Referees', refereesSchema);
