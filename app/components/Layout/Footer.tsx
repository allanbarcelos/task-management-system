const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-light text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">&copy; {currentYear} My App. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;