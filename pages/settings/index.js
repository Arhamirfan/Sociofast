import React from 'react'
import AdminDashboard from '@/src/pageComponents/dashboard/AdminDashboard'
const index = () => {
    return (
        <>
            <AdminDashboard page="settings">
                <div>
                    <h2>Settings Page</h2>
                </div>
            </AdminDashboard>
        </>
    )
}

export default index