import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, User, Store, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import VisitStoreModal from '../product/VisitStoreModal.jsx';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium tracking-wide transition-colors hover:text-rose-500 ${
    isActive ? 'text-rose-500' : 'text-ink'
  }`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <header className="bg-cream/95 backdrop-blur sticky top-0 z-40 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none shrink-0">
            <span className="font-display text-2xl sm:text-3xl tracking-wide text-rose-700 flex items-center gap-1.5">
              <span className="text-gold text-base">卐</span>SWASTIK CREATIONS
            </span>
            <span className="text-[10px] tracking-widest2 text-inkmuted -mt-0.5 hidden sm:inline">
              Your Dream, Our Creation
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Collections
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/gallery" className={navLinkClass}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
              className="text-ink hover:text-rose-500 transition-colors"
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="text-ink hover:text-rose-500 transition-colors hidden sm:inline-block">
              <Heart size={20} />
            </Link>

            {user ? (
              <div className="relative group hidden sm:inline-block">
                <button aria-label="Account menu" className="text-ink hover:text-rose-500 transition-colors flex items-center gap-1">
                  <User size={20} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-cardHover border border-rose-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <p className="px-4 py-2 text-sm text-inkmuted border-b border-rose-100 truncate">
                    Hi, {user.name.split(' ')[0]}
                  </p>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-blush">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blush flex items-center gap-2 text-rose-600"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" aria-label="Sign in" className="text-ink hover:text-rose-500 transition-colors hidden sm:inline-block">
                <User size={20} />
              </Link>
            )}

            <button
              onClick={() => setStoreModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-xs font-semibold tracking-wide px-4 py-2.5 rounded-full"
            >
              <Store size={15} /> VISIT STORE
            </button>

            <button
              aria-label="Menu"
              className="lg:hidden text-ink"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="pb-4">
            <input
              autoFocus
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for lehengas, jewellery, sarees..."
              className="w-full border border-rose-200 rounded-full px-5 py-2.5 text-sm focus:border-rose-500 outline-none bg-white"
            />
          </form>
        )}
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-rose-100 bg-cream px-4 py-4 flex flex-col gap-3">
          {[
            ['Home', '/'],
            ['Shop', '/shop'],
            ['About Us', '/about'],
            ['Gallery', '/gallery'],
            ['Contact', '/contact'],
          ].map(([label, to]) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)} className="text-sm font-medium py-1">
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              setStoreModalOpen(true);
              setMobileOpen(false);
            }}
            className="flex items-center gap-2 bg-rose-600 text-white text-sm font-semibold tracking-wide px-4 py-2.5 rounded-full justify-center mt-1"
          >
            <Store size={15} /> VISIT STORE
          </button>
          <div className="border-t border-rose-100 pt-3 mt-1 flex flex-col gap-3">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={logout} className="text-sm font-medium text-rose-600 text-left">
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}

      <VisitStoreModal open={storeModalOpen} onClose={() => setStoreModalOpen(false)} />
    </header>
  );
}
