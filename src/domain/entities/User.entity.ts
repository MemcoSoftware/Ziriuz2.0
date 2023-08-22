import mongoose from "mongoose";




export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            number: Number,
            username: String,
            name: String,
            cedula: Number,
            telefono: String,
            email: String,
            more_info: String
        },
        { versionKey: false } // Deshabilitar la función versionKey
    )
    return mongoose.models.Users || mongoose.model('Users', userSchema);
}


// TODO: 

// - Get User By ID
// - Get User By EMAIL
// - Delete User By ID
// - Create New User
// - Update User by ID