import Rui from './rui';
import RuiDom from './rui-dom';
class Component {
  constructor(props) {
    this.props = props || {};
    this.state = null;
  }
  setState(newState) {
    this.state = Object.assign(this.state, newState);
    const newDom = RuiDom.render(this.render());
  }
}
export default Component;