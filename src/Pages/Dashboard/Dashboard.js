import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import { NavLink, Outlet } from 'react-router-dom'
import axios from 'axios';

const Dashboard = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/jwt-verify', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setUser(res.data)
            setLoading(false)
        })
    }, [loading])


    return (
        <div>
            <div className='dashboard'>
                <div className="dashboard-left bg-dark">

                    {
                        user.role === 'admin' ? (
                            <>
                                <NavLink to='/dashboard/add-review'> Add A Review </NavLink>
                                <NavLink to='/dashboard/manage-all-orders'> Manage All Orders </NavLink>
                                <NavLink to='/dashboard/manage-users'> Manage Users </NavLink>
                                <NavLink to='/dashboard/add-product'> Add A Product </NavLink>
                                <NavLink to='/dashboard/manage-products'> Manage Products </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to='/dashboard/'> My Profile </NavLink>
                                <NavLink to='/dashboard/my-order'> My Orders </NavLink>

                            </>
                        )
                    }





                </div>
                <div className="dashboard-right">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;