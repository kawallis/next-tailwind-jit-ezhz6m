import Head from 'next/head';
import { useState, useEffect } from 'react';

import { Card } from '../components';

export default function Home(props) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // this helps us render something while we wait for the classes to load up
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setError(false);

      const response = await fetch('http://localhost:3000/api/getClasses');
      const { classes } = await response.json();

      // We fetch all the classes and do a clean replace with the most recent data
      setClasses(classes);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = async classId => {
    try {
      const response = await fetch('http://localhost:3000/api/signupForClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classId })
      });

      const nextClass = await response.json();

      // This goes through the classes and finds the one your just booked and updates to the more recent version of it
      // If we wanted to make this more effiecient we could do a map lookup by converting the classes into an object for instant lookuptime
      const nextClasses = classes.map(currentClass => {
        if (nextClass.id === currentClass.id) {
          return nextClass;
        } else {
          return currentClass;
        }
      });

      setClasses(nextClasses);
    } catch (e) {
      // I would forward this error to a alerting system so that we could have visibiltiy into this and also would have a alert component here so that we dont rely on and can extend the window.alert
      window.alert(
        'Sorry we are having trouble reserving your spot at this time please try again later'
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        {loading && <div>Loading data...</div>}
        {error && <div>There was an error.</div>}
        {classes?.map(item => (
          <Card key={item.id} onClick={handleCardClick} {...item} />
        ))}
      </main>
    </div>
  );
}
