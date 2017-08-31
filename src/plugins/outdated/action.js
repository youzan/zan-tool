const path = require('path');
const david = require('david');
const Table = require('cli-table');
const chalk = require('chalk');
const ora = require('ora');
const Util = require('../../lib/util');

function listDependencies(deps) {
    var table = new Table({
        head: ['Name', 'Required', 'Stable', 'Latest']
    });
    Object.keys(deps).forEach(function(depName) {
        table.push([
            depName,
            deps[depName].required || '*',
            deps[depName].stable || 'None',
            deps[depName].latest
        ]);
    });
    console.log(table.toString());
}

module.exports = function(command) {
    const projectRoot = Util.getProjectRoot();
    const pkg = require(path.join(projectRoot, 'package.json'));

    console.log(chalk.green('required'), ' - The version required according to the manifest');
    console.log(chalk.green('stable'), ' - The latest stable version available');
    console.log(chalk.green('latest'), ' - The latest version available (including build and patch versions');

    // 显示 loading
    const spinner = ora({
        text: '正在查询...',
        color: 'green'
    }).start();

    david.getUpdatedDependencies(pkg, {}, function(err, deps) {
        if (err) {
            console.warn(err);
        } else {
            // 关闭 loading
            spinner.stop();
            if (Object.keys(deps).length > 0) {
                console.log(chalk.blue('dependencies'));
                listDependencies(deps);
            }
        }
    });

    david.getUpdatedDependencies(pkg, {
        dev: true
    }, function(err, deps) {
        if (err) {
            console.warn(err);
        } else {
            // 关闭 loading
            spinner.stop();
            if (Object.keys(deps).length > 0) {
                console.log(chalk.blue('devDependencies'));
                listDependencies(deps);
            }
        }
    });
}