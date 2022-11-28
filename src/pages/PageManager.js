import Joystick from './Joystick/Joystick';
import TeamSelect from './TeamSelect/TeamSelect';
import GameEndScreen from './GameOver/GameOver';

function PageManager({ componentName, setView, server, mediator }) {
    return (
        <div>
            {componentName === 'TeamSelect' ?
                <TeamSelect setView={setView} server={server} mediator={mediator} /> :
                componentName === 'Joystick' ?
                    <Joystick setView={setView} server={server} mediator={mediator} /> :
                    componentName === 'GameOver' ?
                        <GameEndScreen setView={setView} server={server} mediator={mediator} /> : <></>
            }
        </div>
    );
}


export default PageManager;