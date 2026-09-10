import mongoose, { Schema, type Model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
}

export interface Team {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
}

export interface Activity {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  points: number;
  recordedAt: Date;
}

export interface LeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

export interface Workout {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  displayName: { type: String, required: true, trim: true },
});

const teamSchema = new mongoose.Schema<Team>({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new mongoose.Schema<Activity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, default: Date.now },
});

const leaderboardSchema = new mongoose.Schema<LeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
});

const workoutSchema = new mongoose.Schema<Workout>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
});

export const UserModel: Model<User> = mongoose.models.User ?? mongoose.model<User>('User', userSchema);
export const TeamModel: Model<Team> = mongoose.models.Team ?? mongoose.model<Team>('Team', teamSchema);
export const ActivityModel: Model<Activity> =
  mongoose.models.Activity ?? mongoose.model<Activity>('Activity', activitySchema);
export const LeaderboardModel: Model<LeaderboardEntry> =
  mongoose.models.Leaderboard ?? mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
export const WorkoutModel: Model<Workout> =
  mongoose.models.Workout ?? mongoose.model<Workout>('Workout', workoutSchema);
