import React from 'react';
import { motion } from 'framer-motion';

const WingAnalyticsBar = ({ wingName, wingRooms }) => {
    const totalCapacity = wingRooms.reduce((sum, room) => sum + (room.capacity || 0), 0);
    const currentOccupants = wingRooms.reduce((sum, room) => sum + (room.occupants ? room.occupants.length : 0), 0);
    const fillPercentage = totalCapacity > 0 ? (currentOccupants / totalCapacity) * 100 : 0;

    return (
        <div style={{ marginTop: '1rem' }}>
            <div
                className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2"
            >
                WING {wingName} OCCUPANCY: {currentOccupants} / {totalCapacity} BEDS
            </div>
            <div
                style={{
                    height: '4px',
                    backgroundColor: 'var(--surface-hover)',
                    marginTop: '0.5rem',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        backgroundColor: '#ffffff',
                        height: '100%',
                        borderRadius: '2px'
                    }}
                />
            </div>
        </div>
    );
};

export default WingAnalyticsBar;
