const MarqueeSection = () => {
  const items = ["TECHNICAL EVENTS", "NON-TECHNICAL EVENTS", "PROJECT EXPO", "WORKSHOPS"];
  const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <section className="py-20 overflow-hidden bg-black/30 backdrop-blur-sm relative z-20" style={{
      maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
    }}>
      <div className="marquee-container py-4">
        <div className="marquee-text flex items-center gap-8">
          {repeatedItems.map((item, index) => (
            <span key={index} className="flex items-center gap-8">
              <span className="text-2xl md:text-4xl font-bold font-display uppercase tracking-widest text-white">
                {item}
              </span>
              <span className="text-white text-xl md:text-3xl animate-pulse">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;

