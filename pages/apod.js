import React from 'react';
import moment from 'moment';
import Layout from 'layouts/main';
import { Link } from 'routes';
import { getApod } from 'api/apod/index';

import stylesheet from 'styles/apod.scss';

export default class extends React.Component {
  static async getInitialProps({ query, res }) {
    const apod = await getApod(query.slug)

    return {
      data: apod.data
    }
  }

  render() {
    const resourceType = this.props.data.media_type === 'image'
      ? 'image'
      : 'video';
    const today = moment(this.props.data.date).format('MMMM Do, YYYY');
    const isTomorrow = moment(new Date()).diff(moment(this.props.data.date), 'days');
    const tomorrow = isTomorrow ? moment(this.props.data.date).add(1, 'days').format('YYYY-MM-DD') : null > 0;
    const yesterday = moment(this.props.data.date).subtract(1, 'days').format('YYYY-MM-DD');

    return (
      <Layout title='Astronomy Picture of the Day'>
          <style dangerouslySetInnerHTML={{
            __html: stylesheet
          }}/>
          <div id='apod'>
            <div id='apod-resource'>
              {resourceType == 'image'
                ? <img id='apod-img' src={this.props.data.url}/>
                : <div id='apod-vid-wrapper'>
                    <iframe src={this.props.data.url} id='apod-vid' allowfullscreen></iframe>
                  </div>}
            </div>
            <h1 id='apod-title'>
              {this.props.data.title}
            </h1>
            <div id='apod-date'>
              {today}
            </div>
            <div id='apod-desc'>
              {this.props.data.explanation}
            </div>
            <div id='apod-copyright'>
              {this.props.data.copyright
                ? 'Copyright: ' + this.props.data.copyright
                : 'This media is public domain.'}
            </div>
            <Link route='apod' params={{ slug: yesterday }}>
              <a>
                Yesterday
              </a>
            </Link>
            {isTomorrow
              ? <Link route='apod' params={{ slug: tomorrow }}>
                  <a>
                    Tomorrow
                  </a>
                </Link>
              : null}
          </div>
      </Layout>
    )
  }
}
