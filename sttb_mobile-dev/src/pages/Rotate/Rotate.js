import { motion } from "framer-motion";

import rotateNotifcation from '../../assets/rotate-notification.png';

import './Rotate.css';

function Rotate() {
    return (
        <div className="rotateDivOuter" >
            <motion.div
                className="rotateImage"
                animate={{ rotate: -270 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    type: 'tween'
                }}
                style={{
                    content: `url(${rotateNotifcation})`
                }}
            />
            <p className="textNotification">Поверни телефон</p>
        </div>
    );
}

export default Rotate;