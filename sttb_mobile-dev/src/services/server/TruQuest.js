import md5 from 'md5';
import io from 'socket.io-client';

export default class TruQuest {
    constructor({
        type,
        uuid, // uuid телевизора
        platform,
        model,
        callbacks = {
            registration: () => { },
            autoLogin: () => { },
        },
        SETTINGS
    } = {}) {
        const { HOST, MESSAGES, USER_TYPES } = SETTINGS;
        this.MESSAGES = MESSAGES;
        this.guid = null;; // guid юзера (постоянный)
        this.token = null; // сессионный токен юзера
        // проинициализировать сокеты

        console.log(`try to connect to socket ${HOST}`);

        this.socket = io(`${HOST}`);
        this.socket.on('connect', () => {

            console.log(`connected!`);

            this.token = this.getData('token');
            this.guid = this.getData('guid');
            if (this.guid && this.token) { // попытка автоматической авторизации
                this._autoAuthEmit();
                return;
            }
            if (type === USER_TYPES.PLAYER || type === USER_TYPES.TV) {
                this._registrationEmit(type, uuid, platform, model); // автоматически регистрируемся, ибо этот уеблан не получился
            }
        });
        this.socket.on(this.MESSAGES.USER_REGISTRATION, data => {
            callbacks?.registration(data);
            if (data) { // регистрация успешная, можно отправлять запрос на авторизацию
                this.setData('guid', this.guid); // записать в localStore
                this._autoAuthEmit();
            }
        });
        this.socket.on(this.MESSAGES.USER_AUTO_LOGIN, data => {
            if (data) {
                this.setData('token', this.token); // записать в localStore
            }
            callbacks?.autoLogin(data);
        });

        // создание методов для эмита и подписка на коллбеки в них
        //console.log('список методов в классе:');
        const capitalizeFirstLetter = ([first, ...rest]) => first.toUpperCase() + rest.join('');
        Object.values(MESSAGES).map(name => {
            if (name !== MESSAGES.USER_REGISTRATION && // регистрация отдельно
                name !== MESSAGES.USER_AUTO_LOGIN // авторизация - тоже отдельно
            ) {
                const methodName = name.toLowerCase()
                    .split('_')
                    .map((elem, index) => index === 0 ? elem : capitalizeFirstLetter(elem))
                    .join('');
                if (name === MESSAGES.JOIN_TO_GAME) { // отдельно добавлен параметр в запрос на присоединение к игре
                    this[methodName] = team => this.messageEmit(this.MESSAGES[name], { team, link: window.location.pathname.split('/').pop() });
                } else {
                    this[methodName] = (data = {}) => this.messageEmit(this.MESSAGES[name], data); // записываем эмитный метод
                }
                this.socket.on(this.MESSAGES[name], data => callbacks[methodName]?.(data)); // записываем этот метод в прослушку сокета
                //console.log(methodName);
            }
            return true;
        });
        //console.log('эти же названия используются в коллбеках');
    }

    _checkGuidToken() {
        return this.guid && this.token;
    }

    /*******************/
    /* Support methods */
    /*******************/
    // генерирует guid
    genGuid() {
        function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    // возвращает контрольную сумму хеша, сформированную по правилу hash = md5(token + строка(guid=значение;rnd=значение))
    getHash(token, params = {}) {
        return md5(token + Object.keys(params).sort().reduce((acc, key) => acc += params[key] ? `${key}=${params[key]};` : '', ''));
    }

    /*****************/
    /* Local storage */
    /*****************/
    getData(name) {
        return name ? localStorage.getItem(name) : null;
    }
    setData(name, value) {
        if (name) {
            localStorage.setItem(name, value);
        }
    }

    /*****************/
    /* Socket events */
    /*****************/
    _autoAuthEmit() {
        if (this.guid) {
            const rnd = Math.round(Math.random() * 1000000);
            this.token = md5(this.guid + (this.token || 'default token') + rnd);
            const hash = this.getHash(this.token, { guid: this.guid, rnd });
            this.socket.emit(this.MESSAGES.USER_AUTO_LOGIN, { guid: this.guid, rnd, hash });
        }
    }

    _registrationEmit(type, uuid = md5('some uuid' + Math.round(Math.random() * 1000000)), platform, model) {
        // почистить токен, потому что он нормально так может заруинить дальнейшую регистрацию и авторизацию
        this.token = null;
        this.setData('token', this.token); // записать в localStore
        // сгенерировать guid
        this.guid = this.genGuid();
        this.socket.emit(this.MESSAGES.USER_REGISTRATION, { guid: this.guid, type, uuid, platform, model });
    }

    messageEmit(message, params = {}) {
        if (this._checkGuidToken()) {
            const rnd = Math.round(Math.random() * 1000000);
            const hash = this.getHash(this.token, { guid: this.guid, rnd, ...params });
            this.socket.emit(message, { guid: this.guid, rnd, hash, ...params });
        }
    }
}