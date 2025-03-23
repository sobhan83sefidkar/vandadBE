import express from "express"
import { report , getUserReport ,filterReport } from "../controller/reportController.js"

const router = express.Router()

router.post("/add-report" , report)
router.get("/get-user-report/:id" , getUserReport)
router.get("/filter-report" , filterReport)

export default router;