import './ShotButton.css';

const ShotButton = ({ server }) => (
    <button
        className="shotBtn"
        onClick={() => server.tankShot()}
    />
); 

export default ShotButton;