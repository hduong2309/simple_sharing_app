const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();
const verifyToken = require("./authMiddleware");

router.post("/", async (request, response) => {});

router.get("/photosOfUser/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId, "_id first_name last_name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const photos = await Photo.find(
      { user_id: userId },
      "_id user_id comments file_name date_time",
    ).lean();

    const photosOfUser = photos.map((photo) => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map((comment) => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: {
          _id: comment.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      })),
    }));

    res.json(photosOfUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:photoId", verifyToken, async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.status(201).json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to fetch photo detail" });
  }
});

router.post("/new", verifyToken, async (req, res) => {
  try {
    const { file_name, user_id, comments } = req.body;

    const newPhoto = new Photo({
      file_name,
      user_id,
      comments,
    });

    await newPhoto.save();

    res
      .status(201)
      .json({ message: "Photo added successfully", photo: newPhoto });
  } catch (error) {
    console.error("Error adding photo:", error);
    res.status(500).json({ message: "Error adding photo" });
  }
});

router.post("/commentsOfPhoto/:photoId", verifyToken, async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const { comment, userId } = req.body;

    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    photo.comments.push({ comment, user_id: userId });

    const updatedPhoto = await photo.save();

    res.status(201).json(updatedPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng comment" });
  }
});

module.exports = router;
