import React from 'react'
import AdminDashboard from '@/src/pageComponents/dashboard/AdminDashboard'
import Head from 'next/head'
import Icon from "../../public/assets/images/sociofast.ico";

const index = () => {
    return (
        <>
            <Head>
                <title>Influencer record</title>
                <meta name="description" content="Influencer provides admin panel to get and set excel social apps data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={Icon.src} type="image/x-icon"></link>
            </Head>
            <AdminDashboard page="influencer">
                <div>
                    <h2 className='boldText'>Influencer Page</h2>
                </div>
            </AdminDashboard>
        </>
    )
}

export default index