import axios from 'axios';
import wrapper from 'axios-cache-plugin';

export function getApod(slug) {
  const key = process.env.API_KEY !== undefined
    ? process.env.API_KEY
    : 'DEMO_KEY';

  let instance = wrapper(axios, {
    maxCacheSize: 100
  });

  instance.__addFilter(/apod/);

  instance({
    timeout: 1000,
    headers: {
      'User-Agent': 'NASA-APOD-with-Next/1.0.0/An app to fetch APOD data and display'
    }
  });

  // Maybe I should use template literals.
  return slug === undefined
    ? instance.get('https://api.nasa.gov/planetary/apod?api_key=' + key)
    : instance.get('https://api.nasa.gov/planetary/apod?api_key=' + key +'&date=' + slug)
}
