import React, { useEffect, useRef, useState } from "react";
import "./Lightbox.css";

const MIN_SCALE = 0.5;
const MAX_SCALE = 8;
const ZOOM_STEP = 1.1;
const DOUBLE_CLICK_SCALE = 2.5;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function Lightbox() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const badgeRef = useRef(null);
  const stateRef = useRef({ scale: 1, tx: 0, ty: 0 });
  const pointersRef = useRef(new Map());
  const lastPinchRef = useRef(null);

  const applyTransform = () => {
    const img = imgRef.current;
    if (!img) return;
    const { scale, tx, ty } = stateRef.current;
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    if (badgeRef.current) {
      badgeRef.current.textContent = `${Math.round(scale * 100)}%`;
    }
  };

  const clampTranslate = () => {
    const img = imgRef.current;
    if (!img) return;
    const s = stateRef.current;
    const halfWidth = (img.clientWidth * s.scale) / 2;
    const halfHeight = (img.clientHeight * s.scale) / 2;
    const limitX = Math.max(0, halfWidth - window.innerWidth / 2 + 100);
    const limitY = Math.max(0, halfHeight - window.innerHeight / 2 + 100);
    s.tx = clamp(s.tx, -limitX, limitX);
    s.ty = clamp(s.ty, -limitY, limitY);
  };

  const zoomAt = (clientX, clientY, factor) => {
    const img = imgRef.current;
    if (!img) return;
    const s = stateRef.current;
    const next = clamp(s.scale * factor, MIN_SCALE, MAX_SCALE);
    const f = next / s.scale;
    const cxr = clientX - (window.innerWidth / 2 + s.tx);
    const cyr = clientY - (window.innerHeight / 2 + s.ty);
    s.scale = next;
    s.tx += cxr * (1 - f);
    s.ty += cyr * (1 - f);
    clampTranslate();
    applyTransform();
  };

  const close = () => {
    setOpen(false);
    setSrc("");
    setLoaded(false);
    pointersRef.current.clear();
    lastPinchRef.current = null;
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.button !== 0) return;
      const img = e.target.closest(".post-entry img");
      if (!img) return;
      e.preventDefault();
      setSrc(img.currentSrc || img.src);
      setLoaded(false);
      setOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    stateRef.current = { scale: 1, tx: 0, ty: 0 };
    pointersRef.current.clear();
    lastPinchRef.current = null;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = overlayRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      zoomAt(e.clientX, e.clientY, factor);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  const handleLoad = () => {
    setLoaded(true);
    clampTranslate();
    applyTransform();
  };

  const handleDoubleClick = (e) => {
    const s = stateRef.current;
    const target = s.scale > 1.5 ? 1 : DOUBLE_CLICK_SCALE;
    zoomAt(e.clientX, e.clientY, target / s.scale);
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    const s = stateRef.current;
    const p = pointersRef.current.get(e.pointerId);
    if (!p) return;
    if (pointersRef.current.size >= 2) {
      p.x = e.clientX;
      p.y = e.clientY;
      const pts = [...pointersRef.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      const last = lastPinchRef.current;
      lastPinchRef.current = { dist, midX, midY };
      if (last && last.dist > 0) {
        zoomAt(midX, midY, dist / last.dist);
        s.tx += midX - last.midX;
        s.ty += midY - last.midY;
        clampTranslate();
        applyTransform();
      }
    } else {
      lastPinchRef.current = null;
      s.tx += e.clientX - p.x;
      s.ty += e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      clampTranslate();
      applyTransform();
    }
  };

  const handlePointerEnd = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size === 0) {
      lastPinchRef.current = null;
      setDragging(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className={open ? "lightbox open" : "lightbox"}
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <button type="button" className="lightbox-close" onClick={close} aria-label="关闭预览">
        &times;
      </button>
      {src ? (
        <img
          ref={imgRef}
          className={dragging ? "lightbox-img dragging" : "lightbox-img"}
          src={src}
          alt=""
          draggable={false}
          onLoad={handleLoad}
          onError={() => setLoaded(true)}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={handleDoubleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        />
      ) : null}
      {src && !loaded ? <span className="lightbox-loading">加载中&hellip;</span> : null}
      <span ref={badgeRef} className="lightbox-scale">
        100%
      </span>
    </div>
  );
}

export default Lightbox;
