import { memo } from 'react';

/**
 * Footer component
 */
const Footer = memo(() => (
  <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-600">
    <p>Built for developers with React and Tailwind.</p>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
