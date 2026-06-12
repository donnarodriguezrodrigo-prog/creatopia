import { FaLinkedin, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

interface Props {
  settings: Record<string, string>;
}

export default function Footer({ settings }: Props) {
  return (
    <footer className="bg-deep-wine/50 border-t border-wine/20 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-wine/30 border border-wine/40 flex items-center justify-center">
            <span className="font-bebas text-rose text-base leading-none">C</span>
          </div>
          <div>
            <p className="font-bebas text-blush text-sm tracking-widest">CREATOPIA</p>
            <p className="text-rose/50 text-[9px] tracking-[0.2em] uppercase">Purposeful Creativity</p>
          </div>
        </div>

        <p className="text-blush/30 text-xs text-center">
          © {new Date().getFullYear()} Donna May Rodrigo. All rights reserved.
        </p>

        <div className="flex gap-3">
          {[
            { icon: FaLinkedin, url: settings.linkedin_url },
            { icon: FaFacebook, url: settings.facebook_url },
            { icon: FaTwitter, url: settings.twitter_url },
            { icon: FaYoutube, url: settings.youtube_url },
          ].map(({ icon: Icon, url }, idx) => (
            <a
              key={idx}
              href={url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-wine/20 flex items-center justify-center text-blush/30 hover:text-rose hover:border-rose/40 transition-all"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
