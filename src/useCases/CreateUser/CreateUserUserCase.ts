import { config } from "dotenv";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
config()

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) { }

    public execute = async (data: ICreateUserRequestDTO) => {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) throw new Error("User already exists.")

        const user = new User(data)

        await this.usersRepository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: "equipe do meu app",
                email: "minegt1500@gmail.com"
            },
            pass: process.env.EMAIL_PASSWORD,
            subject: "Seja bem vindo à plataforma",
            body: "<p>Você já pode fazer login em nossa plataforma.</p>"
        })
    }
}