export default function SocialLinks({ showLabels = true, className = "" }) {
    return (
      <div className={`flex flex-col space-y-3 ${className}`}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon size={20} />
              {showLabels && <span className="font-medium">{link.label}</span>}
            </a>
          );
        })}
      </div>
    );
  }
  