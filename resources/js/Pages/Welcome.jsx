import { Link, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react"; // Ensure useRef is imported

export default function Welcome({ auth }) {
    const textVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1 },
        },
    };

    const subTextVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: (custom) => ({
            opacity: 1,
            x: 0,
            transition: { delay: custom * 0.5, duration: 1 },
        }),
    };
    const subsubTextVariants = {
        hidden: { opacity: 0, x: 0 },
        visible: (custom) => ({
            opacity: 1,
            x: 0,
            transition: { delay: custom * 0.5, duration: 1 },
        }),
    };
    // Adjusted animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visibleLogo: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 3.5, // Adjust the delay as needed
                duration: 1,
            },
        },
        visibleText: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 4.5, // Adjust the delay as needed
                duration: 1,
            },
        },
    };

    // Initial states for animations
    const initialLogo = { opacity: 0, y: -100 }; // Logo comes from top
    const initialText = { opacity: 0, x: 100 }; // Text comes from right
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const skyRef = useRef(null);

    useEffect(() => {
        const generateStars = (numberOfStars) => {
            for (let i = 0; i < numberOfStars; i++) {
                const star = document.createElement("div");
                star.className = `star blink-${Math.ceil(Math.random() * 5)}`;

                // Generate a random size for each star
                const starSize = `${Math.random() * 5 + 1}px`; // Stars vary between 1px and 4px in size

                // Generate random positions within the viewport dimensions
                // Ensure stars are not clustered in the same spot by using the full window's width and height
                const positionX = `${Math.random() * window.innerWidth}px`;
                const positionY = `${Math.random() * window.innerHeight}px`;

                star.style.width = starSize;
                star.style.height = starSize;
                star.style.left = positionX;
                star.style.top = positionY;

                // Optionally, you can adjust the animation duration randomly to make the blinking effect vary among stars
                const animationDuration = `${Math.random() * (8 - 2) + 2}s`; // Blinking animation lasts between 2 and 5 seconds
                star.style.animationDuration = animationDuration;

                skyRef.current.appendChild(star);
            }
        };

        generateStars(300); // Generate stars

        const handleMouseMove = (e) => {
            // Calculate mouse position relative to the center of the screen
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;

            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <Head title="Welcome" />

            <div className="relative min-h-screen text-white aurora-background">
                <div
                    ref={skyRef}
                    className="absolute top-0 left-0 z-30 w-full h-full"
                />

                <div className="absolute inset-0 bg-no-repeat bg-cover bg-aurora-background"></div>
                <header className="container flex items-center justify-between px-4 py-5 mx-auto">
                    <nav className="z-20 flex -mt-24 space-x-12 tracking-widest uppercase">
                        <Link
                            href="#"
                            className="hover:underline relative after:content-['\2022'] after:absolute after:right-[-30px] after:-top-2 after:text-3xl"
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline relative after:content-['\2022'] after:absolute after:right-[-30px] after:-top-2 after:text-3xl"
                        >
                            Try Online
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline relative after:content-['\2022'] after:absolute after:right-[-30px] after:-top-2 after:text-3xl"
                        >
                            Download OS
                        </Link>
                        {/* The last item should not have a dot after it */}
                        <Link href="#" className="hover:underline">
                            View Docs
                        </Link>
                    </nav>
                    <div className="z-20 mt-8 text-right">
                        {/* Logo animation from top */}
                        <motion.img
                            src="/img/logo.png"
                            alt="Company Logo"
                            className="inline-block h-20"
                            variants={containerVariants}
                            initial={initialLogo}
                            animate="visibleLogo"
                        />
                        {/* "QUARTER MASTER" text animation from right */}
                        <motion.div
                            className="mt-2 text-5xl font-black"
                            variants={containerVariants}
                            initial={initialText}
                            animate="visibleText"
                        >
                            QUARTER <br />
                            <span className="font-light">MASTER</span>
                        </motion.div>
                    </div>
                </header>
                <div
                    className="fixed bottom-0 right-0 z-10"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    }}
                >
                    <img
                        src="/img/vzorec.png"
                        alt="Pattern"
                        className="float-right w-1/2 h-auto"
                    />
                </div>
                <div
                    className="fixed bottom-0 right-0 z-10"
                    style={{
                        transform: `translate(${mousePosition.x * -1}px, ${
                            mousePosition.y * -1
                        }px)`,
                    }}
                >
                    <img
                        src="/img/vzorec_2.png"
                        alt="Pattern"
                        className="float-right w-1/5 h-auto"
                    />
                </div>
                <div className="container z-20 px-4 mx-auto text-left">
                    <motion.h1
                        className="mt-20 font-black text-8xl"
                        variants={textVariants}
                        initial="hidden"
                        custom={1}
                        animate="visible"
                    >
                        <div className="outlined-text">YOUR</div>
                    </motion.h1>
                    <motion.div
                        className="text-5xl font-black"
                        variants={subTextVariants}
                        initial="hidden"
                        custom={2}
                        animate="visible"
                    >
                        GATEWAY TO A UNIVERSE OF
                    </motion.div>
                    <motion.div
                        className="font-black text-8xl"
                        variants={subTextVariants}
                        initial="hidden"
                        custom={3}
                        animate="visible"
                    >
                        A.I. ASSISTANTS
                    </motion.div>
                    <motion.div
                        className="mt-8 text-xl"
                        variants={subsubTextVariants}
                        initial="hidden"
                        custom={5}
                        animate="visible"
                    >
                        Offering unique tools and capabilities to streamline
                        your tasks.
                    </motion.div>
                </div>

                {/* Rest of the content */}

                <footer className="absolute bottom-0 w-full p-4 text-center">
                    {/* Your footer content */}
                </footer>
            </div>
        </>
    );
}
