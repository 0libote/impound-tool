import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MouseFollower = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smoother, slower spring for a "floating" feel
    const springConfig = { damping: 30, stiffness: 800 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            // Center the 600px circle
            cursorX.set(e.clientX - 300);
            cursorY.set(e.clientY - 300);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 mix-blend-screen"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 70%)',
            }}
        />
    );
};

export default MouseFollower;
