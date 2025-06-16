# React-Electron-Template

#### 介绍

一款基于Vite的 Electron 前端模板仓库。

#### 安装教程

```sh
## 安装依赖
1. npm install

## 启动项目
2. npm run dev
```

#### 使用说明

1. 项目启动打包

```bash
## 本地启动程序
npm run dev

## 程序打包
npm run build

## 项目代码格式化，根据项目中的 prettier 格式化项目代码
npm run format

## 项目代码检测，根据项目中的 eslint 来对项目代码进行检测
npm run lint
```

2. 项目配置

本项目使用了 @vite-electron-simple/core 库来实现主进程与渲染进程的桥接。
具体的配置文件为项目根目录下的：builder.config.ts。可在此文件中配置：vite、electron、electron-builder 相关功能。具体可参考：[@vite-electron-simple/core](https://www.npmjs.com/package/@vite-electron-simple/core)

#### 参与贡献

1.  Fork 本仓库
2.  新建 feat/xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 功能列表

1. react router、mobx、i18n、eslint、electron、axios、typescript
