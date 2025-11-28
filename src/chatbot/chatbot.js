import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css";

export default function Chatbot({
    ayurUrl = process.env.REACT_APP_AYUR_URL || "http://localhost:5000/",
    position = "bottom-right"
}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showCompact, setShowCompact] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const windowRef = useRef(null);
    const tooltipTimeoutRef = useRef(null);
    const welcomeShownRef = useRef(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Show welcome message on page load (once per session)
    useEffect(() => {
        const hasSeenWelcome = sessionStorage.getItem("ayudhv-welcome-shown");

        if (!hasSeenWelcome && !welcomeShownRef.current) {
            const timer = setTimeout(() => {
                setShowWelcome(true);
                welcomeShownRef.current = true;
                sessionStorage.setItem("ayudhv-welcome-shown", "true");

                // Auto-hide after 6 seconds
                setTimeout(() => {
                    setShowWelcome(false);
                }, 6000);
            }, 2000); // Show after 2 seconds of page load

            return () => clearTimeout(timer);
        }
    }, []);

    // Show tooltip on hover
    const handleMouseEnter = () => {
        if (showWelcome) return; // Don't show tooltip if welcome is visible

        tooltipTimeoutRef.current = setTimeout(() => {
            setShowTooltip(true);
        }, 300);
    };

    const handleMouseLeave = () => {
        if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
        }
        setShowTooltip(false);
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                if (showMenu) setShowMenu(false);
                if (showCompact) {
                    setShowCompact(false);
                    document.body.style.overflow = "";
                }
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [showMenu, showCompact]);

    // Handle chatbot icon click
    const handleChatIconClick = () => {
        setShowTooltip(false);
        setShowWelcome(false);

        // Mobile: automatically open fullscreen
        if (isMobile) {
            openFullScreen();
        } else {
            // Desktop: show menu options
            setShowMenu(!showMenu);
        }
    };

    // Open in full-screen popup window
    const openFullScreen = () => {
        setShowMenu(false);

        // Check if window is already open
        if (windowRef.current && !windowRef.current.closed) {
            windowRef.current.focus();
            return;
        }

        // Calculate centered position
        const width = 450;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        // Window features
        const features = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      toolbar=no,
      menubar=no,
      location=no,
      status=no,
      scrollbars=yes,
      resizable=yes
    `.replace(/\s/g, "");

        // Open popup
        windowRef.current = window.open(ayurUrl, "AyudhvChatbot", features);

        if (windowRef.current) {
            windowRef.current.document.title = "Ayudhv AI Assistant";
        }
    };

    // Open in compact mode
    const openCompact = () => {
        setShowMenu(false);
        setShowCompact(true);
        document.body.style.overflow = "hidden";
    };

    // Close compact mode
    const closeCompact = () => {
        setShowCompact(false);
        document.body.style.overflow = "";
    };

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCompact();
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (windowRef.current && !windowRef.current.closed) {
                windowRef.current.close();
            }
            document.body.style.overflow = "";
        };
    }, []);

    // Get position class
    const getPositionClass = () => {
        return `position-${position}`;
    };

    return (
        <>
            <div className={`chatbot-container ${getPositionClass()}`}>
                {/* Welcome Message (appears once on page load) */}
                {showWelcome && (
                    <div className="chatbot-welcome-message" role="alert" aria-live="polite">
                        <div className="welcome-content">
                            <div className="welcome-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="welcome-text">
                                <div className="welcome-greeting">👋 Namaste!</div>
                                <div className="welcome-message">
                                    I'm your Ayudost Assistant — here to help you discover natural wellness solutions
                                </div>
                            </div>
                            <button
                                className="welcome-close"
                                onClick={() => setShowWelcome(false)}
                                aria-label="Close welcome message"
                            >
                                ×
                            </button>
                        </div>
                        <div className="welcome-arrow"></div>
                    </div>
                )}

                {/* Hover Tooltip */}
                {showTooltip && !showMenu && !showWelcome && (
                    <div className="chatbot-hover-tooltip" role="tooltip">
                        <span>Need help? Chat with me! 🌿</span>
                    </div>
                )}

                {/* Menu Modal */}
                {showMenu && (
                    <div className="chatbot-menu">
                        <div className="menu-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                            Choose Your Chat Experience
                        </div>
                        <button
                            className="menu-option"
                            onClick={openFullScreen}
                            aria-label="Open chatbot in full screen"
                        >
                            <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                            </svg>
                            <div className="menu-text">
                                <div className="menu-title">Full Screen Mode</div>
                                <div className="menu-subtitle">Immersive experience with more space</div>
                            </div>
                        </button>
                        <button
                            className="menu-option"
                            onClick={openCompact}
                            aria-label="Open compact chat"
                        >
                            <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <div className="menu-text">
                                <div className="menu-title">Compact Chat</div>
                                <div className="menu-subtitle">Quick chat while browsing</div>
                            </div>
                        </button>
                        <button
                            className="menu-close"
                            onClick={() => setShowMenu(false)}
                            aria-label="Close menu"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {/* Floating Chat Icon with Avatar */}
                <button
                    className={`chatbot-toggle ${showMenu || showCompact ? "active" : ""}`}
                    onClick={handleChatIconClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onFocus={handleMouseEnter}
                    onBlur={handleMouseLeave}
                    title="Chat with Ayudhv AI Assistant"
                    aria-label="Open chat with Ayudhv assistant"
                    aria-expanded={showMenu || showCompact}
                >
                    {/* Animated background circles */}
                    <div className="chat-pulse-ring"></div>
                    <div className="chat-pulse-ring-delayed"></div>

                    {/* Avatar/Icon */}
                    <div className="chat-avatar">
                        {/* Ayurvedic Leaf + Chat Symbol */}
                        <svg className="chat-icon-svg" viewBox="0 0 64 64" fill="none">
                            {/* Leaf shape */}
                            <path
                                d="M32 8C20 8 12 16 12 28c0 8 4 14 8 18l12 12 12-12c4-4 8-10 8-18 0-12-8-20-20-20z"
                                fill="url(#leafGradient)"
                                stroke="white"
                                strokeWidth="2"
                            />
                            {/* Leaf vein */}
                            <path
                                d="M32 14v32M32 20c4 0 8 2 8 6M32 28c-4 0-8 2-8 6"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            {/* Chat dots */}
                            <circle cx="28" cy="32" r="2" fill="white" />
                            <circle cx="32" cy="32" r="2" fill="white" />
                            <circle cx="36" cy="32" r="2" fill="white" />

                            <defs>
                                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff9800" />
                                    <stop offset="100%" stopColor="#f57c00" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Online indicator */}
                        <div className="online-indicator"></div>
                    </div>
                </button>
            </div>

            {/* Compact Chat Overlay */}
            {showCompact && (
                <div
                    className="chatbot-overlay"
                    onClick={handleOverlayClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="chatbot-title"
                >
                    <div className="chatbot-iframe-container">
                        {/* Header with Title and Close */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-content">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                                <span id="chatbot-title">Ayudost AI Assistant</span>
                            </div>
                            <button
                                className="chatbot-close-btn"
                                onClick={closeCompact}
                                aria-label="Close chatbot"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Iframe */}
                        <iframe
                            src={ayurUrl}
                            title="Ayudost AI Chatbot"
                            allow="microphone; clipboard-read; clipboard-write"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                            loading="lazy"
                        />
                    </div>
                </div>
            )}
        </>
    );
}