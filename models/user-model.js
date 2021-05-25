const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			unique: true,
			required: "username is required",
		},

		password: {
			type: String,
			required: "Password is required",
		},
	},
	{ timestamps: true }
);

UserSchema.path("password").validate(function (v) {
	if (this.password && this.password.length < 6) {
		this.invalidate("password", "Password must be at least 6 characters.");
	}
	if (this.isNew && !this.password) {
		this.invalidate("password", "Password is required");
	}
}, null);

UserSchema.methods = {
	authenticate: async function (plainText) {
		try {
			// console.log(plainText);
			let result = await bcrypt.compare(plainText, this.password);
			// console.log(result);
			return result;
		} catch (error) {
			console.log(error.message);
			return false;
		}
	},
	encryptPassword: async function (password) {
		if (!password) return "";
		try {
			let hash = await bcrypt.hash(password, 10);
			return hash;
		} catch (error) {
			console.log(error);
			return "";
		}
	},
};

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next(); // Run only when password field is changed
	this.password = await this.encryptPassword(this.password);
	next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
