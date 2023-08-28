"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = exports.updateUserByID = exports.deleteUserByID = exports.getUserByID = exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// BCRYPT For Passwords
const bcrypt_1 = __importDefault(require("bcrypt"));
// JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Environment variables Configuration
dotenv_1.default.config();
// Obtein Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';
// CRUD
/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
const getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        let response = {};
        // Search all users (using pagination)
        yield userModel.find({}, { _id: 0, password: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id number username name cedula telefono email more_info')
            .exec().then((users) => {
            // users.forEach((user: IUser)=>{
            //     // Clean Passwords from result
            //     user.password = ''
            // });
            response.users = users;
        });
        // Count total documents in Users collection
        yield userModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Users: ${error}`);
        // throw error;
    }
});
exports.getAllUsers = getAllUsers;
// - GET User by ID
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Search User by ID
        return yield userModel.findById(id).select('_id number username name cedula telefono email more_info');
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
});
exports.getUserByID = getUserByID;
// - Delete User By ID
const deleteUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Delete User BY ID
        return yield userModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting User By ID');
    }
});
exports.deleteUserByID = deleteUserByID;
// - Update User BY ID
const updateUserByID = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        //  Update User
        return yield userModel.findByIdAndUpdate(id, user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
});
exports.updateUserByID = updateUserByID;
// Register User
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Create / Insert New User
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Registering User: ${error}`);
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        let userFound = undefined;
        let token = undefined;
        // Check if user exists by Username
        yield userModel.findOne({ username: auth.username }).then((user) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[AUTHENTICATION_ERROR in ORM]: User not found`);
            throw new Error(`[[AUTHENTICATION_ERROR in ORM]: User not found: ${error}`);
        });
        // Check if Password is valid (compare with bcrypt)
        let validPassword = bcrypt_1.default.compareSync(auth.password, userFound.password);
        if (!validPassword) {
            console.error(`[AUTHENTICATION_ERROR in ORM]: Invalid Password `);
            throw new Error(`[[AUTHENTICATION_ERROR in ORM]: User not found: Invalid Password`);
        }
        // Generate JWT
        token = jsonwebtoken_1.default.sign({ username: userFound.username }, secret, {
            expiresIn: "2h"
        });
        return {
            user: userFound,
            token: token
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);
    }
});
exports.loginUser = loginUser;
// Logout User
const logoutUser = () => __awaiter(void 0, void 0, void 0, function* () {
    // TODO NOT IMPLEMENTED
});
exports.logoutUser = logoutUser;
// TODO
//# sourceMappingURL=User.orm.js.map