const DIG = require("discord-image-generation");

module.exports = {
	config: {
		name: "testdig",
		version: "1.0",
		author: "ChatGPT",
		role: 0,
		countDown: 5,
		category: "test",
		shortDescription: {
			en: "Test DIG"
		}
	},

	onStart: async function ({ message }) {
		message.reply(Object.keys(DIG).join("\n"));
	}
};
