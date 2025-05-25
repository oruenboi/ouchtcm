// /home/project/src/components/OrganSystemMap.tsx
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
  /* … your existing organ data … */
];

const positions: Record<string, { top: string; left: string }> = {
  lung:   { top: '28%', left: '45%' },
  heart:  { top: '36%', left: '50%' },
  liver:  { top: '48%', left: '55%' },
  spleen: { top: '48%', left: '40%' },
  kidney: { top: '66%', left: '52%' },
};

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const OrganSystemMap: React.FC = () => {
  const [activeOrgan, setActiveOrgan] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Organ Systems in TCM
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ── Left: Stylised “rings” + organ buttons ── */}
        <div className="w-full md:w-2/5">
          <div className="relative mx-auto max-w-sm aspect-[5/7]">

            {/* Head/shoulders ring */}
            <div className="absolute inset-0 flex items-start justify-center pt-4">
              <div className="w-32 h-32 border-8 border-gray-200 rounded-full"></div>
            </div>

            {/* Torso ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-8 border-gray-200 rounded-full"></div>
            </div>

            {/* Lower‐body semicircle */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="w-64 h-36 border-t-8 border-l-8 border-r-8 border-gray-200 rounded-t-full"></div>
            </div>

            {/* Organ markers */}
            {organs.map(o => {
              const pos = positions[o.id];
              const isActive = activeOrgan === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setActiveOrgan(isActive ? null : o.id)}
                  className={classNames(
                    'absolute w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform',
                    o.color,
                    o.borderColor,
                    o.textColor,
                    isActive
                      ? 'ring-4 ring-offset-2 shadow-lg scale-110'
                      : 'hover:scale-105'
                  )}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                  aria-pressed={isActive}
                >
                  <span className="font-semibold text-sm">{o.name}</span>
                </button>
              );
            })}

          </div>

          <p className="mt-4 text-center text-neutral-dark italic text-sm">
            Click on an organ to learn more about its functions in TCM
          </p>
        </div>

        {/* ── Right: Details Panel ── */}
        <div className="w-full md:w-3/5">
          {activeOrgan ? (
            organs
              .filter(o => o.id === activeOrgan)
              .map(org => (
                <div
                  key={org.id}
                  className={classNames(
                    'p-4 rounded-lg animate-fadeIn',
                    org.color,
                    org.borderColor
                  )}
                >
                  <h3
                    className={classNames(
                      'text-xl font-semibold flex items-center',
                      org.textColor
                    )}
                  >
                    {org.name}
                    <span
                      className={classNames(
                        'ml-2 text-sm',
                        org.elementColor
                      )}
                    >
                      ({org.element})
                    </span>
                  </h3>

                  <p className="mt-3 text-neutral-dark">{org.description}</p>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Primary Functions:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-dark">
                      {org.functions.map((fn, i) => (
                        <li key={i}>{fn}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Common Signs of Imbalance:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {org.symptoms.map((sym, i) => (
                        <div key={i} className="flex items-start">
                          <Info
                            className={classNames(
                              'h-4 w-4 mt-0.5 mr-2 flex-shrink-0',
                              org.textColor
                            )}
                          />
                          <span className="text-neutral-dark text-sm">{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Meridian Pathway:</h4>
                    <p className="text-neutral-dark text-sm">{org.meridianPath}</p>
                    <div className="mt-3 p-3 bg-white bg-opacity-50 rounded-lg text-sm text-neutral-dark">
                      <p className="italic">
                        Acupressure along the {org.name} meridian can help balance this organ system and address related symptoms.
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
                In Traditional Chinese Medicine, organs are understood as functional systems rather than just anatomical structures. Each organ system encompasses physical, emotional, and energetic aspects that extend beyond Western medical definitions.
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
                      <span className={classNames('text-xs font-bold', o.textColor)}>
                        {o.id === 'kidney' ? 'Wa' : o.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h4 className={classNames('font-medium', o.textColor)}>
                        {o.name} ({o.element})
                      </h4>
                      <p className="text-sm text-neutral-dark">{o.description.split('.')[0]}.</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-white rounded-lg text-sm italic">
                Each organ system is paired with a related organ of similar element, follows specific meridian pathways in the body, and influences particular emotions and tissues.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganSystemMap;
