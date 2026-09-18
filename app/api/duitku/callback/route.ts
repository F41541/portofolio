import { processDuitkuCallback, handleDuitkuGetRedirect } from "@/lib/duitku-callback";

export async function POST(request: Request) {
  return processDuitkuCallback(request);
}

export async function GET(request: Request) {
  return handleDuitkuGetRedirect(request);
}
