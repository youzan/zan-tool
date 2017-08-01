const zandoc = require('./zandoc');
const babel = require('./babel');
const htmlmin = require('./htmlmin');
const createNodeModule = require('./create_node_module');
const createZanApp = require('./create_zan_app');
const dev = require('./dev');

module.exports = {
    zandoc,
    babel,
    htmlmin,
    createNodeModule,
    createZanApp,
    dev
};