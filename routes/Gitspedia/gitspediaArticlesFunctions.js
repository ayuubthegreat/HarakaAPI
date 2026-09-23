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
    console.log(req.body);
    const { id } = req.params;
    const {title, searchBlurb, titleImageLink, mainParagraph, paragraphs, infoboxFields, tags, views} = req.body;
    if (!title || !searchBlurb || !titleImageLink || !mainParagraph || !paragraphs || !infoboxFields || !tags || views === undefined) {
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
                tags,
                views
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

// Comments Region 
export const LoadComments = async (req, res) => {
    const { articleID } = req.params;
    try {
        const comments = await prisma.gitspediaArticleComment.findMany({
            where: { articleID: articleID }
        });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load comments" });
    }
}
export const CreateComment = async (req, res) => {
    const { articleID } = req.params;
    const { username, email, content } = req.body;
    if (!username || !email || !content) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const newComment = await prisma.gitspediaArticleComment.create({
            data: {
                articleID,
                username,
                email,
                content
            }
        });
        const allComments = await prisma.gitspediaArticleComment.findMany({
            where: { articleID: articleID }
        });
        res.status(201).json({ success: true, message: "Comment added successfully", data: allComments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add comment" });
    }
}
export const UpdateComment = async (req, res) => {
    const { id } = req.params;
    const { username, email, content } = req.body;
    if (!username || !email || !content) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    try {
        const updatedComment = await prisma.gitspediaArticleComment.update({
            where: { id: id },
            data: {
                username,
                email,
                content
            }
        });
        res.status(200).json({ success: true, message: "Comment updated successfully", data: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update comment" });
    }
}
export const DeleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComment = await prisma.gitspediaArticleComment.delete({
            where: { id: id }
        });
        const allComments = await prisma.gitspediaArticleComment.findMany({
            where: { articleID: deletedComment.articleID }
        });
        res.status(200).json({ success: true, message: "Comment deleted successfully", data: allComments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}