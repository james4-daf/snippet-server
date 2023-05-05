const mongoose = require("mongoose");

const CodeType = {
  type: [String],
  trim: true,
  set: function (value) {
    // Remove leading/trailing comments from the code snippet
    return value.split("\n").map((line) => line.trim());
  },
};

let SnippetSchema = new mongoose.Schema({
  title: String,
  code: CodeType,
  tags: String,
});

let SnippetModel = mongoose.model("snippet", SnippetSchema);

module.exports = SnippetModel;
