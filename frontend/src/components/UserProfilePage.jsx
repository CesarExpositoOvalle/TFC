import React, { useState } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [dailyActivity, setDailyActivity] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/updateProfile', {
                id: 1, // Replace with actual user ID
                height,
                weight,
                dailyActivity,
                age,
                goal
            });
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error updating the profile!", error);
        }
    };

    return (
        <form onSubmit={handleUpdateProfile}>
            <h2>Update Profile</h2>
            <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} required />
            <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            <input type="text" placeholder="Daily Activity" value={dailyActivity} onChange={(e) => setDailyActivity(e.target.value)} required />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="text" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} required />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UserProfilePage;