const mongoose = require("mongoose");
const { config } = require("./../config/config");

mongoose
	.connect(config.mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log("Database connected successfully"))
	.catch((err) => console.log(err));

mongoose.connection.on("error", () => {
	throw new Error(`unable to connect to database `);
});
