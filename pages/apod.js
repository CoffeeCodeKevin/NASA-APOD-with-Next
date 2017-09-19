import React from 'react';
import moment from 'moment';
import Layout from 'layouts/main';
import { Link } from 'routes';
import { getApod } from 'api/apod/index';

import stylesheet from 'styles/apod.scss';

// TODO: Error handling of failed API request.
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
      // I really need to find another way to do these styles easily. Not ideal.
      // And wrapping them in a div bugs me.
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
                ? <span> Copyright:
                    <span> {this.props.data.copyright.replace('\n', ', ')} </span>
                  </span>
                : 'This media is public domain.'}
            </div>
            <div id='apod-button-row'>
              <Link prefetch route='apod' params={{ slug: yesterday }}>
                <a className='apod-button'>
                  <i className='icon-left-open' />
                  Yesterday
                </a>
              </Link>
              {isTomorrow
                ? <Link prefetch route='apod' params={{ slug: tomorrow }}>
                    <a className='apod-button'>
                      Tomorrow
                      <i className='icon-right-open' />
                    </a>
                  </Link>
                : null}
            </div>
          </div>
      </Layout>
    )
  }
}
