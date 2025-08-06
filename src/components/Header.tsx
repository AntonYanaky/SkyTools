import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const baseLink =
    "flex items-center justify-center p-2 mx-2 text-xl transition-colors duration-300 rounded-md cursor-pointer";
  const activeLink = "bg-[#f38a32] text-white dark:text-black shadow-lg";
  const inactiveLink = "text-black hover:bg-[#FDE9D8] dark:text-white dark:hover:bg-[#602E06]";
  
  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `${baseLink} ${isActive ? activeLink : inactiveLink}`;
  
  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-3xl font-semibold ${isActive ? 'text-[#f38a32]' : 'text-white'}`;

  const LogoDisplay = () => (
    <>
      <img src={logo} alt="Logo" className="h-14 w-14 lg:h-12 lg:w-12 transition-all duration-300" />
      <p className="ml-3 text-2xl lg:ml-2 lg:text-xl font-semibold text-black dark:text-white transition-all duration-300">
        SkyTools
      </p>
    </>
  );

  return (
    <>
      <header className="font-poppins flex items-center justify-center lg:justify-between py-6 px-4 md:px-6 select-none relative z-50">
        <NavLink className="hidden lg:flex items-center flex-1" to="/">
          <LogoDisplay />
        </NavLink>

        <button
          type="button"
          className="lg:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <LogoDisplay />
        </button>

        <nav className="hidden lg:flex items-center">
          <NavLink to="/" className={getLinkClassName}>Home</NavLink>
          <NavLink to="/bits" className={getLinkClassName}>Bit Flips</NavLink>
          <NavLink to="/forge" className={getLinkClassName}>Forge Flips</NavLink>
        </nav>
      </header>

      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-10 z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <NavLink to="/" onClick={() => setMenuOpen(false)} className={mobileLinkClassName}>Home</NavLink>
        <NavLink to="/bits" onClick={() => setMenuOpen(false)} className={mobileLinkClassName}>Bit Flips</NavLink>
        <NavLink to="/forge" onClick={() => setMenuOpen(false)} className={mobileLinkClassName}>Forge Flips</NavLink>
      </div>
    </>
  );
}