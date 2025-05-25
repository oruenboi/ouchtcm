// src/components/OrganSystemMap.tsx
import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface Organ {
  id: string;
  name: string;
  element: string;
  elementColor: string;
  color: string;
  borderColor: string;
  textColor: string;
  description: string;
  functions: string[];
  symptoms: string[];
  meridianPath: string;
}

const organs: Organ[] = [
  {
    id: 'liver',
    name: 'Liver',
    element: 'Wood',
    elementColor: 'text-green-600',
    color: 'bg-green-100',
    borderColor: 'border-green-600',
    textColor: 'text-green-800',
    description:
      'Regulates the smooth flow of qi and blood, stores blood, and governs tendons and eyes.',
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
    meridianPath:
      'Begins at the big toe, runs up the inner leg, through the genitals, up the torso through the liver, and ends at the chest'
  },
  {
    id: 'heart',
    name: 'Heart',
    element: 'Fire',
    elementColor: 'text-red-600',
    color: 'bg-red-100',
    borderColor: 'border-red-600',
    textColor: 'text-red-800',
    description:
      'Governs blood and circulation, houses the shen (spirit/mind), and manifests in the face.',
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
    meridianPath:
      'Begins in the heart, flows through the lungs, runs down the inner arm, and ends at the tip of the little finger'
  },
  {
    id: 'spleen',
    name: 'Spleen',
    element: 'Earth',
    elementColor: 'text-yellow-600',
    color: 'bg-yellow-100',
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-800',
    description:
      'Transforms and transports nutrients, governs muscles and limbs, and keeps blood in vessels.',
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
    meridianPath:
      'Begins at the tip of the big toe, runs up the inner leg, through the abdomen and spleen, and ends at the side of the chest'
  },
  {
    id: 'lung',
    name: 'Lung',
    element: 'Metal',
    elementColor: 'text-gray-600',
    color: 'bg-gray-100',
    borderColor: 'border-gray-600',
    textColor: 'text-gray-800',
    description:
      'Governs qi and respiration, regulates water passages, and controls skin and body hair.',
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
    meridianPath:
      'Begins in the middle of the chest, runs up to the throat, and flows down the outer arm to end at the thumb'
  },
  {
    id: 'kidney',
    name: 'Kidney',
    element: 'Water',
    elementColor: 'text-blue-600',
    color: 'bg-blue-100',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-800',
    description:
      'Stores essence, governs reproduction and development, and controls bones and head hair.',
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
    meridianPath:
      'Begins at the sole of the foot, runs along the inner leg through the kidneys, and ends at the chest'
  }
];

// SVG path for body outline
const bodyOutline =
  'M50,5 C40,5 30,15 30,25 C30,35 35,40 35,45 L35,60 L30,90 L35,110 L40,125 L45,130 L55,130 L60,125 L65,110 L70,90 L65,60 L65,45 C65,40 70,35 70,25 C70,15 60,5 50,5 Z';

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const coordsMap: Record<string, { cx: number; cy: number; rx: number; ry: number }> = {
  heart:  { cx: 50, cy: 35, rx: 8,  ry: 9  },
  lung:   { cx: 40, cy: 33, rx: 9,  ry: 8  },
  liver:  { cx: 60, cy: 50, rx: 9,  ry: 12 },
  spleen: { cx: 40, cy: 55, rx: 8,  ry: 10 },
  kidney: { cx: 50, cy: 80, rx: 9,  ry: 8  },
};

