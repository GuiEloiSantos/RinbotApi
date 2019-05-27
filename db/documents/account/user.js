let mongoose = require('mongoose');
let Schema = mongoose.Schema;

import Account from './account';

/**
 * User is the representation of a system user, each user will have their
 * credentials, login details and personal information assigned to it.
 *
 * It has also an reference to the account it belongs to and it is under
 * the account plan.
 * @type {Schema}
 */
const user = new Schema(
    {
        name: {type: String, default: ""},
        auth0_user_id: {type: String, unique: true, index: true, required: true},
        account_id: {type: Schemas.Types.ObjectId, ref: 'account'},
        phone: {type: String},
        timezone: {type: String, default: 'America/Los_Angeles'}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

user.static({
    /**
     * This function creates a new user, it is also a way to prevent someone
     * of using create directly and by doing so bypass any middleware I might try
     * to use on save
     * @param data
     * @param account instance of the Account the user belongs to
     */
    create: (data, account) => {

        if (!account instanceof Account) {
            throw new Error(
                'An account is required so the user can be created'
            );
        }
        let User = this.model('User');
        let user = new User();

        user.account_id = account.id;

        user.name = data.name;
        user.auth0_user_id = data.auth0_user_id;
        user.phone = data.phone;

        user.timezone = data.timezone;

        return user.save();
    }
});

module.exports = mongoose.model('user', user);