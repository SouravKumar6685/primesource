import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Dashboard from './components/admin/Dashboard';
import AuthGuard from './components/admin/AuthGuard';
import CaseStudies from './components/CaseStudies';
import CaseStudyDetail from './components/CaseStudyDetail';
import Careers from './components/Careers';
import CareerDetail from './components/CareerDetail';
import ScrollToTop from './components/ScrollToTop';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import InsightsPage from './components/InsightsPage';
import InsightDetail from './components/InsightDetail';
import FeaturedWorkPage from './components/FeaturedWorkPage';
import FeaturedWorkDetail from './components/FeaturedWorkDetail';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(location.pathname === '/');
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (loading) return;

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

    return () => {
      if (scrollRef.current) scrollRef.current.destroy();
    };
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore - lenis instances inside locomotive scroll v5 might not have update exposed the same way, but let's follow the user's advice
      // wait, the user suggested scrollRef.current?.update()
      if ((scrollRef.current as any)?.update) {
        (scrollRef.current as any).update();
      }
    }, 100);
  }, [location.pathname]);

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
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetail />} />
            <Route path="/work" element={<FeaturedWorkPage />} />
            <Route path="/work/:slug" element={<FeaturedWorkDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<CareerDetail />} />
            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
