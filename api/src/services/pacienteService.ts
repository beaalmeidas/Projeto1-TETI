import prisma from "../prisma/client";
import { ServiceError } from "../utils/serviceError";


export const pacienteService = {

    async createPaciente(
        nome: string, 
        cpf: string,
        dataNascimento: Date,
        endereco: string,
        telefone: string,
    ) {
        if (!nome || !cpf || !telefone) {
            throw new ServiceError("Os campos nome, cpf e telefone são obrigatórios.", 400);
        }

    }

}