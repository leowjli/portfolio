"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type NowPlayingData = {
    isConfigured: boolean;
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string | null;
    songUrl?: string | null;
    progressMs?: number | null;
    durationMs?: number | null;
};

export default function NowPlaying() {
    const [data, setData] = useState<NowPlayingData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
                const json = (await res.json()) as NowPlayingData;
                if (mounted) setData(json);
            } catch {
                if (mounted) setData({ isConfigured: false, isPlaying: false });
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        const id = setInterval(load, 30_000);
        return () => {
            mounted = false;
            clearInterval(id);
        };
    }, []);

    if (loading) {
        return (
            <div className="mt-6 inline-flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-card/60">
                <div className="h-4 w-4 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-secondary">Loading Spotify…</span>
            </div>
        );
    }

    if (!data?.isConfigured) {
        return null;
    }

    const isPlaying = data.isPlaying;
    const title = data.title ?? "";
    const artist = data.artist ?? "";
    const href = data.songUrl ?? undefined;

    return (
        <div className="mt-2 mb-4 md:mt-4 md:mb-0 w-full max-w-md">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card/70 px-3 py-2 shadow-sm">
                <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
                    {data.albumImageUrl ? (
                        <Image src={data.albumImageUrl} alt="album art" fill sizes="40px" className="object-cover" />
                    ) : (
                        <div className="h-full w-full grid place-items-center text-xs text-secondary">♪</div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-secondary">
                        <span className={`inline-flex h-2 w-2 rounded-full ${isPlaying ? "bg-emerald-500" : "bg-secondary"}`} />
                        <span>{isPlaying ? "Now Playing" : "Recently Played"}</span>
                    </div>
                    <div className="truncate text-sm font-medium text-foreground">
                        {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </div>
                    <div className="truncate text-xs text-secondary">{artist}</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>

            </div>
        </div>
    );
}


