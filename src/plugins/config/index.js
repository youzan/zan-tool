const action = require('./action');

module.exports = {
    name: 'config',
    description: '配置信息查看、编辑',
    options: [
        ['-l, --list', '显示全部配置信息'],
        ['-g --get', '获取配置信息'],
        ['-s, --set', '设置配置信息'],
        ['-d --delete', '删除配置信息']
    ],
    action: action,
    help: () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan config -l');
        console.log('    $ zan config --list');
        console.log();
    }
};