const { Schema, model } = require('mongoose');

//defining User Schema
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,

        //validator for email address
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
  },
  {
    toJSON: {
      // TODO: Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual method to get total friends count
userSchema.virtual('friendCount').get(function () {
  return `friends: ${this.friends.length}`;
  });


// Initialize our User model
const User = model('User', userSchema);

//export User Model
module.exports = User;