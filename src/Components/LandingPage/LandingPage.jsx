
import './LandingPage.scss'
import EnterArcade from '../../assets/EnterArcadeGold.png'
import { Link } from "react-router-dom"

function LandingPage() {
    return (
        <div className="landing__page">
            <div className="enter--container">
                <Link to={'./HomePage'}>  <img src={EnterArcade} className="enter" alt="background" /> </Link>
            </div>
        </div>
    );
}

export default LandingPage;



