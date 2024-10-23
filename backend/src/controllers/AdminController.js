const { PrismaClient } =  require('@prisma/client');
const prisma =  new PrismaClient();

class AdminController {
    async getAdmins(req, res) {
        try {
            const admin = await prisma.admin.findMany();
            return res.json(admin);
        } catch (error) {
            console.error("Erro ao listar administradores:", error);
            return res.status(500).json({ error: "Erro ao listar administradores." });
        }
    }
    
    async create(req, res) {
        const {
            name,
            email,
            password,
        } = req.body;

        try {
            const admin = await prisma.admin.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            return res.status(201).json(admin);
        } catch (error) {
            console.error("Erro ao criar administrador: ", error);
            return res.status(500).json({
                error: "Erro ao criar administrador",
                message: error
            })
        };
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
        const admin = await prisma.admin.delete({
            where: { id: parseInt(id, 10) },
        });
        return res.status(200).json({ message: "Admin deletado com sucesso.", admin });
        } catch (error) {
        console.error("Erro ao deletar Admin:", error);
        return res.status(500).json({ 
            error: "Erro ao deletar Admin.",
            message: "Error"
        });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const {
        name,
        email,
        password,
        } = req.body;

        try {
            const admin = await prisma.admin.update({
                where: { id: parseInt(id, 10) },
                data: { name, email, password },
            });
            return res.status(200).json({ message: "Admin atualizado com sucesso.", admin });
        } catch (error) {
        console.error("Erro ao atualizar Admin:", error);
        return res.status(500).json({ error: "Erro ao atualizar Admin.", message: "Error" });
        }
  }
}

module.exports = AdminController;