const OrganSystemMap: React.FC = () => {
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Organ Systems in TCM
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SVG + Organs */}
        <div className="w-full md:w-2/5">
          <div className="relative mx-auto max-w-sm aspect-[5/7]">
            <svg viewBox="0 0 100 140" className="absolute inset-0 w-full h-full">
              <path
                d={bodyOutline}
                fill="#f5f5f5"
                stroke="#888"
                strokeWidth="1"
              />

              {organs.map(o => {
                const { cx, cy, rx, ry } = coordsMap[o.id];
                const isActive = activeOrgan === o.id;
                return (
                  <g
                    key={o.id}
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveOrgan(isActive ? null : o.id)
                    }
                  >
                    <ellipse
                      cx={cx}
                      cy={cy}
                      rx={rx}
                      ry={ry}
                      fill={isActive ? o.color.replace('-100','-300') : o.color}
                      stroke={o.borderColor.replace('border-','')}
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy}
                      fontSize="4"
                      textAnchor="middle"
                      className="pointer-events-none font-semibold"
                    >
                      {o.name}
                    </text>
                    <text
                      x={cx}
                      y={cy + 5}
                      fontSize="3"
                      textAnchor="middle"
                      className={`pointer-events-none ${o.textColor}`}
                    >
                      {o.element}
                    </text>
                  </g>
                );
              })}
            </svg>

            <p className="mt-4 text-center text-gray-600 italic text-sm">
              Click on an organ to learn more about its functions in TCM
            </p>
          </div>
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-3/5">
          {activeOrgan ? (
            organs
              .filter(o => o.id === activeOrgan)
              .map(organ => (
                <div
                  key={organ.id}
                  className={classNames(
                    'p-4 rounded-lg animate-fadeIn',
                    organ.color,
                    organ.borderColor
                  )}
                >
                  <h3
                    className={classNames(
                      'text-xl font-semibold flex items-center',
                      organ.textColor
                    )}
                  >
                    {organ.name}
                    <span
                      className={classNames(
                        'ml-2 text-sm',
                        organ.elementColor
                      )}
                    >
                      ({organ.element})
                    </span>
                  </h3>

                  <p className="mt-3 text-neutral-dark">
                    {organ.description}
                  </p>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Primary Functions:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                      {organ.functions.map((fn, i) => (
                        <li key={i}>{fn}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Common Signs of Imbalance:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {organ.symptoms.map((sym, i) => (
                        <div key={i} className="flex items-start">
                          <Info
                            className={classNames(
                              'h-4 w-4 mt-0.5 mr-2 flex-shrink-0',
                              organ.textColor
                            )}
                          />
                          <span className="text-neutral-dark text-sm">
                            {sym}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      Meridian Pathway:
                    </h4>
                    <p className="text-neutral-dark text-sm">
                      {organ.meridianPath}
                    </p>
                    <div className="mt-3 p-3 bg-white bg-opacity-50 rounded-lg text-sm text-neutral-dark">
                      <p className="italic">
                        Acupuncture and acupressure along the{' '}
                        {organ.name} meridian can help balance this organ
                        system and address related symptoms.
                      </p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="p-4 bg-neutral rounded-lg animate-fadeIn">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Understanding TCM Organ Systems
              </h3>
              <p className="text-neutral-dark mb-4">
                In Traditional Chinese Medicine, organs are understood as
                functional systems rather than just anatomical structures.
                Each organ system encompasses physical, emotional, and
                energetic aspects that extend beyond Western medical
                definitions.
              </p>

              <div className="space-y-3">
                {organs.map(o => (
                  <div key={o.id} className="flex items-start">
                    <div
                      className={classNames(
                        'h-6 w-6 rounded-full flex-shrink-0 flex items-center justify-center',
                        o.color,
                        o.borderColor
                      )}
                    >
                      <span
                        className={classNames(
                          'text-xs font-bold',
                          o.textColor
                        )}
                      >
                        {o.id === 'kidney' ? 'Wa' : o.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h4
                        className={classNames(
                          'font-medium',
                          o.textColor
                        )}
                      >
                        {o.name} ({o.element})
                      </h4>
                      <p className="text-sm text-neutral-dark">
                        {o.description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-white rounded-lg text-sm italic">
                Each organ system is paired with a related organ of similar
                element, follows specific meridian pathways in the body,
                and influences particular emotions and tissues.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganSystemMap;
