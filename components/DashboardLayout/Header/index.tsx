import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { Menu, X } from "lucide-react";
import LogoutUser from "../Sidebar/LogoutGroup";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const lastSlashIndex = pathname.lastIndexOf("/");
  const pageName = pathname.substring(lastSlashIndex + 1);
  const currentPage = pageName[0].toUpperCase().concat(pageName.slice(1));

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-lg">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            type="button"
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke  p-2 shadow-sm  lg:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span className="block absolute right-0 h-full w-full">
                <Menu />
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div>
          <h3 className="text-black font-bold">{currentPage}</h3>
        </div>

        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <LogoutUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
