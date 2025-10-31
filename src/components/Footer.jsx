import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <p>&copy; {currentYear} SkillNest. All rights reserved.</p>
        </div>
        <ul className="footer-links">
          <li>
            <a href="#" className="footer-link">About</a>
          </li>
          <li>
            <a href="#" className="footer-link">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="footer-link">Terms of Service</a>
          </li>
          <li>
            <a href="#" className="footer-link">Contact</a>
          </li>
        </ul>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" className="footer-link">
            <Github size={20} />
          </a>
          <a href="#" className="footer-link">
            <Twitter size={20} />
          </a>
          <a href="#" className="footer-link">
            <Linkedin size={20} />
          </a>
          <a href="#" className="footer-link">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
