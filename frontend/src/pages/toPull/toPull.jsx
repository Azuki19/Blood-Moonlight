import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./toPull.css";

const ToPullPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/votaciones", {
        replace: true,
        state: { round: location.state.round },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page pull-page">
      <div className="pull-content">
        <h1 className="pull-title">¡A VOTAR!</h1>
        <img src="/images/murcielago.png" alt="pull" className="pull-image" />
      </div>
    </div>
  );
};

export default ToPullPage;
