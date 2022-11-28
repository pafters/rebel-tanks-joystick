import Nickname from '../../../components/Nickname/Nickname';

import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import './nicknameSetter.css';

function NicknameSetter({ mediator, server }) {

    function changeName() {
        server.userGenName();
    }

    return (
        <div className="nicknameSetterOuter">
            <p className="nicknameOutput" >Ваш ник: <Nickname mediator={mediator} onlyLine /></p>
            <button
            className="switchNicknameBtn"
                onClick={changeName}
                >
                <SwapHorizIcon sx={{ width: '100%', height: '100%', color: '#ffffff', transform: 'rotate(135deg)' }} />
            </button>
        </div >
    );
}

export default NicknameSetter;