import express from "express"
import { addArticle, deleteArticle, getArticle , getSingleArticle , getMac , topArticle} from "../controller/articleController.js"

const router = express.Router()

router.post("/add-article" , addArticle)
router.delete("/delete-article/:id" , deleteArticle)
router.get("/get-article" , getArticle)
router.get("/get-single-article/:id" , getSingleArticle)
router.get("/get-mac/:id" , getMac)
router.get("/top-article" , topArticle)

export default router