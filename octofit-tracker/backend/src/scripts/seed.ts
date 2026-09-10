import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        displayName: 'Alex Rivera',
      },
      {
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        displayName: 'Jordan Lee',
      },
      {
        username: 'sam_cycles',
        email: 'sam@example.com',
        displayName: 'Sam Morgan',
      },
    ]);

    await TeamModel.create([
      {
        name: 'Morning Movers',
        description: 'A team for consistent early workouts.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Building strength together.',
        members: [users[1]._id],
      },
    ]);

    await ActivityModel.create([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        points: 70,
        recordedAt: new Date('2026-09-08T07:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength training',
        durationMinutes: 45,
        points: 90,
        recordedAt: new Date('2026-09-08T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 60,
        points: 120,
        recordedAt: new Date('2026-09-09T06:45:00Z'),
      },
    ]);

    await LeaderboardModel.create([
      { userId: users[2]._id, points: 120, rank: 1 },
      { userId: users[1]._id, points: 90, rank: 2 },
      { userId: users[0]._id, points: 70, rank: 3 },
    ]);

    await WorkoutModel.create([
      {
        name: 'Starter Full Body',
        description: 'A balanced introduction to full-body movement.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
      {
        name: 'Power Builder',
        description: 'Compound exercises focused on strength and power.',
        difficulty: 'intermediate',
        durationMinutes: 40,
      },
      {
        name: 'Endurance Challenge',
        description: 'A demanding cardio session for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 50,
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
