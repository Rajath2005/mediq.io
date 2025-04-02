import React from 'react';

const Profile = () => {
  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      <div className="card p-4">
        <div className="row">
          <div className="col-md-4">
            <img
              src={process.env.PUBLIC_URL + '/images/default-avatar.png'}
              alt="Profile"
              className="img-fluid rounded-circle"
            />
          </div>
          <div className="col-md-8">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            {/* Add more profile information as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
