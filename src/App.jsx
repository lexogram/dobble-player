import { Provider } from "./state-logic/Context.jsx"
import { Login } from "./components/Login"
function App() {

  return (
    <Provider>
      <Login />
    </Provider>
  )
}

export default App
