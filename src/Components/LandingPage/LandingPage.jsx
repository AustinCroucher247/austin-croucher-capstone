import backgroundImage from "../../assets/backgroundLanding2.jpeg"
import logo from "../../assets/RetroRumble.png"
import './LandingPage.scss'
import EnterArcade from '../../assets/EnterArcadeGold.png'

function LandingPage() {
    return (
        <div className="landing__page">
            {/* <img src={logo} className="logo" alt="Logo" /> */}
            <img src={backgroundImage} className="background__image" alt="background" />
            <div className="enter--container">
                <img src={EnterArcade} className="enter" alt="background" />
            </div>
        </div>
    );
}

export default LandingPage;