import Home from "./components/home/Home";
import BrochurePreview from "./components/itenaryForm/BrochurePreview";
import ItenaryForm from "./components/itenaryForm/ItenaryForm";
import CompanyFooter from "./components/shared/CompanyFooter";
import Header from "./components/shared/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-screen min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/itenaryform"
            element={<ItenaryForm />}
          />
          <Route
            path="/preview"
            element={<BrochurePreview />}
          />
        </Routes>
        <Toaster />
        <CompanyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
