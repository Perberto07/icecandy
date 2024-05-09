import logo from './images/icecandy.jpg'; // Import your logo image
import './css/Header.css';

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Logo"  className="icecandy-logo"/>
      <h1>Delicious Ice Candy </h1>
    </div>
  );
}

export default Header;