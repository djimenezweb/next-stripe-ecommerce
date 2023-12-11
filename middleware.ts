export function middleware() {
  console.log('API route requested');
}

export const config = {
  matcher: '/api/:path*'
};
