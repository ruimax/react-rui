function Rui() {}
Rui.createElement = (type, props, ...children) => {
  // vdom
  return {
    type,
    props: {
      ...props,
      children
    }
  };
};
export default Rui;