import Vue from 'vue';
import {
    Button,
    Input,
    Select,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Scrollbar,
    MessageBox,
    Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$ELEMENT = { size: 'small' };

MessageBox.install = function (Vue, options) {
    Vue.prototype.$confirm = MessageBox;
};

Message.install = function (Vue, options) {
    Vue.prototype.$message = Message;
};

Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Scrollbar);
Vue.use(Message);
Vue.use(MessageBox);
