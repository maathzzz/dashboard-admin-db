import AppSidebar from '@/components/layout/app-sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Painel Administrador',
    description: 'Universidade do Sagrado Coração - Ciência da Computação'
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppSidebar>{children}</AppSidebar>
        </>
    );
}