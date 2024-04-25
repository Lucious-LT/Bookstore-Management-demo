import { Request } from "express";
import { Session } from "inspector";
import { string } from "zod";
export interface AuthenticatedRequest extends Request{
    user?: string; // Adjust the properties according to your user object
  session: Session & Partial<SessionData> & {token?: string}
  }