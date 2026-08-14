import { NextResponse, type NextRequest } from "next/server";

type RouteHandler<Context = unknown> = (
  request: NextRequest,
  context: Context,
) => Response | Promise<Response>;

type HttpError = Error & {
  status?: number;
  statusCode?: number;
};

/**
 * هر route handler رو با یک try/catch یکپارچه می‌پوشونه؛
 * دقیقا معادل همون error handler میان‌افزار اکسپرس قبلی عمل می‌کنه.
 */
export function withErrorHandler<Context>(
  handler: RouteHandler<Context>,
): RouteHandler<Context> {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error(error);
      const httpError = error as HttpError;
      const statusCode = httpError.status || httpError.statusCode || 500;
      const message = httpError.message || "خطای سروری";
      return NextResponse.json({ statusCode, message }, { status: statusCode });
    }
  };
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ statusCode: status, data }, { status });
}
