import React, { useContext, useState } from 'react';
import { getImageUrl } from '../../Api/imageUpload';
import BecomeHostForm from '../../Components/Form/BecomeHostForm';
import { AuthContext } from '../../contexts/AuthProvider';

const BecomeAHost = () => {
    const { user } = useContext(AuthContext)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleSubmit = event => {
        event.preventDefault()
        const location = event.target.location.value
        const image = event.target.image.files[0]
        getImageUrl(image).then(data => {
            console.log(data);
            const hostData = {
                location: location,
                documentImg: data,
                role: 'requested',
                email: user?.email,
            }
            console.log(hostData);

            // hostRequest(hostData).then(data => console.log(data))
        })
    }


    return (
        <div>
            <BecomeHostForm handleSubmit={handleSubmit} />
        </div>
    );
};

export default BecomeAHost;