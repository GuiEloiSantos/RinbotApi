let mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * Account is the representation of a billable entity that might be associated
 * with one or many users
 * @type {Schema}
 */
const account = new Schema(
    {
        timezone: {type: String, default: 'America/Los_Angeles'}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

account.static({
    /**
     * This function creates a new account, it is also a way to prevent someone
     * of using create directly and by doing so bypass any middleware I might try
     * to use on save
     * @param data
     */
    create: (data) => {
        let Account = this.model('account');
        let account = new Account();

        account.timezone = data.timezone;
        return account.save();
    }
});

module.exports = mongoose.model('account', account);