// Sections
import Blog from './sections/blog';
import About from './sections/about';
import Contact from './sections/contact';
import HomeSection from './sections/home';
import Portfolio from './sections/portfolio';
import Services from './sections/services';
import Skills from './sections/skills';

// -------------------

function Home() {
  return (
    <>
      <HomeSection />
      {/* <Services /> */}
      {/* <About /> */}
      <Portfolio />
      <Portfolio />
      <Portfolio />
      {/* <Blog /> */}
      {/* <Skills /> */}
      <Contact />
    </>
  );
}

export default Home;
