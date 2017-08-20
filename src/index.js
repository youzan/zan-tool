const program = require('commander');
const chalk = require('chalk');
const Util = require('./lib/util');
const PrintHelper = require('./lib/print_helper');

const doc = require('./plugins/doc');
const babel = require('./plugins/babel');
const createNodeModule = require('./plugins/create_node_module');
const dev = require('./plugins/dev');
const htmlmin = require('./plugins/htmlmin');
const createZanApp = require('./plugins/create_zan_app');

function registerPlugin(plugin) {
    let pro = program
        .command(plugin.name)
        .description(plugin.description);
    if (plugin.options) {
        for (let i = 0; i < plugin.options.length; i++) {
            pro.option(plugin.options[i][0], plugin.options[i][1]);
        }
    }
    pro.action(plugin.action)
        .on('--help', plugin.help);
}

program
    .version(Util.getPkgInfo().version);

registerPlugin(createZanApp);
registerPlugin(createNodeModule);
registerPlugin(dev);
registerPlugin(babel);
registerPlugin(htmlmin);
registerPlugin(doc);

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