import * as z from "zod";
import { store } from "@/store";
import { LoginFormSchema } from "@/app/login/validation";
import {
  BankCodeFormSchema,
  BankTransferFormSchema,
} from "@/app/(dashboard)/bank-transfer/validations";

export const GlobalDataSchema = z.object({
  cif: z.string(),
});

const UserSchema = z.object({
  fullName: z.string(),
  clusterId: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type GlobalStateType = z.infer<typeof GlobalDataSchema>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type BankTransferFormData = z.infer<typeof BankTransferFormSchema>;
export type BankCodeFormData = z.infer<typeof BankCodeFormSchema>;
