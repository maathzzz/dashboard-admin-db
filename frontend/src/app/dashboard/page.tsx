import React from 'react'

export default function page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Sobre o Painel Admin</h1>
      <p className="text-lg mb-6">
        Este Painel Admin foi desenvolvido como uma solução fullstack para gestão eficiente de fornecedores, produtos, usuários e vendas. <br/> Combinamos as mais modernas tecnologias para entregar uma experiência otimizada e confiável.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Frontend</h2>
        <p className="text-lg">
          O frontend utiliza <strong>Next.js</strong> como framework principal, garantindo renderização eficiente do lado do servidor e uma excelente experiência para o usuário. <br /> Além disso, usamos o <strong>shadcn</strong> para estilização e componentes, proporcionando uma interface moderna e intuitiva.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Backend</h2>
        <p className="text-lg">
          No backend, implementamos uma API robusta com <strong>Node.js</strong> e <strong>Express</strong>. <br /> O banco de dados utilizado é o <strong>PostgreSQL</strong>, conhecido por sua confiabilidade e flexibilidade para atender às demandas de dados do sistema.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Funcionalidades</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Autenticação segura para administradores.</li>
          <li>Gerenciamento completo de fornecedores e produtos.</li>
          <li>Visualização e análise de usuários e vendas.</li>
          <li>Interface responsiva e amigável.</li>
        </ul>
      </section>
    </div>
  )
}
