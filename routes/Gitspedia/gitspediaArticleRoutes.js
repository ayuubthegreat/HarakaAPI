import express from "express";
import {LoadArticles, LoadArticleByID, CreateArticle, UpdateArticle, DeleteArticle, LoadComments, CreateComment, DeleteComment, UpdateComment} from "./gitspediaArticlesFunctions.js";

const router = express.Router();

router.get("/", LoadArticles);
router.get("/:id", LoadArticleByID);
router.post("/", CreateArticle);
router.put("/:id", UpdateArticle);
router.delete("/:id", DeleteArticle);
router.get("/comments/:articleID", LoadComments);
router.post("/comments/:articleID", CreateComment);
router.delete("/comments/:id", DeleteComment);
router.put("/comments/:id", UpdateComment);
export default router;