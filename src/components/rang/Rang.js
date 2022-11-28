import { useState, useEffect } from 'react';

import './Rang.css'

function Rang({ mediator }) {
    const [rang, setRang] = useState(mediator.get(mediator.getTriggerTypes().GET_AUTH_DATA)?.rank?.nameRu);

    useEffect(() => {
        const { USER_GET_INFO } = mediator.getEventTypes();

        const userGetInfoHandler = data => {
            if (data?.rank?.nameRu && data.rank.nameRu !== rang) {
                setRang(data.rank.nameRu);
            }
        }

        mediator.subscribe(USER_GET_INFO, userGetInfoHandler);

        return () => {
            mediator.unsubscribe(USER_GET_INFO, userGetInfoHandler);
        }
    });

    if (!rang) {
        return (<span>Загрузка...</span>);
    }

    return (
        <div className="rangDivOuter">
            <p className="rangInfo">Звание: {rang}</p>
        </div>
    )
}
export default Rang;