"use client";

import * as z from "zod";
import _ from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import axios from "@/app/utils/axios";

import { useState } from "react";

const checkStatusFormSchema = z.object({
  transactionID: z.string().min(1, { message: "Email address is required" }),
});

type checkStatusFormData = z.infer<typeof checkStatusFormSchema>;

const CheckStatus = () => {
  const form = useForm<checkStatusFormData>({
    resolver: zodResolver(checkStatusFormSchema),
  });

  const { toast } = useToast();
  const [status, setStatus] = useState("");

  const mutation = useMutation({
    mutationFn: ({ ...rest }: checkStatusFormData) => {
      return axios().post(`transaction-status`, {
        ...rest,
        sourceInstitution: "4",
      });
    },
    onSuccess(data: any) {
      toast({
        variant: "default",
        title: "Successful",
        description: data?.data?.data?.message || "Successful.",
      });

      const apiResponse = data?.data?.data?.message;
      setStatus(apiResponse || "");
    },
    onError(error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.data?.message ||
          "An error occurred, please try again.",
      });
      setStatus("");
    },
  });

  const onSubmit = async (data: checkStatusFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div>
      {" "}
      <Form {...form}>
        <div className="bg-white">
          <h1 className="mb-2">CHECK TRANSACTION STATUS</h1>
          <p className="mb-10 text-sm">
            Fill in details to check transaction status
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white max-w-[800px] space-y-0 mb-6">
              <FormField
                control={form.control}
                name="transactionID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Transfer Reference Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder=""
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{status}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 md:flex-row flex-col">
              <Button
                className=""
                type="submit"
                size="lg"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Check Status
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default CheckStatus;
