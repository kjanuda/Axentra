'use client';

import { useEffect, useState } from 'react';

export default function AreasOfFocus() {
  const [visibleCards, setVisibleCards] = useState([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('.focus-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const focusAreas = [
    {
      title: 'Design',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      description: 'A solid foundation on which high performance solutions are engineered with innovative functionalities; an end to end product development and industrial design solution.'
    },
    {
      title: 'Manufacture',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      description: 'Advanced manufacturing capabilities with precision engineering and quality control for all electronic vehicle components and systems.'
    },
    {
      title: 'Prototype',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
      description: 'Rapid prototyping services to bring your innovative ideas to life with cutting-edge technology and expert craftsmanship.'
    },
    {
      title: 'Software',
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80',
      description: 'Custom software solutions for EV management, IoT integration, and smart vehicle systems with user-friendly interfaces.'
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-white py-20 px-6 md:px-12 lg:px-20">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-600 tracking-wide">
          Our Areas Of Focus
        </h2>
      </div>

      {/* Grid of Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {focusAreas.map((area, index) => (
          <div
            key={area.title}
            data-index={index}
            className={`focus-card relative group overflow-hidden cursor-pointer transition-all duration-700 ${
              visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              height: index === 0 ? '400px' : '350px'
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay - darker on hover */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
            </div>

            {/* Yellow Border - Only on Design card */}
            {index === 0 && (
              <div className="absolute inset-0 border-[6px] border-[#D4FF00] pointer-events-none" />
            )}

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8">
              {/* Title */}
              <h3 className="text-4xl md:text-5xl font-light text-white mb-4 transition-all duration-300">
                {area.title}
              </h3>

              {/* Description - Only visible on hover */}
              <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100">
                <p className="text-white text-base leading-relaxed font-light max-w-md">
                  {area.description}
                </p>
              </div>
            </div>

            {/* Hover Effect Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D4FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        ))}
      </div>
    </section>
  );
}