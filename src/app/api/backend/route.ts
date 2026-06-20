import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.CARBON_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, method = "GET", data } = body;

    const url = `${BACKEND_URL}/api/v1${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Forward auth token if present
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: method !== "GET" && data ? JSON.stringify(data) : undefined,
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    console.error("Backend proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Backend connection failed" },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint") || "/";

    const url = `${BACKEND_URL}/api/v1${endpoint}`;

    const headers: Record<string, string> = {};
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(url, { headers });
    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    console.error("Backend proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Backend connection failed" },
      { status: 502 }
    );
  }
}