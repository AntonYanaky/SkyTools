import { NavLink } from 'react-router-dom';

export default function Header() {
  const baseLink =
    "flex items-center justify-center p-2 mx-2 text-xl transition-colors duration-300 rounded-md cursor-pointer text-black dark:text-white";
  const activeLink = "bg-[#f38a32] text-white dark:text-black shadow-lg";
  const inactiveLink = "text-black hover:bg-[#FDE9D8] dark:hover:bg-[#602E06]";

  return (
    <header className="font-poppins flex items-center py-6 select-none">
      <NavLink className="flex items-center flex-1" to="/">
        <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
        <p className="ml-2 text-xl">SkyTools</p>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseLink} ${isActive ? activeLink : inactiveLink}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/bits"
        className={({ isActive }) =>
          `${baseLink} ${isActive ? activeLink : inactiveLink}`
        }
      >
        Bit Flips
      </NavLink>
    </header>
  );
}