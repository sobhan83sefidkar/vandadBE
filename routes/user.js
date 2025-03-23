import express from "express"
import { register, login, checkAuth , getUser, logout} from "../controller/userController.js"
import { checkLogin } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login",  login)
router.get("/logout",  logout)
router.get("/check-auth", checkLogin ,checkAuth)
router.get("/get-users", getUser)

export default router