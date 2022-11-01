import Rui from './rui'
import ComponentA from './componentA'

const App = (props) => {
  return (
    <div>
      <h1 id="title" style={{ width: 0 }}>Title</h1>
      <a href="xxx">Jump</a>
      <section>
        <p className="class-name">
          Article
        </p>
        <div style="background-color: blue; color: #FFF;">{props.type}</div>
        <ComponentA name="name" />
      </section>
    </div>
  )
}

export default App
