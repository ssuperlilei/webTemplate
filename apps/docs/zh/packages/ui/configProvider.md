# PasswordInput 按钮

密码输入组件，不会触发历史密码弹窗。

## 基础用法

和 Ant Design Vue 的 ConfigProvider 组件一样，ConfigProvider 组件可以设置全局的配置，比如设置全局的语言、主题等。

<demo vue="ui/configProvider/basic.vue" />

## 语言设置

传入 lang 属性可以设置全局的语言。

<demo vue="ui/configProvider/lang.vue" />

## 自定义属性 llProps

可以传入一个对象，设置全局的属性。然后通过inject在组件内部或者任意包裹的组件中使用，组件库中 Table 组件的按钮就使用了 llProps 属性的 hasPermission 属性。判断是否有权限。

<demo vue="ui/configProvider/llProps.vue" />
