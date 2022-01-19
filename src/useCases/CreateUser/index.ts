import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUserCase";

const postgresUsersReposory = new PostgresUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUseCase(
    postgresUsersReposory,
    mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }