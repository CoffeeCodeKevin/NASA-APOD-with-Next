import Head from 'next/head';

export default ({ children, title = 'Fun w/ NASA\'s API' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
    </Head>
    <main>
      { children }
    </main>
  </div>
)
