const DIG = require("discord-image-generation");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
	config: {
		name: "slap",
		version: "1.0",
		author: "Fahim + ChatGPT",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Slap someone"
		},
		longDescription: {
			en: "Create a batslap image"
		},
		category: "fun",
		guide: {
			en: "{pn} @mention"
		}
	},

	onStart: async function ({ event, message, usersData }) {
		try {
			const uid1 = event.senderID;
			const uid2 = Object.keys(event.mentions)[0];

			if (!uid2)
				return message.reply("❌ | Tag someone.");

			const avatar1 = await usersData.getAvatarUrl(uid1);
			const avatar2 = await usersData.getAvatarUrl(uid2);

			const img = await new DIG.Batslap().getImage(
				avatar1,
				avatar2
			);

			const tmpDir = path.join(__dirname, "tmp");
			await fs.ensureDir(tmpDir);

			const filePath = path.join(
				tmpDir,
				`${uid1}_${uid2}.png`
			);

			fs.writeFileSync(filePath, img);

			await message.reply({
				body: "🥴 Slapped!",
				attachment: fs.createReadStream(filePath)
			});

			fs.unlinkSync(filePath);

		} catch (e) {
			console.log(e);
			message.reply("❌ Error:\n" + e.message);
		}
	}
};
