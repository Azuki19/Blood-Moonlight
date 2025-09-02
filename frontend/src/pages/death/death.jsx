import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./death.css";

const DeathsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { round, deaths } = location.state || { round: 1, deaths: [] };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/round", { replace: true, state: { round } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, round]);

  return (
    <div className="page deaths-page">
      <div className="deaths-content">
        <h1 className="deaths-title">Muertes en la ronda {round}</h1>
        {deaths.map((name, i) => (
          <p key={i} className="death-message">
            {name} no fue lo suficientemente fuerte para heredar el trono de la
            noche. {name} ha muerto.
          </p>
        ))}
        <img src="/images/tumba.png" alt="death" className="death-image" />
      </div>
    </div>
  );
};

export default DeathsPage;
