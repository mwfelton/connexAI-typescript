import React from 'react';
import TimeComponent from '../components/Time/Time';
import MetricsComponent from '../components/Metrics/Metrics';
import './Home.css'; // Import the updated CSS

const HomePage: React.FC = () => {
    return (
        <div className="HomePage">
            {/* Left Section */}
            <div id="left">
                <h1>Time</h1>
                <TimeComponent />
            </div>

            {/* Right Section */}
            <div id="right">
                <h1>Metrics</h1>
                <MetricsComponent />
            </div>
        </div>
    );
};

export default HomePage;
