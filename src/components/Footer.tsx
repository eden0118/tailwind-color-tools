import { Coffee, Github, Send } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="relative bottom-0 border-t border-slate-600/50 backdrop-blur-md">
      <div className="text-muted mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 p-6">
        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com/eden0118"
            className="flex items-center justify-center rounded-full p-1 hover:bg-slate-950"
          >
            <Github size={16} />
          </a>

          <a
            href="https://buymeacoffee.com/eden0118"
            className="flex items-center justify-center rounded-full p-1 hover:bg-slate-950"
          >
            <Coffee size={16} />
          </a>

          <a
            href="mailto:k307849@gmail.com"
            className="flex items-center justify-center rounded-full p-1 hover:bg-slate-950"
          >
            <Send size={16} />
          </a>
        </div>

        {/* Copyright year - automatically updates annually */}
        <div className="text-[10px] md:text-xs">
          © {new Date().getFullYear()} Color Converter {t('footer.rights')}
        </div>

        {/* Project description and acknowledgments */}
        <div className="text-muted/60 text-center text-[9px] md:text-xs">
          <p>{t('app.description')}</p>
          <p className="mt-1">{t('footer.builtWith')}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
