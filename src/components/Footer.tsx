import { memo } from 'react';

/**
 * @fileoverview
 * Footer component - Application footer with copyright information
 *
 * Responsibilities:
 * - Display copyright notice with current year
 * - Link to creator's GitHub profile
 * - Sticky position at bottom of page
 * - Consistent branding and styling
 */
const Footer = memo(() => (
  <footer className="bg-background/50 sticky top-0 z-50 border-t border-slate-600 backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 p-6 text-center text-xs md:text-sm">
      {/* Copyright year - automatically updates annually */}© {new Date().getFullYear()}
      {/* Creator link */}
      <a
        href="https://github.com/eden0118"
        className="hover:text-accent text-primary flex items-center gap-0.5"
      >
        Eden.
      </a>
      All rights reserved.
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
