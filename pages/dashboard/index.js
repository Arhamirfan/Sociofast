import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import routePaths from "@/src/routes/path";
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
            <div>
                <h2>Dashboard</h2>
            </div>
        </>
    )
}

export default index