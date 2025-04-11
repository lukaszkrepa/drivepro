import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Courses from "./components/Courses.jsx";
import SignupSteps from "./components/SignupSteps.jsx";
import TeamAndCars from "./components/TeamAndCars.jsx";
import Gallery from "./components/Gallery.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Header />
      <Hero/>
      <Courses/>
      <SignupSteps/>
      <TeamAndCars/>
        <Gallery/>
  </StrictMode>,
)
