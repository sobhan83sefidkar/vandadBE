import express from "express"
import { addComment, getComment, putComment , getShowComment} from "../controller/commentcontroller.js"

const router = express.Router()

router.post("/add-comment" , addComment)
router.put("/show-comment/:id" , putComment)
router.get("/get-comment" , getComment)
router.get("/get-show-comment/:id" , getShowComment)

export default router