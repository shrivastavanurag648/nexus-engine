import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

const AllocationPanel = ({ selectedRoom, handleAllocate, rooms, setSelectedRoom }) => {
    const [formData, setFormData] = useState({ name: '', gender: 'Male', year: 1, department: 'Artificial Intelligence' });
    const [isHovered, setIsHovered] = useState(false);

    const handleAutoSuggest = () => {
        const availableRooms = rooms.filter(room => room.status === 'Available');
        availableRooms.sort((a, b) => {
            const aCount = a.occupants ? a.occupants.length : 0;
            const bCount = b.occupants ? b.occupants.length : 0;
            return bCount - aCount;
        });

        if (availableRooms.length > 0) {
            setSelectedRoom(availableRooms[0]);
        }
    };

    if (!selectedRoom) {
        return (
            <div className="border border-white/10 bg-white/2" style={{ margin: '1rem', padding: '2rem', height: 'calc(100% - 2rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h3 className="text-zinc-400 font-mono text-xs uppercase tracking-widest" style={{ opacity: 0.5, marginBottom: '2rem' }}>Awaiting Room Selection...</h3>
                <button
                    className="border border-white/10 text-white"
                    onClick={handleAutoSuggest}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        backgroundColor: isHovered ? '#ffffff' : 'transparent',
                        color: isHovered ? '#000000' : '#ffffff',
                        padding: '1rem 2rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        transition: 'background-color 0.2s, color 0.2s',
                        borderRadius: '4px'
                    }}
                >
                    SUGGEST BEST ROOM
                </button>
            </div>
        );
    }

    const isButtonDisabled = formData.name.trim() === '';
    const isGenderMismatch = selectedRoom.genderLimit && selectedRoom.genderLimit !== formData.gender;

    return (
        <div className="border border-white/10 bg-white/2" style={{ margin: '1rem', padding: '2rem', height: 'calc(100% - 2rem)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <h2 className="text-white" style={{ marginTop: 0, marginBottom: '2rem' }}>Allocation Details</h2>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }} className="text-white">
                    {selectedRoom.roomNumber}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#ccc', marginTop: '0.5rem' }}>
                    Wing: {selectedRoom.wing} {selectedRoom.genderLimit ? `(${selectedRoom.genderLimit} Only)` : ''}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#ccc', marginTop: '0.5rem' }}>
                    Occupancy: {selectedRoom.occupants ? selectedRoom.occupants.length : 0} / {selectedRoom.capacity}
                </div>
            </div>

            {selectedRoom.status === 'Maintenance' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', color: '#f59e0b', marginTop: 'auto', marginBottom: 'auto' }}>
                    <AlertTriangle size={64} />
                    <h3 className="font-bold text-xl tracking-widest text-center uppercase">Room Closed for Maintenance</h3>
                </div>
            ) : (
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* View 2: Occupants List */}
                    {selectedRoom.occupants && selectedRoom.occupants.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                            <label className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2 block">Current Occupants</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {selectedRoom.occupants.map((occ, idx) => (
                                    <div key={idx} className="border border-white/10 bg-white/5 p-3 rounded flex justify-between items-center text-sm">
                                        <span className="text-white font-mono text-sm font-bold">{occ.name}</span>
                                        <span className="text-white font-mono text-sm">{occ.year} • {occ.dept}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input 1: Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Student Name</label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{
                                backgroundColor: 'var(--surface)',
                                color: 'white',
                                border: 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.2)',
                                padding: '1rem',
                                outline: 'none',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                transition: 'border-bottom-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderBottomColor = '#ffffff'}
                            onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)'}
                        />
                    </div>

                    {/* Input 2: Gender Dropdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Gender</label>
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            style={{
                                backgroundColor: 'var(--surface)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '1rem',
                                borderRadius: '4px',
                                outline: 'none',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ffffff'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Input 3: Year Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Academic Year</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[1, 2, 3, 4].map(year => (
                                <button
                                    key={year}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, year })}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontFamily: 'inherit',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        backgroundColor: formData.year === year ? '#ffffff' : 'transparent',
                                        color: formData.year === year ? '#000000' : '#ffffff',
                                        transition: 'background-color 0.2s, color 0.2s'
                                    }}
                                >
                                    Year {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input 4: Department */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Department</label>
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            style={{
                                backgroundColor: 'var(--surface)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '1rem',
                                borderRadius: '4px',
                                outline: 'none',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ffffff'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                        >
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Mechanical">Mechanical</option>
                        </select>
                    </div>

                    {/* View 4: Gender Mismatch Warning */}
                    {isGenderMismatch && (
                        <div className="text-red-500 font-bold text-sm text-center uppercase mt-2">
                            GENDER MISMATCH: This wing is restricted.
                        </div>
                    )}

                    <button
                        onClick={() => handleAllocate(formData)}
                        disabled={isButtonDisabled || isGenderMismatch}
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: (isButtonDisabled || isGenderMismatch) ? 'not-allowed' : 'pointer',
                            fontFamily: 'inherit',
                            marginTop: '0.5rem',
                            opacity: (isButtonDisabled || isGenderMismatch) ? 0.5 : 1,
                            transition: 'opacity 0.2s, cursor 0.2s'
                        }}
                    >
                        CONFIRM ALLOCATION
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllocationPanel;
