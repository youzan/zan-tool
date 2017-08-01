const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const Util = require('./util');


module.exports = {

    // 打印 Zan Tool Logo
    printLogo() {
        let logoTxt = fs.readFileSync(path.join(Util.getRootPath(), 'logo.txt'));
        console.log(chalk.magenta(logoTxt));
        console.log(chalk.green('----------- 有赞出品，必属精品 https://github.com/youzan -----------\n'));
    },

    printConfigHelp() {
        console.log(chalk.red(`更多有关 zan.json 配置文件介绍，请参考文档：${chalk.blue('https://www.npmjs.com/package/zan-tool')}`));
    },

};
