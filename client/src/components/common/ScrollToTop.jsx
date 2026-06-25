import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Browsers preserve scroll position across client-side route changes by
// default, which makes it look like a footer/nav link "didn't work" when
// you're scrolled to the bottom of a long page. This resets scroll to the
// top every time the route (pathname) changes.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
