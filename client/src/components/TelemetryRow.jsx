import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const TelemetryRow = ({ rooms }) => {
    const [time, setTime] = useState(new Date());

    const totalBedsRef = useRef(null);
    const availableBedsRef = useRef(null);
    const occupancyRateRef = useRef(null);

    const totalBeds = rooms.reduce((sum, room) => sum + (room.capacity || 0), 0);
    const availableBeds = rooms.reduce((sum, room) => {
        if (room.status === 'Maintenance') return sum;
        const occupants = room.occupants ? room.occupants.length : 0;
        return sum + Math.max(0, (room.capacity || 0) - occupants);
    }, 0);
    const occupiedBeds = totalBeds - availableBeds;
    const occupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : 0;

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const formatNumber = (val) => Math.round(val);
        const formatDecimal = (val) => val.toFixed(1);

        const dummy = { total: 0, available: 0, rate: 0 };
        gsap.to(dummy, {
            total: totalBeds,
            available: availableBeds,
            rate: occupancyRate,
            duration: 1.5,
            ease: "power3.out",
            onUpdate: () => {
                if (totalBedsRef.current) totalBedsRef.current.innerHTML = formatNumber(dummy.total);
                if (availableBedsRef.current) availableBedsRef.current.innerHTML = formatNumber(dummy.available);
                if (occupancyRateRef.current) occupancyRateRef.current.innerHTML = formatDecimal(dummy.rate) + "%";
            }
        });
    }, [rooms, totalBeds, availableBeds, occupancyRate]);

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                    SYSTEM TIME: {time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </span>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem'
            }}>
                {/* Card 1: TOTAL BEDS */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2">TOTAL BEDS</span>
                    <span ref={totalBedsRef} className="text-white" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0</span>
                </div>

                {/* Card 2: AVAILABLE BEDS */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2">AVAILABLE BEDS</span>
                    <span ref={availableBedsRef} className="text-white" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0</span>
                </div>

                {/* Card 3: OCCUPANCY RATE */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'box-shadow 0.5s ease'
                }}>
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2">OCCUPANCY RATE</span>
                    <span ref={occupancyRateRef} className="text-white" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>0.0%</span>
                </div>
            </div>
        </div>
    );
};

export default TelemetryRow;
