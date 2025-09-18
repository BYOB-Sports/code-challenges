import React from 'react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = ['rgba(180, 83, 246, 0.35)', 'rgba(59, 130, 246, 0.35)', 'rgba(16, 185, 129, 0.35)', 'rgba(244, 114, 182, 0.35)', 'rgba(250, 204, 21, 0.25)'],
  className,
  style,
  ...props
}) {
  const background = Array.isArray(shineColor) ? shineColor.join(',') : shineColor;
  const computedStyle = {
    '--border-width': `${borderWidth}px`,
    '--duration': `${duration}s`,
    backgroundImage: `radial-gradient(transparent,transparent, ${background},transparent,transparent)`,
    backgroundSize: '600% 600%',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    padding: 'var(--border-width)',
    animationDuration: `var(--duration)`,
    ...style
  };

  return (
    <div
      style={computedStyle}
      className={cx('shine-border animate-shine', className)}
      {...props}
    />
  );
}


