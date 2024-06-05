import Sidebar from "../Sidebar"
import './css/Home.css'
import DeliciousCoverImage from '../images/DeliciousCover.jpg';

function Home() {
    return (
        <>
            <div>
                <Sidebar />
                <img src={DeliciousCoverImage} alt="DeliciousCover" />
            </div>

            <div className="home-container">
               <Sidebar />
               {/* Content goes here */}
            </div>
        </>

        
    );
}

export default Home