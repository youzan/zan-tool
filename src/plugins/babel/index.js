const action = require('./action');

module.exports = {
    name: "babel",
    description: "Babel 编译文件",
    options: [
        ['--watch', '开启 watch 模式']
    ],
    help: () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan babel');
        console.log('    $ zan babel --watch');
        console.log();
    },
    action: action
};