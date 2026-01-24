<div align="center"><a name="readme-top"></a>
  
<img src="./docs/images/logo-dark.png" alt="warden.vip">

<h1>adminui-antd-layout</h1>

This is a layout component based on Antd.

English · [中文](./README-zh_CN.md)
### ❤️ Supports multiple layout styles and custom themes/skins, supports various routing options and operates independently of UMI control, perfect for those who pay attention to detail.

<img src="./docs/images/adminui.github.webp" alt="warden.vip">

[demo👉](https://demo.adminui.dev)

</div>

## ✨ Features

- 🌈 Unified backend interaction experience and style.
- 📦 Ready-to-use integration with a wealth of templates.
- ⚙️ Pluggable components for detailed control.
- 🌍 Supports internationalization.
- 🎨 Supports deeper theme customization.

## 📦 Install

```bash
npm install @adminui-dev/antd-layout --save
```

```bash
yarn add @adminui-dev/antd-layout
```

```bash
pnpm add @adminui-dev/antd-layout
```

```bash
bun add @adminui-dev/antd-layout
```
## 📦 Install dependencies
```json
"@ant-design/colors": "^7.2.1",
"antd": "^6.1.1",
"dayjs": "^1.11.19",
"nprogress": "^0.2.0",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"react-intl": "^8.0.4",
"react-router": "^7.11.0",
"react-router-dom": "^7.11.0"
```

## 🚀 Alternatively, use the npx create-antd-layout quick template to build the project (recommended).
```bash
npx create-antd-layout@lastest your-app
```
## 🔨 Example
```jsx
import { AntdLayout } from "@adminui-dev/antd-layout"
import type { LayoutConfig,MenuData } from "@adminui-dev/antd-layout"

// src/layouts/index.tsx

/**
* menu data
*/
const menuData:MenuData = {
    name:"",
    path:"/",
    label:"Dashboard",
    children:[
        {name:"welcome",path:"welcome",label:"Welcome"},
        {name:"transaction",path:"transaction",label:"Transaction",children:[
            {name:"order",path:"order",label:"Order"},
            {name:"order",path:"product",label:"Product"},
        ]},
        {name:"system",path:"system",label:"System",children:[
            {name:"config",path:"config",label:"Config"},
            {name:"logs",path:"logs",label:"Logs"},
        ]},
    ]
}

/**
* dashboard layout
*/
const MainLayout = () => {
  // layout config
  const layoutConfig:LayoutConfig = {
      disabledLocale:true,
      layoutType:"leftMenu"  
  }
  return(
  <>
    <AntdLayout layoutConfig={layoutConfig} menuData={menuData} />
  </>
  )
}
export default MainLayout;
```
For reference 🍸[https://github.com/zhouwenqi/adminui-demo-antd-layout-simple](https://github.com/zhouwenqi/adminui-demo-antd-layout-simple)

## ✅ For more configuration options, please refer to the official documentation.
Website 🔗[https://adminui.dev](https://adminui.dev)

Docs 🔗[https://adminui.dev/docs](https://adminui.dev/docs)
