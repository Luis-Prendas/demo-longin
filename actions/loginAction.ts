'use server'

import { type FormValues } from '@/app/auth/login/page'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function loginAction (formData: FormValues) {
  try {
    await signIn('credentials', {
      username: formData.username,
      password: formData.password,
      redirectTo: '/'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Incalid Credentials' }
        default:
          return { error: 'Unknown Error Found' }
      }
    }
    throw error
  }
}
