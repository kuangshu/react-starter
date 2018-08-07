This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

此为移动端项目在模板基础上添加屏幕适配，以 VW,VH 为单位实现页面适配,添加以下插件

## postcss-cssnext

postcss-cssnext 其实就是 cssnext。该插件可以让我们使用 CSS 未来的特性，其会对这些特性做相关的兼容性处理。其包含的特性主要有：

![cssnext-img](https://www.w3cplus.com/sites/default/files/blogs/2018/1801/vw-layout-4.png)

## cssnano

cssnano 主要用来压缩和清理 CSS 代码。在 Webpack 中，cssnano 和 css-loader 捆绑在一起，所以不需要自己加载它。不过你也可以使用 postcss-loader 显式的使用 cssnano。有关于 cssnano 的详细文档，可以点击这里获取。

在 cssnano 的配置中，使用了 preset: "advanced"，所以我们需要另外安装：

```
npm i cssnano-preset-advanced --save-dev
```

cssnano 集成了一些其他的 PostCSS 插件，如果你想禁用 cssnano 中的某个插件的时候，可以像下面这样操作：

```js
"cssnano": {
  autoprefixer: false,
  "postcss-zindex": false
}
```

## postcss-aspect-ratio-mini

`postcss-aspect-ratio-mini`主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构，使用方法：

```css
/* in css */
[aspectratio] {
  position: relative;
}
[aspectratio]::before {
  content: '';
  display: block;
  width: 1px;
  margin-left: -1px;
  height: 0;
}
[aspectratio-content] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
[w-750-260] {
  aspect-ratio: '750:260';
}
```

在实际使用的时候，你可以把自定义属性`aspectratio`和`aspectratio-content`换成相应的类名

```html
<!-- in html -->

<div aspectratio="" w-750-260="">
  <div aspectratio-content=""></div>
</div>
```

此时内层盒子的大小就是设置的`750:260`的纵横比

## postcss-px-to-viewport

`postcss-px-to-viewport`插件主要用来把`px`单位转换为`vw`、`vh`、`vmin`或者`vmax`这样的视窗单位，也是 vw 适配方案的核心插件之一。

## postcss-write-svg

postcss-write-svg 插件主要用来处理移动端 1px 的解决方案。该插件主要使用的是 border-image 和 background 来做 1px 的相关处理。比如

```css
@svg 1px-border {
  height: 2px;
  @rect {
    fill: var(--color, black);
    width: 100%;
    height: 50%;
  }
}
.example {
  border: 1px solid transparent;
  border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}
```

## postcss-viewport-units

`postcss-viewport-units`插件主要是给 CSS 的属性添加`content`的属性，配合`viewport-units-buggyfill`库给`vw`、`vh`、`vmin`和`vmax`做适配的操作。

### 引入 JavaScript 文件

`viewport-units-buggyfill`主要有两个 JavaScript 文件：viewport-units-buggyfill.js 和 viewport-units-buggyfill.hacks.js。你只需要在你的 HTML 文件中引入这两个文件。比如在 Vue 项目中的 `index.html` 引入它们：

```html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

第二步，在 HTML 文件中调用 viewport-units-buggyfill，比如：

```html
<script> window.onload = function () { window.viewportUnitsBuggyfill.init({ hacks: window.viewportUnitsBuggyfillHacks }); } </script>
```
