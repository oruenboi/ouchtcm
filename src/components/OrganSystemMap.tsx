import React, { useState } from 'react';
import { Info } from 'lucide-react';

const OrganSystemMap: React.FC = () => {
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);
  
  const organs = [
    {
      id: 'liver',
      name: 'Liver',
      element: 'Wood',
      elementColor: 'text-green-600',
      position: 'top-[40%] right-[35%]',
      color: 'bg-green-100',
      borderColor: 'border-green-600',
      textColor: 'text-green-800',
      description: 'Regulates the smooth flow of qi and blood, stores blood, and governs tendons and eyes.',
      functions: [
        'Ensures smooth flow of Qi throughout the body',
        'Stores blood when body is at rest',
        'Controls the tendons and manifests in the nails',
        'Opens into the eyes and affects vision',
        'Houses the Hun (ethereal soul) and influences planning'
      ],
      symptoms: [
        'Eye problems (blurry vision, dry eyes)',
        'Tendon or ligament issues',
        'Irregular menstruation',
        'Irritability or anger',
        'Brittle nails'
      ],
      meridianPath: 'Begins at the big toe, runs up the inner leg, through the genitals, up the torso through the liver, and ends at the chest'
    },
    {
      id: 'heart',
      name: 'Heart',
      element: 'Fire',
      elementColor: 'text-red-600',
      position: 'top-[30%] right-[45%]',
      color: 'bg-red-100',
      borderColor: 'border-red-600',
      textColor: 'text-red-800',
      description: 'Governs blood and circulation, houses the shen (spirit/mind), and manifests in the face.',
      functions: [
        'Controls blood and blood vessels',
        'Houses the Shen (spirit/consciousness)',
        'Manifests in the complexion',
        'Opens into the tongue and affects speech',
        'Controls sweating as the fluid of the Heart'
      ],
      symptoms: [
        'Palpitations or irregular heartbeat',
        'Insomnia or dream-disturbed sleep',
        'Mental restlessness',
        'Memory issues',
        'Speech problems'
      ],
      meridianPath: 'Begins in the heart, flows through the lungs, runs down the inner arm, and ends at the tip of the little finger'
    },
    {
      id: 'spleen',
      name: 'Spleen',
      element: 'Earth',
      elementColor: 'text-yellow-600',
      position: 'top-[50%] left-[38%]',
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-600',
      textColor: 'text-yellow-800',
      description: 'Transforms and transports nutrients, governs muscles and limbs, and keeps blood in vessels.',
      functions: [
        'Transforms food into Qi and Blood',
        'Controls blood by keeping it in the vessels',
        'Controls muscles and the four limbs',
        'Opens into the mouth and manifests in the lips',
        'Houses thought and is affected by overthinking'
      ],
      symptoms: [
        'Digestive issues (bloating, loose stools)',
        'Fatigue after eating',
        'Muscle weakness',
        'Worry or overthinking',
        'Bruising easily'
      ],
      meridianPath: 'Begins at the tip of the big toe, runs up the inner leg, through the abdomen and spleen, and ends at the side of the chest'
    },
    {
      id: 'lung',
      name: 'Lung',
      element: 'Metal',
      elementColor: 'text-gray-600',
      position: 'top-[25%] left-[45%]',
      color: 'bg-gray-100',
      borderColor: 'border-gray-600',
      textColor: 'text-gray-800',
      description: 'Governs qi and respiration, regulates water passages, and controls skin and body hair.',
      functions: [
        'Controls breathing and the intake of Qi',
        'Regulates water passages and disperses fluids',
        'Controls skin and body hair - defensive Qi',
        'Opens into the nose and affects sense of smell',
        'Influenced by and stores the emotion of grief'
      ],
      symptoms: [
        'Respiratory issues (cough, asthma)',
        'Skin problems (dryness, rashes)',
        'Weak immunity',
        'Grief or sadness',
        'Nasal congestion'
      ],
      meridianPath: 'Begins in the middle of the chest, runs up to the throat, and flows down the outer arm to end at the thumb'
    },
    {
      id: 'kidney',
      name: 'Kidney',
      element: 'Water',
      elementColor: 'text-blue-600',
      position: 'top-[65%] right-[45%]',
      color: 'bg-blue-100',
      borderColor: 'border-blue-600',
      textColor: 'text-blue-800',
      description: 'Stores essence, governs reproduction and development, and controls bones and head hair.',
      functions: [
        'Stores Jing (essence) and governs birth, growth, and reproduction',
        'Controls water metabolism and filtration',
        'Grasps Qi from the Lung for normal breathing',
        'Produces marrow, fills the brain, and controls bones',
        'Opens into the ears and manifests in head hair'
      ],
      symptoms: [
        'Lower back pain',
        'Urinary problems',
        'Hearing loss or tinnitus',
        'Premature aging (gray hair, weak bones)',
        'Reproductive issues'
      ],
      meridianPath: 'Begins at the sole of the foot, runs along the inner leg through the kidneys, and ends at the chest'
    }
  ];

  // Human body outline path for SVG
  const bodyOutline = "M50,5 C40,5 30,15 30,25 C30,35 35,40 35,45 L35,60 L30,90 L35,110 L40,125 L45,130 L55,130 L60,125 L65,110 L70,90 L65,60 L65,45 C65,40 70,35 70,25 C70,15 60,5 50,5 Z";
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">Organ Systems in TCM</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Human body outline with organs */}
        <div className="w-full md:w-2/5">
          <div className="relative mx-auto max-w-sm h-[500px]">
            <svg viewBox="0 0 100 140" className="w-full h-full">
              {/* Human body outline */}
              <path d={bodyOutline} fill="#f5f5f5" stroke="#888" strokeWidth="1" />
              
              {/* Heart (Fire) */}
              <ellipse 
                cx="50" cy="35" rx="8" ry="9"
                className={`${activeOrgan === 'heart' ? 'fill-red-300' : 'fill-red-100'} stroke-red-600 cursor-pointer transition-colors duration-300 hover:fill-red-200`}
                onClick={() => setActiveOrgan(activeOrgan === 'heart' ? null : 'heart')}
              />
              <text x="50" y="35" fontSize="4" textAnchor="middle" className="pointer-events-none font-semibold">Heart</text>
              <text x="50" y="40" fontSize="3" textAnchor="middle" className="pointer-events-none text-red-800">Fire</text>
              
              {/* Lung (Metal) */}
              <ellipse 
                cx="40" cy="33" rx="9" ry="8"
                className={`${activeOrgan === 'lung' ? 'fill-gray-300' : 'fill-gray-100'} stroke-gray-600 cursor-pointer transition-colors duration-300 hover:fill-gray-200`}
                onClick={() => setActiveOrgan(activeOrgan === 'lung' ? null : 'lung')}
              />
              <text x="40" y="33" fontSize="4" textAnchor="middle" className="pointer-events-none font-semibold">Lung</text>
              <text x="40" y="38" fontSize="3" textAnchor="middle" className="pointer-events-none text-gray-800">Metal</text>
              
              {/* Liver (Wood) */}
              <ellipse 
                cx="60" cy="50" rx="9" ry="12"
                className={`${activeOrgan === 'liver' ? 'fill-green-300' : 'fill-green-100'} stroke-green-600 cursor-pointer transition-colors duration-300 hover:fill-green-200`}
                onClick={() => setActiveOrgan(activeOrgan === 'liver' ? null : 'liver')}
              />
              <text x="60" y="50" fontSize="4" textAnchor="middle" className="pointer-events-none font-semibold">Liver</text>
              <text x="60" y="55" fontSize="3" textAnchor="middle" className="pointer-events-none text-green-800">Wood</text>
              
              {/* Spleen (Earth) */}
              <ellipse 
                cx="40" cy="55" rx="8" ry="10"
                className={`${activeOrgan === 'spleen' ? 'fill-yellow-300' : 'fill-yellow-100'} stroke-yellow-600 cursor-pointer transition-colors duration-300 hover:fill-yellow-200`}
                onClick={() => setActiveOrgan(activeOrgan === 'spleen' ? null : 'spleen')}
              />
              <text x="40" y="55" fontSize="4" textAnchor="middle" className="pointer-events-none font-semibold">Spleen</text>
              <text x="40" y="60" fontSize="3" textAnchor="middle" className="pointer-events-none text-yellow-800">Earth</text>
              
              {/* Kidney (Water) */}
              <ellipse 
                cx="50" cy="80" rx="9" ry="8"
                className={`${activeOrgan === 'kidney' ? 'fill-blue-300' : 'fill-blue-100'} stroke-blue-600 cursor-pointer transition-colors duration-300 hover:fill-blue-200`}
                onClick={() => setActiveOrgan(activeOrgan === 'kidney' ? null : 'kidney')}
              />
              <text x="50" y="80" fontSize="4" textAnchor="middle" className="pointer-events-none font-semibold">Kidney</text>
              <text x="50" y="85" fontSize="3" textAnchor="middle" className="pointer-events-none text-blue-800">Water</text>
            </svg>
            
            <div className="mt-4 text-center text-sm text-neutral-dark">
              <p>Click on an organ to learn more about its functions in TCM</p>
            </div>
          </div>
        </div>
        
        {/* Organ details */}
        <div className="w-full md:w-3/5">
          {activeOrgan ? (
            <div className="animate-fadeIn">
              {organs.filter(o => o.id === activeOrgan).map(organ => (
                <div key={organ.id} className={`p-4 rounded-lg ${organ.color} border ${organ.borderColor}`}>
                  <h3 className={`text-xl font-semibold ${organ.textColor} flex items-center`}>
                    {organ.name} <span className={`ml-2 ${organ.elementColor} text-sm`}>({organ.element} Element)</span>
                  </h3>
                  
                  <p className="mt-3 text-neutral-dark">
                    {organ.description}
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Primary Functions:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                      {organ.functions.map((func, index) => (
                        <li key={index}>{func}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Common Signs of Imbalance:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {organ.symptoms.map((symptom, index) => (
                        <div 
                          key={index} 
                          className="flex items-start"
                        >
                          <Info className={`h-4 w-4 ${organ.textColor} mt-0.5 mr-2 flex-shrink-0`} />
                          <span className="text-neutral-dark text-sm">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Meridian Pathway:</h4>
                    <p className="text-neutral-dark text-sm">
                      {organ.meridianPath}
                    </p>
                    
                    <div className="mt-3 p-3 bg-white bg-opacity-50 rounded-lg text-sm text-neutral-dark">
                      <p className="italic">
                        Acupuncture and acupressure along the {organ.name} meridian can help balance this organ system and address related symptoms.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-neutral rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-4">Understanding TCM Organ Systems</h3>
              <p className="text-neutral-dark mb-4">
                In Traditional Chinese Medicine, organs are understood as functional systems rather than just anatomical structures. Each organ system encompasses physical, emotional, and energetic aspects that extend beyond Western medical definitions.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 border border-green-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-green-800 text-xs font-bold">W</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-green-800">Liver (Wood)</h4>
                    <p className="text-sm text-neutral-dark">Ensures smooth flow of Qi and emotions; governs tendons and eyes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-red-100 border border-red-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-red-800 text-xs font-bold">F</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-red-800">Heart (Fire)</h4>
                    <p className="text-sm text-neutral-dark">Houses the spirit (Shen); governs blood and consciousness</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-yellow-100 border border-yellow-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-yellow-800 text-xs font-bold">E</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-yellow-800">Spleen (Earth)</h4>
                    <p className="text-sm text-neutral-dark">Transforms food into energy; governs muscles and thinking</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-gray-100 border border-gray-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-800 text-xs font-bold">M</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800">Lung (Metal)</h4>
                    <p className="text-sm text-neutral-dark">Controls Qi and respiration; governs skin and immunity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 border border-blue-600 flex-shrink-0 flex items-center justify-center">
                    <span className="text-blue-800 text-xs font-bold">Wa</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-blue-800">Kidney (Water)</h4>
                    <p className="text-sm text-neutral-dark">Stores essence (Jing); governs development and aging</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-white rounded-lg text-sm">
                <p className="italic text-neutral-dark">
                  Each organ system is paired with a related organ of similar element (e.g., Liver with Gallbladder), follows specific meridian pathways in the body, and influences particular emotions and tissues.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganSystemMap;