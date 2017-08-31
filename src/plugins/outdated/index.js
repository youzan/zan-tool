const action = require('./action');

module.exports = {
    name: "outdated",
    description: "检测当前项目已经过时的 NPM 包",
    action: action,
    help: () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan outdated');
        console.log();
    }
};
