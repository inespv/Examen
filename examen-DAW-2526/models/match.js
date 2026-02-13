import { mongoose, Schema } from "mongoose";

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  referee: {
    type: Schema.Types.ObjectId,
    ref: "referee",
    required: false
  }
});

export default mongoose.model('Matches', matchSchema);
