"use client";

import _ from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import VerificationIcon from "../../../assets/images/verification.svg";
import CopyIcon from "../../../assets/images/copy.svg";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import axios from "@/app/utils/axios";
import { BankTransferFormData, BankCodeFormData } from "@/types.ts";
import { BankTransferFormSchema, BankCodeFormSchema } from "./validations";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCopyToClipboard } from "@/hooks";

const BankTransfer = () => {
  const form = useForm<BankTransferFormData>({
    resolver: zodResolver(BankTransferFormSchema),
  });

  const { toast } = useToast();
  const [bankListData, setBankListData] = useState<BankData[]>([]);
  const [selectedBankCode, setSelectedBankCode] = useState<string>("");
  const [accountName, setAccountName] = useState("");
  const [successfulTransfer, setSuccessfulTransfer] = useState(false);
  const [trxnId, setTrxnId] = useState("");
  const [copiedText, copy] = useCopyToClipboard();

  const defaultValues = {
    accountNumber: "",
    amount: "",
    bankCode: "",
    remark: "",
  };

  interface BankData {
    bankCode: string;
    bankName: string;
  }

  const code = 2200;
  const transferReference = "10000101011";

  useEffect(() => {
    const fetchBankData = async () => {
      const selectedCode = code;

      if (selectedCode) {
        try {
          setBankListData([]);

          const response = await axios().post(`/get-banks`, {
            bankPartnerCode: selectedCode,
          });

          setBankListData(response?.data?.data || []);
        } catch (error) {
          console.error("Failed to fetch bank data:", error);
        }
      }
    };

    fetchBankData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    const fetchBankAccountName = async () => {
      const accountNumber = form.getValues("accountNumber");

      if (selectedBankCode && accountNumber && accountNumber.length === 10) {
        try {
          const response = await axios().post(`/account-validation`, {
            bankCode: selectedBankCode,
            accountNumber,
          });

          const fetchedAccountName = response?.data?.data?.account_name;
          setAccountName(fetchedAccountName || "");
        } catch (error) {
          console.error("Failed to fetch account name:", error);
          setAccountName("");
        }
      } else {
        setAccountName("");
      }
    };

    fetchBankAccountName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBankCode, form.watch("accountNumber")]);

  const mutation = useMutation({
    mutationFn: ({ ...rest }: BankTransferFormData) => {
      return axios().post(`fund-transfer`, {
        ...rest,
        transferReference,
        accountName,
      });
    },
    onSuccess(data: any) {
      console.log(data?.data);
      toast({
        variant: "default",
        title: "Successful",
        description: data?.data?.data?.message || "Transaction Successful.",
      });

      form.reset(defaultValues);
      setSuccessfulTransfer(true);
      setTrxnId(data?.data?.data?.transaction_id);
      setSelectedBankCode("");
    },
    onError(error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.description ||
          "An error occurred, please try again.",
      });
    },
  });

  const router = useRouter();

  const onSubmit = async (data: BankTransferFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    mutation.mutate(data);
  };

  const handleCopyClick = async (text: string) => {
    const isCopied = await copy(text);

    if (!isCopied)
      return toast({
        description: "Failed to copy to clipboard.",
      });

    return toast({
      description: "Copied to clipboard.",
    });
  };

  if (successfulTransfer) {
    return (
      <div className="absolute left-2/4 top-2/4 mx-auto flex w-[375px] -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center text-center">
        <div className="mb-6">
          <VerificationIcon />
        </div>
        <h2 className="mb-8 w-max text-[30px] font-semibold text-[#333333]">
          Successful Transferred
        </h2>

        <p className="mb-8 text-[14px] leading-normal text-[#636363]">
          Your transaction ID is {trxnId}{" "}
          <span className="absolute -right-[15px] bottom-[100px] text-brand">
            <Button
              variant="unstyled"
              type="button"
              onClick={() => handleCopyClick(trxnId)}
            >
              <CopyIcon />
            </Button>
          </span>{" "}
          <br /> You can proceed to check status of transaction.
        </p>

        <Button
          type="button"
          onClick={() => router.push("/check-status")}
          className="w-full py-7 text-base"
        >
          Proceed
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white  py-6 rounded-md">
        <Form {...form}>
          <div className="bg-white">
            <h1 className="mb-2">BANK TRANSFER</h1>
            <p className="mb-10 text-sm">
              Fill in details to complete bank transfer
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white max-w-[800px] space-y-0 mb-6">
                <FormField
                  control={form.control}
                  name="bankCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedBankCode(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[250px] overflow-y-auto">
                          {bankListData.map((bank, index) => (
                            <SelectItem
                              key={`${bank.bankCode}-${index}`}
                              value={bank.bankCode}
                            >
                              {bank.bankName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Account Number</FormLabel>
                      <FormControl>
                        <Input
                          className="text-xs"
                          placeholder=""
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{accountName}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Amount</FormLabel>
                      <FormControl>
                        <Input
                          className="text-xs"
                          placeholder=""
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Remarks </FormLabel>
                      <FormControl>
                        <Input className="text-xs" placeholder="" {...field} />
                      </FormControl>
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
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </>
  );
};

export default BankTransfer;
