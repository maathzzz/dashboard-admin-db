'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
// import { signIn } from 'next-auth/react';
// import { useSearchParams } from 'next/navigation';
// import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string({ message: 'Enter a valid email address' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get('callbackUrl');
    // const [loading, startTransition] = useTransition();
    const defaultValues = {
        email: 'admin@email.com',
        password: 'unisagrado'
    };
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const onSubmit = async (data: UserFormValue) => {
        // startTransition(() => {
        //     signIn('credentials', {
        //         email: data.email,
        //         callbackUrl: callbackUrl ?? '/dashboard'
        //     });
        //     toast.success('Signed In Successfully!');
        // });
        console.log(data);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Digite seu e-mail"
                                        {...field}
                                    />
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
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Digite sua senha"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="ml-auto w-full" type="submit">
                        Entrar
                    </Button>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        ou entre com
                    </span>
                </div>
            </div>
            <GithubSignInButton />
        </>
    );
}