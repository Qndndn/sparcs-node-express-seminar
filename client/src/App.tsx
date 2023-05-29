import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import ReservationPage from "./pages/reservation";
import SelectPage from "./pages/select";
import SignupPage from "./pages/signup";
import PageNotFound from "./pages/404";
import Footer from "./components/footer";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <div>MainPage</div> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/reservation" element={ <ReservationPage/> }/>
          <Route path="/select" element={ <SelectPage/> }/>
          <Route path="/signup" element={ <SignupPage/> }/>
          <Route path="*" element={ <PageNotFound/> }/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;