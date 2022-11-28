import TruQuest from './TruQuest';

export default function useTruQuest({ SETTINGS, mediator }) {
    const callbacks = {
        registration: data => mediator.call(SETTINGS.MESSAGES.USER_REGISTRATION, data),
        autoLogin: data => mediator.call(SETTINGS.MESSAGES.USER_AUTO_LOGIN, data),
        userGenName: data => mediator.call(SETTINGS.MESSAGES.USER_GEN_NAME, data),
        userGetInfo: data => mediator.call(SETTINGS.MESSAGES.USER_GET_INFO, data),
        joinToGame: data => mediator.call(SETTINGS.MESSAGES.JOIN_TO_GAME, data),
        leaveGame: data => mediator.call(SETTINGS.MESSAGES.LEAVE_GAME, data),
        closeGame: data => mediator.call(SETTINGS.MESSAGES.CLOSE_GAME, data),
        tankMoveUp: data => mediator.call(SETTINGS.MESSAGES.TANK_MOVE_UP, data),
        tankMoveDown: data => mediator.call(SETTINGS.MESSAGES.TANK_MOVE_DOWN, data),
        tankMoveLeft: data => mediator.call(SETTINGS.MESSAGES.TANK_MOVE_LEFT, data),
        tankMoveRight: data => mediator.call(SETTINGS.MESSAGES.TANK_MOVE_RIGHT, data),
        tankShot: data => mediator.call(SETTINGS.MESSAGES.TANK_SHOT, data),
        tankStop: data => mediator.call(SETTINGS.MESSAGES.TANK_STOP, data),
        killTank: data => mediator.call(SETTINGS.MESSAGES.KILL_TANK, data),
        roundEnd: data => mediator.call(SETTINGS.MESSAGES.ROUND_END, data),
        tournamentEnd: data => mediator.call(SETTINGS.MESSAGES.TOURNAMENT_END, data),
    }

    return () => new TruQuest({
        type: SETTINGS.USER_TYPES.PLAYER,
        callbacks,
        SETTINGS
    });
}