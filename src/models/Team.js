import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Team = mongoose.model('Team', teamSchema);

export default Team;