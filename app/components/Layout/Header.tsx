import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {user && (
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            {user ? (
              <button onClick={logout} className="btn btn-outline-danger">
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link href="/register" className="btn btn-outline-success">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;