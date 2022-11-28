const SETTINGS = {
    HOST: 'https://rebeltanks.ru',

    MESSAGES: {
        // about user
        USER_REGISTRATION: 'USER_REGISTRATION',
        USER_AUTO_LOGIN: 'USER_AUTO_LOGIN',
        USER_GEN_NAME: 'USER_GEN_NAME', // получить рандомное имя
        USER_GET_INFO: 'USER_GET_INFO', // получить информацию юзера о нём самом
        // about game
        JOIN_TO_GAME: 'JOIN_TO_GAME', // прицепиться к игре
        LEAVE_GAME: 'LEAVE_GAME', // выход игрока из игры
        CLOSE_GAME: 'CLOSE_GAME', // событие завершения игры телевизором
        // действия игрока в игре
        TANK_MOVE_UP: 'TANK_MOVE_UP',
        TANK_MOVE_DOWN: 'TANK_MOVE_DOWN',
        TANK_MOVE_LEFT: 'TANK_MOVE_LEFT',
        TANK_MOVE_RIGHT: 'TANK_MOVE_RIGHT',
        TANK_SHOT: 'TANK_SHOT',
        TANK_STOP: 'TANK_STOP',
        // send status from tv to players (in room)
        KILL_TANK: 'KILL_TANK', // танк уничтожен в бою
        ROUND_END: 'ROUND_END', // завершение раунда (уничтожение базы)
        TOURNAMENT_END: 'TOURNAMENT_END', // завершение турнира (команда набрала определенное количество очков)
    },

    USER_TYPES: {
        PLAYER: 'player',
        TV: 'tv'
    },

    GAME_TEAMS: {
        BLUE: 'blue',
        RED: 'red'
    },

    MEDIATOR: {
        EVENTS: {
            FIGHT_END_REACT: 'FIGHT_END_REACT', // событие окончания раунда/турнира, чтобы на него могли отреагировать компоненты
        },
        TRIGGERS: {
            GET_AUTH_DATA: 'GET_AUTH_DATA', // получить авторизационные данные где-нибудь
            GET_TEAM: 'GET_TEAM', // получить выбранную игроком команду
        }
    },
};

export default SETTINGS;