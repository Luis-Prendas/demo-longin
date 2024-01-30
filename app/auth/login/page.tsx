/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { loginAction } from '@/actions/loginAction'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

export interface FormValues {
  username: string
  password: string
}

export default function LoginPage () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await loginAction(data)
    setErrorMessage(res?.error)
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-700 text-white flex flex-col gap-4 justify-center items-center p-4">
        <fieldset className="flex flex-col">
          <label>Username</label>
          <input
            type="text"
            {...register('username', { required: true })}
            className='text-black'
          />
          {
            errors.username?.type === 'required' && (
              <span className='text-sm font-light text-yellow-400'>Username is required</span>
            )
          }
        </fieldset>

        <fieldset className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className='text-black'
          />
          {
            errors.password?.type === 'required' && (
              <span className='text-sm font-light text-yellow-400'>Password is required</span>
            )
          }
        </fieldset>

        {
          errorMessage && (
            <span className='text-red-600 bg-red-300 px-4 py-2 rounded-md'>{errorMessage}</span>
          )
        }

        <button className=" bg-slate-500 px-4 py2 text-xl">Login</button>
      </form>
    </div>
  )
}
