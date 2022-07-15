const { Schema, model } = require("mongoose");

const goalSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
