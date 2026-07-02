import prisma from "../../../lib/prisma.js";

const menu_items = ["ChickenQuesadilla", "Beef Tacos", "Veggie Burrito", "Fish Tacos", "Chicken Burrito Bowl", "Steak Fajitas", "Shrimp Tacos", "Veggie Quesadilla", "Chicken Enchiladas", "Beef Burrito Bowl"];
export const CreateOrder = async (req, res) => {
    const {menuItem} = req.body;
    if (!menu_items.includes(menuItem)) {
        return res.status(400).json({
            message: "Error: Menu item not in menu"
        })
    }
    let orders = await prisma.Order.findMany();
    let new_order = {
        orderNum: orders.length,
        menuItem,
    }
    prisma.Order.create({
        data: new_order
    })
    orders = await prisma.Order.findMany();
    return res.status(200).json({
        message: "Order created successfully",
        orders
    })
}
export const GetOrders = async (req, res) => {
    let orders = await prisma.Order.findMany();
    return res.status(200).json({
        message: "Orders retrieved successfully",
        orders
    })
}
