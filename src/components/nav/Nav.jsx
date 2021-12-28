import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const path = 'https://brian95348.github.io/html5-css3/assets';

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [active, setActive] = useState({ id: 'Events', cls: 'nav__active' });
  const [height, setHeight] = useState(0);
  const links = ['Dashboard', 'Events', 'Help', 'Logout'];
  const history = useHistory();

  const toggleDropDown = () => {
    setIsNavOpen((prev) => {
      return !prev;
    });
  };

  const handleResize = () => {
    isNavOpen ? setHeight(window.innerHeight - 87) : setHeight(0);
  };

  const handleClick = (e) => {
    setActive({ ...active, id: e.target.id });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [isNavOpen]);

  return (
    <section className="nav">
      <article className="nav__container">
        <img
          className="nav__logo"
          src={`${path}/logo.png?raw=true`}
          alt="logo"
          width="291px"
          height="47px"
          onClick={() => history.push('/')}
        />
        <img
          onClick={toggleDropDown}
          src={isNavOpen ? `${path}/close.png` : `${path}/hamburger.png`}
          className="nav__hamburger"
          alt="hamburger"
        />
      </article>
      <div style={{ height: `${height}px` }} className="nav__dropdown-wrapper">
        <article className="nav__dropdown">
          {links.map((link, idx) => {
            return (
              <Link
                key={idx}
                to={link === 'Events' ? '/' : link.toLowerCase()}
                id={link}
                onClick={handleClick}
                className={`nav__link ${active.id === link ? active.cls : ''}`}
              >
                {' '}
                {link}
              </Link>
            );
          })}
        </article>
      </div>
    </section>
  );
};

export default NavBar;
