import * as z from "zod";

export const BankTransferFormSchema = z.object({
  bankCode: z.string(),
  accountNumber: z.string(),
  amount: z.string(),
  remark: z.string(),
});

export const BankCodeFormSchema = z.object({
  bankPartnerCode: z.string(),
});
