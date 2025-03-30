import Comment from "../models/comment.js"

export const addComment = async (req, res) => {
    try {
        const comment = req.body


        const newComment = new Comment(comment)
        await newComment.save()

        res.status(200).json({ notification: { success: true, message: "دیدگاه شما ارسال شد" } })
    } catch (err) {
        res.status(500).json({ notification: { success: false, message: err.message || err } })
    }
}

export const getComment = async (req, res) => {
    try {
        const comment = (await Comment.find().populate('articleId').sort({ _id: -1 }).exec())

        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ notification: { success: false , message: err.message || err}})
    }
}

export const getShowComment = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const comment = await Comment.find({ articleId : id , isShow: true });

        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ notification: { success: false , message: err.message || err}})
    }
}


export const putComment = async (req, res) => {
    try {
        const { id } = req.params

        await Comment.findByIdAndUpdate(id, { isShow: true }, { new: true });

        res.status(200).json({ notification: { success: true, message: "این دیدگاه به نمایش گذاشته شد" } })
    } catch (err) {
        res.status(500).json({ notification: { success: false , message: err.message || err}})
    }
}
