// to make sure that the types are available in the express request object
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      cleanBody?: any;
      role?: string;
    }
  }
}
