const chalk = require('chalk');
const vfs = require('vinyl-fs');
const mapStream = require('map-stream');
const minify = require('html-minifier').minify;

function htmlmin(config, call) {
    console.log(chalk.green('开始任务：HTML 模板压缩'));
    call = call || function () { };
    vfs.src(config.src)
        .pipe(mapStream((file, callback) => {
            let data = minify(String(file.contents), config.options);
            file.contents = new Buffer(data);
            console.log(`模板文件：${file.path}`);
            callback(null, file);
        }))
        .pipe(vfs.dest(config.dest))
        .pipe(mapStream((file, callback) => {
            console.log(chalk.blue(`压缩成功：${file.path}`));
            callback(null, file);
        }))
        .on('data', () => {
        })
        .on('end', () => {
            console.log(chalk.green('完成任务：HTML 模板压缩完成'));
            call();
        });
}

module.exports = htmlmin;
