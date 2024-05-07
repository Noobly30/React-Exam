import React, { useEffect, useState } from 'react';

interface UserDataProps{
    userId: string
}

interface UserData {
    name: string;
    email: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetch(`https://secret.url/user/${userId}`)
            .then(response => response.json())
            .then((data: UserData) => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    return (
        <div>
            <h1>User Data Component</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <p>Timer: {seconds} seconds</p>
        </div>
    );
};

export default UserData;