import Sidebar from "../Sidebar"
import './css/Home.css'
import DeliciousCoverImage from '../images/DeliciousCover.jpg';

function Home() {
    return (
        <>
            <div className="Content">
                <Sidebar />
                <div>
                    <img src={DeliciousCoverImage} alt="DeliciousCover" />
                </div>
                <div className="home-container">
                    {/* Content goes here */}
                </div>
            </div>
        </>


    );
}

export default Home