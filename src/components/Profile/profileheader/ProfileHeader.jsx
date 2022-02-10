import axios from '../../../config/axios';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './profileheader.css';
import { useState } from 'react';
import InterestCard from '../interestcard/InterestCard';

function ProfileHeader() {
    const { userData } = useContext(UserContext);
    const [aboutData, setAboutData] = useState({});
    const [interest, setInterest] = useState([]);

    const fetchAboutMe = async () => {
        try {
            const res = await axios.get(`/about/${userData.id}`);
            setAboutData(res.data.about);
            setInterest(res.data.about.interest.split(','));
        } catch (err) {
            console.log(err);
        }
    };
    console.log(interest);
    useEffect(() => {
        fetchAboutMe();
    }, []);

    if (!aboutData) {
        return <></>;
    }

    return (
        <>
            <div className="coverPicture">
                <img
                    className="coverImg"
                    src="https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper..jpg"
                    alt="Cover Photo"
                />
            </div>
            <div className="profileHeader">
                <div className="profileDetail">
                    <div className="topProfileDetail">
                        <div className="profilePicture">
                            <img
                                className="profileImg"
                                src={userData.profileUrl}
                                alt="Profile Pigture"
                            />
                        </div>

                        <div className="editProfile">
                            <button
                                type="button"
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#EditProfileModal"
                            >
                                <b>Edit Profile</b>
                            </button>
                            <button
                                className="btn"
                                data-bs-toggle="modal"
                                data-bs-target="#LogoutModal"
                            >
                                <b>
                                    <i className="bi bi-box-arrow-right"></i>
                                </b>
                            </button>
                        </div>
                    </div>
                    <div className="profileDetailContent">
                        <div className="username">
                            <strong>{userData.username}</strong>
                        </div>
                        <div className="aboutme">
                            {/* <button
                                className="d-flex "
                                style={{ backgroundColor: '#F6CCD6' }}
                            >
                                <i className="bi bi-gender-ambiguous"></i>
                                <div>
                                    <b>Female</b>
                                </div>
                            </button>
                            <button
                                className="d-flex"
                                style={{ backgroundColor: '#F6CCD6' }}
                            >
                                <div>
                                    <b>Age : 26</b>
                                </div>
                            </button> */}
                            {interest.map((item, i) => {
                                return <InterestCard item={item} key={i} />;
                            })}
                        </div>
                        <div className="caption">{aboutData.caption}</div>
                    </div>
                </div>
                <div className="tabButton">Post</div>
            </div>
        </>
    );
}

export default ProfileHeader;