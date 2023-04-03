import Head from 'next/head'
import Icon from "../public/assets/images/sociofast.ico";

export default function Home() {
  return (
    <>
      <Head>
        <title>SOCIOFAST ADMIN PANEL</title>
        <meta name="description" content="Sociofast provides admin panel to get and set excel social apps data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={Icon.src} type="image/x-icon"></link>
      </Head>
      <main >
        <p>Social fast Website</p>
      </main>
    </>
  )
}
