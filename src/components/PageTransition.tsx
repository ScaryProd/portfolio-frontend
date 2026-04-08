import { useLocation, useOutlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./PageTransition.css";

export default function PageTransition() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [displayOutlet, setDisplayOutlet] = useState(currentOutlet);
  const [stage, setStage] = useState<"idle" | "out" | "in">("idle");
  const pendingOutlet = useRef(currentOutlet);
  const pendingLocation = useRef(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      pendingOutlet.current = currentOutlet;
      pendingLocation.current = location;
      setStage("out");
    }
  }, [location]);

  useEffect(() => {
    if (stage === "out") {
      const t = setTimeout(() => {
        setDisplayOutlet(pendingOutlet.current);
        setDisplayLocation(pendingLocation.current);
        setStage("in");
      }, 400);
      return () => clearTimeout(t);
    } else if (stage === "in") {
      const t = setTimeout(() => setStage("idle"), 400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <div className={`scanline-transition ${stage}`}>
      <div className="scanline-overlay" />
      <div className="scanline-content">{displayOutlet}</div>
    </div>
  );
}
