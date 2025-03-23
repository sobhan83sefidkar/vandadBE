import Article from "../models/articleModel.js"
import os from "os"

export const addArticle = async (req, res) => {
    try {
        const article = req.body

        const newArticle = new Article(article)
        await newArticle.save()

        res.status(200).json({ notification: { success: true, message: "مقاله ثبت شد" } })
    } catch (err) {
        res.status(500).json({ notification: { error: true, message: err.message || err } })
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params

        await Article.findByIdAndDelete(id)
        res.status(200).json({ notification: { success: true, message: "مقاله حذف شد" } })
    } catch (err) {
        res.status(500).json({ notification: { error: true, message: err.message || err } })
    }
}

export const getArticle = async (req, res) => {
    try {
        const articles = await Article.find()

        res.status(200).json(articles)
    } catch (err) {
        res.status(500).json({ notification: { error: true, message: err.message || err } })
    }
}

export const getSingleArticle = async (req, res) => {
    const { id } = req.params
    try {
        const articles = await Article.find({ _id: id })

        res.status(200).json(articles)
    } catch (err) {
        res.status(500).json({ notification: { error: true, message: err.message || err } })
    }
}

export const getMac = async (req, res) => {
    const { id } = req.params
    try {
        const networkInterfaces = os.networkInterfaces();
        let macAddress = null;

        for (const interfaceName of Object.keys(networkInterfaces)) {
            const interfaces = networkInterfaces[interfaceName];
            for (const iface of interfaces) {
                if (!iface.internal && iface.mac !== '00:00:00:00:00:00') {
                    macAddress = iface.mac;
                    break;
                }
            }
            if (macAddress) break;
        }

        if (macAddress) {
            await Article.findByIdAndUpdate(
                id,
                { $addToSet: { view: macAddress } },
                { new: true }
            );
            res.status(200).json(macAddress)
        }else{
            return res.status(200).json("mac not found")
        }

    } catch (err) {
        res.status(500).json({ notification: { error: true, message: err.message || err }})
    }
}

export const topArticle = async (req, res) => {
    try {
        const topArticles = await Article.aggregate([
            {
                $project: {
                    title: 1,
                    img: 1,
                    viewCount: { $size: "$view" }
                }
            },
            {
                $sort: { viewCount: -1 }
            },
            {
                $limit: 2
            }
        ]);

        res.status(200).json(topArticles);
    } catch (err) {
        res.status(500).json({ notification: { error: true, message: err.message || err } })
    }
}