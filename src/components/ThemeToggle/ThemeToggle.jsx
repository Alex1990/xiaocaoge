import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ThemeToggle.css";

const OPTIONS = [
  { value: "system", label: "跟随系统", emoji: "🖥️" },
  { value: "light", label: "明亮", emoji: "☀️" },
  { value: "dark", label: "暗黑", emoji: "🌙" },
];

function getStoredTheme() {
  if (typeof window === "undefined") return "system";
  return localStorage.getItem("theme") || "system";
}

function applyTheme(theme) {
  if (typeof window === "undefined") return;
  if (theme === "system") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", theme);
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = theme === "system" ? (prefersDark ? "dark" : "light") : theme;
  document.documentElement.setAttribute("data-theme", resolved);
}

export default function ThemeToggle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (getStoredTheme() === "system") {
        const resolved = mq.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", resolved);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [mounted]);

  const handleSelect = useCallback((value) => {
    setTheme(value);
    applyTheme(value);
    setOpen(false);
  }, []);

  const current = OPTIONS.find((o) => o.value === theme) || OPTIONS[0];

  return (
    <div className="theme-toggle" ref={ref}>
      <button
        className="theme-toggle-btn"
        type="button"
        title="切换主题"
        onClick={() => setOpen(!open)}
      >
        {current.emoji}
      </button>
      <ul className={`theme-toggle-menu${open ? " open" : ""}`}>
        {OPTIONS.map((opt) => (
          <li key={opt.value}>
            <button
              type="button"
              className={`theme-toggle-option${theme === opt.value ? " active" : ""}`}
              onClick={() => handleSelect(opt.value)}
            >
              <span className="theme-toggle-emoji">{opt.emoji}</span>
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
