// src/components/FiveElementsCycle.tsx
import React, { useState, useMemo, useRef } from 'react';

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ElementData {
  id: string;
  name: string;
  chineseName: string;
  color: string;
  hoverColor: string;
  borderColor: string;
  textColor: string;
  x: number;
  y: number;
  organ: string;
  trait: string;
  emotion: string;
  season: string;
}

const elements: ElementData[] = [
  {
    id: 'wood',
    name: 'Wood',
    chineseName: '木 (Mù)',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    borderColor: 'border-green-600',
    textColor: 'text-green-800',
    x: 0.50,
    y: 0.15,
    organ: 'Liver',
    trait: 'Growth & Flexibility',
    emotion: 'Anger',
    season: 'Spring'
  },
  {
    id: 'fire',
    name: 'Fire',
    chineseName: '火 (Huǒ)',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    borderColor: 'border-red-600',
    textColor: 'text-red-800',
    x: 0.85,
    y: 0.35,
    organ: 'Heart',
    trait: 'Warmth & Transformation',
    emotion: 'Joy',
    season: 'Summer'
  },
  {
    id: 'earth',
    name: 'Earth',
    chineseName: '土 (Tǔ)',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-800',
    x: 0.75,
    y: 0.85,
    organ: 'Spleen',
    trait: 'Nourishment & Stability',
    emotion: 'Worry',
    season: 'Late Summer'
  },
  {
    id: 'metal',
    name: 'Metal',
    chineseName: '金 (Jīn)',
    color: 'bg-gray-400',
    hoverColor: 'hover:bg-gray-500',
    borderColor: 'border-gray-600',
    textColor: 'text-gray-800',
    x: 0.15,
    y: 0.65,
    organ: 'Lung',
    trait: 'Purification & Structure',
    emotion: 'Grief',
    season: 'Autumn'
  },
  {
    id: 'water',
    name: 'Water',
    chineseName: '水 (Shuǐ)',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-800',
    x: 0.25,
    y: 0.85,
    organ: 'Kidney',
    trait: 'Flow & Conservation',
    emotion: 'Fear',
    season: 'Winter'
  }
];

const relationships = {
  generation: [
    { from: 'water', to: 'wood',  label: 'Water nourishes Wood' },
    { from: 'wood',  to: 'fire',  label: 'Wood feeds Fire' },
    { from: 'fire',  to: 'earth', label: 'Fire creates Earth (ash)' },
    { from: 'earth', to: 'metal', label: 'Earth produces Metal' },
    { from: 'metal', to: 'water', label: 'Metal collects Water' }
  ],
  control: [
    { from: 'wood',  to: 'earth', label: 'Wood controls Earth (roots)' },
    { from: 'earth', to: 'water', label: 'Earth controls Water (dams)' },
    { from: 'water', to: 'fire',  label: 'Water controls Fire' },
    { from: 'fire',  to: 'metal', label: 'Fire controls Metal (melts)' },
    { from: 'metal', to: 'wood',  label: 'Metal controls Wood (cuts)' }
  ]
};

