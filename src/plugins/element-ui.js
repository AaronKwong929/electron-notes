import Vue from 'vue';
import { Button, Input, Select, DropdownMenu, DropdownItem, Dropdown, Scrollbar } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Scrollbar);
