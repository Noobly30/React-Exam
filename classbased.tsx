import React, { useEffect, useState } from 'react';

interface UserDataProps{
    userId: string
}

interface UserData {
    name: string;
    email: string;
}

//定义UserData组件
const UserData: React.FC<UserDataProps> = ({ userId }) => {

    //状态变量，存储用户数据和经过秒数
    const [user, setUser] = useState<UserData | null>(null);
    const [seconds, setSeconds] = useState<number>(0);

    //每秒更新一次秒数
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        // 清理函数
        return () => clearInterval(intervalId);
    }, []);

    //在userId变化时获取用户数据
    useEffect(() => {
        //从 API 获取用户数据
        fetch(`https://secret.url/user/${userId}`) 
            .then(response => response.json())
            .then((data: UserData) => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));//获取失败，记录错误
    }, [userId]);

    //渲染JSX
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