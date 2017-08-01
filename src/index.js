const program = require('commander');
const chalk = require('chalk');
const Util = require('./lib/util');
const actions = require('./actions');
const PrintHelper = require('./lib/print_helper');

program
    .version(Util.getPkgInfo().version);

program
    .command('init <projectName>')
    .description('初始化一个新的 Zan Node Web 项目')
    .action(actions.createZanApp)
    .on('--help', () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan init intro');
        console.log();
    });

program
    .command('dev')
    .description('本地开发，开启后端服务')
    .option('--debug [debugName]', '开启 debug 模式')
    .action(actions.dev)
    .on('--help', () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan dev');
        console.log('    $ zan dev --debug');
        console.log('    $ zan dev --debug koa:application ');
        console.log();
    });

// NPM 包创建
program
    .command('module <moduleName>')
    .description('初始化一个 NPM 包项目')
    .action(actions.createNodeModule)
    .on('--help', () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan module demo');
        console.log();
    });

program
    .command('htmlmin')
    .description('HTML 模板压缩')
    .action(actions.htmlmin)
    .on('--help', () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan htmlmin');
        console.log();
    });

program
    .command('babel')
    .description('Babel 编译文件')
    .option('--watch', '开启 watch 模式')
    .action(actions.babel)
    .on('--help', () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan babel');
        console.log('    $ zan babel --watch');
        console.log();
    });

program
    .command('doc')
    .action(actions.zandoc)
    .description('查看 Zan Node 框架文档')
    .on('--help', () => {
        console.log('  Examples:');
        console.log('');
        console.log('    $ zan doc');
        console.log();
    });

program
    .command('*')
    .action((commandName) => {
        console.log(chalk.red(`命令 ${commandName} 不存在！`));
    });

program
    .parse(process.argv);

if (program.args.length === 0) {
    program.outputHelp();
    PrintHelper.printLogo();
}