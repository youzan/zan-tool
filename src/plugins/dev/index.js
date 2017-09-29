const action = require('./action');

module.exports = {
    name: "dev",
    description: "本地开发，开启后端服务",
    options: [
        ['--debug [debugName]', '开启 debug 模式'],
        ['--mock [proxyUrl]', '开启 mock 模式，默认 proxy 地址为http://127.0.0.1:8001'],
        ['--env [NODE_ENV]', '设置 NODE_ENV 环境变量']
    ],
    action: action,
    help: () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan dev');
        console.log('    $ zan dev --debug');
        console.log('    $ zan dev --debug koa:application');
        console.log('    $ zan dev --mock');
        console.log('    $ zan dev --mock http://127.0.0.1:8001');
        console.log('    $ zan dev --debug --mock');
        console.log('    $ zan dev --env pre');
        console.log();
    }
};
