# React-Electron-Template

#### 介绍

一款基于Vite的 Electron 前端模板仓库。

#### 安装教程

```sh
## 安装依赖
1. npm install

## 启动项目
2. npm run start
```

#### 使用说明

1. 项目启动打包

```bash
## 本地启动程序, 执行前会对代码约束和风格都检测一遍，可参考配置文件修改自定义
npm run start

## 程序打包，执行前会对代码约束和风格都检测一遍，可参考配置文件修改自定义
npm run build

## 项目代码检测，根据项目中的 oxclint 及 ts 来对项目代码进行检测
npm run lint

## 项目代码格式化，根据 oxcfmt 格式化项目代码
npm run format
```

2. 项目配置核心依赖

[vite-electron-simple](https://www.npmjs.com/package/@vite-electron-simple/core) 该依赖使用了 monorepo 架构实现。

> 具体的配置文件为项目根目录下的：builder.config.ts。可在此文件中配置：vite、electron、electron-builder 相关功能。具体可参考：[@vite-electron-simple/core](https://www.npmjs.com/package/@vite-electron-simple/core)

- 参考 [@vite-electron-simple/core](https://www.npmjs.com/package/@vite-electron-simple/core) 库查看核心框架实现及配置。
- 参考 [@vite-electron-simple/common](https://github.com/vanner-young/vite-electron-simple/tree/master/packages/common) 库实现了丰富的 electron 插件功能。

#### 参与贡献

1.  Fork 本仓库
2.  新建 feat/xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 功能列表

1. electron、electron-builder、vite、react、zustand、i18n、axios、typescript、husky、lint-staged、oxcfmt、oxclint

#### 注意事项

1. 构建包的大小问题

- 常规的web开发中，一般是喜欢把web所需的生产环境代码安装到生产依赖，开发到开发依赖。
- 但是由于在 electron 构建时，会先把渲染进程的代码打包一遍，然后在去打包主进程代码，打包时会根据 dependencies 依赖打包到主进程的 app.asar 中去。
- 因此，在开发时，务必将渲染进程的生产依赖和开发依赖都放到 devDependencies，之后主进程的第三方生产依赖才放到 dependencies。这样可以极大的缩减打包后安装时所占用的内存空间。

```json
  // 只放主进程生产依赖
  "dependencies": {
    // ...
  },
  // 其它均放到开发依赖
  "devDependencies": {
    // ...
  }
```
