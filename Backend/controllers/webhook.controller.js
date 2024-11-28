import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRECT;

  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ message: "Webhook secret needed!" });
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ message: "Webhook verification failed!" });
  }

  // console.log(evt.data);

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    try {
      await newUser.save();
      return res.status(200).json({ message: "User created successfully!" });
    } catch (err) {
      console.error("Error saving new user:", err);
      return res.status(500).json({ message: "Error saving new user!" });
    }
  }

  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    if (deletedUser) {
      await Post.deleteMany({ user: deletedUser._id });
      await Comment.deleteMany({ user: deletedUser._id });
      return res.status(200).json({ message: "User and related data deleted successfully!" });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  }

  return res.status(400).json({ message: "Unhandled event type!" });
};