import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        return { accessToken: null, isConfigured: false } as const;
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        const text = await response.text();
        return { accessToken: null, isConfigured: true, tokenError: { status: response.status, body: text } } as const;
    }

    const data = (await response.json()) as { access_token: string };
    return { accessToken: data.access_token, isConfigured: true, tokenError: null } as const;
}

async function fetchJson(url: string, accessToken: string) {
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
    });
    return res;
}

export async function GET() {
    try {
        const { accessToken, isConfigured, tokenError } = (await getAccessToken()) as unknown as {
            accessToken: string | null;
            isConfigured: boolean;
            tokenError?: { status: number; body: string } | null;
        };
        if (!isConfigured) {
            return NextResponse.json({ isConfigured: false, reason: "env_missing", isPlaying: false }, { status: 200, headers: { "Cache-Control": "no-store" } });
        }
        if (!accessToken) {
            return NextResponse.json({ isConfigured: true, isPlaying: false, tokenError }, { status: 200, headers: { "Cache-Control": "no-store" } });
        }

        const res = await fetchJson(SPOTIFY_NOW_PLAYING_ENDPOINT, accessToken);

        // 204 means no content (not playing)
        if (res.status === 204 || res.status === 202) {
            // Fallback to last played track
            const recentRes = await fetchJson(SPOTIFY_RECENTLY_PLAYED_ENDPOINT, accessToken);
            if (!recentRes.ok) {
                return NextResponse.json({ isConfigured: true, isPlaying: false }, { status: 200, headers: { "Cache-Control": "no-store" } });
            }
            const recentJsonTyped = (await recentRes.json()) as {
                items?: Array<{ track?: { name: string; artists?: Array<{ name: string }>; album?: { name?: string; images?: Array<{ url: string }> }; external_urls?: { spotify?: string } } }>;
            };
            const item = recentJsonTyped?.items?.[0]?.track;
            if (!item) {
                return NextResponse.json({ isConfigured: true, isPlaying: false }, { status: 200, headers: { "Cache-Control": "no-store" } });
            }
            return NextResponse.json(
                {
                    isConfigured: true,
                    isPlaying: false,
                    title: item.name,
                    artist: item.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
                    album: item.album?.name ?? "",
                    albumImageUrl: item.album?.images?.[0]?.url ?? null,
                    songUrl: item.external_urls?.spotify ?? null,
                },
                { status: 200, headers: { "Cache-Control": "no-store" } }
            );
        }

        if (!res.ok) {
            return NextResponse.json({ isConfigured: true, isPlaying: false }, { status: 200, headers: { "Cache-Control": "no-store" } });
        }

        const json = (await res.json()) as {
            is_playing?: boolean;
            progress_ms?: number;
            item?: {
                duration_ms?: number;
                name?: string;
                artists?: Array<{ name: string }>;
                album?: { name?: string; images?: Array<{ url: string }> };
                external_urls?: { spotify?: string };
            };
        };
        const item = json?.item;
        return NextResponse.json(
            {
                isConfigured: true,
                isPlaying: json?.is_playing ?? false,
                progressMs: json?.progress_ms ?? null,
                durationMs: item?.duration_ms ?? null,
                title: item?.name ?? "",
                artist: item?.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
                album: item?.album?.name ?? "",
                albumImageUrl: item?.album?.images?.[0]?.url ?? null,
                songUrl: item?.external_urls?.spotify ?? null,
            },
            { status: 200, headers: { "Cache-Control": "no-store" } }
        );
    } catch {
        return NextResponse.json({ isConfigured: false, error: "Spotify fetch failed" }, { status: 200, headers: { "Cache-Control": "no-store" } });
    }
}


