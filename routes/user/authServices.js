import prisma from "../../lib/prisma.js";
import {superAdminData} from "../../bakedData/superAdminData.js"



// Login for user using email and password
export const Login = async (req, res) => {
    const { username, password, websiteName } = req.body;
    console.log(req.body);
    try {
       const user = await prisma.user.findFirst({
        where: {
            username,
            websiteName
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    // Add password verification logic here if applicable
    console.log(user);
    console.log(websiteName);
    return res.status(200).json({ success: true, message: "Login successful", data: user }); 
    } catch (error) {
        return res.status(500).json({success: false, message: "Login failed. " + error});
    }
};
// Register for user using email and password
export const Register = async (req, res) => {
    const { email, password, websiteName, username, firstName, lastName, role = "" } = req.body;
    if (!email || !password || !websiteName || !username) {
        console.error("Missing required fields");
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    console.log(req.body);
    if (superAdminData.includes(email)) {
        role = "SUPERADMIN";
    }
    const existingUser = await prisma.user.findFirst({
        where: {
            email,
            websiteName
        },
    });
    if (existingUser) {
        console.error("User already exists");
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
            websiteName,
            role,
        },
    });
    console.log(user);
    return res.status(201).json({ success: true, message: "Registration successful", data: user });
};
// Find user by ID
export const FindUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data: user });
};
// Delete user by ID
export const DeleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted", data: user });
};
// Update user by ID
export const UpdateUserById = async (req, res) => {
    const { id } = req.params;
    const { email, password, websiteName, role } = req.body;
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            email,
            password,
            websiteName,
            role,
        },
    });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User updated", data: user });
};
// Find all users
export const FindAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json({ success: true, message: "Users retrieved successfully", data: users });
};
export const FindAllUsersOfWebsite = async (req, res) => {
    const { websiteName } = req.params;
    const users = await prisma.user.findMany({
        where: {
            websiteName,
        },
    });
    users = users.filter((user) => user.role !== "BLOCKED");
    return res.status(200).json({ success: true, message: "Users retrieved successfully", data: users });
};
export const StandardUserRouteFunc = async (req, res) => {
    return res.status(200).json({ success: true, message: "Standard user route accessed" });
};

