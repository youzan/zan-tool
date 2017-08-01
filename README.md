## Zan Tool

### 一、工具介绍

### 二、安装

```
npm install -g zan-tool
```

### 三、API

#### 查看所有帮助命令

```
zan
```

```
  Usage: ztool [options] [command]


  Commands:

    init <projectName>   初始化一个新的 Zan Node Web 项目
    dev [options]        本地开发，开启后端服务
    module <moduleName>  初始化一个 NPM 包项目
    htmlmin              HTML 模板压缩
    babel [options]      Babel 编译文件
    doc                  查看 Zan Node 框架文档
    *

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

            ____                   _____                     _
    o O O  |_  /   __ _    _ _    |_   _|   ___     ___     | |
   o        / /   / _` |  | ' \     | |    / _ \   / _ \    | |
  TS__[O]  /___|  \__,_|  |_||_|   _|_|_   \___/   \___/   _|_|_
 {======|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|
./o--000'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'
----------- 有赞出品，必属精品 https://github.com/youzan -----------
```

### 四、zan.json 配置文件

#### 1、htmlmin 配置

| 字段 | 类型 | 说明 |
| ----- | ----- | ----- |
| src | String/Array | HTML 模板源路径 |
| dest | String | HTML 模板压缩后存放路径 |
| options | Object | HTML 模板压缩配置参数，更多有关参数说明请参考：https://github.com/kangax/html-minifier#options-quick-reference |

```
{
    "htmlmin": {
        "src": "./server/views/**/*.html",
        "dest": "./server/views_dist",
        "options": {
            "collapseWhitespace": true,
            "minifyCSS": true,
            "minifyJS": true,
            "removeComments": true
        }
    }
    ...
}
```

#### 2、babel 配置

babel 配置信息支持两种形式，对象或数组。

| 字段 | 类型 | 说明 |
| ----- | ----- | ----- |
| src | String | 源文件路径 |
| dest | String | 目标路径 |

```
// 对象形式
{
    "babel": {
        "src": "./server",
        "dest": "./server_dist"
    }
    ...
}
// 数组形式
{
    "babel": [{
        "src": "./server",
        "dest": "./server_dist"
    }]
    ...
}
```


