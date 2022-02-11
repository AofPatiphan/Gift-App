import axios from '../../config/axios';
import React, { useContext, useEffect, useState } from 'react';
import CardProfile from '../../components/Profile/cardprofile/CardProfile';
import { UserContext } from '../../contexts/UserContext';
import './home.css';

function Home() {
    const { userData } = useContext(UserContext);
    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        const fetchAllUser = async (id) => {
            const res = await axios.get(`/user/all/${id}`);
            setAllUserData(res.data.users);
        };
        fetchAllUser(userData.id);
    }, []);
    return (
        <div className="homePage">
            <div className="cardContainer">
                {allUserData.map((item) => {
                    return <CardProfile item={item} key={item.id} />;
                })}
            </div>
        </div>
    );
}

export default Home;
