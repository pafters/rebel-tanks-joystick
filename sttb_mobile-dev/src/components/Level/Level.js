import { useState, useEffect } from 'react';

import './Level.css'

function Level({ mediator }) {
    const [userData, setUserData] = useState(mediator.get(mediator.getTriggerTypes().GET_AUTH_DATA));

    useEffect(() => {
        const { USER_GET_INFO } = mediator.getEventTypes();

        const userGetInfoHandler = data => {
            if (data) {
                setUserData(data);
            }
        }

        mediator.subscribe(USER_GET_INFO, userGetInfoHandler);

        return () => {
            mediator.unsubscribe(USER_GET_INFO, userGetInfoHandler);
        }
    });

    if (!userData) {
        return (<span>Загрузка...</span>);
    }

    const { points, rank } = userData;
    const level = rank?.no;
    const lvlpgrogress = `${points}/${rank?.points}`;
    return (
        <div className="lvlProgressBckgr">
            <div
                className="lvlProgressLine"
                style={{ width: `calc(${lvlpgrogress}*100%)` }}
            />
            <p className="lvlInfo">Уровень: {level}</p>

            <p className="lvlProgressInfo">{lvlpgrogress}</p>
        </div>
    );
}

export default Level;