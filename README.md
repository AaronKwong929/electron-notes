# electron - vue markdown 笔记

## plugins 文件夹

main.js 里

```js
import '@plugins/element-ui.js';
import '@plugins/fontawesome.js';
import '@plugins/mavon-editor.js';
import '@plugins/database.js';
```

可优化：用 require.context 一步到位全部引入

另外开一个项目来测试 require context

## 按需引入 element-ui 的 bug

this.$confirm    this.$message 按需引入不能直接 use

```js
import { MessageBox, Message } from 'element-ui';

Message.install = function (Vue, options) {
    Vue.prototype.$confirm = MessageBox.confirm;

    Vue.prototype.$message = Message;
};
```

注意 Message.confirm，不然实际使用时，this.\$confirm(content,title,option)里的 option 会无效

## 高阶组件的参数传入

封装 el-input 等

最外层（调用组件）直接传入 clearable, @focus @blur @change 事件

封装层

<el-input v-bind="$attrs" v-on="$listeners" />

拓展：封装 el-dialog+业务代码

```html
<el-dialog v-bind="$attrs" v-on="$listeners" @close="emit('update:visible', false)"></el-dialog>
```

调用层直接使用 :visible.sync="dialogVisible"

作双向绑定，不用额外写

```html
<el-dialog @close"emit(handle-dialog-closed)"
```

然后外层还要@handle-dialog-closed="处理函数"

高阶组件的 vmodel

```html
<!-- 组件层html -->
<el-input v-model="currentTitle" />
```

```js
// 组件层js
export default {
  props: {
    title: String
  },

  data() {
    return {
      // 直接获取到传入的title的值
      currentTitle: this.title
    }
  }，

  watch: {
  title(newValue) {
    // 传入的值有变化了马上更新currentValue
    this.currentValue = newValue;
  },

  currentTitle(newValue) {
    // currentTitle变化了马上把值emit到调用层的:title.sync="item.title" 中
    this.$emit('update:title', newValue)
  }

}
}
```

```html
<!-- 调用层html -->
<component-name :title.sync="fileItem.title"></component-name>
```

```js
// 调用层js
```

## Uncaught Refrence Error \_\_dirname is not defined

```js
// vue.config.js;
module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    }
};
```
