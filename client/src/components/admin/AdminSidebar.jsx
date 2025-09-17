import React from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../../admin/assets.js';

function AdminSidebar() {
  return (
    <div className="w-[260px] min-h-screen border-r-2 border-gray-300 bg-white">
      <div className="flex flex-col gap-4 pt-6 px-4 text-[15px]">
        <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md focus:bg-[#f5d0e2] transition" to={'/admin/add'}>
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md focus:bg-[#f5d0e2] transition" to={'/admin/list'}>
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink className="flex items-center gap-3 px-3 py-2 rounded-md focus:bg-[#f5d0e2] transition" to={'/admin/orders'}>
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
