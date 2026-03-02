import api from "./Api";

const getAllNotes = async (params) => {
  const response = await api.get("/notes", { params });
  return response.data;
};

const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

const uploadNote = async (noteData) => {
  // Use FormData for file uploads
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await api.post("/notes", noteData, config);
  return response.data;
};

const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export default { getAllNotes, getNoteById, uploadNote, updateNote, deleteNote };