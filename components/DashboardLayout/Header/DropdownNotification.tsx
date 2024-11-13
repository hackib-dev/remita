import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" />
        </span> */}

        <svg
          width="19"
          height="23"
          viewBox="0 0 19 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5768 1.31272C10.5768 0.718244 10.0949 0.236328 9.50039 0.236328C8.90592 0.236328 8.424 0.718244 8.424 1.31272V1.92719C4.77276 2.4493 1.96567 5.58839 1.96567 9.38445L1.96567 13.6904C1.96567 13.6904 1.96568 13.6903 1.96567 13.6904C1.96556 13.6925 1.96483 13.7069 1.96017 13.7352C1.95456 13.7691 1.94461 13.8152 1.92819 13.8745C1.8949 13.9947 1.84192 14.1444 1.76791 14.3214C1.61951 14.6762 1.4103 15.0847 1.17893 15.4969C0.743908 16.2718 0.524631 17.1953 0.689252 18.0734C0.862856 18.9995 1.45895 19.8071 2.47702 20.1948C3.38647 20.541 4.59704 20.8577 6.19573 21.0462C6.23377 21.0792 6.27875 21.1169 6.33042 21.1582C6.49219 21.2876 6.72331 21.4554 7.0154 21.6223C7.59511 21.9535 8.45223 22.3023 9.50039 22.3023C10.5486 22.3023 11.4057 21.9535 11.9854 21.6223C12.2775 21.4554 12.5086 21.2876 12.6704 21.1582C12.722 21.1169 12.767 21.0792 12.8051 21.0462C14.4037 20.8577 15.6143 20.541 16.5238 20.1948C17.5418 19.8071 18.1379 18.9995 18.3115 18.0734C18.4762 17.1953 18.2569 16.2718 17.8219 15.4969C17.5905 15.0847 17.3813 14.6762 17.2329 14.3214C17.1589 14.1444 17.1059 13.9947 17.0726 13.8745C17.0562 13.8152 17.0462 13.7691 17.0406 13.7352C17.0359 13.7069 17.0352 13.6928 17.0351 13.6907C17.0351 13.6905 17.0351 13.6907 17.0351 13.6907L17.0351 13.6816V9.38497C17.0351 5.58899 14.2281 2.44939 10.5768 1.9272V1.31272ZM4.11845 9.38445C4.11845 6.41234 6.52777 4.00369 9.50039 4.00369C12.4729 4.00369 14.8823 6.41275 14.8823 9.38497V13.6912C14.8823 14.1895 15.069 14.727 15.2468 15.152C15.4399 15.6137 15.6929 16.1023 15.9446 16.5507C16.1894 16.9867 16.2477 17.3987 16.1956 17.6768C16.1525 17.9069 16.0374 18.0764 15.7577 18.1829C14.6007 18.6234 12.6477 19.0731 9.50039 19.0731C6.35311 19.0731 4.40003 18.6234 3.24307 18.1829C2.96336 18.0764 2.84832 17.9069 2.80517 17.6768C2.75304 17.3987 2.8114 16.9867 3.05615 16.5507C3.30786 16.1023 3.56091 15.6137 3.754 15.152C3.93174 14.727 4.11845 14.1895 4.11845 13.6912V9.38445Z"
            fill="#667185"
          />
        </svg>
      </Link>

      {/* <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">Edit your information in a swipe</span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">It is a long established fact</span>{' '}
                that a reader will be distracted by the readable.
              </p>

              <p className="text-xs">24 Feb, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">There are many variations</span> of
                passages of Lorem Ipsum available, but the majority have suffered
              </p>

              <p className="text-xs">04 Jan, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">There are many variations</span> of
                passages of Lorem Ipsum available, but the majority have suffered
              </p>

              <p className="text-xs">01 Dec, 2024</p>
            </Link>
          </li>
        </ul>
      </div> */}
    </li>
  );
};

export default DropdownNotification;
