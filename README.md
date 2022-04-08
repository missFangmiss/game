## 使用

npm install

npm run dev      客户端开发环境
npm run test     服务器开发环境
npm run pre      服务器测试环境
npm run build    正式环境


## 打包

npm run build

项目默认配置三种代码环境，分别为 `production(正式环境)`、`production-d(测试环境)` 以及 `development(开发)


## 项目结构

```
├── README.md
├── build
├── config
├── package.json
└── src
    ├── pages
    │   ├── index (页面1，项目打包默认进入页面)
    │   │   ├── index.js
    │   │   ├── template.html
    │   │   ├── routes 
    │   │   ├── store
    │   │   └──components
    │   │       └── app.vue
    │   └── page2 (页面2)
    │   │   ├── index.js
    │   │   ├── template.html
    │   │   ├── routes 
    │   │   ├── store
    │   │   └──components
    │   │       └── app.vue
    └── static (静态资源文件夹)
```

### 编译后的项目结构

```
├── css
│   ├── index.3f05035e.css
│   ├── index.3f05035e.css.map
│   ├── page2.3f05035e.css
│   └── page2.3f05035e.css.map
├── js
│   ├── index.3f05035ea26e8a6c3eb8.js
│   ├── index.3f05035ea26e8a6c3eb8.js.gz
│   ├── index.3f05035ea26e8a6c3eb8.js.map
│   ├── page2.3f05035ea26e8a6c3eb8.js
│   └── page2.3f05035ea26e8a6c3eb8.js.map
├── static
├── index.html
└── page2.html
```

## 配置

脚手架的基本配置为 `config/base.js` 文件。修改配置文件将影响打包效果。

build/utils.js 中配置了rem适配,编译时会将所有css中px单位转换成rem单位，
其rootValue做为基础rem换算值，数值越大则rem换算越小，反之越大