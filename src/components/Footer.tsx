import { memo } from 'react';
import { Github } from 'lucide-react';

/**
 * Footer component
 */
const Footer = memo(() => (
  <footer className="bg-background/50 sticky top-0 z-50 border-t border-slate-600 backdrop-blur-md">
    <div className="mx-auto flex w-full max-w-6xl p-6 text-center text-sm">
      <span className="flex items-center gap-2">
        © {new Date().getFullYear()}{' '}
        <a
          href="https://github.com/eden0118"
          className="hover:text-primary flex items-center gap-1"
        >
          <Github size={14} /> Eden Chang.
        </a>{' '}
        All rights reserved.
      </span>

      <p>Built for developers with React and Tailwind.</p>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;
