const DIG = require("discord-image-generation");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
	config: {
		name: "hug",
		version: "1.0",
		author: "Fahim + ChatGPT",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Hug someone"
		},
		longDescription: {
			en: "Generate a hug image"
		},
		category: "image",
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

			const img = await new DIG.Hug().getImage(avatar1, avatar2);

			const tmpDir = path.join(__dirname, "tmp");
			await fs.ensureDir(tmpDir);

			const filePath = path.join(tmpDir, `${uid1}_${uid2}_hug.png`);

			fs.writeFileSync(filePath, img);

			await message.reply({
				body: "🤗 Hug!",
				attachment: fs.createReadStream(filePath)
			});

			fs.unlinkSync(filePath);

		} catch (e) {
			console.log(e);
			message.reply("❌ Error:\n" + e.message);
		}
	}
};
