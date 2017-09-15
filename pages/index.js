import React from 'react';
import axios from 'axios';
import Link from 'next/link';

import stylesheet from 'styles/index.scss';

export default class extends React.Component {
  static async getInitialProps() {
    const key = process.env.API_KEY !== undefined
      ? process.env.API_KEY
      : 'DEMO_KEY'
    const instance = axios.create({
      timeout: 1000,
      headers: {
        'User-Agent': 'NASA-API-test/0.1.0/Not sure what to do with it, yet'
      }
    });
    const res = await instance.get('https://api.nasa.gov/planetary/apod?api_key=' + key)
    const resourceType = res.data.media_type === 'image'
      ? 'image'
      : 'video';
    return {data: res.data, resourceType: resourceType}
  }

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{
          __html: stylesheet
        }}/>
        <div id='apod'>
          <div id='apod-resource'>
            {this.props.resourceType == 'image'
              ? <img id='apod-img' src={this.props.data.url}/>
              : <div id='apod-vid-wrapper'>
                  <iframe src={this.props.data.url} id='apod-vid' allowfullscreen></iframe>
                </div>}
          </div>
          <h1 id='apod-title'>
            {this.props.data.title}
          </h1>
          <div id='apod-desc'>
            {this.props.data.explanation}
          </div>
        </div>
      </div>
    )
  }
}
