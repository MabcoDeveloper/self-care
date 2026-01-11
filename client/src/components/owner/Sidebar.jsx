import React, { useEffect, useState} from 'react'
import { UseAppContext } from '../../context/AppContext';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { assets } from '../../assets/data';

function Sidebar ()
{
   const { navigate, isOwner, user } = UseAppContext();
  const navItems = [
    {
      path: "/owner",
      label: "Dashboard",
      icon: assets.dashboard,
    },
    {
      path: "/owner/add-product",
      label: "Add Product",
      icon: assets.squarePlus,
    },
    {
      path: "/owner/list-product",
      label: "List Product",
      icon: assets.list,
    }
  ];
  const [isActive, setIsActive] = useState(navItems[0])
  useEffect( () =>
  {
    if ( !isOwner )
    {
      navigate("/")
    }
  },[ isOwner ] )
  
  return (
  
    <div>
      <div className='mx-auto max-w-[1440px] h-[97vh] flex flex-col md:flex-row'>
        {/*sidebar*/}
        <div className=' max-md:flexCenter flex flex-col justify-between bg-primary sd:m-3 md:min-w-[20%] md:min-h-[97vh] rounded-xl shadow pl-2'>
          <div className=' flex flex-col gap-y-6 max-md:items-center md:flex-col md:pt-5'>
            <div className='w-full flex justify-between md:flex-col'>
            {/*Logo*/}
            <div className="flex-1 flex items-center justify-start">
              <Link to={"/"} className="flex items-center gap-x-2">
                <img src="/treh.png" alt="SelfCare Logo" className="h-10" />
                <span className="hidden sm:block bold-24 text-secondary">
                  SelfCare
                </span>
              </Link>
            </div>
              <div className='md:hidden flex  items-center  gap-3 md:bg-primary rounded-b-xl p-2 lg:pl-10 md:mt-10'>
                { " "}
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                          label="my orders"
                          labelIcon={<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24">
                            <path d="M7 4h10v2H7V4zm0 4h10v2H7V8zm0 4h6v2H7v-2zm-4-8h2v16H3V4zm0h-2v16h2V4z" />
                            </svg>}
                    onClick={() => navigate('/orders')}
                  />
                </UserButton.MenuItems>
              </UserButton>
              <div className='text-sm font-semibold text-grey-800 capitalize'>
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </div>
          <div>
            <div className='flex md:flex-col md:gap-x-5 gap-x-8 md:mt-4'>{navItems.map( ( link ) => (
              <NavLink key={link.label} to={link.path} end={link.path === "/owner"}
              className={( { isActive } ) =>
              
                isActive? "flexStart gap-x-2 p-5 lg:pl-12 bold-13 sm:!text-sm mb-4 cursor-pointer h-10 bg-secondary/10 max-md:border-b-4 md:border-r-4 border-secondary" : "flexStart mb-4 gap-x-2 p-5 lg:pl-12 bold-13 sm:!text-sm cursor-pointer h-10 rounded-xl"
              } 
              >
                <img src={link.icon} alt={link.label} className='hidden md:block' width={18} />
                <div>{link.label}</div>
              </NavLink>
            ) )}
            </div>
          </div>
        </div>
          <div className='hidden md:flex items-center gap-3 md:bg-primary border-t border-slate-900/15 rounded-b-xl p-2 pl-5 lg:pl-10 lg:mt-10 md:mt-10'>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                    label="my orders"
                    labelIcon={<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24">
                    <path d="M7 4h10v2H7V4zm0 4h10v2H7V8zm0 4h6v2H7v-2zm-4-8h2v16H3V4zm0h-2v16h2V4z" />
                    </svg>}
                  onClick={() => navigate('/orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
              <div className='text-sm font-semibold text-grey-800 capitalize'>
                {user?.firstName} {user?.lastName}
              </div>
          </div>
        </div>
      <div className='m-3 flex-1 bg-white pt-1 pr-6 rounded-xl shadow-sm'>
        <Outlet /> 
      </div>
      </div>
    </div>
  )
}

export default Sidebar
