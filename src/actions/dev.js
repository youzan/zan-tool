const path = require('path');
const nodemon = require('nodemon');
const chalk = require('chalk');
const Util = require('../lib/util');

module.exports = function(command) {
    const projectRoot = Util.getProjectRoot();
    const config = {
        verbose: false,
        // nodeArgs: ['--harmony'],
        env: {
            NODE_ENV: 'development'
        },
        watch: [
            path.join(projectRoot, 'server/**/*.*')
        ],
        ignore: [

        ],
        script: path.join(projectRoot, 'server/babel.app.js')
    };

    // 传递了 --debug 参数，示例：
    // zan dev --debug
    // zan dev --debug koa:application
    if (command.debug && command.debug === true) {
        config.env.DEBUG = '*';
    } else if (command.debug && command.debug !== true) {
        config.env.DEBUG = command.debug;
    }

    nodemon(config).on('start', () => {
        console.log(chalk.green('应用启动中...'));
    }).on('quit', () => {
        console.log(chalk.green('✔ 应用退出成功'));
    }).on('restart', (files) => {
        console.log(chalk.green('监听到文件修改：', files));
    });
}