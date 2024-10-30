import { LoginForm } from "@/components/forms/LoginForm"

export default function Home() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main
          className="flex items-center justify-center flex-col px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 lg:text-4xl">
              Painel Administrador
            </h2>
            <LoginForm />
          </div>
        </main>
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 bg-red-400">

        </aside>
      </div>
    </section>
  );
}
