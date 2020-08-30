import Vue from 'vue';
import { Button, Input, Select, DropdownMenu, DropdownItem, Dropdown } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'medium' };

Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
