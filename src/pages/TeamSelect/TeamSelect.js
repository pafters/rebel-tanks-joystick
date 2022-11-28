import { useState, useEffect } from 'react';

import Level from '../../components/Level/Level';
import NicknameSetter from './nickname/NicknameSetter';
import Rang from '../../components/Rang/Rang';

import SETTINGS from '../../settings';

import './TeamSelect.css';

function TeamSelect({ setView, server, mediator }) {
    const [auth, setAuth] = useState(false);

    const { GAME_TEAMS } = SETTINGS;

    let selectedTeam = null;

    useEffect(() => {
        const { USER_AUTO_LOGIN, JOIN_TO_GAME } = mediator.getEventTypes();

        const joinToGameHandler = result => result && setView('Joystick');
        const userAutoLoginHandler = data => {
            if (data && !auth) {
                server.userGetInfo();
                setAuth(true);
            }
        }

        mediator.subscribe(JOIN_TO_GAME, joinToGameHandler);
        mediator.subscribe(USER_AUTO_LOGIN, userAutoLoginHandler);

        return () => {
            mediator.unsubscribe(JOIN_TO_GAME, joinToGameHandler);
            mediator.unsubscribe(USER_AUTO_LOGIN, userAutoLoginHandler);
        }
    });

    if (!auth) {
        server._autoAuthEmit(); // TODO временная херня, потому что тут наговнокожено в целом
        return (<div className='errorScreen'><p>Загрузка...</p></div>);
    }

    function handleClick(team) {
        if (team) {
            selectedTeam = team;
            mediator.set(mediator.getTriggerTypes().GET_TEAM, () => selectedTeam);
            server.joinToGame(team);
            // TODO for develop ONLY!!!
            //setView('Joystick');
        }
    }

    return (
        <div className="starterScreenOuter" >
            <Level mediator={mediator} />
            <div className="mainContentContainer">
                <div>
                    <Rang mediator={mediator} />
                </div>
                <div className="TeamSelectionContainer">
                    <button
                        onClick={() => handleClick(GAME_TEAMS.RED)}
                        className="teamSelectionBtn teamRedBtn"
                    >За<br />красных</button>
                    <button
                        onClick={() => handleClick(GAME_TEAMS.BLUE)}
                        className="teamSelectionBtn teamBlueBtn"
                    >За<br />синих</button>
                </div>
            </div>
            <NicknameSetter server={server} mediator={mediator} />
        </div >
    );
}

export default TeamSelect;