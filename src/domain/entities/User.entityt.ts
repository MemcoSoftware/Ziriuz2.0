import mongoose from "mongoose";




export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            username: String,
            name: String,
            cedula: Number,
            telefono: String,
            email: String,
            more_info: String
        }
    )
    return mongoose.model('Users', userSchema);
}


// TODO: 

// - Get User By ID
// - Get User By EMAIL
// - Delete User By ID
// - Create New User
// - Update User by ID