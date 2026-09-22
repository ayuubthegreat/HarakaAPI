import express from "express";
import {LoadArticles, LoadArticleByID, CreateArticle, UpdateArticle, DeleteArticle} from "./muftipediaArticlesFunctions.js";

const router = express.Router();

router.get("/", LoadArticles);
router.get("/:id", LoadArticleByID);
router.post("/", CreateArticle);
router.put("/:id", UpdateArticle);
router.delete("/:id", DeleteArticle);

export default router;