const FiveElementsCycle: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeCycle,   setActiveCycle]   = useState<'generation' | 'control' | null>(null);
  const [isAnimating,   setIsAnimating]   = useState(false);
  const cycleRef = useRef<HTMLDivElement>(null);

  const activeRelationships = useMemo(() => {
    if (activeCycle) {
      return relationships[activeCycle];
    }
    if (activeElement) {
      return [
        ...relationships.generation.filter(
          (r) => r.from === activeElement || r.to === activeElement
        ),
        ...relationships.control.filter(
          (r) => r.from === activeElement || r.to === activeElement
        )
      ];
    }
    return [];
  }, [activeElement, activeCycle]);

  const isRelationshipActive = (from: string, to: string) =>
    activeRelationships.some(
      (r) =>
        (r.from === from && r.to === to) ||
        (r.from === to && r.to === from)
    );

  const getRelationshipType = (from: string, to: string) => {
    if (
      relationships.generation.some((r) => r.from === from && r.to === to)
    ) {
      return 'generation';
    }
    if (
      relationships.control.some((r) => r.from === from && r.to === to)
    ) {
      return 'control';
    }
    return null;
  };

  const handleElementClick = (id: string) => {
    if (isAnimating) return;
    setActiveElement((prev) => (prev === id ? null : id));
    setActiveCycle(null);
  };

  const demonstrateCycle = (cycle: 'generation' | 'control') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveCycle(cycle);
    setActiveElement(null);

    const sequence = relationships[cycle];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < sequence.length) {
        setActiveElement(sequence[idx].from);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
          setActiveCycle(null);
          setActiveElement(null);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Five Elements Cycle
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ─ Diagram ─ */}
        <div className="w-full md:w-3/5">
          <div
            className="relative aspect-square mx-auto max-w-md"
            ref={cycleRef}
          >
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    className="fill-current stroke-current"
                  />
                </marker>
              </defs>

              {/* Generation pentagon */}
              <path
                d="M50,8 L92,35 L76,92 L24,92 L8,35 Z"
                fill="none"
                stroke="#4B5563"
                strokeWidth="1"
                className={classNames(
                  'transition-opacity duration-300',
                  activeCycle === 'control' ? 'opacity-20' : 'opacity-70'
                )}
                vectorEffect="non-scaling-stroke"
              />

              {/* Control star */}
              <path
                d="M50,8 L76,92 L8,35 L92,35 L24,92 Z"
                fill="none"
                stroke="#9333EA"
                strokeWidth="1"
                strokeDasharray="5,5"
                className={classNames(
                  'transition-opacity duration-300',
                  activeCycle === 'generation' ? 'opacity-20' : 'opacity-70'
                )}
                vectorEffect="non-scaling-stroke"
              />

              {/* Highlighted arrows */}
              {activeRelationships.map((rel) => {
                const from = elements.find((e) => e.id === rel.from)!;
                const to   = elements.find((e) => e.id === rel.to)!;
                const x1 = from.x * 100;
                const y1 = from.y * 100;
                const x2 = to.x   * 100;
                const y2 = to.y   * 100;
                const type = getRelationshipType(rel.from, rel.to);
                const strokeClass =
                  type === 'generation'
                    ? from.color.replace('bg-', 'stroke-').replace('500', '700')
                    : 'stroke-purple-700';

                return (
                  <line
                    key={`${rel.from}-${rel.to}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    className={classNames(strokeClass, 'transition-opacity duration-300')}
                  />
                );
              })}
            </svg>

            {/* Element circles */}
            {elements.map((el) => (
              <div
                key={el.id}
                role="button"
                tabIndex={0}
                onClick={() => handleElementClick(el.id)}
                onKeyPress={(e) => e.key === 'Enter' && handleElementClick(el.id)}
                className={classNames(
                  'absolute w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center text-white cursor-pointer',
                  el.color,
                  el.hoverColor,
                  activeElement === el.id ? `ring-4 ring-offset-2 ${el.borderColor}` : '',
                  activeElement && activeElement !== el.id && !isRelationshipActive(activeElement, el.id)
                    ? 'opacity-40'
                    : 'opacity-100'
                )}
                style={{ top: `${el.y * 100}%`, left: `${el.x * 100}%` }}
                aria-label={`${el.name} element`}
              >
                <span className="font-bold text-sm">{el.name}</span>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => demonstrateCycle('generation')}
              disabled={isAnimating}
              className={classNames(
                'px-4 py-2 rounded-md text-sm font-medium',
                activeCycle === 'generation' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                isAnimating && 'opacity-50 cursor-not-allowed'
              )}
            >
              Show Generation Cycle
            </button>
            <button
              onClick={() => demonstrateCycle('control')}
              disabled={isAnimating}
              className={classNames(
                'px-4 py-2 rounded-md text-sm font-medium',
                activeCycle === 'control' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                isAnimating && 'opacity-50 cursor-not-allowed'
              )}
            >
              Show Control Cycle
            </button>
          </div>
        </div>

        {/* Details panel */}
        <div className="w-full md:w-2/5">
          {activeElement ? (
            elements
              .filter((e) => e.id === activeElement)
              .map((el) => (
                <div
                  key={el.id}
                  className={classNames('p-4 rounded-lg h-full border', el.borderColor)}
                >
                  <h3 className={classNames('text-lg font-semibold', el.textColor)}>
                    {el.name} Element
                  </h3>
                  <p className="text-sm text-gray-600">{el.chineseName}</p>

                  <div className="mt-4 space-y-2 text-gray-800">
                    <div><strong>Organ:</strong> {el.organ}</div>
                    <div><strong>Trait:</strong> {el.trait}</div>
                    <div><strong>Emotion:</strong> {el.emotion}</div>
                    <div><strong>Season:</strong> {el.season}</div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Active Relationships:</h4>
                    <ul className="text-sm space-y-2">
                      {relationships.generation
                        .filter((r) => r.from === el.id || r.to === el.id)
                        .map((r, i) => {
                          const other = elements.find(
                            (o) => o.id === (r.from === el.id ? r.to : r.from)
                          )!;
                          const isFrom = r.from === el.id;
                          return (
                            <li key={i} className="flex items-center">
                              <span className={classNames('w-3 h-3 rounded-full mr-2', other.color)} />
                              {isFrom ? (
                                <>
                                  <strong className={el.textColor}>{el.name}</strong> nourishes <strong className={other.textColor}>{other.name}</strong>
                                </>
                              ) : (
                                <>
                                  <strong className={other.textColor}>{other.name}</strong> nourishes <strong className={el.textColor}>{el.name}</strong>
                                </>
                              )}
                            </li>
                          );
                        })}

                      {relationships.control
                        .filter((r) => r.from === el.id || r.to === el.id)
                        .map((r, i) => {
                          const other = elements.find(
                            (o) => o.id === (r.from === el.id ? r.to : r.from)
                          )!;
                          const isFrom = r.from === el.id;
                          return (
                            <li key={i} className="flex items-center">
                              <span className={classNames('w-3 h-3 rounded-full mr-2', other.color)} />
                              {isFrom ? (
                                <>
                                  <strong className={el.textColor}>{el.name}</strong> controls <strong className={other.textColor}>{other.name}</strong>
                                </>
                              ) : (
                                <>
                                  <strong className={other.textColor}>{other.name}</strong> controls <strong className={el.textColor}>{el.name}</strong>
                                </>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              ))
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">The Five Elements Theory</h3>
              <p className="text-gray-700 mb-4">
                The Five Elements describe how energy flows in nature and the body, with each element representing a system of organs, emotions, and more.
              </p>
              <h4 className="font-medium text-gray-900 mb-1">Cycles of Relationship:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li><strong>Generation Cycle:</strong> Each element nourishes the next in sequence.</li>
                <li><strong>Control Cycle:</strong> Each element keeps another in check.</li>
              </ul>
              <p className="text-gray-700 mt-4 text-sm italic">
                Click an element above to view its details, or use the buttons to animate each cycle.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiveElementsCycle;