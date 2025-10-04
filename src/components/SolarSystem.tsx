import React from 'react';

export const SolarSystem: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className ?? 'w-full h-full'}>
      {/* model-viewer loads files from the public/ directory by absolute path */}
      <model-viewer
        src="/solar_system_animation/scene.gltf"
        alt="Solar system model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        interaction-prompt="none"
        exposure="1"
        camera-orbit="-120deg 55deg 2.2m"
        camera-target="0m 0.05m 0m"
        field-of-view="24deg"
        // Ensure the element fills the container and hide the cursor
        style={{ width: '100%', height: '100%', background: 'transparent', display: 'block', cursor: 'none', pointerEvents: 'none', touchAction: 'none' }}
      ></model-viewer>
    </div>
  );
};

