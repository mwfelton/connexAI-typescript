import React from 'react';
import TimeComponent from '../components/Time/Time';
import MetricsComponent from '../components/Metrics/Metrics';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <TimeComponent />
            <MetricsComponent />
        </div>
    );
};

export default HomePage;
