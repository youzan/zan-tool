const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const Checker = require('../../lib/checker');
const Util = require('../../lib/util');
const PrintHelper = require('../../lib/print_helper');

module.exports = function(command) {
    Checker.checkZanConfig();

    // 判断 zan.json 是否已配置 babel
    const config = Util.getProjectConfig();
    if (!config.babel) {
        console.log(chalk.red('当前项目 zan.json 配置文件里不存在 babel 相关配置，请先配置！'));
        PrintHelper.printConfigHelp();
        shelljs.exit(1);
    }
    
    console.log(chalk.green('开始任务：Babel 编译...'));

    const babelConfig = config.babel;
    const babelCliDirname = path.dirname(require.resolve('babel-cli'));
    const babelCli = `${babelCliDirname}/bin/babel.js`;
    console.log(chalk.green('babel-cli: ', babelCli));

    if (Array.isArray(babelConfig)) {
        for (let i = 0; i < babelConfig.length; i++) {
            if (command.watch) {
                shelljs.exec(`${babelCli} ${path.join(babelConfig[i].src)} --out-dir ${path.join(babelConfig[i].dest)} --copy-files --watch`);
            } else {
                shelljs.exec(`${babelCli} ${path.join(babelConfig[i].src)} --out-dir ${path.join(babelConfig[i].dest)} --copy-files`);
            }
        }
    } else {
        if (command.watch) {
            shelljs.exec(`${babelCli} ${path.join(babelConfig.src)} --out-dir ${path.join(babelConfig.dest)} --copy-files --watch`);
        } else {
            shelljs.exec(`${babelCli} ${path.join(babelConfig.src)} --out-dir ${path.join(babelConfig.dest)} --copy-files`);
        }
    }

    console.log(chalk.green('完成任务：Babel 编译完成'));
};
