import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        admin: {type: Boolean},
        blogs: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'blog' }]
    },
    { timestamps: true },
)
userSchema.pre('save', function(next) {
    const user = this

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            res.json({ success: false, msg: err.message })
        } else {
            bcrypt.hash(user.password, salt, function(err, hashed) {
                if (err) {
                    return next(err)
                }
                user.password = hashed
                next()
            })
        }
    })
})

userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err)
        }
  
        resolve(same)
      })
    })
  }

export const User = mongoose.model('users', userSchema)