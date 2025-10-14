// /*
// model Paciente {
//   id              Int           @id @default(autoincrement())
//   nome            String
//   cpf             String        @unique
//   dataNascimento  DateTime?
//   endereco        String?
//   telefone        String?
//   consultas       Consulta[]    @relation("PacienteConsultas")

//   @@map("pacientes")
// }
// */
// import { z } from 'zod';


// export const createPacienteSchema = z.object({
//     nome: z.string().min(1, { message: "É obrigatório informar o nome do paciente" }),
//     cpf: z.string().min(1, { message: "É obrigatório informar o CPF do paciente" }),
//     dataNascimento: z.date()
// })