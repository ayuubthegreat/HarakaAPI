import prisma from "../../lib/prisma.js";

export const parseDate = async(release_date = "05/05/2007") => {
    const nums = release_date.split('/');
    if (nums.length !== 3) {
        throw new Error("Date structure invalid.");
    }
    const month = Number(nums[0]);
    const day = Number(nums[1]);
    const year = Number(nums[2]);
    const date = new Date(0);
    date.setUTCFullYear(year, month - 1, day);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

export const loadAllProjects = async (req, res, message = "Projects successfully found!") => {
    try {

     const loadedProjects = await prisma.cMSWebsiteProject.findMany({});
     console.log(`Found projects:`, loadedProjects);
    return res.status(201).json({message: message, data: loadedProjects});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error: " + error})
    }
}

export const AddProj = async (req, res) => {
    const {author, title, shortDesc, description, tags, version_num, release_date, percentage, version_percentage, relative_image_link, gitspedia_href} = req.body;
    try {
        const releaseDate = await parseDate(release_date);
        
         await prisma.cMSWebsiteProject.create({
            data: {
                author,
                title,
                shortDesc,
                description,
                tags,
                version_num: version_num ?? 0.0,
                release_date: releaseDate,
                percentage,
                version_percentage: version_percentage ?? 0,
                relative_image_link: relative_image_link,
                gitspedia_href,
            }
        })
        await loadAllProjects(req, res, "Project successfully created!");
       
    } catch (error) {
        res.status(500).json({message: "Server error! Could not create a project: " + error})
    }
}
export const UpdateProj = async (req, res) => {
    const {id, author, title, shortDesc, description, tags, version_num, release_date, percentage, version_percentage, relative_image_link, gitspedia_href} = req.body;
    try {
        const proj = await prisma.cMSWebsiteProject.findUnique({
            where: {id: id}
        });
        if (proj === null) {
            res.status(404).json({message: "Project ID is not valid."})
            return;
        }
        const releaseDate = await parseDate(release_date) ?? proj.release_date;
        await prisma.cMSWebsiteProject.update({
            where: {id: id},
            data: {
                author: author ?? proj.author,
                title: title ?? proj.title,
                shortDesc: shortDesc ?? proj.shortDesc,
                description: description ?? proj.description,
                tags: tags ?? proj.tags,
                version_num: version_num ?? proj.version_num,
                release_date: releaseDate,
                percentage: percentage ?? proj.percentage,
                version_percentage: version_percentage ?? proj.version_percentage,
                relative_image_link: relative_image_link ?? proj.relative_image_link,
                gitspedia_href: gitspedia_href ?? proj.gitspedia_href,
            }
        })
       await loadAllProjects(req, res, "Project with id " + id + "successfuly updated!");
    } catch (error) {
         res.status(500).json({message: "Server error! Could not create a project: " + error})
    }
}

export const DeleteProj = async (req, res) => {
    const {id} = req.body;

    try {
       
        if (id !== "all") {
             const foundProj = await prisma.cMSWebsiteProject.findUnique({
            where: {id: id}
        })
        if (foundProj === null) {
            return res.status(404).json({message: "Project not found with id " + id});
        }
             await prisma.cMSWebsiteProject.delete({
            where: {id: id}
        })
        await loadAllProjects(req, res, "Project with id " + id.trim() + " successfully deleted!");
        } else {
            await prisma.cMSWebsiteProject.deleteMany({});
             await res.status(201).json({ message: "All projects successfully deleted!"});
        }
       
        
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({message: `No project found with ID '${id.trim()}'.`});
        }
        console.error("Delete project failed:", error);
        return res.status(500).json({message: "Delete project failed."});
    }
}