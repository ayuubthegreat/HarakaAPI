import prisma from "../../../lib/prisma.js"


// Get All Restaraunts
export const GetAllRestaraunts = async (req, res) => {
    try {
        const restaraunts = await prisma.restaraunt.findMany({include: { menu: true }});
        res.status(200).json({success: true, message: "Restaraunts fetched successfully", data: restaraunts})
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaraunts" });
    }
}
// Get Restaraunt By ID
export const GetRestarauntById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaraunt = await prisma.restaraunt.findUnique({
            where: { id: id, }
        });
        if (!restaraunt) {
            return res.status(404).json({ success: false, message: "Restaraunt not found" });
        }
        res.status(200).json({ success: true, message: "Restaraunt fetched successfully", data: restaraunt });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaraunt" });
    }
}
// Create Restaraunt
export const CreateRestaraunt = async (req, res) => {
    const { name, items } = req.body;
    try {

        const newRestaraunt = await prisma.restaraunt.create({
            data: { 
                name, 
                menu: { 
                    createMany: { data: items } 
                } 
            }
        });
        const restaraunts = await prisma.restaraunt.findMany({include: { menu: true }});
        res.status(201).json({ success: true, message: "Restaraunt created successfully", data: restaraunts });
    } catch (error) {
        res.status(500).json({ error: "Failed to create restaraunt" });
    }
}
// Update Restaraunt
export const UpdateRestaraunt = async (req, res) => {
    const { id } = req.params;
    const { name, menu } = req.body;
    try {
                const menuItems = menu.map(({ id, name, price }) => ({ id, name, price }));
        const incomingIds = menuItems.filter(i => i.id).map(i => i.id);
        console.log(menuItems);
        const updatedRestaraunt = await prisma.restaraunt.update({
            where: { id: id },
            data: { 
                name, 
                menu: { 
                    deleteMany: { id: { notIn: incomingIds } },
                    upsert: menuItems.map(item => ({
                        where: { id: item.id ?? "" },
                        update: { name: item.name, price: item.price },
                        create: { name: item.name, price: item.price }
                    }))
                } 
            }
        });
        const restaraunts = await prisma.restaraunt.findMany({include: { menu: true }});
        console.log(updatedRestaraunt);
        res.status(200).json({ success: true, message: "Restaraunt updated successfully", data: restaraunts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update restaraunt" });
    }
}
// Delete Restaraunt
export const DeleteRestaraunt = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRestaraunt = await prisma.restaraunt.delete({
            where: { id: id }
        });
        const restaraunts = await prisma.restaraunt.findMany({include: { menu: true }});
        res.status(200).json({ success: true, message: "Restaraunt deleted successfully", data: restaraunts });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete restaraunt" });
    }
}

