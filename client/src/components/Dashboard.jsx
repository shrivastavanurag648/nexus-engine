import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';

/* ── Helpers ── */
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const now = () => new Date().toLocaleTimeString();

const CFG = { rows: 6, cols: 10, updateInterval: 1200 };

/* ── Tactical Sound Design ── */
const playUISound = (type) => {
  const sounds = {
    assign: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    vacate: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3'
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.2;
  audio.play().catch(() => { });
};

/* ── Structured Room Generator ── */
const generateStructuredRooms = () => {
  const wings = [
    { id: 'A', prefix: 1, sector: 'male', row: 1.5 },
    { id: 'B', prefix: 2, sector: 'male', row: 4.5 },
    { id: 'C', prefix: 3, sector: 'female', row: 1.5 },
    { id: 'D', prefix: 4, sector: 'female', row: 4.5 }
  ];

  const cols = 10;
  const rows = 6;
  let structuredRooms = [];

  wings.forEach(wing => {
    for (let i = 1; i <= 6; i++) {
      let colPos = i <= 3 ? i + 1 : i + 3;

      structuredRooms.push({
        id: `${wing.prefix}0${i}`,
        roomNumber: `${wing.id}${100 + i}`,
        wing: wing.id,
        sector: wing.sector,
        xRatio: colPos / cols,
        yRatio: wing.row / rows,
        capacity: 4,
        occupancy: 0,
        clearance: 'C1',
        students: []
      });
    }
  });

  return structuredRooms;
};

/* ── SVG Grid Background ── */
const GridSVG = () => (
  <svg className="hud-grid" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,240,255,0.03)" strokeWidth="0.5" />
      </pattern>
      <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="url(#smallGrid)" />
        <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(0,240,255,0.06)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

/* ════════════════════════════════════════════════════════════
   DASHBOARD COMPONENT
   ════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [warden, setWarden] = useState(null);
  const [heartbeat, setHeartbeat] = useState(rand(28, 44));
  const [sysLoad, setSysLoad] = useState(rand(12, 38));
  const [clock, setClock] = useState(now());
  const [formName, setFormName] = useState('');
  const [heatmapActive, setHeatmapActive] = useState(false);

  const planRef = useRef(null);
  const heartbeatRef = useRef(null);
  const glowRef = useRef(null);
  const navigate = useNavigate();
  const { sector } = useParams();

  /* ── Fetch rooms from Java Engine ── */
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(`http://localhost:8080/api/rooms/sector/${sector}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setAllRooms(data);
      } catch (err) {
        console.error("Tactical Link Failure:", err);
        setError(true);
        playUISound('error');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [sector]);

  /* ── Heartbeat Animation (GSAP) ── */
  useEffect(() => {
    if (!heartbeatRef.current || !glowRef.current) return;

    // Organic heartbeat timeline
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(heartbeatRef.current, {
      scale: 1.4,
      opacity: 0.8,
      duration: 0.2,
      ease: "power2.out"
    })
      .to(heartbeatRef.current, {
        scale: 1,
        opacity: 0.4,
        duration: 0.8,
        ease: "expo.out"
      })
      .to({}, { duration: 0.5 }); // Rest

    // Ambient glow
    gsap.to(glowRef.current, {
      opacity: 0.3,
      scale: 2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(glowRef.current);
    };
  }, []);

  /* ── Derived data (no more sector filter — API already returns the right sector) ── */
  const filteredRooms = allRooms;

  /* ── Telemetry Math ── */
  const totalBeds = filteredRooms.reduce((s, r) => s + r.capacity, 0);
  const occupiedBeds = filteredRooms.reduce((s, r) => s + r.occupancy, 0);
  const availableBeds = totalBeds - occupiedBeds;
  const occupancyRate = totalBeds > 0 ? ((occupiedBeds / totalBeds) * 100).toFixed(1) : '0.0';

  /* ── Load warden identity ── */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setWarden(savedUser);
  }, []);

  /* ── Clock tick ── */
  useEffect(() => {
    const interval = setInterval(() => setClock(now()), 1000);
    return () => clearInterval(interval);
  }, []);

  /* ── Click-away listener ── */
  useEffect(() => {
    const handler = (e) => {
      if (e.target === planRef.current || e.target.closest('.hud-grid')) {
        setSelectedRoom(null);
      }
    };
    const plan = planRef.current;
    if (plan) plan.addEventListener('click', handler);
    return () => { if (plan) plan.removeEventListener('click', handler); };
  }, []);

  /* ── Keep selectedRoom in sync with live data ── */
  useEffect(() => {
    if (selectedRoom) {
      const updated = allRooms.find(r => r.id === selectedRoom.id);
      if (updated) setSelectedRoom(updated);
    }
  }, [allRooms]);

  /* ── Manual Actions ── */
  const handleAssign = async (e) => {
    if (e) e.preventDefault();
    if (!selectedRoom || !formName.trim()) return;
    if (selectedRoom.occupancy >= selectedRoom.capacity) return;

    const targetRoom = allRooms.find(r => r.id === selectedRoom.id);
    const updatedStudents = [...targetRoom.students, { id: formName.trim(), name: "Student Name" }];

    try {
      const response = await fetch(`http://localhost:8080/api/rooms/${selectedRoom.id}/students`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudents)
      });

      if (response.ok) {
        const savedRoom = await response.json();
        setAllRooms(prev => prev.map(r => r.id === savedRoom.id ? savedRoom : r));
        playUISound('assign');
      }
    } catch (err) {
      console.error("Transmission failed:", err);
      playUISound('error');
    }

    setFormName('');
  };

  const handleVacateSpecific = async (e, roomId, studentIdToRemove) => {
    if (e) e.preventDefault();

    const targetRoom = allRooms.find(r => r.id === roomId);
    if (!targetRoom) return;

    const updatedStudents = targetRoom.students.filter(s => s.id !== studentIdToRemove);

    try {
      const response = await fetch(`http://localhost:8080/api/rooms/${roomId}/students`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudents)
      });

      if (response.ok) {
        const savedRoom = await response.json();
        setAllRooms(prev => prev.map(r => r.id === roomId ? savedRoom : r));
        console.log(`Room ${roomId} updated. Student ${studentIdToRemove} removed from database.`);
        playUISound('vacate');
      }
    } catch (err) {
      console.error("SYNC ERROR: Could not update database.", err);
      playUISound('error');
      alert("CRITICAL: Tactical Link Failure. Changes not saved.");
    }
  };

  const handleVacateAll = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/rooms/${roomId}/students`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([])
      });

      if (response.ok) {
        const savedRoom = await response.json();
        setAllRooms(prev => prev.map(r => r.id === roomId ? savedRoom : r));
        console.log(`Room ${roomId} fully vacated.`);
        playUISound('vacate');
      }
    } catch (err) {
      console.error("Vacate All failed:", err);
      playUISound('error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  /* ── Heatmap Color Logic Engine ── */
  const getRoomStyle = (occupancy) => {
    if (!heatmapActive) return "bg-black/60 border-white/10"; // Default Dark Mode

    // 5-Stage Tactical Thermal Gradient
    switch (occupancy) {
      case 0: return "bg-emerald-900/40 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-emerald-100";
      case 1: return "bg-cyan-900/40 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)] text-cyan-100";
      case 2: return "bg-yellow-900/40 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)] text-yellow-100";
      case 3: return "bg-orange-900/40 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)] text-orange-100";
      default: return "bg-red-900/40 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-red-100"; // Full
    }
  };

  /* ════════════════════════ RENDER ════════════════════════ */
  return (
    <div style={{ height: '100vh', width: '100vw', background: 'var(--hud-bg)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

      {/* ── TOP-MID DATABASE LINK INDICATOR ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="px-6 py-2 bg-black/60 border-x border-b border-white/10 rounded-b-xl backdrop-blur-xl flex items-center gap-4">
          <div className="flex flex-col items-start">
            <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-[0.3em] leading-none mb-1">
              Data Link Status
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${error ? 'text-red-500' : 'text-white'}`}>
                {loading ? "Re-Routing..." : error ? "Link Severed" : "Active Terminal"}
              </span>
            </div>
          </div>

          {/* The Heartbeat Visualizer */}
          <div className="relative flex items-center justify-center w-6 h-6">
            <div
              ref={glowRef}
              className={`absolute w-full h-full rounded-full blur-md ${error ? 'bg-red-500/50' : 'bg-emerald-500/50'}`}
            />
            <div
              ref={heartbeatRef}
              className={`w-2 h-2 rounded-full z-10 ${error ? 'bg-red-500' : 'bg-emerald-500'}`}
            />
          </div>
        </div>
        <div className="w-px h-4 bg-linear-to-b from-white/20 to-transparent" />
      </div>



      {/* ── TOPBAR ── */}
      <div className="hud-topbar">
        <div className="hud-title">
          <span className="hud-sigil">NEXUS</span>
          <span className="hud-sub">{sector === 'male' ? 'MALE SECTOR // WINGS A-B' : 'FEMALE SECTOR // WINGS C-D'}</span>
          <span style={{ fontSize: 10, color: 'var(--hud-muted)', marginTop: 2, letterSpacing: 1 }}>OPERATOR: {warden ? warden.wardenId : 'UNKNOWN'}</span>
        </div>
        <div className="hud-status">
          <div className="hud-status-item">
            <span className="label">HEARTBEAT</span>
            <span className="value">{heartbeat} ms</span>
          </div>
          <div className="hud-status-item">
            <span className="label">SYS LOAD</span>
            <span className="value">{sysLoad}%</span>
          </div>
          <div className="hud-status-item">
            <span className="label">CLOCK</span>
            <span className="value">{clock}</span>
          </div>

          {/* HEATMAP TOGGLE — integrated into topbar */}
          <button
            onClick={() => setHeatmapActive(!heatmapActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-300 ${heatmapActive
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
              : 'bg-black/40 border-white/10 text-zinc-500 hover:text-white hover:border-white/30'
              }`}
          >
            <span className="text-[9px] font-mono uppercase tracking-widest">
              {heatmapActive ? 'Disable Thermal' : 'Enable Thermal'}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="hud-btn hud-btn-ghost"
            style={{ marginLeft: 8, padding: '6px 14px', fontSize: 11, letterSpacing: 1 }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* ── VIEWPORT ── */}
      <div className="hud-viewport">

        {/* ── PLAN (Grid + Nodes) ── */}
        <div className="hud-plan" ref={planRef}>
          <GridSVG />

          <div className="hud-nodes" onClick={() => setSelectedRoom(null)}>
            {filteredRooms.map(room => {
              const isFull = room.occupancy >= room.capacity;
              const isEmpty = room.occupancy === 0;
              const isSelected = selectedRoom?.id === room.id;

              return (
                <div
                  key={room.id}
                  className={`absolute p-3 rounded-lg backdrop-blur-md border transition-all duration-500 flex flex-col items-center justify-center cursor-pointer ${isSelected ? 'scale-110 ring-1 ring-cyan-400/40' : 'hover:scale-105'} ${getRoomStyle(room.occupancy)}`}
                  style={{
                    left: `${room.xRatio * 100}%`,
                    top: `${room.yRatio * 100}%`,
                    width: '56px',
                    height: '56px',
                    transform: `translate(-50%, -50%)${isSelected ? ' scale(1.08)' : ''}`,
                    fontFamily: 'var(--hud-mono)',
                  }}
                  onClick={(e) => { e.stopPropagation(); setSelectedRoom(room); }}
                >
                  <span className={`text-[11px] tracking-widest ${isFull ? 'text-red-400' : isEmpty ? 'text-cyan-300' : 'text-cyan-400'}`}>{room.id}</span>
                  <span className="text-[10px] text-zinc-400 mt-1">{room.occupancy}/{room.capacity}</span>
                </div>
              );
            })}
          </div>

          {/* ── Overlay Metrics ── */}
          <div className="hud-overlay">
            <div className="hud-metric">
              <div className="hud-m-label">TOTAL BEDS</div>
              <div className="hud-m-value">{totalBeds}</div>
            </div>
            <div className="hud-metric">
              <div className="hud-m-label">AVAILABLE</div>
              <div className="hud-m-value">{availableBeds}</div>
            </div>
            <div className="hud-metric">
              <div className="hud-m-label">OCCUPANCY</div>
              <div className="hud-m-value">{occupancyRate}%</div>
            </div>
          </div>
        </div>

        {/* ── PANEL ── */}
        <div className={`hud-panel ${selectedRoom ? 'visible' : 'hidden'}`}>
          <div className="hud-panel-handle" />
          {selectedRoom && (
            <div className="hud-panel-content">
              {/* Header */}
              <div className="hud-panel-header">
                <div className="hud-panel-title">{selectedRoom.roomNumber}</div>
                <div className="hud-panel-sub">Wing {selectedRoom.wing} • Clearance {selectedRoom.clearance} • {selectedRoom.genderLimit}</div>
              </div>

              {/* Records */}
              <div className="hud-record">
                <div className="hud-record-row">
                  <span className="label">Capacity</span>
                  <span className="value">{selectedRoom.capacity}</span>
                </div>
                <div className="hud-record-row">
                  <span className="label">Occupancy</span>
                  <span className="value">{selectedRoom.occupancy} / {selectedRoom.capacity}</span>
                </div>
                <div className="hud-record-row">
                  <span className="label">Status</span>
                  <span className="value">{selectedRoom.occupancy >= selectedRoom.capacity ? 'FULL' : selectedRoom.occupancy === 0 ? 'VACANT' : 'PARTIAL'}</span>
                </div>
              </div>

              {/* Student List */}
              <div className="hud-student-list">
                <div className="hud-list-title">Assigned Students</div>
                <div className="hud-list-items">
                  {selectedRoom.students.length === 0 ? (
                    <div className="hud-list-item" style={{ color: 'var(--hud-muted)' }}>— no assignments</div>
                  ) : (
                    selectedRoom.students.map(student => (
                      <div key={student.id} className="hud-list-item group">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: 'var(--hud-cyan)' }}>{student.id}</span>
                          <span className="meta">{student.name}</span>
                        </div>
                        <button
                          onClick={(e) => handleVacateSpecific(e, selectedRoom.id, student.id)}
                          className="text-red-500/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest px-2 py-1 border border-red-500/20 hover:border-red-500/50 bg-red-500/5 cursor-pointer"
                        >
                          VACATE
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* TACTICAL ROOM CONTROLS */}
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
                {/* ASSIGN BUTTON: Only show if room is NOT full */}
                {selectedRoom.occupancy < 4 ? (
                  <button
                    onClick={(e) => handleAssign(e)}
                    className="text-[9px] uppercase tracking-widest px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors"
                  >
                    Assign
                  </button>
                ) : (
                  <span className="text-[9px] uppercase tracking-widest px-2 py-1 text-red-500 font-bold bg-red-500/10 rounded">
                    MAX CAPACITY
                  </span>
                )}

                {/* VACATE ALL BUTTON: Only show ONCE if room is NOT empty */}
                {selectedRoom.occupancy > 0 && (
                  <button
                    onClick={() => handleVacateAll(selectedRoom.id)}
                    className="text-[9px] uppercase tracking-widest px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500/20 transition-colors ml-auto"
                  >
                    Vacate All
                  </button>
                )}
              </div>

              {/* Allocation Form — only when not full */}
              {selectedRoom.occupancy < selectedRoom.capacity && (
                <div className="hud-alloc-form">
                  <div className="hud-form-row">
                    <input
                      className="hud-input"
                      placeholder="Student name..."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAssign(e); }}
                    />
                  </div>
                  <div className="hud-form-row">
                    <button className="hud-btn hud-btn-primary" style={{ width: '100%' }} onClick={(e) => handleAssign(e)}>
                      ASSIGN
                    </button>
                  </div>
                </div>
              )}

              {/* Full state message — no duplicate Vacate All */}
              {selectedRoom.occupancy >= selectedRoom.capacity && (
                <div className="hud-alloc-form">
                  <div style={{ textAlign: 'center', color: '#ff7070', fontSize: 12, padding: '10px 0' }}>
                    ROOM AT MAXIMUM CAPACITY
                  </div>
                </div>
              )}

              <div className="hud-panel-footer">NEXUS v8.0</div>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="hud-footer">
        <span>NEXUS TACTICAL HUD • {sector?.toUpperCase()} SECTOR</span>
        <span>{now()}</span>
      </div>
    </div>
  );
};

export default Dashboard;
