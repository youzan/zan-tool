const action = require('./action');

module.exports = {
	name: "dev",
	description: "本地开发，开启后端服务",
	options: [
		['--debug [debugName]', '开启 debug 模式']
	],
	action: action,
	help: () => {
		console.log('  Examples:');
        console.log('');
        console.log('    $ zan dev');
        console.log('    $ zan dev --debug');
        console.log('    $ zan dev --debug koa:application ');
        console.log();
	}
};
