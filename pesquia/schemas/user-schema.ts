import { z } from 'zod';

export const userProfileSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    phone: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Senha atual é obrigatória para definir uma nova senha',
      path: ['currentPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  );

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
