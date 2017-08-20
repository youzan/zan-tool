const action = require('./action');

module.exports = {
    name: "module <moduleName>",
    description: "初始化一个 NPM 包项目",
    action: action,
    help: () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan module demo');
        console.log();
    }
};