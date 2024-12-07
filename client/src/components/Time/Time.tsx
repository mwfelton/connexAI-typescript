import React, { useEffect, useState } from 'react';
import { getTime } from '../../api/timeApi'; // Importing the API function

const TimeComponent: React.FC = () => {
  const [epochTime, setEpochTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const time = await getTime(); // Call the actual API function
        if (time !== null && time !== undefined) {
          setEpochTime(time);
        } else {
          setError('Failed to load time');
        }
      } catch (err) {
        setError('Failed to load time');
      }
    };

    fetchTime(); // Call the renamed function
  }, []);

  return (
    <div>
      <h3>Epoch Time</h3>
      {error ? <p>{error}</p> : epochTime ? <p>{epochTime}</p> : <p>Loading...</p>}
    </div>
  );
};

export default TimeComponent;
