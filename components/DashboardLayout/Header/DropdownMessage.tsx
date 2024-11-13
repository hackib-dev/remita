import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
      >
        {/* <span
          className={`absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" />
        </span> */}

        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.04188 14.2294C4.44741 14.2294 3.9655 13.7475 3.9655 13.153C3.9655 12.5585 4.44741 12.0766 5.04188 12.0766C5.63636 12.0766 6.11827 12.5585 6.11827 13.153C6.11827 13.7475 5.63636 14.2294 5.04188 14.2294Z"
            fill="#667185"
          />
          <path
            d="M8.27105 13.153C8.27105 13.7475 8.75297 14.2294 9.34744 14.2294C9.94191 14.2294 10.4238 13.7475 10.4238 13.153C10.4238 12.5585 9.94191 12.0766 9.34744 12.0766C8.75297 12.0766 8.27105 12.5585 8.27105 13.153Z"
            fill="#667185"
          />
          <path
            d="M13.653 14.2294C13.0585 14.2294 12.5766 13.7475 12.5766 13.153C12.5766 12.5585 13.0585 12.0766 13.653 12.0766C14.2475 12.0766 14.7294 12.5585 14.7294 13.153C14.7294 13.7475 14.2475 14.2294 13.653 14.2294Z"
            fill="#667185"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.6259 12.5589L17.9547 12.8928C17.9573 12.9792 17.9586 13.0659 17.9586 13.153C17.9586 17.9088 14.1032 21.7641 9.34744 21.7641C8.63602 21.7641 7.94335 21.6776 7.27998 21.5141L2.6527 20.9356C1.51463 20.7934 0.723706 19.7325 0.91226 18.6012L1.1961 16.8982L0.986384 15.2205C0.82283 14.5571 0.736328 13.8644 0.736328 13.153C0.736328 8.39721 4.59165 4.54188 9.34744 4.54188C9.46977 4.54188 9.59149 4.54444 9.71258 4.54949C10.597 2.0376 12.9899 0.236328 15.8058 0.236328C19.3726 0.236328 22.2641 3.12782 22.2641 6.69466C22.2641 7.22149 22.2008 7.73495 22.0809 8.22728L21.9389 9.36345L22.1343 10.5357C22.2977 11.5162 21.6122 12.4356 20.6259 12.5589ZM15.8058 2.38911C18.1837 2.38911 20.1113 4.31677 20.1113 6.69466C20.1113 7.06498 20.0648 7.42289 19.9779 7.76352L19.9612 7.82908L19.7954 9.15481C19.7745 9.3226 19.7779 9.49254 19.8057 9.65932L19.9416 10.4749L17.623 10.7647C16.8202 7.97774 14.6476 5.77112 11.8811 4.92068C12.5572 3.42736 14.0613 2.38911 15.8058 2.38911ZM9.34744 6.69466C5.7806 6.69466 2.88911 9.58616 2.88911 13.153C2.88911 13.7077 2.95878 14.2445 3.08931 14.7559L3.10604 14.8214L3.33468 16.6506C3.35888 16.8442 3.35488 17.0403 3.32281 17.2327L3.05879 18.8169L7.679 19.3944L7.74455 19.4111C8.25595 19.5417 8.79278 19.6113 9.34744 19.6113C12.9143 19.6113 15.8058 16.7198 15.8058 13.153C15.8058 9.58616 12.9143 6.69466 9.34744 6.69466Z"
            fill="#667185"
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      {/* <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image width={112} height={112} src="/images/user/user-02.png" alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">Mariya Desoja</h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image width={112} height={112} src="/images/user/user-01.png" alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">Robert Jhon</h6>
                <p className="text-sm">Can you share your offer?</p>
                <p className="text-xs">10min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image width={112} height={112} src="/images/user/user-03.png" alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">Henry Dholi</h6>
                <p className="text-sm">I cam across your profile and...</p>
                <p className="text-xs">1day ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image width={112} height={112} src="/images/user/user-04.png" alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">Cody Fisher</h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <Image width={112} height={112} src="/images/user/user-02.png" alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">Mariya Desoja</h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div> */}
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
