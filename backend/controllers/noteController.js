const notes = [];
let nextId = 1;

exports.createNote = (req, res) => {
  const { title, content } = req.body;

  const now = new Date().toISOString();

  const note = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
  };

  notes.push(note);

  console.log("[notes] created:", note);

  return res.status(201).json({
    success: true,
    data: note,
  });
};

exports.getNotes = (req, res) => {
  console.log(`[notes] list requested (${notes.length} notes)`);

  return res.status(200).json({
    success: true,
    data: notes,
  });
};

exports.getNote = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid note ID",
    });
  }

  const note = notes.find((note) => note.id === id);

  if (!note) {
    console.log(`[notes] get failed: id ${id} not found`);
    return res.status(404).json({
      success: false,
      error: "Note not found",
    });
  }

  console.log("[notes] fetched:", note);

  return res.status(200).json({
    success: true,
    data: note,
  });
};

exports.updateNote = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid note ID",
    });
  }

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      success: false,
      error: "Note not found",
    });
  }

  const { title, content } = req.body;

  note.title = title.trim();
  note.content = content.trim();
  note.updatedAt = new Date().toISOString();

  console.log("[notes] updated:", note);

  return res.status(200).json({
    success: true,
    data: note,
  });
};

exports.deleteNote = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid note ID",
    });
  }

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    console.log(`[notes] delete failed: id ${id} not found`);
    return res.status(404).json({
      success: false,
      error: "Note not found",
    });
  }

  const [deletedNote] = notes.splice(noteIndex, 1);

  console.log("[notes] deleted:", deletedNote);

  return res.status(204).send();
};