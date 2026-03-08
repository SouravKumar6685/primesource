import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WorkDetail from './components/WorkDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const location = useLocation();

  // Re-initialize locomotive scroll when loading finishes or route changes
  useEffect(() => {
    if (!loading) {
      if (scrollRef.current) scrollRef.current.destroy();

      scrollRef.current = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.1,
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        }
      });
    }

    return () => {
      if (scrollRef.current) scrollRef.current.destroy();
    };
  }, [loading, location.pathname]);

  return (
    <div className="bg-[#111618] min-h-screen min-w-[320px]">
      {/* Full screen preloader overlay */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <ScrollToTop />

      {/* Content */}
      <div
        className={`transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Navbar />
        <div className="transition-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Home />} />
            <Route path="/work/:slug" element={<WorkDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
