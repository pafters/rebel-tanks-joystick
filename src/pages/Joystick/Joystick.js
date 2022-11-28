import Level from '../../components/Level/Level';
import Rang from '../../components/Rang/Rang';
import BackButton from '../../components/BackButton/BackButton';
import Nickname from '../../components/Nickname/Nickname';
import MoveStick from "./MoveStick/MoveStick";
import ShotButton from "./ShotButton/ShotButton";

import './Joystick.css';

function Joystick({ setView, server, mediator }) {
    return (
        <>
            <Level mediator={mediator} />
            <div className="backBtnContainer" >
                <BackButton setView={setView} server={server} />
            </div>
            <div className="infoContainer">
                <Nickname mediator={mediator} />
                <Rang mediator={mediator} />
            </div>
            <div className="shotBtnContainer">
                <ShotButton server={server} />
            </div>
            <div className="moveStickContainer">
                <MoveStick server={server} />
            </div>
        </>
    );
}

export default Joystick;