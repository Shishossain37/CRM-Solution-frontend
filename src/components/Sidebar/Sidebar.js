
import React, { useState } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const sidebarItems = [
    { to: '/inventory', label: 'Inventory' },
    { to: '/account', label: 'Accounts' },
    { to: '/appointment', label: 'Appointments' },
    { to: '/customer', label: 'Customers' },
    { to: '/employee', label: 'Employees' },
    // { to: '/report', label: 'Reports' },
  ];

  return (
    <div className="sidebar d-flex flex-column justify-content-between text-white p-4 vh-100" style={{ backgroundColor: "rgb(67 56 191)" }}>
      <ul className="nav nav-pills flex-column px-0">
        {sidebarItems.map((item, index) => (
          <li className={`nav-item py-1 mb-2 ${index === activeItem ? 'active' : ''}`} key={item.to} onClick={() => handleItemClick(index)}>
            <Link to={item.to} className="nav-link text-white px-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
