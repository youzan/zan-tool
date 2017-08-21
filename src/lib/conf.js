const chalk = require('chalk');
const Table = require('cli-table');
const Conf = require('conf');

const conf = new Conf({
    configName: 'zantool.conf'
});

module.exports = {

    list() {
        const config = conf.get();
        let table = new Table({
            head: ['name', 'description']
        });
        for (let i in config) {
            table.push([i, config[i]]);
        }
        console.log(table.toString());
    },

    get(key) {
        const config = conf.get(key);
        if (config) {
            let table = new Table({
                head: ['name', 'description']
            });
            table.push([key, config]);
            console.log(table.toString());
        } else {
            console.log(chalk.red(`配置信息 ${key} 不存在`));
        }
    },

    set(key, value) {
        const arr = key.split('=');
        if (arr.length !== 2) {
            console.log(chalk.red('参数错误！'));
            console.log('');
            console.log(chalk.green('  Examples:'));
            console.log('');
            console.log(chalk.green('    $ zan config --set key=value'));
            console.log();
        } else {
            conf.set(arr[0], arr[1]);
            console.log(chalk.green('设置成功'));
            this.list();
        }
    },

    delete(key) {
        if (conf.has(key)) {
            conf.delete(key);
            console.log(chalk.green('删除成功'));
        } else {
            console.log(chalk.red(`配置信息 ${key} 不存在`));
        }
        this.list();
    }


};