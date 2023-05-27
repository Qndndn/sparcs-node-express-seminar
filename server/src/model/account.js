const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	id : String,
	password: String,
	name: String,
	roomnum: Number,

	vocabularies: [mongoose.Schema.Types.ObjectId],
});

const AccountModel = mongoose.model("account", schema);

module.exports = AccountModel;