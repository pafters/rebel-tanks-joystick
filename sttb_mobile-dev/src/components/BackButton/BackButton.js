import './BackButton.css';

const BackButton = ({ setView, server }) => (
    <button
        className="backBtn"
        onClick={() => {
            server.leaveGame();
            setView('TeamSelect');
        }}
    />
)

export default BackButton;