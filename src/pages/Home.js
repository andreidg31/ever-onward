import React from 'react';

function Home({isAuth, user}) {
  return (
    <div>
      <h2>Welcome Home</h2>
      <p>{isAuth.toString()}</p>
      <p>{user.email}</p>
    </div>
  );
}

export default Home