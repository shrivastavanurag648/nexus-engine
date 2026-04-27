import { useState } from "react";
import { Terminal, KeyRound, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [wardenId, setWardenId] = useState('');
    const [password, setPassword] = useState('');

    // 3. Create the function that runs when the form is submitted
    const handleLogin = async (e) => {
        e.preventDefault();

        // The data you type into the React form
        const loginPayload = {
            wardenId: wardenId, // Ensure this matches your React state variable name for the ID input
            password: password  // Ensure this matches your React state variable name for the password input
        };

        try {
            // 1. Send the data to the Java Engine
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginPayload),
            });

            // 2. Check if Java approved the login
            if (response.ok) {
                // Parse the actual Warden data returned from MongoDB
                const wardenData = await response.json();

                // 3. Save the real session data
                localStorage.setItem("token", "active-session-token");
                localStorage.setItem("user", JSON.stringify(wardenData));

                console.log("Authentication successful! Welcome:", wardenData.wardenId);

                // 4. Send them to the sector selection gateway
                navigate("/dashboard");
            } else {
                // Java returned a 401 Unauthorized
                alert("ACCESS DENIED: Invalid Warden ID or Passcode.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("CRITICAL ERROR: Cannot connect to NEXUS Engine.");
        }
    };

    return (
        <div className="w-full min-h-screen bg-black lg:grid lg:grid-cols-2 selection:bg-white/30">

            {/* Left Column: Brand & Telemetry (Hidden on Mobile) */}
            <div className="relative hidden lg:flex flex-col bg-zinc-950 p-10 text-white border-r border-white/10 overflow-hidden">
                {/* Subtle grid background for the left side */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

                <div className="relative z-10 flex items-center gap-2 font-bold tracking-widest text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    <Terminal size={24} className="text-white" />
                    NEXUS
                </div>

                <div className="relative z-10 mt-auto">
                    <div className="space-y-6 max-w-lg">
                        <h2 className="text-3xl font-medium tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            High-Density Spatial Management.
                        </h2>
                        <p className="text-zinc-400 font-mono text-sm leading-relaxed tracking-wide">
                            &gt; ALLOCATION ENGINE ONLINE <br />
                            &gt; SECURE KERNEL INITIALIZED <br />
                            &gt; AWAITING WARDEN AUTHENTICATION
                        </p>
                    </div>

                    <div className="mt-10 flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest border-t border-white/10 pt-6">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-white" />
                            <span>End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Functional Authentication */}
            <div className="flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-sm space-y-10">

                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-2xl font-bold tracking-widest text-white uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Warden Portal
                        </h1>
                        <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
                            Enter your credentials to access telemetry.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleLogin}>
                        <div className="space-y-3">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                <KeyRound size={14} /> Warden ID
                            </label>
                            <input
                                type="text"
                                placeholder="W-7492"
                                value={wardenId}
                                onChange={(e) => setWardenId(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-colors font-mono rounded-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Passcode</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-colors font-mono rounded-none"
                            />
                        </div>

                        <button type="submit" className="w-full pt-4">
                            <div className="bg-white text-black font-bold font-sans tracking-widest uppercase py-3 px-4 hover:bg-zinc-200 transition-colors flex items-center justify-center">
                                Initialize Session
                            </div>
                        </button>
                    </form>

                    <p className="text-center lg:text-left text-zinc-600 text-[10px] font-mono tracking-widest">
                        UNAUTHORIZED ACCESS IS STRICTLY MONITORED
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;