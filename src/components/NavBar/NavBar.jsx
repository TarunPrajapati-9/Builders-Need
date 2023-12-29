import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import ProfilePopper from "../ProfilePopper";
import { Avatar, Icon } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import SideBar from "./SideBar";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleProfileModalOpen = (event) => {
    setProfileModalOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
    setAnchorEl(null);
  };

  return (
    <header className="bg-gray-200">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Builder&apos;s Need</span>
            <img
              className="h-16 w-auto  transition-transform hover:scale-110"
              src="/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex justify-center lg:gap-x-8">
          <div className="relative mx-3 lg:mx-8">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.737 14.357A9.93 9.93 0 0 0 18 10c0-5.523-4.477-10-10-10S-2 4.477-2 10s4.477 10 10 10c2.137 0 4.11-.655 5.777-1.757l4.95 4.95c.195.194.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.022 0-1.414l-4.95-4.95zM2 10c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8-8-3.59-8-8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              className="block w-96 h-11 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm"
              placeholder="Search for Products, Brands and More"
              title="Search for Products, Brands and More"
              type="text"
            />
          </div>
          <Link
            to="/cart"
            className={`mt-1.5 text-xl leading-6 font-serif font-black opacity-60 hover:opacity-100 ${
              location.pathname === "/" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Icon>
              <ShoppingCartIcon />
            </Icon>
            &nbsp; Cart
          </Link>

          <Link
            to="/products"
            className={`mt-1.5 text-xl leading-6 font-serif font-black opacity-60 hover:opacity-100 ${
              location.pathname === "/products" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Icon>
              <InventoryIcon />
            </Icon>
            &nbsp; Products
          </Link>
          <Link
            to="/brands"
            className={`mt-1.5 text-xl leading-6 font-serif font-black opacity-60 hover:opacity-100 ${
              location.pathname === "/brands" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Icon>
              <AssuredWorkloadIcon />
            </Icon>
            &nbsp; Become a Seller
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:justify-end items-center gap-x-6">
          <ProfilePopper
            open={isProfileModalOpen}
            handleClose={handleProfileModalClose}
            anchorEl={anchorEl}
          />
          <Avatar
            className="transition-transform hover:scale-110"
            alt="Remy Sharp"
            onClick={handleProfileModalOpen}
            src="/favicon.png"
            sx={{ cursor: "pointer" }}
          />
          {/* <Link
            to="/login"
            className="text-sm font-serif  leading-6  cursor-pointer font-black opacity-60 hover:opacity-100"
            onClick={() => {
              localStorage.clear();
            }}
          >
            Log Out &rarr;
          </Link> */}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-60 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src="/fingerprint.svg" alt="" />
            </Link>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <SideBar />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
