const action = require('./action');

module.exports = {
	name: "htmlmin",
	description: "HTML 模板压缩",
	action: action,
	help: () => {
		console.log('  Examples:');
        console.log('');
        console.log('    $ zan htmlmin');
        console.log();
	}
};
