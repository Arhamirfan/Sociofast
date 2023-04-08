import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import routePaths from "@/src/routes/path";
import AdminDashboard from '@/src/pageComponents/dashboard/AdminDashboard';
import InfluencerStatus from '@/src/pageComponents/dashboard/influencerStatus';
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
            <AdminDashboard page="dashboard">
                <div>
                    <h2>Admin Dashboard</h2>
                    <InfluencerStatus />
                </div>
            </AdminDashboard>
        </>
    )
}

export default index