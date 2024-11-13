"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useInitialRender, useToast } from "@/hooks";
import { logoutUser } from "@/store/slice/userService/userService";

const LogoutUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const initialRenderComplete = useInitialRender();

  return (
    <div className="relative">
      <div className="flex items-center gap-4 justify-between">
        <span className=" text-left lg:block"></span>

        <button
          type="button"
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium  hover:text-primary lg:text-base"
          onClick={() => {
            dispatch(logoutUser());
            router.push("/login");
            toast({
              description: "Successfully Logout",
            });
          }}
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.25008 2.33317C5.71032 2.33317 6.08342 1.96007 6.08342 1.49984C6.08342 1.0396 5.71032 0.666504 5.25008 0.666504H4.00008C2.15913 0.666504 0.666748 2.15889 0.666748 3.99984V13.9998C0.666748 15.8408 2.15913 17.3332 4.00008 17.3332H5.25008C5.71032 17.3332 6.08341 16.9601 6.08341 16.4998C6.08341 16.0396 5.71032 15.6665 5.25008 15.6665H4.00008C3.07961 15.6665 2.33341 14.9203 2.33341 13.9998L2.33342 3.99984C2.33342 3.07936 3.07961 2.33317 4.00008 2.33317H5.25008Z"
              fill="black"
            />
            <path
              d="M17.9227 9.58909C18.2481 9.26366 18.2481 8.73602 17.9227 8.41058L14.5893 5.07725C14.2639 4.75181 13.7363 4.75181 13.4108 5.07725C13.0854 5.40269 13.0854 5.93032 13.4108 6.25576L15.3216 8.1665L5.66675 8.1665C5.20651 8.1665 4.83341 8.5396 4.83341 8.99984C4.83341 9.46007 5.20651 9.83317 5.66675 9.83317L15.3216 9.83317L13.4108 11.7439C13.0854 12.0694 13.0854 12.597 13.4108 12.9224C13.7363 13.2479 14.2639 13.2479 14.5893 12.9224L17.9227 9.58909Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LogoutUser;
