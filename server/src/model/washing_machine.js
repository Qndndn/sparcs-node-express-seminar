const mongoose = require("mongoose");

const OSchemaDefinition = new mongoose.Schema({
	floor: {
		type: Number,
		default: 1,
	},
	direction: {
		type: Number,
		default: 1,
	},
	location: {
		type: String,
		default: "a",
	},
	name: {
		type: String
	},
	
	explanation: String,
	start_time: Number,
	finish_time: Number,

	tags: [mongoose.Schema.Types.ObjectId],
});

const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const Washing_MachineModel = mongoose.model("washing_machine", schema);

module.exports = Washing_MachineModel;