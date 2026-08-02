import prisma from "../../../lib/prisma.js";

// Create Order
export const CreateOrder = async (req, res) => {
    const { menuItem, restarauntID, quantity } = req.body;
    try {
        const newOrder = await prisma.order.create({
            data: { menuItemID: menuItem.id, restarauntID: restarauntID, quantity }
        });
        const allOrders = await prisma.order.findMany();
        res.status(201).json({ success: true, message: "Order created successfully", data: allOrders });
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
}
// Get Orders
export const GetOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        console.log(orders);
        res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
}
// Get Order By Id
export const GetOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.findUnique({
            where: { id: Number(id) }
        });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order retrieved successfully", data: order });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve order" });
    }
}
// Update Order
export const UpdateOrder = async (req, res) => {
    const { id } = req.params;
    const { menuItemID, restarauntID, quantity, completed } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: id, },
            data: { menuItemID: menuItemID, restarauntID: restarauntID, quantity, completed }
        });
        const allOrders = await prisma.order.findMany();
        console.log(updatedOrder);
        res.status(200).json({ success: true, message: "Order updated successfully", data: allOrders });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to update order" });
    }
}
// Delete Order
export const DeleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await prisma.order.delete({
            where: { id: Number(id) }
        });
        const allOrders = await prisma.order.findMany();
        res.status(200).json({ success: true, message: "Order deleted successfully", data: allOrders });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
}