import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  export interface Request {
    userId?: string;
  }
}

export const verificaToken = (req: Request, res: Response, next: NextFunction):  void => {
    const token = req.headers.authorization;
    
    if (!token) {
        res.status(401).json({ message: 'Token não encontrado!' });
        return;
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {  id: string  };
      console.log(decoded)
      req.userId = decoded.id;
      next();

    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado!' });
        return;
    }
};