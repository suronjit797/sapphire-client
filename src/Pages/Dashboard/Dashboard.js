import React from 'react';
import './Dashboard.css'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {

    return (
        <div>
            <div className='dashboard'>
                <div className="dashboard-left bg-dark">
                    <NavLink to='/dashboard/'> My Orders </NavLink>
                    <NavLink to='/dashboard/add-review'> Add A Review </NavLink>
                    <NavLink to='/dashboard/my-profile'> My Profile </NavLink>
                    <NavLink to='/dashboard/manage-all-orders'> Manage All Orders </NavLink>
                    <NavLink to='/dashboard/add-product'> Add A Product </NavLink>
                    <NavLink to='/dashboard/manage-products'> Manage Products </NavLink>
                </div>
                <div className="dashboard-right">
                <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;