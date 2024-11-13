"use client";

import _ from "lodash";
import Image from "next/image";
import BgTop from "../../assets/images/bgtop.svg";
import BgBottom from "../../assets/images/bgbottom.svg";
import BgImage from "../../assets/images/bgImage.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slice/userService/userService";
import { LoginFormSchema } from "./validation";
import { LoginFormData } from "@/types.ts";
import axios from "../utils/axios";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    router.push("bank-transfer");
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 h-screen">
      <div className="bg-[#F4F4F4] relative md:col-span-1 xl:col-span-2  hidden md:flex justify-center items-center">
        <div className="absolute top-0 left-0 w-52">
          <BgTop />
        </div>

        <div className="">
          <BgImage />
        </div>

        <div className="absolute bottom-0 right-10 w-52">
          <BgBottom />
        </div>
      </div>
      <div className="col-span-1 px-7 flex flex-col justify-center  min-h-full">
        <p className="text-center font-semibold mb-14 ">
          Login into your account
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs" aria-label="Email">
                    Email Id:
                  </FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs" aria-label="Password">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-xs"
                      placeholder=""
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-xs font-medium text-[#1E2772] float-right cursor-pointer underline pb-9">
              Forgot password?
            </span>
            <div className="w-full">
              <Button
                className="w-full shadow-md shadow-[#1E2772] mb-9"
                type="submit"
                size="lg"
              >
                Login now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
