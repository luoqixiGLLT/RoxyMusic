# React + Vite
tailwindCSS官网：https://tailwindcss.com/ 或去看视频了解如何使用

### src目录结构 根据规则进行编写代码
```text
src
│   App.jsx 主应用组件
│   http.js 封装axios，发请求使用
│   index.css  主样式，使用了tailwindCss
│   Index.jsx   主页面组件
│   Login.jsx   登录页组件
│   main.jsx    应用入口文件
│   
├───Index   主页面子组件
│   │   Home.jsx 首页
│   │   Play.jsx 播放页
│   │   User.jsx 用户页
│   │
│   ├───home    首页子组件
│   ├───play    播放页子组件
│   └───user    用户页子组件
|
└───login   登录页子组件
|
└───store 全局状态文件夹 状态请存放在这里
```
安装依赖
```shell
npm i
```
启动项目
```shell
npm run dev
```