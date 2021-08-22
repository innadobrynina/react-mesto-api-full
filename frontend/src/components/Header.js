import headerLogo from '../images/logo.svg'

function Header() {
    return (
        <div className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип" />
        </div>
    );
}
export default Header;