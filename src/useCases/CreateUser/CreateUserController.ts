import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUserCase"

export class CreateUserController {
    constructor(
        private createUserUserCase: CreateUserUseCase
    ) { }
    public handle = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password } = req.body
        try {
            await this.createUserUserCase.execute({
                name,
                email,
                password,
            })
            return res.status(201).send()
        } catch (err) {
            return res.json({ error: err.message || "Unexpected error" })
        }

    }
}