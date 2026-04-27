import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import WingAnalyticsBar from './WingAnalyticsBar';
import TelemetryRow from './TelemetryRow';

const FloorMap = ({ rooms, selectedRoom, setSelectedRoom, lastAllocatedRoomId, heatmapMode }) => {
    const containerRef = useRef(null);

    const groupRoomsByWing = (roomsToGroup) => {
        return roomsToGroup.reduce((acc, room) => {
            const wing = room.wing || 'Unknown';
            if (!acc[wing]) {
                acc[wing] = [];
            }
            acc[wing].push(room);
            return acc;
        }, {});
    };

    const groupedRooms = groupRoomsByWing(rooms);

    const getHeatmapColor = (occupancyCount, capacity) => {
        if (occupancyCount === 0) return 'var(--surface)';
        if (occupancyCount === 1) return 'rgba(197, 160, 89, 0.2)';
        if (occupancyCount === 2) return 'rgba(197, 160, 89, 0.6)';
        if (occupancyCount === 3) return 'rgba(211, 84, 0, 0.8)';
        if (occupancyCount >= capacity) return 'var(--status-full)';
        return 'var(--surface)';
    };

    useEffect(() => {
        if (rooms.length > 0) {
            gsap.fromTo(
                '.room-cell',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [rooms]);

    useEffect(() => {
        if (lastAllocatedRoomId) {
            gsap.fromTo(`#room-cell-${lastAllocatedRoomId}`,
                { boxShadow: "0 0 10px 5px rgba(197, 160, 89, 0.8)" },
                { boxShadow: "0 0 30px 15px rgba(197, 160, 89, 0)", duration: 1, ease: "power2.out" }
            );
        }
    }, [lastAllocatedRoomId]);

    useEffect(() => {
        if (rooms && rooms.length > 0) {
            rooms.forEach(room => {
                const elementId = `#room-cell-${room.id}`;
                if (heatmapMode) {
                    const count = room.occupants ? room.occupants.length : 0;
                    gsap.to(elementId, {
                        backgroundColor: getHeatmapColor(count, room.capacity),
                        duration: 0.5
                    });
                } else {
                    gsap.to(elementId, {
                        backgroundColor: 'var(--surface)',
                        duration: 0.5
                    });
                }
            });
        }
    }, [heatmapMode, rooms]);

    return (
        <div ref={containerRef} className="border border-white/10 bg-white/2" style={{ padding: '2rem', height: '100vh', overflowY: 'auto' }}>
            <style>
                {`
                .room-cell {
                    transition: all 0.3s ease;
                }
                .room-cell:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 15px var(--accent-glow);
                }
                `}
            </style>

            <h2 className="text-white" style={{ marginBottom: '2rem', marginTop: 0 }}>Floor Map</h2>

            <TelemetryRow rooms={rooms} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {Object.keys(groupedRooms).sort().map(wing => (
                    <div key={wing} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 className="text-zinc-400 font-mono text-xs uppercase tracking-widest" style={{ margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Wing {wing}</h3>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {groupedRooms[wing].map(room => {
                                let statusColor = 'border-emerald-500/30';
                                let cursorStyle = 'pointer';

                                if (room.status === 'Full') {
                                    statusColor = 'border-red-500/30';
                                    cursorStyle = 'not-allowed';
                                } else if (room.status === 'Maintenance') {
                                    statusColor = 'border-amber-500/50';
                                    cursorStyle = 'not-allowed';
                                }

                                const isSelected = selectedRoom?.id === room.id;

                                return (
                                    <div
                                        id={`room-cell-${room.id}`}
                                        key={room.id}
                                        className={`room-cell border-2 ${isSelected ? 'bg-white text-black font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : statusColor}`}
                                        onClick={() => {
                                            if (room.status === 'Available') {
                                                setSelectedRoom(room);
                                            }
                                        }}
                                        style={{
                                            backgroundColor: isSelected ? 'white' : 'var(--surface)',
                                            padding: '1rem',
                                            borderRadius: '4px',
                                            minWidth: '100px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: cursorStyle,
                                            transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                                        }}
                                    >
                                        <span className={isSelected ? 'text-black' : 'text-white'} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{room.roomNumber}</span>
                                        <span style={{ fontSize: '0.9rem', color: isSelected ? '#333' : '#ccc' }}>
                                            {room.occupants ? room.occupants.length : 0} / {room.capacity}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <WingAnalyticsBar wingName={wing} wingRooms={groupedRooms[wing]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FloorMap;
