import { useEffect, useState, useRef, createRef } from "react";

import './MoveStick.css';

function MoveStick({ server }) {
    const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
    const [currentCommand, setCurrentCommand] = useState('stop');
    const firstUpdate = useRef(true);
    const stickRef = createRef();

    useEffect(() => {
        // проверка на первый рендер (не вызваем событие стоп при монтировании компонента)
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        switch (currentCommand) {
            case 'up': return server.tankMoveUp();
            case 'down': return server.tankMoveDown();
            case 'right': return server.tankMoveRight();
            case 'left': return server.tankMoveLeft();
            case 'stop':
            default: return server.tankStop();
        }
    }, [server, currentCommand])

    const movementManager = (x, y) => {
        setCurrentCommand(x > y
            ? (x + y > 0 ? 'right' : 'down')
            : (x + y > 0 ? 'up' : 'left')
        );
    }

    const onTouchStart = (e) => {
        const { clientX: startX, clientY: startY } = e.touches[0];
        setStickPosition({ x: 0, y: 0, startX, startY });
        stickRef?.current?.classList.add('activeStick');
    }

    const onTouchMove = (e) => {
        stickPosition.x = e.touches[0].clientX - stickPosition.startX;
        stickPosition.y = stickPosition.startY - e.touches[0].clientY;
        // максимальная длиння дижения стика от центра
        const delta = window.outerHeight / 10;
        // вычисляем длину вектора от начала до места в котором находится палец
        const l = Math.sqrt(stickPosition.x ** 2 + stickPosition.y ** 2);
        if (l > delta) {
            // не даем стику выйти за область круга
            stickPosition.x /= (l / delta);
            stickPosition.y /= (l / delta);
        }
        movementManager(stickPosition.x, stickPosition.y);
        setStickPosition({ ...stickPosition });
    }

    const onTouchEnd = (e) => {
        setStickPosition({ x: 0, y: 0 });
        setCurrentCommand('stop');
        stickRef?.current?.classList.remove('activeStick');
    }

    return (
        <div className="moveStickOuter">
            <div className="moveStickInner" >
                <div
                    ref={stickRef}
                    className="stick"
                    style={{
                        left: stickPosition.x + 'px',
                        bottom: stickPosition.y + 'px'
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                ></div>
            </div>
        </div>
    );
}

export default MoveStick;