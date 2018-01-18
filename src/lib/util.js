const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const shelljs = require('shelljs');
const lodash = require('lodash');

module.exports = {

    getProjectRoot() {
        return process.cwd();
    },

    // 获取根目录
    getRootPath() {
        return path.resolve(__dirname, '../../');
    },

    // 获取 package.json 文件
    getPkgInfo() {
        let result = {};
        try {
            result = JSON.parse(fs.readFileSync(path.join(this.getRootPath(), 'package.json')));
        } catch (e) {
            console.log(chalk.red('读取 package.json 出错！'));
        }
        return result;
    },

    // 获取项目配置文件
    getProjectConfig() {
        let zanConfigPath = path.join(this.getProjectRoot(), 'zan.json');
        let result = {};
        try {
            result = require(zanConfigPath);
        } catch (e) {
            console.log(chalk.red('读取 zan.json 出错！'));
            shelljs.exit(1);
        }
        return result;
    },

    // 获取 HTML 压缩配置信息
    getHtmlminConfig() {
        let projectRoot = this.getProjectRoot();
        let projectConfig = this.getProjectConfig();

        let config = lodash.defaultsDeep(projectConfig && projectConfig.htmlmin || {}, {
            src: './server/views/**/*.html',
            dest: './server_dist/views',
            options: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                ignoreCustomFragments: [/{#[\s\S]*?#}/, /{{[\s\S]*?}}/, /{%[\s\S]*?%}/, /<\?[\s\S]*?\?>/]
            }
        });
        config.dest = path.join(projectRoot, config.dest);

        if (Array.isArray(config.src)) {
            for (let i = 0; i < config.src.length; i++) {
                if (/!/.test(config.src[i])) {
                    config.src[i] = `!${path.join(projectRoot, config.src[i].replace('!', ''))}`;
                } else {
                    config.src[i] = path.join(projectRoot, config.src[i]);
                }
            }
        } else {
            config.src = path.join(projectRoot, config.src);
        }
        return config;
    }

};
