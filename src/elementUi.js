import Vue from "vue";
import { Button, Container, Aside, Main, Header, Form, FormItem, Input, Message, Upload, Avatar, Row, Col, Image, Select, Option, Menu, MenuItem, MessageBox, PageHeader, Table, TableColumn } from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Header);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Upload);
Vue.use(Avatar);
Vue.use(Row);
Vue.use(Col);
Vue.use(Image);
Vue.use(Select);
Vue.use(Option);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(PageHeader);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;