#!/usr/bin/env node

var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
  processTitle: 'fis',
  moduleName: 'fis3',
  configName: 'fis-conf',

  // only js supported!
  extensions: {
    '.js': null
  }
});

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env) {
  var fis;
  if (!env.modulePath) {
    fis = require('../');
  } else {
    fis = require(env.modulePath);
  }

  // 配置插件查找路径，优先查找本地项目里面的 node_modules
  // 然后才是全局环境下面安装的 fis3 目录里面的 node_modules
  fis.require.paths.push(path.join(env.cwd, 'node_modules/fis3'));
  fis.require.paths.push(path.join(path.dirname(__dirname)));
  fis.cli.name = this.name;
  fis.cli.run(argv, env);
});
