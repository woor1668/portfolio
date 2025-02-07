import { useEffect, useState } from "react";

const useVisibilityObserver = (refs, threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(
    Object.keys(refs).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  useEffect(() => {
    const observerOptions = { threshold: threshold };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        Object.keys(refs).forEach((key) => {
          if (entry.target === refs[key].current && entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        });
      });
    }, observerOptions);

    Object.values(refs).forEach((ref) => observer.observe(ref.current));

    return () => observer.disconnect();
  }, [refs]);

  return isVisible;
};

export default useVisibilityObserver;