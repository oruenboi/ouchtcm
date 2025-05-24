import React, { useState } from 'react';

const FiveElementsCycle: React.FC = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  
  const elements = [
    { 
      id: 'wood', 
      name: 'Wood', 
      chineseName: '木 (Mù)', 
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      textColor: 'text-green-800',
      borderColor: 'border-green-600',
      position: 'top-0 right-1/4',
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
      position: 'top-1/4 right-0',
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
      position: 'bottom-1/4 right-0',
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
      position: 'bottom-0 right-1/4',
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
      position: 'bottom-1/4 left-0',
      organ: 'Kidney',
      trait: 'Flow & Conservation',
      emotion: 'Fear',
      season: 'Winter'
    }
  ];

  const cycles = [
    { name: 'Generation Cycle', description: 'Each element nourishes the next', arrows: [
      { from: 'wood', to: 'fire', position: 'top-1/3 right-1/5', rotation: 'rotate-45' },
      { from: 'fire', to: 'earth', position: 'top-2/3 right-0', rotation: 'rotate-90' },
      { from: 'earth', to: 'metal', position: 'bottom-1/3 right-1/5', rotation: 'rotate-135' },
      { from: 'metal', to: 'water', position: 'bottom-0 center', rotation: 'rotate-180' },
      { from: 'water', to: 'wood', position: 'bottom-1/3 left-1/5', rotation: 'rotate-225' }
    ]},
    { name: 'Control Cycle', description: 'Each element controls another', arrows: [
      { from: 'wood', to: 'earth', position: 'right-1/3 bottom-1/3', rotation: 'rotate-120' },
      { from: 'earth', to: 'water', position: 'bottom-1/2 right-1/3', rotation: 'rotate-200' },
      { from: 'water', to: 'fire', position: 'left-1/3 top-1/3', rotation: 'rotate-300' },
      { from: 'fire', to: 'metal', position: 'right-1/3 top-1/3', rotation: 'rotate-30' },
      { from: 'metal', to: 'wood', position: 'top-1/2 right-2/3', rotation: 'rotate-160' }
    ]}
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h3 className="text-xl font-bold text-primary mb-4">Five Elements Cycle</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Interactive Diagram */}
        <div className="relative w-full md:w-1/2 aspect-square">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
          
          {/* Element circles */}
          {elements.map((element) => (
            <div 
              key={element.id}
              className={`absolute w-16 h-16 rounded-full ${element.color} ${element.hoverColor} cursor-pointer 
                transition-all duration-300 flex items-center justify-center 
                ${activeElement === element.id ? 'ring-4 ring-offset-2 ring-' + element.color.replace('bg-', '') : ''}
                ${activeElement && activeElement !== element.id ? 'opacity-50' : 'opacity-100'}
              `}
              style={{ 
                [element.position.split(' ')[0]]: '10%', 
                [element.position.split(' ')[1].replace('1/4', '25%').replace('right-', 'right: ').replace('left-', 'left: ')]: '10%' 
              }}
              onClick={() => setActiveElement(activeElement === element.id ? null : element.id)}
            >
              <span className="font-bold text-white">{element.name}</span>
            </div>
          ))}
          
          {/* Generation cycle (outer) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <path 
              d="M 30,20 A 40,40 0 1,1 30,80 A 40,40 0 1,1 30,20"
              fill="none"
              stroke="#4B5563"
              strokeWidth="1"
              strokeDasharray="4,4"
              className="opacity-50"
            />
            {/* We would add arrows for cycles here if we were to create detailed SVG arrows */}
          </svg>
          
          {/* Add a legend in the center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xs text-neutral-dark mb-1">Generation Cycle ↻</div>
            <div className="text-xs text-neutral-dark">Control Cycle ⇿</div>
          </div>
        </div>
        
        {/* Element details */}
        <div className="w-full md:w-1/2">
          {activeElement ? (
            <div className="animate-fadeIn">
              {elements.filter(e => e.id === activeElement).map(element => (
                <div key={element.id} className={`p-4 rounded-lg ${element.borderColor} border`}>
                  <h4 className={`text-lg font-semibold ${element.textColor}`}>{element.name} Element</h4>
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
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-1">Relationships:</h5>
                    <ul className="text-sm space-y-1">
                      {element.id === 'wood' && (
                        <>
                          <li><span className="text-green-600">Wood</span> is nourished by <span className="text-blue-600">Water</span></li>
                          <li><span className="text-green-600">Wood</span> nourishes <span className="text-red-600">Fire</span></li>
                          <li><span className="text-green-600">Wood</span> controls <span className="text-yellow-600">Earth</span></li>
                          <li><span className="text-green-600">Wood</span> is controlled by <span className="text-gray-600">Metal</span></li>
                        </>
                      )}
                      {element.id === 'fire' && (
                        <>
                          <li><span className="text-red-600">Fire</span> is nourished by <span className="text-green-600">Wood</span></li>
                          <li><span className="text-red-600">Fire</span> nourishes <span className="text-yellow-600">Earth</span></li>
                          <li><span className="text-red-600">Fire</span> controls <span className="text-gray-600">Metal</span></li>
                          <li><span className="text-red-600">Fire</span> is controlled by <span className="text-blue-600">Water</span></li>
                        </>
                      )}
                      {element.id === 'earth' && (
                        <>
                          <li><span className="text-yellow-600">Earth</span> is nourished by <span className="text-red-600">Fire</span></li>
                          <li><span className="text-yellow-600">Earth</span> nourishes <span className="text-gray-600">Metal</span></li>
                          <li><span className="text-yellow-600">Earth</span> controls <span className="text-blue-600">Water</span></li>
                          <li><span className="text-yellow-600">Earth</span> is controlled by <span className="text-green-600">Wood</span></li>
                        </>
                      )}
                      {element.id === 'metal' && (
                        <>
                          <li><span className="text-gray-600">Metal</span> is nourished by <span className="text-yellow-600">Earth</span></li>
                          <li><span className="text-gray-600">Metal</span> nourishes <span className="text-blue-600">Water</span></li>
                          <li><span className="text-gray-600">Metal</span> controls <span className="text-green-600">Wood</span></li>
                          <li><span className="text-gray-600">Metal</span> is controlled by <span className="text-red-600">Fire</span></li>
                        </>
                      )}
                      {element.id === 'water' && (
                        <>
                          <li><span className="text-blue-600">Water</span> is nourished by <span className="text-gray-600">Metal</span></li>
                          <li><span className="text-blue-600">Water</span> nourishes <span className="text-green-600">Wood</span></li>
                          <li><span className="text-blue-600">Water</span> controls <span className="text-red-600">Fire</span></li>
                          <li><span className="text-blue-600">Water</span> is controlled by <span className="text-yellow-600">Earth</span></li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-neutral rounded-lg">
              <h4 className="font-semibold text-primary mb-2">The Five Elements Theory</h4>
              <p className="text-neutral-dark mb-4">
                The Five Elements theory is a fundamental concept in Traditional Chinese Medicine that describes how energy flows through nature and the human body.
              </p>
              <p className="text-neutral-dark mb-2">
                Each element represents different organs, emotions, seasons, and aspects of life:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                <li><span className="text-green-600 font-medium">Wood</span>: Growth, flexibility, planning</li>
                <li><span className="text-red-600 font-medium">Fire</span>: Warmth, transformation, joy</li>
                <li><span className="text-yellow-600 font-medium">Earth</span>: Nourishment, stability, balance</li>
                <li><span className="text-gray-600 font-medium">Metal</span>: Structure, boundaries, letting go</li>
                <li><span className="text-blue-600 font-medium">Water</span>: Flow, wisdom, fear</li>
              </ul>
              <p className="mt-4 text-sm text-secondary italic">
                Click on any element in the diagram to learn more about its properties and relationships.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiveElementsCycle;