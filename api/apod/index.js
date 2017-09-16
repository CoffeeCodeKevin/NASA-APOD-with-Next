import axios from 'axios';

export function getApod(slug) {
  const key = process.env.API_KEY !== undefined
    ? process.env.API_KEY
    : 'DEMO_KEY';

  const instance = axios.create({
    timeout: 1000,
    headers: {
      'User-Agent': 'NASA-APOD-with-Next/1.0.0/An app to fetch APOD data and display'
    }
  });

  console.log('https://api.nasa.gov/planetary/apod?api_key=' + key +'?date=' + slug)

  // Maybe I should use template literals.
  return slug === undefined
    ? instance.get('https://api.nasa.gov/planetary/apod?api_key=' + key)
    : instance.get('https://api.nasa.gov/planetary/apod?api_key=' + key +'&date=' + slug)
}
