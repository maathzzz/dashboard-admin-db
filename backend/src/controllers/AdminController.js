const { PrismaClient } =  require('@prisma/client');
const prisma =  new PrismaClient();

class AdminController {
    async create(req, res) {
        const {
            name,
            email,
            password,
        } = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            return res.status(201).json(user);
        } catch (error) {
            console.error("Erro ao criar administrador: ", error);
            return res.status(500).json({
                error: "Erro ao criar administrador",
                message: error
            })
        };
    }
}

module.exports = AdminController;