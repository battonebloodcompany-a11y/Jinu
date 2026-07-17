module.exports = {
  config: {
    name: "hug",
    version: "1.0",
    author: "Fahim",
    role: 0,
    countDown: 5,
    category: "image",
    shortDescription: {
      en: "Hug someone"
    }
  },

  onStart: async function ({ message }) {
    return message.reply("🚧 Hug command is under construction...");
  }
};
