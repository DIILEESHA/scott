import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Countdown from "./components/countdown/Countdown";
import Header from "./components/header/Header";
import Registry from "./components/header/Registry";
import Location from "./components/location/Location";
import Schedule from "./components/schedule/Schedule";
import Faq from "./pages/faq/Faq";
import Rsvp from "./pages/rsvp/Rsvp";
import AdminDashboard from "./pages/AdminDashboard";
import DressCode from "./pages/dresscode/Dress";
import Nav from "./components/nav/Nav";
import ScrollToTop from "../ScrollToTop";
import GiftRegistry from "./pages/GiftRegistry"; // New import
import ProductForm from "./components/GiftRegistry/ProductForm";
import OurStory from "./components/OurStory";
import Upload from "./pages/faq/Upload";
import Donate from "./pages/faq/Donate";
// Homepage Component
const Home = () => {
  return (
    <>
      <Header />
      <Schedule />
      <Location />
      <Countdown />
      <Registry />
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <>
      {!isAdminPage && <Nav />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/dress" element={<DressCode />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/donate" element={<Donate />} />

        <Route path="/product-form" element={<ProductForm />} />
      </Routes>
      {!isAdminPage && (
        <footer className="footer">
          <div className="copyright">© 2025 Scott & Mary</div>
        </footer>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
