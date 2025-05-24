import React, { useState } from 'react';

const OrganSystemMap: React.FC = () => {
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);
  
  const organs = [
    {
      id: 'liver',
      name: 'Liver',
      element: 'Wood',
      position: 'right-1/3 top-1/3',
      shape: 'rounded-tl-full rounded-bl-full',
      color: 'bg-green-100',
      borderColor: 'border-green-600',
      textColor: 'text-green-800',
      description: 'Regulates the smooth flow of qi and blood, stores blood, and governs tendons and eyes.',
      symptoms: [
        'Eye problems (blurry vision, dry eyes)',
        'Tendon or ligament issues',
        'Irregular menstruation',
        'Irritability or anger',
        'Brittle nails'
      ],
      acupoints: ['Tai Chong (LV3)', 'Zhangmen (LV13)', 'Qimen (LV14)']
    },
    {
      id: 'heart',
      name: 'Heart',
      element: 'Fire',
      position: 'left-1/2 top-1/4',
      shape: 'rounded-full',
      color: 'bg-red-100',
      borderColor: 'border-red-600',
      textColor: 'text-red-800',
      description: 'Governs blood and circulation, houses the shen (spirit/mind), and manifests in the face.',
      symptoms: [
        'Palpitations or irregular heartbeat',
        'Insomnia or dream-disturbed sleep',
        'Mental restlessness',
        'Memory issues',
        'Speech problems'
      ],
      acupoints: ['Shen Men (HT7)', 'Jian Shi (PC5)', 'Nei Guan (PC6)']
    },
    {
      id: 'spleen',
      name: 'Spleen',
      element: 'Earth',
      position: 'left-1/3 top-1/2',
      shape: 'rounded-tr-full rounded-br-full',
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-600',
      textColor: 'text-yellow-800',
      description: 'Transforms and transports nutrients, governs muscles and limbs, and keeps blood in vessels.',
      symptoms: [
        'Digestive issues (bloating, loose stools)',
        'Fatigue after eating',
        'Muscle weakness',
        'Worry or overthinking',
        'Bruising easily'
      ],
      acupoints: ['Zu San Li (ST36)', 'San Yin Jiao (SP6)', 'Pishu (BL20)']
    },
    {
      id: 'lung',
      name: 'Lung',
      element: 'Metal',
      position: 'left-1/2 top-1/6',
      shape: 'rounded-b-full',
      color: 'bg-gray-100',
      borderColor: 'border-gray-600',
      textColor: 'text-gray-800',
      description: 'Governs qi and respiration, regulates water passages, and controls skin and body hair.',
      symptoms: [
        'Respiratory issues (cough, asthma)',
        'Skin problems (dryness, rashes)',
        'Weak immunity',
        'Grief or sadness',
        'Nasal congestion'
      ],
      acupoints: ['Tai Yuan (LU9)', 'Feishu (BL13)', 'Chize (LU5)']
    },
    {
      id: 'kidney',
      name: 'Kidney',
      element: 'Water',
      position: 'left-1/2 bottom-1/4',
      shape: 'rounded-t-full',
      color: 'bg-blue-100',
      borderColor: 'border-blue-600',
      textColor: 'text-blue-800',
      description: 'Stores essence, governs reproduction and development, and controls bones and head hair.',
      symptoms: [
        'Lower back pain',
        'Urinary problems',
        'Hearing loss or tinnitus',
        'Premature aging (gray hair, weak bones)',
        'Reproductive issues'
      ],
      acupoints: ['Tai Xi (KI3)', 'Yong Quan (KI1)', 'Shen Shu (BL23)']
    }
  ];

  // Simple human body outline path coordinates
  const bodyOutline = "M50,10 C40,10 30,15 30,25 C30,35 35,40 35,45 L35,60 L30,90 L35,110 L40,125 L45,130 L55,130 L60,125 L65,110 L70,90 L65,60 L65,45 C65,40 70,35 70,25 C70,15 60,10 50,10 Z";
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h3 className="text-xl font-bold text-primary mb-4">Organ System Map</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Human body outline with organs */}
        <div className="relative w-full md:w-1/2 aspect-[1/2] mx-auto max-w-xs">
          <svg viewBox="0 0 100 140" className="w-full h-full">
            {/* Human body outline */}
            <path d={bodyOutline} fill="#f5f5f5" stroke="#888" strokeWidth="1" />
            
            {/* Clickable organ regions */}
            <circle 
              cx="50" cy="30" r="8" 
              className={`${activeOrgan === 'lung' ? 'fill-gray-300' : 'fill-gray-100'} stroke-gray-600 cursor-pointer transition-colors duration-300 hover:fill-gray-200`}
              onClick={() => setActiveOrgan(activeOrgan === 'lung' ? null : 'lung')}
            />
            
            <circle 
              cx="45" cy="42" r="7" 
              className={`${activeOrgan === 'heart' ? 'fill-red-300' : 'fill-red-100'} stroke-red-600 cursor-pointer transition-colors duration-300 hover:fill-red-200`}
              onClick={() => setActiveOrgan(activeOrgan === 'heart' ? null : 'heart')}
            />
            
            <ellipse 
              cx="55" cy="55" rx="8" ry="10" 
              className={`${activeOrgan === 'liver' ? 'fill-green-300' : 'fill-green-100'} stroke-green-600 cursor-pointer transition-colors duration-300 hover:fill-green-200`}
              onClick={() => setActiveOrgan(activeOrgan === 'liver' ? null : 'liver')}
            />
            
            <ellipse 
              cx="45" cy="60" rx="7" ry="8" 
              className={`${activeOrgan === 'spleen' ? 'fill-yellow-300' : 'fill-yellow-100'} stroke-yellow-600 cursor-pointer transition-colors duration-300 hover:fill-yellow-200`}
              onClick={() => setActiveOrgan(activeOrgan === 'spleen' ? null : 'spleen')}
            />
            
            <circle 
              cx="50" cy="80" r="8" 
              className={`${activeOrgan === 'kidney' ? 'fill-blue-300' : 'fill-blue-100'} stroke-blue-600 cursor-pointer transition-colors duration-300 hover:fill-blue-200`}
              onClick={() => setActiveOrgan(activeOrgan === 'kidney' ? null : 'kidney')}
            />
            
            {/* Labels */}
            <text x="50" y="33" fontSize="4" textAnchor="middle" className="pointer-events-none">Lung</text>
            <text x="45" y="42" fontSize="4" textAnchor="middle" className="pointer-events-none">Heart</text>
            <text x="55" y="55" fontSize="4" textAnchor="middle" className="pointer-events-none">Liver</text>
            <text x="45" y="60" fontSize="4" textAnchor="middle" className="pointer-events-none">Spleen</text>
            <text x="50" y="80" fontSize="4" textAnchor="middle" className="pointer-events-none">Kidney</text>
          </svg>
        </div>
        
        {/* Organ details */}
        <div className="w-full md:w-1/2">
          {activeOrgan ? (
            <div className="animate-fadeIn">
              {organs.filter(o => o.id === activeOrgan).map(organ => (
                <div key={organ.id} className={`p-4 rounded-lg ${organ.borderColor} border`}>
                  <h4 className={`text-lg font-semibold ${organ.textColor}`}>{organ.name}</h4>
                  <p className="text-sm text-taupe">{organ.element} Element</p>
                  
                  <p className="mt-3 text-neutral-dark">
                    {organ.description}
                  </p>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Common Symptoms of Imbalance:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                      {organ.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Key Acupoints:</h5>
                    <ul className="list-disc pl-5 text-neutral-dark">
                      {organ.acupoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-neutral rounded-lg">
              <h4 className="font-semibold text-primary mb-2">The Five Organ Systems</h4>
              <p className="text-neutral-dark mb-4">
                In Traditional Chinese Medicine, each organ system extends beyond its physical function to encompass emotional, mental, and energetic aspects.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-dark">
                <li><span className="text-green-600 font-medium">Liver (Wood)</span>: Regulates qi flow and emotions</li>
                <li><span className="text-red-600 font-medium">Heart (Fire)</span>: Houses the mind and governs circulation</li>
                <li><span className="text-yellow-600 font-medium">Spleen (Earth)</span>: Transforms food into energy and blood</li>
                <li><span className="text-gray-600 font-medium">Lung (Metal)</span>: Controls breathing and immune defense</li>
                <li><span className="text-blue-600 font-medium">Kidney (Water)</span>: Stores essence and governs development</li>
              </ul>
              <p className="mt-4 text-sm text-secondary italic">
                Click on any organ in the diagram to learn more about its functions and related symptoms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganSystemMap;