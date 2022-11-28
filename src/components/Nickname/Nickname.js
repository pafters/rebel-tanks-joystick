import { useState, useEffect } from 'react';

import './Nickname.css';

function Nickname({ onlyLine, mediator }) {
    const [name, setName] = useState(mediator.get(mediator.getTriggerTypes().GET_AUTH_DATA)?.name);

    useEffect(() => {
        const { USER_GEN_NAME, USER_GET_INFO } = mediator.getEventTypes();

        const userGenNameHandler = newName => {
            if (newName && newName !== name) {
                setName(newName);
            }
        }
        const userGetInfoHandler = data => {
            if (data?.name) {
                userGenNameHandler(data.name);
            }
        }

        mediator.subscribe(USER_GEN_NAME, userGenNameHandler);
        mediator.subscribe(USER_GET_INFO, userGetInfoHandler);

        return () => {
            mediator.unsubscribe(USER_GEN_NAME, userGenNameHandler);
            mediator.unsubscribe(USER_GET_INFO, userGetInfoHandler);
        }
    });

    if (!name) {
        return (<span>Загрузка...</span>);
    }

    return (
        <>
            {onlyLine ? 
                <span>{name}</span> : 
                <div className="nicknameDivOuter">
                    <p>{name}</p>
                </div>
            }
        </>
    );
}

export default Nickname;