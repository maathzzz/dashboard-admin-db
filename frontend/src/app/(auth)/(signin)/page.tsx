import { Metadata } from 'next';
import SignInViewPage from '../_components/signin-view';

export const metadata: Metadata = {
    title: 'Login | Painel Administrador',
    description: 'Ciência da Computação - Unisagrado'
};

export default function Page() {
    return <SignInViewPage />;
}