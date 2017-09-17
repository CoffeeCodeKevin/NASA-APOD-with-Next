import React from 'react';
import moment from 'moment';
import Layout from 'layouts/main';
import { Link } from 'routes';

import stylesheet from 'styles/index.scss';

// TODO Figure out what other parts of the API I want to play with. Mars rover looks cool.
export default () => (
  <Layout title='NASA-DB Index'>
    <style dangerouslySetInnerHTML={{
      __html: stylesheet
    }}/>
    <div className='centered'>
      <Link route='apod' params={{slug: moment(new Date).format('YYYY-MM-DD')}}>
        <a> Apod </a>
      </Link>
      <div className='idk'>
        I have no idea what to put here, yet.
      </div>
    </div>
  </Layout>
)
