import Mediator from './Mediator';

export default function useMediator(SETTINGS) {
    const { MESSAGES, MEDIATOR } = SETTINGS;
    Object.keys(MESSAGES).forEach(key => MEDIATOR.EVENTS[key] = MESSAGES[key]);
    return () => new Mediator(MEDIATOR);
}