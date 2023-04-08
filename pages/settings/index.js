import React from 'react'
import AdminDashboard from '@/src/pageComponents/dashboard/AdminDashboard'
import routePaths from '@/src/routes/path';
import { useRouter } from 'next/router';
const index = () => {
    let router = useRouter();
    const handleLogout = async () => {
        localStorage.clear();
        router.replace(routePaths.login);
    }
    return (
        <>
            <AdminDashboard page="settings">
                <div>
                    <h2>Settings Page</h2>
                    <div className='pt-4 px-2'>
                        <div className="card fullWidth">
                            <div className="card-body ">
                                <h5 className="card-title">Are you sure you want to logout?</h5>
                                <div className='py-4'>
                                    <div className='d-flex flex-row-reverse pe-4'>
                                        <button className='btn btn-secondary' onClick={handleLogout}>Log out</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </AdminDashboard>
        </>
    )
}

export default index