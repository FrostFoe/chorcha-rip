
'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
}

export const AnimatedCard = ({ children, className }: AnimatedCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
