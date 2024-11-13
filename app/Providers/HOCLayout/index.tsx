/* eslint-disable no-console */

"use client";

import _ from "lodash";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks";
import Loading from "@/components/ui/Loading";
import { logoutUser } from "@/store/slice/userService/userService";

const HOCLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);

  return loader ? <Loading /> : <div>{children}</div>;
};

export default HOCLayout;
