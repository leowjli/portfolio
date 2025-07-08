"use client";

import Image from "next/image";

interface CarouselProps {
    images: string[];
}

export default function Gallery({ images }: CarouselProps) {

    if (!images || images.length === 0) {
        return <p>Cool photos coming soon!</p>;
    }

    return (
        <div className="relative w-full mx-auto flex flex-col items-center overflow-hidden">
            <div className="relative w-[90%] h-[400px] overflow-hidden rounded-lg">
                <div className="slider flex w-max animate-scroll">
                    <div className="slide-track flex">
                        {images.concat(images).map((image, index) => (
                            <div key={index} className="slide w-[400px] h-[400px] flex-shrink-0 p-5">
                                <Image
                                    src={image}
                                    alt={`Photo ${index + 1} for carousel`}
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}