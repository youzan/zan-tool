const chalk = require('chalk');
const Table = require('cli-table');
const conf = require('../../lib/conf');

module.exports = function(...args) {
    // console.log(args);
    if (args.length === 2) {
        if (args[1].get) { // get 操作
            conf.get(args[0]);
        } else if (args[1].set) { // set 操作
            conf.set(args[0]);
        } else if (args[1].delete) {
            conf.delete(args[0]);
        }
    } else if (args.length === 1) {
        if (args[0].list) {
            conf.list();
        } else {
            console.log(chalk.red('参数错误！'));
        }
    } else {
        console.log(chalk.red('参数错误！'));
    }
    process.exit(0);
};