import React, { useState, useEffect, useRef } from 'react';

const FiveElementsCycle: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeCycle, setActiveCycle] = useState<'generation' | 'control' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cycleRef = useRef<HTMLDivElement>(null);
  
  const elements = [
    { 
      id: 'wood', 
      name: 'Wood', 
      chineseName: '木 (Mù)', 
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      textColor: 'text-green-800',
      borderColor: 'border-green-600',
      position: 'top-[15%] left-[50%] -translate-x-1/2',
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
      textColor: 'text-red-800',
      borderColor: 'border-red-600',
      position: 'top-[35%] right-[15%]',
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
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-600',
      position: 'bottom-[15%] right-[25%]',
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
      textColor: 'text-gray-800',
      borderColor: 'border-gray-600',
      position: 'bottom-[35%] left-[15%]',
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
      textColor: 'text-blue-800',
      borderColor: 'border-blue-600',
      position: 'bottom-[15%] left-[25%]',
      organ: 'Kidney',
      trait: 'Flow & Conservation',
      emotion: 'Fear',
      season: 'Winter'
    }
  ];

  // Define the relationships between elements
  const relationships = {
    generation: [
      { from: 'water', to: 'wood', label: 'Water nourishes Wood' },
      { from: 'wood', to: 'fire', label: 'Wood feeds Fire' },
      { from: 'fire', to: 'earth', label: 'Fire creates Earth (ash)' },
      { from: 'earth', to: 'metal', label: 'Earth produces Metal' },
      { from: 'metal', to: 'water', label: 'Metal collects Water' },
    ],
    control: [
      { from: 'wood', to: 'earth', label: 'Wood controls Earth (roots)' },
      { from: 'earth', to: 'water', label: 'Earth controls Water (dams)' },
      { from: 'water', to: 'fire', label: 'Water controls Fire' },
      { from: 'fire', to: 'metal', label: 'Fire controls Metal (melts)' },
      { from: 'metal', to: 'wood', label: 'Metal controls Wood (cuts)' },
    ]
  };

  // Function to demonstrate cycle animation
  const demonstrateCycle = (cycle: 'generation' | 'control') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveCycle(cycle);
    setActiveElement(null);
    
    const cycleRelationships = relationships[cycle];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < cycleRelationships.length) {
        setActiveElement(cycleRelationships[currentIndex].from);
        currentIndex++;
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

  // Handle element click
  const handleElementClick = (elementId: string) => {
    if (isAnimating) return;
    
    if (activeElement === elementId) {
      setActiveElement(null);
    } else {
      setActiveElement(elementId);
      setActiveCycle(null);
    }
  };

  // Get active relationships based on selected element or cycle
  const getActiveRelationships = () => {
    if (activeCycle) {
      return relationships[activeCycle];
    }
    
    if (activeElement) {
      return [
        ...relationships.generation.filter(rel => rel.from === activeElement || rel.to === activeElement),
        ...relationships.control.filter(rel => rel.from === activeElement || rel.to === activeElement)
      ];
    }
    
    return [];
  };

  // Check if a relationship is active
  const isRelationshipActive = (from: string, to: string) => {
    return getActiveRelationships().some(rel => 
      (rel.from === from && rel.to === to) || 
      (rel.from === to && rel.to === from)
    );
  };

  // Get relationship type (generation or control)
  const getRelationshipType = (from: string, to: string) => {
    if (relationships.generation.some(rel => rel.from === from && rel.to === to)) {
      return 'generation';
    }
    if (relationships.control.some(rel => rel.from === from && rel.to === to)) {
      return 'control';
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">Five Elements Cycle</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Interactive Diagram */}
        <div className="w-full md:w-3/5">
          <div className="relative aspect-square mx-auto max-w-md" ref={cycleRef}>
            {/* Pentagon outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 border-2 border-gray-200 rounded-full"></div>
            </div>
            
            {/* Element circles */}
            {elements.map((element) => (
              <div 
                key={element.id}
                className={`absolute w-16 h-16 rounded-full ${element.color} ${element.hoverColor} cursor-pointer 
                  transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 
                  flex items-center justify-center z-10
                  ${activeElement === element.id ? 'ring-4 ring-offset-2 ring-' + element.color.replace('bg-', '') : ''}
                  ${activeElement && activeElement !== element.id && !isRelationshipActive(activeElement, element.id) ? 'opacity-40' : 'opacity-100'}
                `}
                style={{ 
                  [element.position.split(' ')[0]]: element.position.split(' ')[0].includes('top') || element.position.split(' ')[0].includes('bottom') ? element.position.split(' ')[0].split('-')[1] : '50%',
                  [element.position.split(' ')[1].split('-')[0]]: element.position.split(' ')[1].includes('left') || element.position.split(' ')[1].includes('right') ? element.position.split(' ')[1].split('-')[1] : '50%',
                }}
                onClick={() => handleElementClick(element.id)}
              >
                <span className="font-bold text-white text-sm">{element.name}</span>
              </div>
            ))}
            
            {/* Relationship lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Generation cycle (outer pentagon) */}
              <path 
                d="M 50,15 L 85,35 L 75,85 L 25,85 L 15,35 Z" 
                fill="none" 
                stroke="#4B5563" 
                strokeWidth="1"
                strokeDasharray={activeCycle === 'control' ? "4,4" : "none"}
                className={`transform-gpu transition-opacity duration-300 ${
                  activeCycle === 'control' || (activeElement && !relationships.generation.some(
                    rel => rel.from === activeElement || rel.to === activeElement
                  )) ? 'opacity-20' : 'opacity-70'
                }`}
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Control cycle (inner star) */}
              <path 
                d="M 50,15 L 75,85 L 15,35 L 85,35 L 25,85 Z" 
                fill="none" 
                stroke="#9333EA" 
                strokeWidth="1"
                strokeDasharray="5,5"
                className={`transform-gpu transition-opacity duration-300 ${
                  activeCycle === 'generation' || (activeElement && !relationships.control.some(
                    rel => rel.from === activeElement || rel.to === activeElement
                  )) ? 'opacity-20' : 'opacity-70'
                }`}
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Highlight active relationships with arrows */}
              {getActiveRelationships().map((rel, index) => {
                const fromElement = elements.find(e => e.id === rel.from);
                const toElement = elements.find(e => e.id === rel.to);
                
                if (!fromElement || !toElement) return null;
                
                // Extract positions for start and end points
                const fromPos = {
                  top: fromElement.position.includes('top') ? 
                    parseFloat(fromElement.position.split('top-[')[1].split('%')[0]) / 100 : 
                    fromElement.position.includes('bottom') ? 
                      1 - parseFloat(fromElement.position.split('bottom-[')[1].split('%')[0]) / 100 : 
                      0.5,
                  left: fromElement.position.includes('left') ? 
                    parseFloat(fromElement.position.split('left-[')[1].split('%')[0]) / 100 : 
                    fromElement.position.includes('right') ? 
                      1 - parseFloat(fromElement.position.split('right-[')[1].split('%')[0]) / 100 : 
                      0.5
                };
                
                const toPos = {
                  top: toElement.position.includes('top') ? 
                    parseFloat(toElement.position.split('top-[')[1].split('%')[0]) / 100 : 
                    toElement.position.includes('bottom') ? 
                      1 - parseFloat(toElement.position.split('bottom-[')[1].split('%')[0]) / 100 : 
                      0.5,
                  left: toElement.position.includes('left') ? 
                    parseFloat(toElement.position.split('left-[')[1].split('%')[0]) / 100 : 
                    toElement.position.includes('right') ? 
                      1 - parseFloat(toElement.position.split('right-[')[1].split('%')[0]) / 100 : 
                      0.5
                };
                
                // Calculate path with adjustments
                const fromX = fromPos.left * 100;
                const fromY = fromPos.top * 100;
                const toX = toPos.left * 100;
                const toY = toPos.top * 100;
                
                // Get relationship type color
                const relationshipType = getRelationshipType(rel.from, rel.to);
                const color = relationshipType === 'generation' ? fromElement.color.replace('bg-', 'stroke-').replace('500', '700') : 'stroke-purple-700';
                
                return (
                  <g key={`${rel.from}-${rel.to}`} className="animate-fadeIn">
                    {/* Line */}
                    <line 
                      x1={fromX} 
                      y1={fromY} 
                      x2={toX} 
                      y2={toY} 
                      className={color}
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" className={color} />
                      </marker>
                    </defs>
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Cycle controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => demonstrateCycle('generation')}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCycle === 'generation' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Show Generation Cycle
            </button>
            <button
              onClick={() => demonstrateCycle('control')}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCycle === 'control' 
                  ? 'bg-purple-700 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Show Control Cycle
            </button>
          </div>
        </div>
        
        {/* Element details */}
        <div className="w-full md:w-2/5">
          {activeElement ? (
            <div className="animate-fadeIn h-full">
              {elements.filter(e => e.id === activeElement).map(element => (
                <div key={element.id} className={`p-4 rounded-lg border ${element.borderColor} h-full`}>
                  <h3 className={`text-lg font-semibold ${element.textColor}`}>{element.name} Element</h3>
                  <p className="text-sm text-taupe">{element.chineseName}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div>
                      <span className="font-medium">Organ:</span> 
                      <span className="ml-2">{element.organ}</span>
                    </div>
                    <div>
                      <span className="font-medium">Characteristic:</span> 
                      <span className="ml-2">{element.trait}</span>
                    </div>
                    <div>
                      <span className="font-medium">Emotion:</span> 
                      <span className="ml-2">{element.emotion}</span>
                    </div>
                    <div>
                      <span className="font-medium">Season:</span> 
                      <span className="ml-2">{element.season}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Active Relationships:</h4>
                    <ul className="text-sm space-y-3">
                      {relationships.generation
                        .filter(rel => rel.from === element.id || rel.to === element.id)
                        .map((rel, index) => {
                          const otherElement = elements.find(e => 
                            e.id === (rel.from === element.id ? rel.to : rel.from)
                          );
                          if (!otherElement) return null;
                          
                          const isFromThisElement = rel.from === element.id;
                          const relationshipColor = otherElement.textColor;
                          
                          return (
                            <li key={`gen-${index}`} className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${otherElement.color}`}></div>
                              <span>
                                {isFromThisElement ? (
                                  <><span className={element.textColor}>{element.name}</span> nourishes <span className={relationshipColor}>{otherElement.name}</span></>
                                ) : (
                                  <><span className={relationshipColor}>{otherElement.name}</span> nourishes <span className={element.textColor}>{element.name}</span></>
                                )}
                              </span>
                            </li>
                          );
                        })
                      }
                      
                      {relationships.control
                        .filter(rel => rel.from === element.id || rel.to === element.id)
                        .map((rel, index) => {
                          const otherElement = elements.find(e => 
                            e.id === (rel.from === element.id ? rel.to : rel.from)
                          );
                          if (!otherElement) return null;
                          
                          const isFromThisElement = rel.from === element.id;
                          const relationshipColor = otherElement.textColor;
                          
                          return (
                            <li key={`cont-${index}`} className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${otherElement.color}`}></div>
                              <span>
                                {isFromThisElement ? (
                                  <><span className={element.textColor}>{element.name}</span> controls <span className={relationshipColor}>{otherElement.name}</span></>
                                ) : (
                                  <><span className={relationshipColor}>{otherElement.name}</span> controls <span className={element.textColor}>{element.name}</span></>
                                )}
                              </span>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-neutral rounded-lg h-full">
              <h3 className="font-semibold text-primary mb-2">The Five Elements Theory</h3>
              <p className="text-neutral-dark mb-4">
                The Five Elements theory describes how energy flows through nature and the human body, with each element representing different aspects of health and life.
              </p>
              
              <div className="mb-4">
                <h4 className="font-medium text-primary mb-1">Cycles of Relationship:</h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-dark text-sm">
                  <li><span className="font-medium">Generation Cycle:</span> Each element nourishes the next in a nurturing sequence</li>
                  <li><span className="font-medium">Control Cycle:</span> Each element keeps another in check, maintaining balance</li>
                </ul>
              </div>
              
              <p className="text-neutral-dark mb-4">
                These relationships help us understand how imbalances in one system can affect others, and how to restore health through supporting or controlling elements.
              </p>
              
              <p className="text-sm text-secondary italic">
                Click on any element in the diagram to learn about its properties and relationships, or use the buttons to visualize the different cycles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiveElementsCycle;