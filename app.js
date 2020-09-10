const fs            = require('fs');
const path          = require('path');
const express       = require('express');
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv');
const cmd           = require('commander');
const Winston       = require('winston');
const EWinston      = require('express-winston');
const helmet        = require('helmet');

cmd.option('--env <ENV>', 'run in "ENV" environment', 'development');
cmd.parse(process.argv);

if (cmd.env === 'production') {
	dotenv.config({ path: path.join(__dirname, 'env', 'production.env') });
} else {
	dotenv.config({ path: path.join(__dirname, 'env', `${cmd.env}.env`) });
}

const port   = process.env.PORT;
const models = require('./models');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

EWinston.requestWhitelist.push('body');
EWinston.responseWhitelist.push('body');

app.use(EWinston.logger({
	transports: [
		new winston.transports.Console(),
	],
	metaField: 'API',
	format: winston.format.combine(
		winston.format.json()
	)
}));

app.use('/', routes);

models.sequelize.sync({}).then(() => {
	app.listen(port, () => {
		console.log(`server running at http://localhost:${port}`);
	});
});
