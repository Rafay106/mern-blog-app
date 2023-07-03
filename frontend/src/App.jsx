import { Outlet } from "react-router-dom";
// Components
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}
export default App;
