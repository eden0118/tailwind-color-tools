import { memo } from 'react';

/**
 * Footer component
 */
const Footer = memo(() => (
  <footer className="border-t border-border-secondary py-8 text-center text-sm text-ui">
    <p>Built for developers with React and Tailwind.</p>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
