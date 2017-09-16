import React from 'react';
import moment from 'moment';
import Layout from 'layouts/main';
import { Link } from 'routes';

// TODO: Figure out why it won't refresh properly, fix index (slug is not defined????)

export default () => (
  <Layout title='NASA-DB Index'>
    <Link route='apod' params={{slug: moment(new Date).format('YYYY-MM-DD')}}>
      <a> Apod </a>
    </Link>
  </Layout>
)
