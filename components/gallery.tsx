"use client"

import Image from "next/image";
import { useState } from "react";

interface CarouselProps {
    images: string[];
    visibleImg: number;
}

export default function Gallery({ images, visibleImg }: CarouselProps) {
    const [currId, setCurrId] = useState<number>(0);

    if (!images || images.length === 0) {
        return <p>Cool photos coming soon!</p>;
    }

    const prevImage = () => {
        setCurrId((prevId) => {
            if (prevId === 0) {
                return images.length - visibleImg;
            }
            return prevId - 1;
        });
    };

    const nextImage = () => {
        setCurrId((prevId) => {
            if (prevId + visibleImg >= images.length) {
                return 0;
            }
            return prevId + 1;
        });
    };

    const displayed = images.slice(currId, currId + visibleImg);


    return (
        <div className="relative w-full mx-auto">
            <div className="flex flex-wrap justify-center space-y-4 sm:space-y-0 sm:flex-col md:flex-row md:space-x-4 rounded-lg">
                {displayed.map((image, index) => (
                    <div key={index} className="w-full sm:w-auto md:w-1/2 flex-shrink-0 max-w-[250px]">
                        <div className="relative w-full h-[400px]">
                            <Image
                                src={image}
                                alt={`photo ${index} for photo carousel of activities`}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full">
                &lt;
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full">
                &gt;
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-slate-600 py-2 px-4 rounded">
                <p>{currId + 1}/{images.length}</p>
            </div>
        </div>
    );
}