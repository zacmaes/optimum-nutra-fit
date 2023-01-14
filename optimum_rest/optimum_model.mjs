import mongoose from 'mongoose';
import 'dotenv/config';

// Connects using the .env MONGODB_CONNECT_STRING
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define user schema, This may not be the best schema yet... gonna focus on exercise first
 */
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    login_username: { type: String, required: true, unique: true },
    login_password: { type: String, required: true },
    health_goals: {
        weight_goal: { type: Number },
        calorie_goal: { type: Number },
        protein_goal: { type: Number },
        fat_goal: { type: Number },
        carb_goal: { type: Number }
    },
    meals: [{
        type: { type: String },
        name: { type: String },
        nutrition_facts: {
            calories: { type: Number },
            total_fat: { type: Number },
            saturated_fat: { type: Number },
            trans_fat: { type: Number },
            total_carbohydrates: { type: Number },
            dietary_fiber: { type: Number },
            sugars: { type: Number },
            protein: { type: Number },
            cholesterol: { type: Number },
            sodium: { type: Number }
        },
        log_date: { type: Date, default: Date.now }
    }],
    exercises: [{
        type: { type: String },
        name: { type: String },
        sets: { type: Number },
        reps: { type: Number },
        weight: { type: Number },
        duration: { type: Number },
        distance: { type: Number },
        log_date: { type: Date, default: Date.now }
    }],
    water_intake: [{
        volume: { type: Number },
        log_date: { type: Date, default: Date.now }
    }]
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const User = mongoose.model("User", userSchema);


