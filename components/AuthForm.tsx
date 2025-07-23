"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-in' ? z.string().min(3) : z.string().optional(),
        email: z.email(),
        password: z.string().min(3),
    })
}


const AuthForm = ({type} : {type: FormType}) => {
    const router = useRouter()
    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if (type === 'sign-up'){
                console.log("Sign up",values)
                toast.success("Account Created Successfully! Please Sign In");
                router.push('/sign-in')
            } else {
                console.log("Sign in",values)
                toast.success("Sign In Success!")
                router.push('/')
            }
        } catch(e){
            console.log(e)
            toast.error(`Something Went Wrong! Error: ${e}`)
        }
    }

    const isSignIn = type === 'sign-in'
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 py-14 px-10 card">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="./logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">InterviewPrep</h2>
                </div>
                <h3 className="text-center">Practice Job Interview with AI</h3>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-6 form">
                {!isSignIn && (<FormField control={form.control} name="name" label="Name" placeholder="Enter Name" />  )}
                <FormField control={form.control} name="email" label="Email" placeholder="Enter Email" type="email"/>
                <FormField control={form.control} name="password" label="Password" placeholder="Enter Password" type="password"/>
                <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
            </form>
        </Form>
                <p className="text-center">{isSignIn? 'No Account Yet?' : 'Have an Account already?'}
                <Link href={!isSignIn? '/sign-in': '/sign-up'} className="font-bold text-user-primary ml-1">
                    {!isSignIn ? 'Sign In' : 'Sign Up'}
                </Link>
                </p>
            </div>
        </div>
    )
}
export default AuthForm
