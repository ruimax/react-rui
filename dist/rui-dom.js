import Component from "./component";
import Rui from "./rui";
function RuiDom() {}
RuiDom.render = (vdom, container) => {
  // 判断是函数类型，表明是函数式组件或者是class组件
  if (typeof vdom.type === 'function') {
    const props = {
      ...vdom.props,
      children: vdom.children
    };
    // 判断是class组件
    if (Component.isPrototypeOf(vdom.type)) {
      // 不能用instanceof, instanceof用于判断是否是某个类的实例，检查的是Component.prototype,isPropertyOf检查的是Component
      const instance = new vdom.type(props);
      instance.componentWillMount();
      const componentVdom = instance.render();
      instance.componentDidMount();
      RuiDom.render(componentVdom, container);
    } else {
      // 函数式组件
      const componentVdom = vdom.type(props);
      RuiDom.render(componentVdom, container);
    }
    return;
  }
  let dom;
  if (typeof vdom !== 'object') {
    dom = document.createTextNode(vdom);
  } else {
    dom = document.createElement(vdom.type);
  }
  if (vdom.props) {
    console.log('vdom.props', vdom.props);
    for (const key in vdom.props) {
      if (key === 'children') {
        vdom.props[key].forEach(child => {
          if (Array.isArray(child)) {
            child.forEach(item => {
              RuiDom.render(item, dom);
            });
          } else {
            RuiDom.render(child, dom);
          }
        });
      } else if (typeof key === 'function' && key.startsWith('on')) {
        // 事件
        const eventType = key.slice(2).toLowerCase(); // react本身是通过合成事件代理实现的，这里是简写
        dom.addEventListener(eventType, vdom.props[key]);
      } else if (key === 'style') {
        // 处理style的写法
        dom.setAttribute(key, vdom.props[key]);
      } else if (key === 'className') {
        // className转成class
        dom.setAttribute('class', vdom.props[key]);
      } else {
        dom.setAttribute(key, vdom.props[key]);
      }
    }
  }
  container.appendChild(dom);
};
export default RuiDom;