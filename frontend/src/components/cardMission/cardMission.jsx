import "./cardMission.css";
import { missions } from "../../data/data";

const CardMission = ({ missionsCompleted = [] }) => {
  return (
    <div className="extra-missions">
      <h4>Misiones Extra</h4>
      {missions.map((mission) => {
        const done = missionsCompleted.includes(mission.text);
        return (
          <div className="mission-row" key={mission.text}>
            <div className="mission-col-left">
              <input
                type="checkbox"
                className="mission-checkbox"
                checked={done}
                readOnly
              />
            </div>
            <div className="mission-col-right">
              <p className={`mission-text ${done ? "completed" : ""}`}>
                {mission.text}
              </p>
              <span className="mission-points">+ {mission.points} pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardMission;
