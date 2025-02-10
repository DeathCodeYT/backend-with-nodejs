import { asyncWrapper } from "../../middlewares/asyncWrapper.js";
import { Note } from "../../models/note.model.js";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/apiRes.js";

export const createNote = asyncWrapper(async (req, res, next) => {
  const { title, content, tags } = req.body;
  if (!title) {
    throw new ApiError(400, "Title is required");
  }
  if (!content) {
    throw new ApiError(400, "Content is required");
  }
  const note = new Note({
    title,
    content,
    tags: tags || [],
    user: req.user._id,
  });
  await note.save();
  res.status(201).json(new ApiResponse(201, true, note, "Note Created"));
});
export const getNotes = asyncWrapper(async (req, res, next) => {
  const query = { user: req.user._id };
  const { search, tags } = req.query;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  if (tags) {
    query.tags = { $in: tags.split(",") };
  }
  const notes = await Note.find(query).populate("user", "username name");
  res.status(200).json(new ApiResponse(200, true, notes, "Notes Retrieved"));
});
export const updateNote = asyncWrapper(async (req, res, next) => {
  const { title, content, tags } = req.body;
  const { id } = req.params;
  const note = await Note.findById(id).populate("user");
  if (!note) {
    throw new ApiError(404, "Note not found");
  }
  if (req.user._id.toString() != note.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this note");
  }
  note.title = title ? title : note.title;
  note.content = content ? content : note.content;
  note.tags = tags ? tags : note.tags;

  await note.save();
  res.status(200).json(new ApiResponse(200, true, note, "Note Updated"));
});
export const deleteNote = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findById(id).populate("user");
  if (!note) {
    throw new ApiError(404, "Note not found");
  }
  if (req.user._id.toString() != note.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this note");
  }
  await Note.findByIdAndDelete(id, { new: true });
  res.status(200).json(new ApiResponse(200, true, null, "Note Deleted"));
});
