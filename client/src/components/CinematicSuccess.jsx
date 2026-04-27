import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CinematicSuccess = ({ roomNumber, rollNo, onComplete }) => {
    const overlayRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const text = `ALLOCATION CONFIRMED: STUDENT ${rollNo} SECURED IN ROOM ${roomNumber}`;
        const chars = text.split('').map((char, i) => {
            return `<span class="char" style="opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`;
        }).join('');
        
        if (textRef.current) {
            textRef.current.innerHTML = chars;
        }

        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
          .to(overlayRef.current.querySelectorAll('.char'), { opacity: 1, stagger: 0.05, duration: 0.1 })
          .to({}, { duration: 1.5 }) // Hold
          .to(overlayRef.current, { opacity: 0, duration: 0.4 });
          
        return () => {
            tl.kill();
        };
    }, [roomNumber, rollNo, onComplete]);

    return (
        <div 
            ref={overlayRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(10, 7, 5, 0.85)',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                pointerEvents: 'none'
            }}
        >
            <h2 
                ref={textRef} 
                className="gold-text" 
                style={{ 
                    fontFamily: "'Cinzel', serif", 
                    fontSize: '2.5rem', 
                    textAlign: 'center', 
                    maxWidth: '80%',
                    lineHeight: '1.5'
                }}
            >
            </h2>
        </div>
    );
};

export default CinematicSuccess;
