import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import routePaths from "@/src/routes/path";
import Statistics from "../../../public/assets/images/statistics.png"
import Turning from "../../../public/assets/images/turning.png"
import Calculator from "../../../public/assets/images/calculator.png"
import Logo from "../../../public/assets/images/sociofast.ico"
const AdminDashboard = ({ page, children }) => {
    const [active, setActive] = useState(page ? page : '');

    const handleClick = (page) => {
        setActive(page);
    };

    return (
        <div className="admin-dashboard-container p-3">
            <div className="admin-sidebar rounded">
                <div className='text-center'>
                    <div className='f-flex flex-row'>
                        <img src={Logo.src} height={50} className='coverImg' />
                        <h3> Influencer</h3>
                    </div>
                    <hr />
                </div>
                <ul>
                    <li className={active === 'dashboard' ? 'active' : ''} onClick={() => handleClick('dashboard')}>
                        <Link href={routePaths.home}>
                            <img src={Statistics.src} height={30} /> &nbsp; Dashboard
                        </Link>
                    </li>
                    <li className={active === 'influencer' ? 'active' : ''} onClick={() => handleClick('influencer')}>
                        <Link href={routePaths.influencer}>
                            <img src={Calculator.src} height={30} /> &nbsp; influencer
                        </Link>
                    </li>
                    <li className={active === 'settings' ? 'active' : ''} onClick={() => handleClick('settings')}>
                        <Link href={routePaths.setting}>
                            <img src={Turning.src} height={30} /> &nbsp; Settings
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
};

export default AdminDashboard;
