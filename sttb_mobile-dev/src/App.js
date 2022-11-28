import { useState, useEffect } from 'react';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';

import useTruQuest from './services/server/useTruQuest';
import useMediator from './services/mediator/useMediator';
import SETTINGS from './settings';

import PageManager from './pages/PageManager';
import Rotate from './pages/Rotate/Rotate';

import './App.css';

function MainApp({ mediator, server }) {
    const [view, setView] = useState('TeamSelect');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const { KILL_TANK, ROUND_END, TOURNAMENT_END, USER_GET_INFO } = mediator.getEventTypes();

        const userGetInfoHandler = data => setUserData(data);
        const killTankHandler = data => {
            server.userGetInfo();
            const userData = mediator.get(mediator.getTriggerTypes().GET_AUTH_DATA);
            if (data?.victim?.guid === userData?.guid) {
                server.leaveGame();
                setView('GameOver');
            }
        };
        const roundEndHandler = () => {
            server.userGetInfo();
        }
        const tournamentEndHandler = () => {
            server.userGetInfo();
            server.leaveGame();
            setView('TeamSelect');
        };

        mediator.subscribe(USER_GET_INFO, userGetInfoHandler);
        mediator.subscribe(KILL_TANK, killTankHandler);
        mediator.subscribe(ROUND_END, roundEndHandler);
        mediator.subscribe(TOURNAMENT_END, tournamentEndHandler);

        return () => {
            mediator.unsubscribe(USER_GET_INFO, userGetInfoHandler);
            mediator.unsubscribe(KILL_TANK, killTankHandler);
            mediator.unsubscribe(ROUND_END, roundEndHandler);
            mediator.unsubscribe(TOURNAMENT_END, tournamentEndHandler);
        }
    });

    mediator.set(mediator.getTriggerTypes().GET_AUTH_DATA, () => userData);

    return (
        <PageManager
            componentName={view}
            setView={setView}
            server={server}
            mediator={mediator}
        ></PageManager>
    );
}

function App() {
    const mediator = useMediator(SETTINGS)();
    const server = useTruQuest({ SETTINGS, mediator })();

    function getFullScreenStatus() {
        return document?.fullscreenElement ||
            document?.webkitFullscreenElement ||
            document?.mozFullScreenElement ||
            document?.msFullscreenElement;
    }

    function changeScreenDisplay(displayStatus) {
        const docElm = document.documentElement;
        const isInFullScreen = getFullScreenStatus();
        if (displayStatus) {
            if (!isInFullScreen) {
                docElm?.requestFullscreen?.();
                docElm?.mozRequestFullScreen?.();
                docElm?.webkitRequestFullScreen?.();
                docElm?.msRequestFullscreen?.();
            }
        } else {
            if (isInFullScreen) {
                document?.exitFullscreen?.();
                document?.webkitExitFullscreen?.();
                document?.mozCancelFullScreen?.();
                document?.msExitFullscreen?.();
            }
        }
    }

    return (
        <DeviceOrientation lockOrientation={'landscape'}>
            <Orientation orientation='landscape' alwaysRender={false} >
                <div onClick={() => changeScreenDisplay(true)}>
                    <MainApp
                        server={server}
                        mediator={mediator}
                    />
                </div>
            </Orientation>
            <Orientation orientation='portrait' alwaysRender={false}>
                <div className="rotateContainer" onClick={() => changeScreenDisplay(false)}>
                    <Rotate />
                </div>
            </Orientation>
        </DeviceOrientation>
    );
}

export default App;
