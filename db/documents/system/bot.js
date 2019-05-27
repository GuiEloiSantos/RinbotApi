import Account from "../account/account";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * Bot is the of a generic bot
 * @type {Schema}
 */
const bot = new Schema(
    {
        name: {type: String, default: ''},
        account_id: {type: Schemas.Types.ObjectId, ref: 'account'},
        messenger: {
            accessToken: { type: String, index: true},
            verifyToken: { type: String, index: true},
            appSecret: { type: String, index: true}
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

bot.static({
    /**
     * This function creates a new bot, it is also a way to prevent someone
     * of using create directly and by doing so bypass any middleware I might try
     * to use on save
     * @param data
     * @param account instance of the Account the bot belongs to
     */
    create: (data, account) => {

        if (!account instanceof Account) {
            throw new Error(
                'An account is required so the bot can be created'
            );
        }
        let Bot = this.model('bot');
        let bot = new Bot();
        bot.name = data.name;
        bot.account_id = data.account_id;

        return bot.save();
    }
});

module.exports = mongoose.model('bot', bot);