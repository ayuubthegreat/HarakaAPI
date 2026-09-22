import prisma from "../../lib/prisma.js";


export const LoadArticles = async (req, res) => {
    try {
        const articles = await prisma.gitspediaArticle.findMany({include: { paragraphs: true, infoboxFields: true }});
        for (const article of articles) {
            if (!article.tags) {
                article.tags = [];
            }
        }
        res.status(200).json({ success: true, message: "Articles fetched successfully", data: articles });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
}

export const LoadArticleByID = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await prisma.gitspediaArticle.findUnique({
            where: { id: id, },
            include: { paragraphs: true, infoboxFields: true }
        });
        if (!article) {
            return res.status(404).json({ success: false, message: "Article not found" });
        }
        res.status(200).json({ success: true, message: "Article fetched successfully", data: article });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch article" });
    }
}

export const CreateArticle = async (req, res) => {
    const {title, searchBlurb, titleImageLink, mainParagraph, paragraphs, infoboxFields, tags} = req.body;
    if (!title || !searchBlurb || !titleImageLink || !mainParagraph || !paragraphs || !infoboxFields || !tags) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    console.log(req.body);
    try {
        const newArticle = await prisma.gitspediaArticle.create({
            data: {
                title,
                searchBlurb,
                titleImageLink,
                mainParagraph,
                paragraphs: { create: paragraphs },
                infoboxFields: { create: infoboxFields },
                tags
            }
        });
       
        res.status(201).json({ success: true, message: "Article created successfully", data: newArticle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create article" });
    }
}

export const UpdateArticle = async (req, res) => {
    const { id } = req.params;
    const {title, searchBlurb, titleImageLink, mainParagraph, paragraphs, infoboxFields, tags} = req.body;
    if (!title || !searchBlurb || !titleImageLink || !mainParagraph || !paragraphs || !infoboxFields) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    for (const paragraph of paragraphs) {
        delete paragraph.articleID;
    }
    for (const infobox of infoboxFields) {
        delete infobox.articleID;
    }
    try {
        const updatedArticle = await prisma.gitspediaArticle.update({
            where: { id: id },
            data: {
                title,
                searchBlurb,
                titleImageLink,
                mainParagraph,
                paragraphs: { deleteMany: {}, create: paragraphs },
                infoboxFields: { deleteMany: {}, create: infoboxFields },
                tags
            }
        });
        const allArticles = await prisma.gitspediaArticle.findMany({include: { paragraphs: true, infoboxFields: true }});
        res.status(200).json({ success: true, message: "Article updated successfully", data: allArticles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update article" });
    }
}

export const DeleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await prisma.gitspediaArticle.delete({
            where: { id: id }
        });
        res.status(200).json({ success: true, message: "Article deleted successfully", data: deletedArticle });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete article" });
    }
}