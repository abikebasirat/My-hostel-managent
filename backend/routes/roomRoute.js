const express = require("express");
const { createNewRoom, getAllRooms, getRoom, updateRoom, deleteRoom } = require("../controllers/roomController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")


router.post("/createNewRoom", createNewRoom )
router.get("/get-all-rooms", getAllRooms)
router.get("/get-single-room/:roomId", getRoom);
router.patch("/update-room/:roomId", updateRoom);
router.delete("/delete-room/:roomId", deleteRoom);



module.exports = router;
