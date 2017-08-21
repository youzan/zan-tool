const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const lodash = require('lodash');
const inquirer = require('inquirer');
const download = require('download');
const ejs = require('ejs');
const boxen = require('boxen');
const ora = require('ora');
const Util = require('../../lib/util');
const ZAN_NODE_TEMPLATE = 'https://github.com/youzan/zan-template/archive/master.zip';

module.exports = function(projectName, command) {
    if (fs.existsSync(projectName)) {
        console.log(chalk.red(`创建失败，当前目录 ${projectName} 已存在`));
        return;
    }

    let promps = [{
        type: 'input',
        name: 'name',
        message: '请输入项目名:',
        default: `${projectName}`,
        validate(input) {
            if (!input) {
                return '项目名不能为空';
            }
            return true;
        }
    }, {
        type: 'input',
        name: 'version',
        default: '0.0.1',
        message: '请输入项目版本号:'
    }, {
        type: 'input',
        name: 'description',
        message: '请输入项目描述信息:'
    }, {
        type: 'input',
        name: 'keywords',
        message: '请输入项目关键字（多个关键字之间用空格隔开）:'
    }, {
        type: 'input',
        name: 'author',
        message: '请输入项目作者信息:'
    }];

    inquirer.prompt(promps).then((answers) => {
        answers.keywords = answers.keywords ? answers.keywords.split(' ') : [];
        let downloadPath = path.join(Util.getRootPath(), 'downloads/');
        // 显示 loading
        const spinner = ora({
            text: '正在下载项目模板...',
            color: 'green'
        }).start();

        download(ZAN_NODE_TEMPLATE, downloadPath, {
            extract: true
        }).then((data) => {
            // 关闭 loading
            spinner.stop();

            let item;
            let content;
            let fileData;
            for (let i = 0; i < data.length; i++) {
                item = data[i];
                item.newPath = path.join(process.cwd(), item.path.replace(item.path.split('/')[0], projectName));

                if (item.type === 'file') {
                    fileData = fs.readFileSync(path.join(downloadPath, item.path), 'utf8');
                    if (/package.json/.test(item.path)) {
                        content = ejs.compile(fileData)(answers);
                    } else {
                        content = fileData;
                    }

                    fs.outputFileSync(item.newPath, content);
                    console.log(chalk.green('新建文件：', item.newPath));
                } else if (item.type === 'directory') {
                    fs.ensureDirSync(item.newPath);
                    console.log(chalk.green('新建目录：', item.newPath));
                }
            }

            let msg = `
    ✔ 项目初始化成功

    请按照下面的步骤进行操作：
        1. cd ${projectName}
        2. npm install 安装项目依赖
        3. zan dev 开启后端服务
        `;
            console.log(boxen(msg, {
                padding: {
                    left: 0,
                    right: 4,
                    top: 0,
                    bottom: 0
                },
                margin: 0,
                borderColor: 'green',
                borderStyle: 'classic'
            }));
        }).catch((err) => {
            console.log(err);
        });
    });

};