import Report from "../models/reportModel.js"

export const report = async (req, res) => {
    try {
        const report = req.body

        const newReport = new Report(report)
        await newReport.save()

        res.status(200).json({ notification: { success: true, message: "گزارش با موفقیت ثبت شد" } })
    } catch (err) {
        res.status(500).json({ notification: { success: false, message: err.message || err } })
    }
}

export const getUserReport = async (req, res) => {
    const { id } = req.params
    try {
        const response = await Report.find({ _id: id })

        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ notification: { success: false, message: err.message || err } })
    }
}

export const filterReport = async (req, res) => {
    const { username } = req.query
    try {
        if (username === "all") {
            let report = await Report.find().sort({ createdAt: -1 })
            return res.status(200).json(report)
        }
        let query = {
            username: { $regex: username, $options: 'i' }
        }

        let report = await Report.find(query).sort({ createdAt: -1 })
        res.status(200).json(report)
    } catch (err) {
        res.status(500).json({ notification: { success: false, message: err.message || err } })
    }
}