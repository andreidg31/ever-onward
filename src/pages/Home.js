import React from 'react';

function Home({isAuth, user}) {
  return (
    <div>
      <h2>Welcome Home</h2>
      <p>{user && user.email}</p>
    </div>
  );
}

export default Home