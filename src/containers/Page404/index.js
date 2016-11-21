import React from 'react';
import { IndexLink, Link } from 'react-router';

const Page404 = () =>
  <main>
    <p>This is page 404. Nothing here to see.</p>
    <p>
      Go back to <IndexLink to="/">Home</IndexLink> page
      or <Link to="/login">Login</Link> page.
    </p>
  </main>;

export default Page404;
