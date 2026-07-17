const DIG = require("discord-image-generation");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
	config: {
		name: "kiss",
		version: "1.0",
		author: "Fahim + ChatGPT",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Kiss someone"
		},
		longDescription: {
			en: "Generate kiss image"
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

			const img = await new DIG.Kiss().getImage(avatar1, avatar2);

			const tmpDir = path.join(__dirname, "tmp");
			await fs.ensureDir(tmpDir);

			const savePath = path.join(tmpDir, `${uid1}_${uid2}_kiss.png`);

			fs.writeFileSync(savePath, img);

			await message.reply({
				body: "😘 | Kiss!",
				attachment: fs.createReadStream(savePath)
			});

			fs.unlinkSync(savePath);

		} catch (e) {
			console.log(e);
			message.reply("❌ Error:\n" + e.message);
		}
	}
};
