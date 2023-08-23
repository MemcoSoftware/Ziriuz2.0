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
exports.logoutUser = exports.loginUser = exports.registerUser = exports.updateUserByID = exports.createUser = exports.deleteUserByID = exports.getUserByID = exports.getAllUsers = void 0;
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
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Search all users
        return yield userModel.find();
        // return await userModel.find();
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
        return yield userModel.findById(id);
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
// - Create New User
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Create / Insert New User
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);
    }
});
exports.createUser = createUser;
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