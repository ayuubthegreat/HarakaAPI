import express from "express";
import {CreateArticle, DeleteAllArticles, DeleteArticle, GetAllArticles, UpdateArticle} from "./gitspediaArticlesFunctions.js";

const router = express.Router();

router.get('/', GetAllArticles);
router.post('/', CreateArticle);
router.put('/:id', UpdateArticle);
router.delete('/:id', DeleteArticle)
router.delete('/', DeleteAllArticles);


export default router;