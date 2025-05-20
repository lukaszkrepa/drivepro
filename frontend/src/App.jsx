import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Testimonial from "./pages/Testimonial/Testimonial.jsx";
import InstructorsAndCars from "./pages/InstructorsAndCars/InstructorsAndCars.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Signup from "./pages/Signup/Singup.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";
import AdminPanel from "./pages/Admin/AdminPanel.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPanel/>}/>
            </Routes>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Testimonial />} />
                <Route path="/instructors" element={<InstructorsAndCars />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/faq" element={<FAQ />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;