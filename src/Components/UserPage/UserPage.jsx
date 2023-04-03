import Header from '../Header/Header';
import './UserPage.scss';
import { useState } from 'react';

function UserPage() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Header avatar={selectedImage} />
            <div className="user-page">
                <div className='user--container'>
                    <h2 className='user--header'>User Profile</h2>
                    <button className='logout--button' onClick={handleLogout}>Logout</button>
                </div>
                <div className='avatar--container'>
                    <label className='avatar--label'>
                        Upload Avatar:
                        <input type='file' accept='image/*' onChange={handleImageChange} />
                    </label>
                    {selectedImage && (
                        <img className='avatar--image' src={selectedImage} alt='Avatar' />
                    )}
                </div>
            </div>
        </>
    );
}

export default UserPage;