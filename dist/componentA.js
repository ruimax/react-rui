import Rui from './rui';
import Component from './component';
class ComponentA extends Component {
  constructor(props) {
    super(props);
    this.state = ['#CCC', '#BBB', '#AAA'];
  }
  componentWillMount() {
    console.log('class component will mount');
  }
  componentDidMount() {
    console.log('class component did mount');
  }
  render() {
    return Rui.createElement("div", null, "ComponentA", Rui.createElement("div", {
      style: "background: red; color: #FFF;"
    }, this.props.name), this.state.map((item, index) => {
      return Rui.createElement("div", {
        style: `background: ${item}`
      }, item, " - ", index);
    }), Rui.createElement("input", {
      type: "text"
    }), Rui.createElement("button", null, "add"));
  }
}
export default ComponentA;