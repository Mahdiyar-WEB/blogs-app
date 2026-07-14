import { NextResponse } from "next/server";

/**
 * هر route handler رو با یک try/catch یکپارچه می‌پوشونه؛
 * دقیقا معادل همون error handler میان‌افزار اکسپرس قبلی عمل می‌کنه.
 */
export function withErrorHandler(handler) {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error(error);
      const statusCode = error.status || error.statusCode || 500;
      const message = error.message || "خطای سروری";
      return NextResponse.json({ statusCode, message }, { status: statusCode });
    }
  };
}

export function ok(data, status = 200) {
  return NextResponse.json({ statusCode: status, data }, { status });
}
