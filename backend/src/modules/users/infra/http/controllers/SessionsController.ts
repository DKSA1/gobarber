import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateService from '@modules/users/services/AuthenticateService';
import { classToClass } from 'class-transformer';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const auth = container.resolve(AuthenticateService);

    const { user, token } = await auth.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}

export default new SessionsController();
