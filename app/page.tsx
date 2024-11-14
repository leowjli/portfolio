import Project from "./project";
// import Image from "next/image";

export default function Home() {
    return (
        <main className="w-screen h-screen flex flex-col relative">
        <div className="intro flex flex-col justify-start mt-[150px] mb-[175px] ml-[35px] mr-[35px]">
            <div className="flex gap-5">
            <h1 className="intro-content text-[36px] font-bold">你好!</h1>
            <h1 className="intro-content text-[36px] font-bold">Hello!</h1>
            </div>
            <h1 className="intro-content text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-10% via-[#951DC6] via-50% to-[#398EEB] to-90% font-bold leading-none">What&apos;s up, I&apos;m Leo.</h1>
            <p className="intro-headline text-[16px] font-medium">An aspiring frontend developer + Informatics student @ UW</p>
        </div>
        <div className="mouse-section absolute bottom-40 left-1/2 transform -translate-x-1/2">
            <div className="mouse w-[30px] h-[54px] border-[3px] border-black rounded-[60px] ">
            <span className="before:content-[''] before:w-2 before:h-2 before:absolute before:top-[10px] before:bg-black before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-[50%] before:opacity-100 before:animate-mouse"></span>
            </div>
        </div>
        <Project />
        </main>
    );
}
