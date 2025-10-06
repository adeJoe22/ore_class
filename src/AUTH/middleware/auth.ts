import { Request, Response, NextFunction } from "express";

import {
  UserPayload,
  verifyToken,
} from "../service/auth_token_service";
import { Authorization_Error } from "../../utils/errors";

// Extended request with user info
export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

// Authentication middleware with logging
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Authorization_Error(
        "No authorization token was found",
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const verified = verifyToken(token);

    if (!verified) {
      throw new Authorization_Error("Invalid token");
    }

    // Add user info to request
    req.user = {
      userId: verified.userId as string,

      email: verified.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

// Authorization middleware with role checking and logging
// export const authorizeRoles = (allowedRoles: string[]) => {
//   return (
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     try {
//       if (!req.user) {
//         authLogger.warn(
//           { path: req.path },
//           "Authorization failure: No authenticated user",
//         );
//         throw new Authorization_Error("User not authenticated");
//       }

//       const hasRole = req.user.roles.some((role) =>
//         allowedRoles.includes(role),
//       );

//       if (!hasRole) {
//         authLogger.warn(
//           {
//             userId: req.user.userId,
//             userRoles: req.user.roles,
//             requiredRoles: allowedRoles,
//             path: req.path,
//           },
//           "Authorization failure: Insufficient permissions",
//         );

//         // Record failed authorization attempt
//         writeAuditLog({
//           operation: "query",
//           collection_name: "AUTH",
//           userId: req.user.userId?.toString(),
//           metadata: {
//             path: req.path,
//             method: req.method,
//             requiredRoles: allowedRoles,
//             userRoles: req.user.roles,
//             action: "authorization_failure",
//           },
//         });

//         throw new Permission_Error("Insufficient permissions");
//       }

//       authLogger.debug(
//         {
//           userId: req.user.userId,
//           roles: req.user.roles,
//           path: req.path,
//         },
//         "User authorized",
//       );

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
