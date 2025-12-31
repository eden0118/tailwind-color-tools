import { memo } from 'react';

/**
 * Footer component
 */
const Footer = memo(() => (
  <footer className="border-border-secondary text-ui border-t py-8 text-center text-sm">
    <p>Built for developers with React and Tailwind.</p>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
