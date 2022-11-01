import Rui from './rui'
import Component from './component'

class ComponentA extends Component {
  constructor (props) {
    super(props)
    this.state = ['#CCC', '#BBB', '#AAA']
  }

  componentWillMount () {
    console.log('class component will mount')
  }

  componentDidMount () {
    console.log('class component did mount')
  }

  render () {
    return (
      <div>
        ComponentA
        <div style="background: red; color: #FFF;">{this.props.name}</div>
        {this.state.map((item, index) => {
          return <div style={`background: ${item}`}>{item} - {index}</div>
        })}

        <input type="text" />
        <button >add</button>
      </div>
    )
  }
}


export default ComponentA
