import logo from "../../../resources/img/logo.png";

export default function Spinner() {
  return (
    <>
      <a href="https://www.ekepar.ru/" target="_blank" rel="noreferrer">
        <img
          src={logo}
          className="first-home-page-logo"
          style={{ transform: "scale(0.5)" }}
        />
      </a>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </>
  );
}
