import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const protectedPaths = ['/', '/new'];

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);
  const path = request.nextUrl.pathname;

  const isProtected =
    protectedPaths.includes(path) || path.startsWith('/folder/');

  if (isProtected) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
