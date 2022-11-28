import { useEffect } from 'react';

import BackButton from '../../components/BackButton/BackButton';

import './GameOver.css';

function GameOver({ setView, server, mediator }) {

    useEffect(() => {
        const { JOIN_TO_GAME } = mediator.getEventTypes();

        const joinToGameHandler = result => result && setView('Joystick');
        
        mediator.subscribe(JOIN_TO_GAME, joinToGameHandler);

        return () => {
            mediator.unsubscribe(JOIN_TO_GAME, joinToGameHandler);
        }
    });

    function backToJoystick() {
        const team = mediator.get(mediator.getTriggerTypes().GET_TEAM);
        team && server.joinToGame(team);
    }

    const result = 'Вы погибли...';
    return (
        <div className="gameEndOuter">
            <div className="backBtnContainerGE">
                <BackButton setView={setView} server={server} />
            </div>

            <div className="gameEndInner">
                <p className="resultOutput">{result}</p>
                <div className="gameEndDivBtns">
                    <button className="gameEndBtn" onClick={backToJoystick}>Снова в бой!</button>
                </div>
            </div>
        </div>
    );
}

export default GameOver;