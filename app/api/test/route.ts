export async function GET() {
  return Response.json({ 
    hasPassword: !!process.env.ADMIN_PASSWORD,
    value: process.env.ADMIN_PASSWORD
  });
}