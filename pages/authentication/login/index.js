import Head from 'next/head';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import routePaths from '@/src/routes/path';
import Icon from "../../../public/assets/images/sociofast.ico"
import AuthenticationPage from '@/src/pageComponents/authentication/authenticationPage';



const index = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let token = localStorage.getItem('email');
        console.log("🚀 ~ file: index.js:25 ~ useEffect ~ token:", token)
        if (token) {
            setLoading(false);
            router.replace(routePaths.home);
        }
        setLoading(false);
    }, []);
    return (
        <>
            <Head>
                <title>Influencer Admin login</title>
                <link rel="icon" href={Icon.src} type="image/x-icon"></link>
            </Head>
            <AuthenticationPage type="login" loading={loading} />
        </>
    )
}

export default index