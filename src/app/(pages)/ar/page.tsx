"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";
import Loading from "@/components/layout/Loading";
import api from "@/lib/axios";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const AScene = (props: any) => React.createElement("a-scene", props);
const ACamera = (props: any) => React.createElement("a-camera", props);
const AEntity = (props: any) => React.createElement("a-entity", props);

// const poiRequirements = [10, 12, 14, 16, 18, 20, 22, 24, 14];
const poiRequirements = [6, 6, 6, 6, 6, 6, 6, 6, 6];
const MAX_VISIBLE_ROCKS = 1;

const Page = () => {
  const { user, refreshUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Progress");
  const t2 = useTranslations("gameText");

  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [points, setPoints] = useState(0);
  const [onLoadPoints, setOnLoadPoints] = useState(0);
  const [floatingRocks, setFloatingRocks] = useState<any[]>([]);
  const [eruptionParticles, setEruptionParticles] = useState<any[]>([]);

  const sceneRef = useRef<any>(null);
  const locale = useLocale();
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);
  const explosionAudioRef = useRef<HTMLAudioElement>(null);
  const eventListenersRef = useRef<
    Map<string, { click: () => void; touchstart: () => void }>
  >(new Map());
  const floatingRocksRef = useRef<any[]>([]);
  const rafRef = useRef<number | null>(null);
  const hasAutoPlayed = useRef(false);
  const hasInitialized = useRef(false);
  const navigationInProgress = useRef(false);
  
  // Add these new refs to track scene state
  const sceneInitializedRef = useRef(false);
  const rocksInitializedRef = useRef(false);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Move MAX_VISIBLE_ROCKS to a constant outside the component
  const MAX_VISIBLE_ROCKS = 10;

  // useEffect(() => {
  //   if (!lat || !lng) {
  //     router.back();
  //     return;
  //   }
  // }, [lat, lng, router]);

  useEffect(() => {
    if (hasInitialized.current) return;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setPermissionGranted(true);
      } catch {
        setPermissionGranted(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;

    const timer = setTimeout(() => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.loop = true;
        backgroundAudioRef.current.volume = 0.08;
        backgroundAudioRef.current.play().catch(() => { });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!onLoadPoints && user?.points) setOnLoadPoints(user.points);
  }, [user?.points]);

  // Optimized script loading - only run once
  useEffect(() => {
    if (!permissionGranted || scriptsLoaded || hasInitialized.current) return;

    const scriptClass = "ar-page-script";

    // Check if scripts are already loaded
    if ((window as any).AFRAME && (window as any).ARjs) {
      setScriptsLoaded(true);
      hasInitialized.current = true;
      return;
    }

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if ((window as any)._loadedScripts?.[src]) return resolve();
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();

        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.classList.add(scriptClass);
        s.dataset.pageScript = scriptClass;
        s.onload = () => {
          (window as any)._loadedScripts = {
            ...(window as any)._loadedScripts,
            [src]: true,
          };
          resolve();
        };
        s.onerror = () => reject();
        document.head.appendChild(s);
      });

    const loadAll = async () => {
      try {
        if (!(window as any).AFRAME) {
          await loadScript("https://aframe.io/releases/1.3.0/aframe.min.js");
          await loadScript(
            "https://raw.githack.com/AR-js-org/AR.js/3.4.5/aframe/build/aframe-ar.js"
          );
        }

        if (!(window as any).AFRAME.components['particle-system']) {
          await loadScript(
            "https://cdn.jsdelivr.net/npm/aframe-particle-system-component@1.1.3/dist/aframe-particle-system-component.min.js"
          );
        }
        
        setScriptsLoaded(true);
        hasInitialized.current = true;
      } catch (e) {
        console.error("AR page load failed", e);
        setScriptsLoaded(false);
      }
    };

    loadAll();
    
    // Cleanup function to prevent memory leaks
    return () => {
      // Don't remove scripts as they're needed for the scene
    };
  }, [permissionGranted]);

  // Keep ref in sync with state
  useEffect(() => {
    floatingRocksRef.current = floatingRocks;
  }, [floatingRocks]);

  // Initialize rocks only once when scripts are loaded
  useEffect(() => {
    if (!scriptsLoaded || rocksInitializedRef.current || floatingRocks.length > 0) return;

    spawnInitialRocks();
    rocksInitializedRef.current = true;
  }, [scriptsLoaded]);

  // Animation loop - optimized to not restart on every rock change
  useEffect(() => {
    if (!scriptsLoaded || !sceneRef.current || floatingRocks.length === 0) return;

    const sceneEl: any = sceneRef.current;

    // Only start animation if not already running
    if (rafRef.current) return;

    const loop = (time: number) => {
      const t = time * 0.001;
      floatingRocksRef.current.forEach((rock) => {
        if (!rock || rock.visible === false) return;
        const el = sceneEl.querySelector(`#${rock.id}`);
        if (!el || !el.object3D) return;

        const radius =
          rock.orbitRadius ??
          Math.sqrt(rock.position.x ** 2 + rock.position.z ** 2);
        const angle = (rock.baseAngle ?? 0) + t * (rock.angularSpeed ?? 0.6);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y =
          rock.initialY +
          Math.sin(t * (1 + (rock.angularSpeed ?? 0.6)) + (rock.phase ?? 0)) *
          rock.floatingRange;

        el.object3D.position.set(x, y, z);
        el.object3D.rotation.y += 0.01 + (rock.angularSpeed ?? 0.6) * 0.002;
      });
      rafRef.current = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(loop);
    };

    if (sceneEl.hasLoaded || sceneEl.isPlaying) {
      startAnimation();
    } else {
      sceneEl.addEventListener("loaded", startAnimation, { once: true });
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [scriptsLoaded]); // Only depend on scriptsLoaded, not floatingRocks

  // Event listeners - optimized to only update when necessary
  useEffect(() => {
    if (!scriptsLoaded || !sceneRef.current) return;

    const scene = sceneRef.current;
    
    // Clean up previous listeners
    eventListenersRef.current.forEach((listeners, rockId) => {
      const rockEl = scene.querySelector(`#${rockId}`);
      if (rockEl) {
        rockEl.removeEventListener("click", listeners.click);
        rockEl.removeEventListener("touchstart", listeners.touchstart);
      }
    });
    eventListenersRef.current.clear();

    // Add new listeners only for visible rocks
    floatingRocks.forEach((rock) => {
      if (rock.visible && !rock.disappearing) {
        const rockEl = scene.querySelector(`#${rock.id}`);
        if (rockEl) {
          const handleTap = () => handleRockTap(rock.id);
          const listeners = { click: handleTap, touchstart: handleTap };
          rockEl.addEventListener("click", handleTap);
          rockEl.addEventListener("touchstart", handleTap);
          eventListenersRef.current.set(rock.id, listeners);
        }
      }
    });
  }, [scriptsLoaded, floatingRocks]); // Only update when rocks change

  useEffect(() => {
    if (user?.POIsCompleted >= 0 && !hasAutoPlayed.current) {
      const handleFirstInteraction = () => {
        backgroundAudioRef.current?.play().catch(() => { });
        if (explosionAudioRef.current) {
          explosionAudioRef.current.play().catch(() => { });
          explosionAudioRef.current.pause();
          explosionAudioRef.current.currentTime = 0;
        }
        hasAutoPlayed.current = true;
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction, { once: true });
      window.addEventListener("touchstart", handleFirstInteraction, {
        once: true,
      });
    }
  }, [user, locale]);

  if (!user) return <Loading />;

  const POICompleted = user?.POIsCompleted ?? 0;

  const updatePoints = async (newPoints: any) => {
    try {
      await api.post("/user", { points: (onLoadPoints || 0) + newPoints });
      await refreshUser();
    } catch (err: any) {
      console.error("Failed to update:", err.response?.data || err.message);
    }
  };

  const spawnRock = (id?: string) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 8 + 3;
    const height = Math.random() * 3 + 1;
    const safeId =
      id ??
      `floating-rock-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

    return {
      id: safeId,
      position: { x: Math.cos(angle) * radius, y: height, z: Math.sin(angle) },
      scale: Math.random() * 0.002 + 0.006,
      rotation: {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI,
      },
      floatingRange: Math.random() * 0.1 + 0.05,
      initialY: height,
      visible: true,
      disappearing: false,
      orbitRadius: radius,
      baseAngle: angle,
      angularSpeed: Math.random() * 0.8 + 0.3,
      phase: Math.random() * Math.PI * 2,
      spinDuration: Math.floor(Math.random() * 5000) + 5000,
      spinDelay: Math.random() * 2000,
      orbitDuration: Math.floor(Math.random() * 10000) + 10000,
      orbitDelay: Math.random() * 3000,
      orbitTarget: {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 3 + 1,
        z: (Math.random() - 0.5) * 10,
      },
    };
  };

  const spawnInitialRocks = () => {
    const count = MAX_VISIBLE_ROCKS;
    setFloatingRocks(Array.from({ length: count }, () => spawnRock()));
  };

  const handleRockTap = (rockId: string) => {
    if (navigationInProgress.current) return;
    
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;
    
    const rockEl = sceneEl.querySelector(`#${rockId}`);
    if (!rockEl) return;

    // Play explosion sound
    if (explosionAudioRef.current) {
      explosionAudioRef.current.currentTime = 0;
      explosionAudioRef.current.play().catch(() => { });
    }

    const rockPos = rockEl.getAttribute("position");

    // Create explosion effects
    createExplosionEffects(sceneEl, rockPos);

    // Update rocks state - replace tapped rock with new one
    setFloatingRocks((prev) => {
      const updated = prev.filter((rock) => rock.id !== rockId);
      if (updated.length < MAX_VISIBLE_ROCKS) {
        updated.push(spawnRock());
      }
      return updated;
    });

    // Update points
    setPoints((prev) => {
      const newPoints = prev + 1;
      updatePoints(newPoints);
      
      // Check if POI requirement is met
      const poiReq = poiRequirements[POICompleted] || 8;
      if (poiReq && newPoints >= poiReq) {
        navigationInProgress.current = true;
        router.push(`/volcano/${(user?.POIsCompleted ?? 0) + 1}`);
      }
      return newPoints;
    });
  };

  // Extract explosion effects to separate function
  const createExplosionEffects = (sceneEl: any, rockPos: any) => {
    // Irregular shape particles
    for (let i = 0; i < 2; i++) {
      const particle = document.createElement("a-entity");
      const shapes = ["tetrahedron", "dodecahedron", "octahedron"];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      particle.setAttribute(
        "geometry",
        `primitive: ${shape}; radius: 0.08; detail: ${Math.floor(Math.random() * 2)}`
      );
      particle.setAttribute(
        "material",
        `color: #000000; metalness: 0; roughness: 1; flatShading: true; opacity: 1; transparent: false`
      );
      particle.setAttribute(
        "position",
        `${rockPos.x + (Math.random() - 0.5) * 0.5} ${rockPos.y} ${rockPos.z + (Math.random() - 0.5) * 0.5}`
      );
      particle.object3D.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      particle.setAttribute(
        "animation",
        `property: position; to: ${rockPos.x + (Math.random() - 0.5) * 1} ${rockPos.y + Math.random() * 2} ${rockPos.z + (Math.random() - 0.5) * 1}; dur: 800; easing: easeOutCubic`
      );
      particle.setAttribute(
        "animation__fade",
        `property: material.opacity; from: 1; to: 0; dur: 800; easing: linear`
      );

      sceneEl.appendChild(particle);
      particle.addEventListener("animationcomplete__fade", () => {
        particle.isConnected && particle.remove();
      });
    }

    // Flash effect
    const flash = document.createElement("a-entity");
    flash.setAttribute("geometry", "primitive: sphere; radius: 0.5");
    flash.setAttribute(
      "material",
      "color: black; emissive: #000000; opacity: 0.1; transparent: true"
    );
    flash.setAttribute("position", rockPos);
    flash.setAttribute(
      "animation",
      "property: scale; from: 0.2 0.2 0.2; to: 2 2 2; dur: 200; easing: easeOutQuad;"
    );
    flash.setAttribute(
      "animation__fade",
      "property: material.opacity; from: 0.1; to: 0; dur: 200; delay: 100; easing: easeOutQuad;"
    );
    sceneEl.appendChild(flash);
    setTimeout(() => flash.isConnected && flash.remove(), 400);

    // Debris particles
    const debris = document.createElement("a-entity");
    debris.setAttribute(
      "particle-system",
      `particleCount: 150; color: #888, #555, #333; size: 0.2; sizeRandomness: 0.5; velocityValue: 0 2 0; velocitySpread: 2 2 2; opacity: 1; opacityRandomness: 0.3; duration: 1;`
    );
    debris.setAttribute("position", rockPos);
    sceneEl.appendChild(debris);
    setTimeout(() => debris.isConnected && debris.remove(), 1200);
  };

  if (!permissionGranted) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white w-full">
        <p>⚠️ {t2("cameraPermission")}</p>
        <button
          onClick={async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
              stream.getTracks().forEach(track => track.stop());
              setPermissionGranted(true);
            } catch {
              setPermissionGranted(false);
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t2("try_again")}
        </button>
      </div>
    );
  }

  if (!scriptsLoaded) return <Loading />;

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <style jsx>{`
        .floating-rock {
          animation: rockAppear 2s ease-out forwards;
        }
        .floating-rock.disappearing {
          animation: rockDisappear 1.5s ease-in forwards;
        }
        a-cursor, .a-canvas .a-cursor {
          display: none !important;
          visibility: hidden !important;
        }
        @keyframes particleRise {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--x), var(--y)) scale(0.2); opacity: 0; }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .eruption {
          position: fixed;
          pointer-events: none;
          z-index: 1002;
        }
      `}</style>

      <audio
        ref={backgroundAudioRef}
        src="/sounds/background-music.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
      <audio
        ref={explosionAudioRef}
        src="/sounds/explosion.mp3"
        preload="auto"
        style={{ display: "none" }}
      />

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "10px 15px",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          zIndex: 1000,
          border: "2px solid #ff6b35",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        {t("title5")}: {user?.points}
      </div>

      {/* Only create AScene once - key prop ensures it doesn't remount */}
      <AScene
        key="ar-scene" // Important: This prevents remounting
        ref={sceneRef}
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true; logarithmicDepthBuffer: true"
        system="rendererConfiguration: { logarithmicDepthBuffer: true }"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ACamera
          id="camera"
          listener
          rotation-reader
          look-controls="reverseMouseDrag:true; touchEnabled: false;"
          cursor="fuse: false; rayOrigin: mouse; visible: false;"
          raycaster="objects: .floating-rock; showLine: false"
        />

        {floatingRocks.map((rock) => (
          <AEntity
            key={rock.id} // Stable keys prevent remounting
            id={rock.id}
            gltf-model="url(/Rock.glb)"
            position={`${rock.position.x} ${rock.position.y} ${rock.position.z}`}
            scale={`${rock.scale} ${rock.scale} ${rock.scale}`}
            rotation={`${rock.rotation.x} ${rock.rotation.y} ${rock.rotation.z}`}
            visible={rock.visible && !rock.disappearing}
            className={`floating-rock ${rock.disappearing ? "disappearing" : ""}`}
            animation__spin={`
              property: rotation;
              to: ${Math.random() > 0.5 ? "0 360 0" : "360 0 0"};
              loop: true;
              dur: ${rock.spinDuration};
              easing: linear;
              delay: ${rock.spinDelay};
            `}
            animation__orbit={`
              property: position;
              dir: alternate;
              loop: true;
              to: ${rock.orbitTarget.x} ${rock.orbitTarget.y} ${rock.orbitTarget.z};
              dur: ${rock.orbitDuration};
              easing: linear;
              delay: ${rock.orbitDelay};
            `}
          />
        ))}
      </AScene>
    </div>
  );
};


export default Page;