import React from 'react';
import moment from 'moment';
import Layout from 'layouts/main';
import { Link } from 'routes';

// TODO Style page with something, dunno what to use for index, yet
// TODO Figure out what other parts of the API I want to play with. Mars rover looks cool.
export default () => (
  <Layout title='NASA-DB Index'>
    <Link route='apod' params={{slug: moment(new Date).format('YYYY-MM-DD')}}>
      <a> Apod </a>
    </Link>
  </Layout>
)
