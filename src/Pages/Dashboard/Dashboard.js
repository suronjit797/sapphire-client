import React from 'react';
import './Dashboard.css'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {

    return (
        <div>
            <div className='dashboard'>
                <div className="dashboard-left">
                    <Link to='/dashboard'> My Orders </Link>
                    <Link to='/dashboard/add-review'> Add A Review </Link>
                    <Link to='/dashboard/my-profile'> My Profile </Link>
                    <Link to='/dashboard/manage-all-orders'> Manage All Orders </Link>
                    <Link to='/dashboard/add-product'> Add A Product </Link>
                    <Link to='/dashboard/manage-products'> Manage Products </Link>
                </div>
                <div className="dashboard-right">
                <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;