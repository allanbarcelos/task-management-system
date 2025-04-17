import { faBars, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@hooks/useAuth';
import { Nav, Form, FormControl, Button, Dropdown, Navbar, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@features/sidebar/sidebarSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/* Brand */}
      <Link className="navbar-brand ps-3" to="/">Task Management</Link>

      {/* Sidebar Toggle */}
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        onClick={handleToggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Navigation Links */}
      <Nav className="me-auto ms-3 d-none d-md-flex">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
        <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
      </Nav>

      {/* Search Bar */}
      <Form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <FormControl type="text" placeholder="Search for..." aria-label="Search" />
          <Button variant="primary" id="btnNavbarSearch">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
      </Form>

      {/* User Dropdown */}
      <Nav className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link} id="navbarDropdown">
            <FontAwesomeIcon icon={faUser} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/activity">Activity Log</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </nav>
  );
};

export default Header;
