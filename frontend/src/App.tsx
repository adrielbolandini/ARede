import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css';
import Login from './pages/login'
import Signup from "./pages/signup";

const router = createBrowserRouter([{
  path: "/",
  element: <Login />,
},{
  path: "/signup",
  element: <Signup />,
}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
