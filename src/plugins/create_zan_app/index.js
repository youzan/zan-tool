const action = require('./action');

module.exports = {
	name: "init <projectName>",
	description: "初始化一个新的 ZanNode Web 项目",
	action: action,
	help: () => {
		console.log('  Examples:');
        console.log('');
        console.log('    $ zan init intro');
        console.log();
	}
};
