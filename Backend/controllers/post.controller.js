// import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.models.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try{
        const clearkUserId = req.auth.userId;
        if(!clearkUserId){
            return res.status(401).json("not authenticated")
        }
        const user = await User.findOne({clearkUserId});
        if(!user){
            return res.status(404).json("user not found")
        }
        let slug = req.body.title.replace(/ /g, "-").toLowerCase();
        let existingPost = await Post.findOne({ slug });
        let counter = 2;
        while (existingPost) {
            slug = `${slug}-${counter}`;
            existingPost = await Post.findOne({ slug });
            counter++;
        }
        const post = new Post({user:user._id,slug,...req.body});
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json("not authenticated");
    }
    const user = await User.findOne({clerkUserId})
    if (!user) {
        return res.status(404).json("user not found");
    }
    const post = await Post.findOneAndDelete({
        _id: req.params.id,
        user: user._id
    })
    
};

export const featurePost = async (req, res) => {


};

// const imagekit = new ImageKit({
// });

// export const uploadAuth = async (req, res) => {

// };