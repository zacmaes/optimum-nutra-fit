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
 * Define user schema, This may not be the best schema yet...
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

// ====================================================================================

//--------------- USER SPECIFIC FUNCTIONS ---------------------------------------------

/**
 * Create a new user
 * @param {String} name 
 * @param {Number} weight 
 * @param {Number} height 
 * @param {String} login_username 
 * @param {String} login_password 
 * @returns A promise. Resolves to the JSON object for the document created by calling save().
 */
const createUser = async (name, weight, height, login_username, login_password) => {
    const user = new User({ name: name, weight: weight, height: height, login_username: login_username, login_password: login_password});
    return user.save();
}

/**
 * Find users that match the query parameter filter
 * @param {Object} filter 
 * @returns A promise. Resolves to and array of the JSON objects returned by calling .find() and .exec()
 */
const findUsers = async (filter) => {
    const query = User.find(filter);
    return query.exec();
}

/**
 * Updates one user by their _id. Will update multiple key=value pairs if entered.
 * @param {Object} filter 
 * @param {Object} update 
 * @returns A promise. Resolves to a number (either 1 or 0) representing the modified count
 */
const updateUsers = async (filter, update) => {
    const result = await User.updateOne(filter, update);
    // return result.modifiedCount;
    return result;
    // consider change to matchedCount
}

/**
 * Deletes one or more users based upon the condition object passed as a parameter
 * @param {Object} paramToDelete 
 * @returns A promise. Resolves to a number showing the amount of users deleted
 */
const deleteUsers = async (paramToDelete) => {
    const result = await User.deleteMany(paramToDelete);
    return result.deletedCount;
}

export {createUser, findUsers, updateUsers, deleteUsers};