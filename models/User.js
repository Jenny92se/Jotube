import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  }]
});

/* passport와 mongoDB를 연결하는 매소드로서
  자동으로 salt, hash(password를 해쉬해서 생성) 필드를 생성해줌.. */

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

const model = mongoose.model("User", UserSchema);

export default model;