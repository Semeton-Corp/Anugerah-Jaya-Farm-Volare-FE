import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AppRouter from "./AppRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
