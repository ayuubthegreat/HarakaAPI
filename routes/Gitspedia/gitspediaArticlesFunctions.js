import prisma from "../../lib/prisma.js";


export const LoadArticles = async (req, res) => {
    try {
        const articles = await prisma.gitspediaArticle.findMany();
        res.status(200).json({ success: true, message: "Articles fetched successfully", data: articles });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
}

export const LoadArticleByID = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await prisma.gitspediaArticle.findUnique({
            where: { id: id, }
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
    const {title, searchBlurb, titleImageLink, mainParagraph, paragraphs, infobox} = req.body;
    if (!title || !searchBlurb || !titleImageLink || !mainParagraph || !paragraphs || !infobox) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const newArticle = await prisma.gitspediaArticle.create({
            data: {
                title,
                searchBlurb,
                titleImageLink,
                mainParagraph,
                paragraphs,
                infobox
            }
        });
        res.status(201).json({ success: true, message: "Article created successfully", data: newArticle });
    } catch (error) {
        res.status(500).json({ error: "Failed to create article" });
    }
}