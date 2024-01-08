import { Provider } from "./state-logic/Context.jsx"
import { Login } from "./Pages/Login"
function App() {

  return (
    <Provider>
      <Login />
    </Provider>
  )
}

export default App
