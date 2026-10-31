import prisma from "../../lib/prisma.js";


export const GetAllArticles = async (req, res, message = "Article retrieval successful!") => {
    try {
        const allArticles = await prisma.articleModel.findMany({});
        console.log(allArticles);
        return res.status(200).json({message, data: allArticles});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error: " + error});
    }
}
export const CreateArticle = async (req, res) => {
    const {title, slug, short_desc, long_desc, main_paragraph, content, infoboxFields, displayImageContent} = req.body;
    try {
        await prisma.articleModel.create({
            data: {
                website_name : "Gitspedia",
                title: title ?? "An Article",
                slug: slug ?? "an-article",
                short_desc: short_desc ?? "A standard article",
                long_desc: long_desc ?? "Created by CMS, this standard article is awesome!",
                main_paragraph: main_paragraph ?? "<i>Article body not created.</i>",
                content: content ?? [{
                    type: "paragraph",
                    text: "A paragraph"
                }],
                infoboxFields: infoboxFields ?? [{
                    key: "Created on",
                    value: "Today"
                }],
                displayImageContent: displayImageContent ?? [{
                    type: "image-link",
                    value: "www.image.com"
                }],
            }
        })
        await GetAllArticles(req, res, "Article creation successful!")
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error: " + error});
    }
}
export const UpdateArticle = async (req, res) => {
    const {id} = req.params;
    const {title, slug, short_desc, long_desc, content, main_paragraph, infoboxFields, displayImageContent} = req.body;
    try {
        await prisma.articleModel.update({
            where: {id: id},
            data: {
                website_name: "Gitspedia",
                title,
                slug,
                short_desc,
                long_desc,
                main_paragraph,
                content,
                infoboxFields,
                displayImageContent
            }
        })
        await GetAllArticles(req, res, "Updating article successful!")
    } catch (error) {
        return res.status(500).json({message: "Error: " + error});
    }
}
export const DeleteArticle = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        await prisma.articleModel.delete({
            where: {id: id},
        })
        await GetAllArticles(req, res, "Article deletion successful!")
    } catch (error) {
        res.status(500).json({message: "Error: " + error});
    }
}
export const DeleteAllArticles = async (req, res) => {
    try {
        await prisma.articleModel.deleteMany({});
        await GetAllArticles(req, res, "All articles deleted!");
    }catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error: " + error});
        
    }
}
export const AppendNote = async (req, res) => {
    try {
        const {note} = req.body;
        
    } catch (error) {
        console.error(error);
    }
}
