import { NextRequest, NextResponse } from "next/server";

export interface ApiErrorLike {
  status?: number;
  statusCode?: number;
  message?: string;
}

export interface ApiErrorResponseBody {
  statusCode: number;
  message: string;
}

export interface ApiSuccessResponseBody<T> {
  statusCode: number;
  data: T;
}

export type RouteHandlerContext<TParams extends Record<string, string> = Record<string, string>> = {
  params: Promise<TParams>;
};

export type RouteHandler<
  TParams extends Record<string, string> = Record<string, string>,
  TResponse = unknown,
> = (
  req: NextRequest,
  ctx: RouteHandlerContext<TParams>,
) => Promise<NextResponse<TResponse>>;

function isApiErrorLike(error: unknown): error is ApiErrorLike {
  return typeof error === "object" && error !== null;
}

/**
 * هر route handler رو با یک try/catch یکپارچه می‌پوشونه؛
 * دقیقا معادل همون error handler میان‌افزار اکسپرس قبلی عمل می‌کنه.
 */
export function withErrorHandler<
  TParams extends Record<string, string> = Record<string, string>,
  TResponse = unknown,
>(
  handler: RouteHandler<TParams, TResponse>,
): (
  req: NextRequest,
  ctx: RouteHandlerContext<TParams>,
) => Promise<NextResponse<TResponse> | NextResponse<ApiErrorResponseBody>> {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error(error);
      const errorLike = isApiErrorLike(error) ? error : {};
      const statusCode = errorLike.status || errorLike.statusCode || 500;
      const message = errorLike.message || "خطای سروری";
      return NextResponse.json({ statusCode, message }, { status: statusCode });
    }
  };
}

export function ok<T>(data: T, status = 200): NextResponse<ApiSuccessResponseBody<T>> {
  return NextResponse.json({ statusCode: status, data }, { status });
}
