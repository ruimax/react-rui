import Rui from './rui';
import ComponentA from './componentA';
const App = props => {
  return Rui.createElement("div", null, Rui.createElement("h1", {
    id: "title",
    style: {
      width: 0
    }
  }, "Title"), Rui.createElement("a", {
    href: "xxx"
  }, "Jump"), Rui.createElement("section", null, Rui.createElement("p", {
    className: "class-name"
  }, "Article"), Rui.createElement("div", {
    style: "background-color: blue; color: #FFF;"
  }, props.type), Rui.createElement(ComponentA, {
    name: "name"
  })));
};
export default App;