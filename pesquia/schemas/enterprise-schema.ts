import { z } from 'zod';

export const enterpriseSchema = z.object({
  companyName: z.string().min(1),
  emailCommercial: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  address: z.string().min(1),
  city: z.string().min(1).optional(),
  cnpj: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0) {
        if (!/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'CNPJ inválido. Use o formato 11222333000181 ou 11.222.333/0001-81.',
          });
        }
      }
    }),
  companyCep: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0) {
        if (!/^\d{5}-?\d{3}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'CEP inválido. Use o formato 12345678 ou 12345-678.',
          });
        }
      }
    }),
  state: z
    .string()
    .length(2, { message: 'Estado deve ter 2 caracteres' })
    .optional(),
  email: z.string().email({ message: 'Email inválido' }).optional(),
  website: z
    .string()
    .url({ message: 'URL inválida' })
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
    .optional(),
});

export type enterpriseProfileFormValues = z.infer<typeof enterpriseSchema>;
