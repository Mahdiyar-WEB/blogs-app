declare module "*.css";
declare module "bcryptjs";
declare module "http-errors" {
  export interface HttpError extends Error {
    status: number;
    statusCode: number;
  }

  type ErrorFactory = (message?: string) => HttpError;

  interface CreateHttpError {
    BadRequest: ErrorFactory;
    Unauthorized: ErrorFactory;
    NotFound: ErrorFactory;
    InternalServerError: ErrorFactory;
  }

  const createHttpError: CreateHttpError;
  export default createHttpError;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: unknown;
  }

  interface JsonWebToken {
    sign(
      payload: object,
      secret: string,
      options?: { expiresIn?: string | number },
    ): string;
    verify(token: string, secret: string): JwtPayload | string;
  }

  const jwt: JsonWebToken;
  export default jwt;
}

declare module "sanitize-html" {
  type SanitizeOptions = {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedStyles?: Record<string, Record<string, RegExp[]>>;
    allowedSchemes?: string[];
  };

  export default function sanitizeHtml(
    html: string,
    options?: SanitizeOptions,
  ): string;
}
