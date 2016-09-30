import React from 'react';
import { IndexLink, Link } from 'react-router';

const Page404 = () =>
  <section>
    <p>This is page 404. Nothing here to see.</p>
    <p>
      Go back to <IndexLink to="/">Home</IndexLink> page
      or <Link to="/login">Login</Link> page.
    </p>
  </section>;

export default Page404;
