import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import routePaths from "@/src/routes/path";
import AdminDashboard from '@/src/pageComponents/dashboard/AdminDashboard';
import InfluencerStatus from '@/src/pageComponents/dashboard/influencerStatus';
import Icon from "../../public/assets/images/sociofast.ico";
import Head from 'next/head';
const index = () => {
    let router = useRouter();
    useEffect(() => {
        let token = localStorage.getItem('email');
        if (!token) {
            router.push(router.replace(routePaths.login));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Influencer Dashboard</title>
                <meta name="description" content="Influencer provides admin panel to get and set excel social apps data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={Icon.src} type="image/x-icon"></link>
            </Head>
            <AdminDashboard page="dashboard">
                <div>
                    <h2 className='boldText'>Admin Dashboard</h2>
                    <InfluencerStatus />
                </div>
            </AdminDashboard>
        </>
    )
}

export default index