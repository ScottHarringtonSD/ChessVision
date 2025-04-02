import React, { useEffect, useState } from "react";
import "../App.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

function HomePage() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container: Container | undefined): Promise<void> => {
    return new Promise<void>((resolve) => {
      console.log(container);
      resolve();
    });
  };
  return (
    <div className=" w-full absolute ">
      <div className=" max-w-4xl mx-auto flex justify-center p-6 pt-10 items-center mt-10">
        <div className="text-center">
          <h1 className="text-9xl text-emerald-50">Chess Vision</h1>
          <p className="text-4xl text-emerald-50 p-2">
            The ultimate blindofld chess training site
          </p>
        </div>
      </div>
      {init && (
        <Particles
          className="particles-bg overflow-hidden max-w-screen max-h-screen"
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#000",
              },
              opacity: 0,
              position: "center",
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 10,
                },
              },
            },
            particles: {
              color: {
                value: "#047857",
              },
              links: {
                color: "#064e3b",
                distance: 200,
                enable: false,
                opacity: 0.5,
                width: 3,
              },
              move: {
                direction: "bottom",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: 0.8,
                straight: false,
                angle: {
                  offset: 0,
                  value: 90,
                },
              },
              number: {
                density: {
                  enable: false,
                },
                value: 40,
              },
              opacity: {
                value: 0.9,
              },
              shape: {
                type: "square",
              },
              size: {
                value: { min: 20, max: 20 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
}

export default HomePage;
