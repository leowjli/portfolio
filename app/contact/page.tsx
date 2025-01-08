"use client";

import Navbar from "@/components/navbar";
import { socials } from "@/constants";
import { MdArrowOutward } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import { motion, easeIn } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Errors {
    fname: string | null;
    lname: string | null;
    email: string | null;
    phone: string | null;
    message: string | null;
  }

export default function Contact() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [err, setErr] = useState<Errors>({
        fname: null,
        lname: null,
        email: null,
        phone: null,
        message: null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: Errors = {
            fname: null,
            lname: null,
            email: null,
            phone: null,
            message: null,
          };

        if (!fname.trim()) {
            errors.fname = "first name is required.";
        }
        if (!lname.trim()) {
            errors.lname = "Last name is required.";
        }
        if (!email.trim()) {
            errors.email = "An email address is required.";
        }
        if (email.trim() && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            errors.email = "Please enter a valid email address.";
        }
        if (!phone.trim()) {
            errors.phone = "A phone number is required.";
        }
        if (phone.trim() && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
            errors.phone = "Please enter a valid phone number.";
        }
        if (!message.trim()) {
            errors.message = "message is required.";
        }

        if (Object.values(errors).some((error) => error !== null)) {
            setErr(errors);
            console.log(errors);
            return;
        } else {
            setErr({
                fname: null,
                lname: null,
                email: null,
                phone: null,
                message: null,
            });
            alert("Message sent!");
            setFName("");
            setLName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }
    }

    return (
        <main className="w-full h-screen flex flex-col relative">
            <Navbar />
            <section className="flex flex-col lg:flex-row md:justify-between md:items-center mt-28 mb-5 md:mt-36 mx-9 sm:mx-20 md:mx-36 lg:mx-48 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none md:text-5xl xl:text-7xl">Want to</h1>
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none pl-10 md:text-5xl xl:text-7xl">start</h1>
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none md:text-5xl xl:text-7xl">a new</h1>
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none pl-10 pb-3 md:text-5xl xl:text-7xl">project?</h1>
                    </div>
                    <p className="flex text-center justify-end lg:text-xl pl-10 font-semibold md:text-start">Or just say hello?</p>
                    <div className="flex flex-row justify-center gap-8 lg:flex-col lg:justify-normal lg:gap-0 mt-10">
                        {socials.map((social, id) => {
                            return (
                                <Link href={social.url} rel="noopener noreferrer" key={id}>
                                    <p className="flex items-center text-base font-medium hover:underline lg:text-2xl">{social.name} <MdArrowOutward className="w-5 h-5 lg:w-6 lg:h-6" /></p>
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>

                <div className="w-full md:w-3/5 max-w-screen-xl">
                    <form action={''} className="flex flex-col w-full" onSubmit={handleSubmit} noValidate>
                        <div className="flex flex-col mb-3 gap-6 lg:flex-row w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="fname" className="mb-0.5 text-sm font-medium text-gray-900">
                                    First Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fname"
                                    value={fname}
                                    onChange={(e) => setFName(e.target.value)}
                                    className={`bg-gray-200 border ${err.fname ? "border-red-400" : "border-gray-400"} p-2 rounded-lg w-full`}
                                    placeholder="Stephen"
                                    required
                                />
                                {err.fname && <p className="text-red-400 text-sm">{err.fname}</p>}
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="lname" className="mb-0.5 text-sm font-medium text-gray-900">
                                    Last Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lname"
                                    value={lname}
                                    onChange={(e) => setLName(e.target.value)}
                                    className={`bg-gray-200 border ${err.lname ? "border-red-400" : "border-gray-400"} p-2 rounded-lg w-full`}
                                    placeholder="Curry"
                                    required
                                />
                                {err.lname && <p className="text-red-400 text-sm">{err.lname}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col mb-3 gap-6 lg:flex-row w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="email" className="mb-0.5 text-sm font-medium text-gray-900">
                                    Email <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`bg-gray-200 border ${err.email ? "border-red-400" : "border-gray-400"} p-2 rounded-lg w-full`}
                                    placeholder="sc30@gmail.com"
                                    required
                                />
                                {err.email && <p className="text-red-400 text-sm">{err.email}</p>}
                            </div>
                            
                            <div className="flex flex-col w-full">
                                <label htmlFor="phone" className="mb-0.5 text-sm font-medium text-gray-900">
                                    Phone Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`bg-gray-200 border ${err.phone ? "border-red-400" : "border-gray-400"} p-2 rounded-lg w-full`}
                                    placeholder="123-456-7890"
                                    required
                                />
                                {err.phone && <p className="text-red-400 text-sm">{err.phone}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="message" className="mb-0.5 text-sm font-medium text-gray-900">
                                Message <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="message"
                                rows={9}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={`bg-gray-200 border ${err.message ? "border-red-400" : "border-gray-400"} p-2 rounded-lg w-full`}
                                placeholder="What's on your mind?"
                                required
                            />
                            {err.message && <p className="text-red-400 text-sm">{err.message}</p>}
                        </div>
                        
                        <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
                            <button type="submit" className="py-2 px-5 text-center text-white font-medium bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-35% to-[#398EEB] to-80% rounded-lg">Send Message</button>
                            <div className="flex justify-center items-center py-5 lg:p-0">
                                <Image
                                    src={"/donut.png"}
                                    alt="a purple glazed donut"
                                    width={48}
                                    height={48}
                                />
                                <PiCoffeeDuotone className="w-10 h-10" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <div className="mb-2 mt-auto">
                <p className="copyright text-center font-normal text-xs">&copy; 2025 Leo Li</p>
            </div>
            <ScrollToTop />
        </main>
    );
}