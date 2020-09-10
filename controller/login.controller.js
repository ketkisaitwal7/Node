const db = require('../db');

/**
 * this function handles login action
 * post via API call and returns a valid
 * TOKEN if auth credentials were correct
 *
 * @param {express.Request} req express request object
 * @param {express.Response} res express response object
 */
async function loginAction(req, res) {
	res.sendStatus(500);
}


module.exports = {
	loginAction,
}
