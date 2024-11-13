import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutUser from "./LogoutGroup";
import LogoIcon from "../../../assets/images/logo.svg";
import { useAppSelector } from "@/store/hooks";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const lastSlashIndex = pathname.lastIndexOf("/");
  const pageName = pathname.substring(lastSlashIndex + 1);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const menu = useRef<any>(null);

  const storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target) ||
        open
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 bg-[#101928] text-white z-50 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-4 mt-5">
        <Link href="/dashboard" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <LogoIcon />
        </Link>

        <button
          type="button"
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5  px-4 lg:mt-2 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Link
                  href="/bank-transfer"
                  className={`group relative text-sm flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pageName.includes("bank-transfer") &&
                    "bg-cyan-950 dark:bg-meta-4"
                  }`}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.912 0.987571C10.7643 0.184157 9.23666 0.184155 8.08893 0.987569L2.35761 4.99949C1.3921 5.67535 0.855245 6.81083 0.945636 7.98592L1.53315 15.6236C1.64396 17.0641 2.94913 18.1111 4.37934 17.9068L7.02069 17.5294C8.25231 17.3535 9.16713 16.2987 9.16713 15.0545V14C9.16713 13.5398 9.54023 13.1667 10.0005 13.1667C10.4607 13.1667 10.8338 13.5398 10.8338 14V15.0545C10.8338 16.2987 11.7486 17.3535 12.9802 17.5294L15.6216 17.9068C17.0518 18.1111 18.357 17.0641 18.4678 15.6236L19.0553 7.98592C19.1457 6.81083 18.6088 5.67535 17.6433 4.99949L11.912 0.987571ZM9.0447 2.35296C9.61856 1.95125 10.3824 1.95125 10.9562 2.35296L16.6876 6.36488C17.1703 6.70281 17.4387 7.27055 17.3935 7.85809L16.806 15.4958C16.7691 15.976 16.334 16.3249 15.8573 16.2568L13.2159 15.8795C12.8054 15.8209 12.5005 15.4693 12.5005 15.0545V14C12.5005 12.6193 11.3812 11.5 10.0005 11.5C8.61976 11.5 7.50047 12.6193 7.50047 14V15.0545C7.50047 15.4693 7.19553 15.8209 6.78499 15.8795L4.14364 16.2568C3.6669 16.3249 3.23184 15.976 3.19491 15.4958L2.60739 7.85809C2.5622 7.27055 2.83062 6.70281 3.31338 6.36488L9.0447 2.35296Z"
                      fill="#98A2B3"
                    />
                  </svg>
                  Bank Transfer
                </Link>
              </li>

              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Link
                  href="/check-status"
                  className={`group relative text-sm flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pageName.includes("check-status") &&
                    "bg-cyan-950 dark:bg-meta-4"
                  }`}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.912 0.987571C10.7643 0.184157 9.23666 0.184155 8.08893 0.987569L2.35761 4.99949C1.3921 5.67535 0.855245 6.81083 0.945636 7.98592L1.53315 15.6236C1.64396 17.0641 2.94913 18.1111 4.37934 17.9068L7.02069 17.5294C8.25231 17.3535 9.16713 16.2987 9.16713 15.0545V14C9.16713 13.5398 9.54023 13.1667 10.0005 13.1667C10.4607 13.1667 10.8338 13.5398 10.8338 14V15.0545C10.8338 16.2987 11.7486 17.3535 12.9802 17.5294L15.6216 17.9068C17.0518 18.1111 18.357 17.0641 18.4678 15.6236L19.0553 7.98592C19.1457 6.81083 18.6088 5.67535 17.6433 4.99949L11.912 0.987571ZM9.0447 2.35296C9.61856 1.95125 10.3824 1.95125 10.9562 2.35296L16.6876 6.36488C17.1703 6.70281 17.4387 7.27055 17.3935 7.85809L16.806 15.4958C16.7691 15.976 16.334 16.3249 15.8573 16.2568L13.2159 15.8795C12.8054 15.8209 12.5005 15.4693 12.5005 15.0545V14C12.5005 12.6193 11.3812 11.5 10.0005 11.5C8.61976 11.5 7.50047 12.6193 7.50047 14V15.0545C7.50047 15.4693 7.19553 15.8209 6.78499 15.8795L4.14364 16.2568C3.6669 16.3249 3.23184 15.976 3.19491 15.4958L2.60739 7.85809C2.5622 7.27055 2.83062 6.70281 3.31338 6.36488L9.0447 2.35296Z"
                      fill="#98A2B3"
                    />
                  </svg>
                  Check Status
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <div className="absolute w-full bottom-4 no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5  px-4 lg:mt-2 lg:px-6">
            <LogoutUser />
          </nav>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
