import React, { useState } from "react";
import Image from "next/image";
import { PiCoffeeDuotone } from "react-icons/pi";

interface Errors {
  fname: string | null;
  lname: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
}

export default function Form() {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      try {
        const data = {
          fname,
          lname,
          email,
          phone,
          message,
        };

        const res = await fetch('/api/route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok) {
          alert("Message sent!");
          setFName("");
          setLName("");
          setEmail("");
          setPhone("");
          setMessage("");
        } else {
          console.error('Error from API:', result.message)
          alert('Error sending email message');
        }
      } catch (error) {
        console.error('Error: ', error);
        alert('Error sending message');
      }
    }
  };

  return (
    <div className="w-full md:w-5/6 max-w-screen-xl">
      <form action={''} className="flex flex-col w-full" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col mb-3 gap-6 lg:flex-row w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="fname" className="mb-0.5 text-sm font-medium text-foreground">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="fname"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
              className={`bg-muted border ${err.fname ? "border-red-400" : "border-border"} p-2 rounded-lg w-full text-foreground`}
              placeholder="Stephen"
              required
            />
            {err.fname && <p className="text-red-400 text-sm">{err.fname}</p>}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lname" className="mb-0.5 text-sm font-medium text-foreground">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
              className={`bg-muted border ${err.lname ? "border-red-400" : "border-border"} p-2 rounded-lg w-full text-foreground`}
              placeholder="Curry"
              required
            />
            {err.lname && <p className="text-red-400 text-sm">{err.lname}</p>}
          </div>
        </div>
        <div className="flex flex-col mb-3 gap-6 lg:flex-row w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="mb-0.5 text-sm font-medium text-foreground">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-muted border ${err.email ? "border-red-400" : "border-border"} p-2 rounded-lg w-full text-foreground`}
              placeholder="sc30@gmail.com"
              required
            />
            {err.email && <p className="text-red-400 text-sm">{err.email}</p>}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="phone" className="mb-0.5 text-sm font-medium text-foreground">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`bg-muted border ${err.phone ? "border-red-400" : "border-border"} p-2 rounded-lg w-full text-foreground`}
              placeholder="123-456-7890"
              required
            />
            {err.phone && <p className="text-red-400 text-sm">{err.phone}</p>}
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="message" className="mb-0.5 text-sm font-medium text-foreground">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            rows={9}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`bg-muted border ${err.message ? "border-red-400" : "border-border"} p-2 rounded-lg w-full text-foreground`}
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
  );
}