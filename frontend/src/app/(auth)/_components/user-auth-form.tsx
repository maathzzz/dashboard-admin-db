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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast"; // Importa o hook de toast do ShadCN

const formSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string().min(1, { message: 'Enter a valid password' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
    const { toast } = useToast(); 
    const router = useRouter();
    const defaultValues = {
        email: '',
        password: ''
    };

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const onSubmit = async (data: UserFormValue) => {
        try {
            const response = await fetch('http://localhost:3001/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const { token } = await response.json();
            localStorage.setItem('token', token); 

            toast({
                title: 'Login realizado com sucesso!',
                description: 'Você será redirecionado para o dashboard.',
                variant: 'default',
            });

            router.push('/dashboard'); 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast({
                title: 'Erro ao realizar login',
                description: err.message || 'Algo deu errado. Tente novamente.',
                variant: 'destructive',
            });
        }
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
        </>
    );
}
