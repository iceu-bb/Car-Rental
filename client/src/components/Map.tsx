import React, { useEffect, useRef } from 'react';

interface Props {
  options?: any;
  onMount?: any;
  className?: any;
}

export const Map: React.FC<Props> = ({ options, onMount, className }) => {
  const ref = useRef() as any;

  useEffect(() => {
    const onLoad = () => {
      const map = new window.google.maps.Map(ref.current, options);
      if (typeof onMount === `function`) onMount(map);
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [onMount, options]);

  return (
    <div
      style={{ height: `60vh`, margin: `1em 0 3em`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  );
};
