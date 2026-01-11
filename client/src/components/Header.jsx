import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import NavBar from "./Navbar";
import { UseAppContext } from "../context/AppContext";
import { useClerk, UserButton } from "@clerk/clerk-react";

const Header = () =>
{
  const [ menuOpened, setmenuOpened ] = useState( false );
  const toggleMenu = () => setmenuOpened( ( prev ) => !prev );
  const { user, navigate, cartCount, isOwner } = UseAppContext();
  const { openSignIn } = useClerk();
  
  return (
    
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-md backdrop-blur-sm py-4">
      <div className="max-padd-container flexBetween">
        {/* 1.(Logo) */}
        <div className="flex-1 flex items-center justify-start">
          <Link to={"/"} className="flex items-center gap-x-2">
            <img src="/treh.png" alt="SelfCare Logo" className="h-10" />
            <span className="hidden sm:block bold-24 text-secondary">
              SelfCare
            </span>
          </Link>
        </div>

        {/* 2. (NavBar) */}
        <div className="flex-2 flex justify-center">
          <NavBar
            setmenuOpened={setmenuOpened}
            containerStyles={`${
              menuOpened
                ? "flex items-start flex-col gap-y-8 fixed top-[75px] right-4 p-6 bg-white rounded-xl shadow-2xl w-52 z-50 transition-all duration-300"
                : "hidden lg:flex gap-x-5 xl:gap-x-10 medium-16 bg-primary rounded-full p-2"
            }`}
          />
        </div>

        {/* (Buttons & Icons) */}
        <div className="flex-1 flex items-center justify-end gap-x-4 sm:gap-x-6">
          <div>
            {isOwner && (
              <button onClick={()=> navigate('/owner')} className="hidden sm:block medium-16 hover:text-secondary transition-colors cursor-pointer">
              Dashboard
            </button>
            )}
          </div>

          {/* (Cart Icon) */}
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <img src="/card.png" alt="Cart" className="w-6 sm:w-7" />

              <div className="absolute -top-2 -right-2 text-xs font-bold text-white bg-secondary w-5 h-5 flexCenter rounded-full">
                {cartCount()}
              </div> 
            </Link>
          </div>
            {/* User */}
          <div className="group">
            {user ? ( <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
                  label="my orders"
                  labelIcon={<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7 4h10v2H7V4zm0 4h10v2H7V8zm0 4h6v2H7v-2zm-4-8h2v16H3V4zm18 0h-2v16h2V4z" />
                    </svg>}
            onClick={() => navigate('/orders')}
          />
        </UserButton.MenuItems>
      </UserButton>) :
              <button onClick={openSignIn} className="btn-secondary flexCenter gap-2">
              Login
              <img
                src="/iconPerson.png"
                alt="User Icon"
                className="invert w-5"
              />
            </button>}
            
          </div>

          <div className="relative lg:hidden w-7 h-6 flexCenter">
            <img
              onClick={toggleMenu}
              src="/muneOne.png"
              alt="Open Menu"
              className={`absolute inset-0 cursor-pointer transition-opacity duration-300 ${
                menuOpened ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              onClick={toggleMenu}
              src="/muneTow.png"
              alt="Close Menu"
              className={`absolute inset-0 cursor-pointer transition-opacity duration-300 ${
                menuOpened ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
