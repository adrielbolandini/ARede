import {createBrowserRouter,RouterProvider} from "react-router-dom";
import './index.css';
import Home from "./pages/home";
import Login from './pages/login'
import Signup from "./pages/signup";
import ProfilePage from "./pages/profile";
import Friends from "./pages/friends";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([{
  path: "/",
  element: <Login />,
},{
  path: "/signup",
  element: <Signup />,
},{
  path: "/home",
  element: <Home />,
},{
  path: "/profile",
  element: <ProfilePage />,
},{
  path: "/friends",
  element: <Friends />,
},{
  path: "/posts/:postId",
  element: <PostDetail />,
}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
