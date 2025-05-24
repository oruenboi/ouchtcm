import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ExternalLink } from 'lucide-react';
import FiveElementsCycle from './FiveElementsCycle';
import OrganSystemMap from './OrganSystemMap';

const TcmElementsPage: React.FC = () => {
  const { t } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({});
  
  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const elements = [
    {
      id: 'wood',
      name: 'WOOD ELEMENT (LIVER)',
      color: 'bg-green-100 border-green-600',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
      accentColor: 'bg-green-600',
      symptoms: [
        'Chest pain, headaches, dry or sore eyes, night blindness',
        'Mood swings, agitation, frequent sighing, tendency to feel frustrated',
        'Insomnia with dreams, weak or brittle nails, stiff joints, shaking limbs',
        'Fatigue, bitter taste in the mouth',
        'Irregular menstruation, menstrual pain, importence, ejaculation issues'
      ],
      selfCare: [
        'Eat more green leafy vegetables.',
        'Manage anger and frustrations.',
        'Sleep early (before 11pm).',
        'Massage Tai Chong acupoint.'
      ]
    },
    {
      id: 'fire',
      name: 'FIRE ELEMENT (HEART)',
      color: 'bg-red-100 border-red-600',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
      accentColor: 'bg-red-600',
      symptoms: [
        'Chest discomfort, palpitations, dizziness, weakness, fatigue',
        'Slow response times, inability to focus, forgetfulness',
        'Insomnia, tendency to dream a lot',
        'Pale or red face, tongue ulcers, excessive perspiration'
      ],
      selfCare: [
        'Practice calming activities (meditation etc)',
        'Eat bitter food like bittergourd.',
        'Massage Shen Men acupoint.'
      ]
    },
    {
      id: 'earth',
      name: 'EARTH ELEMENT (SPLEEN)',
      color: 'bg-yellow-100 border-yellow-600',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
      accentColor: 'bg-yellow-600',
      symptoms: [
        'Constipation, loose stools, indigestion, bloating',
        'Short,weak breaths, water retention, fatigue',
        'Feeling of heaviness, weak limbs, pale lips',
        'Sweet or sticky feeling in the mouth, excessive salivation, dry mouth',
        'Forgetfulness'
      ],
      selfCare: [
        'Eat warming cooked food',
        'Manage overthinking',
        'Massage Zu San Li acupoint'
      ]
    },
    {
      id: 'metal',
      name: 'METAL ELEMENT (LUNG)',
      color: 'bg-gray-100 border-gray-600',
      textColor: 'text-gray-800',
      iconColor: 'text-gray-600',
      accentColor: 'bg-gray-600',
      symptoms: [
        'Blocked nose, runny nose, cough, asthma',
        'Chest tightness, difficulty breathing',
        'Frail skin, tendency to catch colds easily',
        'Short breaths, low or weak voice, reluctance to talk due to low energy'
      ],
      selfCare: [
        'Eat food like garlic, onion, white radish',
        'Tapping or guasha on lung meridian'
      ]
    },
    {
      id: 'water',
      name: 'WATER ELEMENT (KIDNEY)',
      color: 'bg-blue-100 border-blue-600',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
      accentColor: 'bg-blue-600',
      symptoms: [
        'Slow growth in children, hearing loss, loosening teeth',
        'White hair, hair loss, back pain',
        'Forgetfulness, cognitive decline, slow response times',
        'Cold limbs, weak pulse, cold womb',
        'Impotence, incontinence, hot flushes'
      ],
      selfCare: [
        'Eat foods like seaweed, black beans, walnuts',
        'Manage fear and trauma gently',
        'Massage Yong Quan acupoint.'
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-neutral py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Observe Your Body Signals</h1>
          <p className="text-xl text-neutral-dark">We cannot see our internal organs. However, we can observe the tell-tale signs from the outside.</p>
        </div>
        
        <FiveElementsCycle />
        <OrganSystemMap />

        <div className="space-y-8">
          {elements.map((element) => (
            <div key={element.id} className={`border-l-4 ${element.color} p-6 rounded-lg bg-white shadow-md`}>
              <h2 className={`text-xl font-bold ${element.textColor} mb-4`}>{element.name}</h2>
              
              <div className="mb-6">
                <h3 className={`text-lg font-semibold ${element.textColor} mb-2`}>Do you experience these?</h3>
                <div className="space-y-2">
                  {element.symptoms.map((symptom, index) => (
                    <div 
                      key={`${element.id}-symptom-${index}`}
                      className="flex items-start"
                    >
                      <div 
                        className={`flex-shrink-0 h-5 w-5 border rounded cursor-pointer mr-2 ${
                          checkedItems[`${element.id}-symptom-${index}`] 
                            ? `${element.accentColor} text-white` 
                            : 'border-gray-300 bg-white'
                        } flex items-center justify-center`}
                        onClick={() => toggleItem(`${element.id}-symptom-${index}`)}
                      >
                        {checkedItems[`${element.id}-symptom-${index}`] && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-neutral-dark">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className={`text-lg font-semibold ${element.textColor} mb-2`}>Simple self-care</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {element.selfCare.map((care, index) => (
                    <li key={`${element.id}-care-${index}`} className="text-neutral-dark">
                      {care}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">What is the relationship between the elements and our health?</h2>
          
          <p className="text-neutral-dark mb-4">
            An ancient philosophical thought that studies the conceptual characteristics of the five elements of wood, fire, earth, metal, and water, and uses them to explain the development, changes, and interrelationships of all things in the universe.
          </p>
          
          <p className="text-neutral-dark mb-4">
            In TCM 5 elements, we focus on 5 organs – liver, heart, spleen, lung, kidney.
          </p>
          
          <p className="text-neutral-dark mb-6">
            The organs do not refer to just the organs itself. It refers to the systems surrounding the organs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-3 bg-green-100 rounded text-neutral-dark">
              <strong>Liver</strong> – circulation
            </div>
            <div className="p-3 bg-red-100 rounded text-neutral-dark">
              <strong>Heart</strong> – cardiovascular
            </div>
            <div className="p-3 bg-yellow-100 rounded text-neutral-dark">
              <strong>Spleen</strong> – digestion
            </div>
            <div className="p-3 bg-gray-100 rounded text-neutral-dark">
              <strong>Lung</strong> – respiratory
            </div>
            <div className="p-3 bg-blue-100 rounded text-neutral-dark">
              <strong>Kidney</strong> – reproductive
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-primary mb-4">Traits of the 5 elements (五行)</h3>
          <p className="text-neutral-dark mb-4">
            Classification was done through observations of the elements and organs traits.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="p-3 bg-green-100 rounded">
              <p className="text-neutral-dark">
                <strong>WOOD</strong> grows; <strong>LIVER</strong> ensures smooth circulation
              </p>
              <p className="text-taupe text-sm mt-1">木的升发，条达特性 – 肝气的疏泄条达</p>
            </div>
            
            <div className="p-3 bg-red-100 rounded">
              <p className="text-neutral-dark">
                <strong>FIRE</strong> is warm; <strong>HEART</strong> has warming effect
              </p>
              <p className="text-taupe text-sm mt-1">火的温热，升腾作用 – 心阳的温煦作用</p>
            </div>
            
            <div className="p-3 bg-yellow-100 rounded">
              <p className="text-neutral-dark">
                <strong>EARTH</strong> holds and transport the nutrients; <strong>SPLEEN</strong> holds and transports nutrients
              </p>
              <p className="text-taupe text-sm mt-1">土的承载，生化受纳 – 脾的运化作用</p>
            </div>
            
            <div className="p-3 bg-gray-100 rounded">
              <p className="text-neutral-dark">
                <strong>METAL</strong> is heavy, 'kills'; <strong>LUNG</strong> 'cleans' the qi before transporting out
              </p>
              <p className="text-taupe text-sm mt-1">金的沉降，萧杀特性 – 肺主肃降功能</p>
            </div>
            
            <div className="p-3 bg-blue-100 rounded">
              <p className="text-neutral-dark">
                <strong>WATER</strong> is moisturizing, downward flowing; <strong>KIDNEY</strong> works on the body fluid
              </p>
              <p className="text-taupe text-sm mt-1">水的滋润，下行特性 – 肾主水液的功能</p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-primary mb-4">5 Elements Relationships</h3>
          
          <div className="overflow-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-neutral">
                  <th className="border border-gray-300 p-2 text-left">Element</th>
                  <th className="border border-gray-300 p-2 text-left">Organ</th>
                  <th className="border border-gray-300 p-2 text-left">Sense</th>
                  <th className="border border-gray-300 p-2 text-left">Tissue</th>
                  <th className="border border-gray-300 p-2 text-left">Emotion</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-2 font-medium">WOOD</td>
                  <td className="border border-gray-300 p-2">LIVER</td>
                  <td className="border border-gray-300 p-2">EYES (SIGHT)</td>
                  <td className="border border-gray-300 p-2">TENDONS, NAILS</td>
                  <td className="border border-gray-300 p-2">ANGER</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 p-2 font-medium">FIRE</td>
                  <td className="border border-gray-300 p-2">HEART</td>
                  <td className="border border-gray-300 p-2">TONGUE (SPEECH)</td>
                  <td className="border border-gray-300 p-2">FACE, BLOOD VESSELS</td>
                  <td className="border border-gray-300 p-2">JOY</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 p-2 font-medium">EARTH</td>
                  <td className="border border-gray-300 p-2">SPLEEN</td>
                  <td className="border border-gray-300 p-2">MOUTH (TASTE)</td>
                  <td className="border border-gray-300 p-2">MUSCLE, LIPS</td>
                  <td className="border border-gray-300 p-2">WORRY</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-2 font-medium">METAL</td>
                  <td className="border border-gray-300 p-2">LUNG</td>
                  <td className="border border-gray-300 p-2">NOSE (SMELL)</td>
                  <td className="border border-gray-300 p-2">SKIN (SKIN HAIR)</td>
                  <td className="border border-gray-300 p-2">GRIEF</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 p-2 font-medium">WATER</td>
                  <td className="border border-gray-300 p-2">KIDNEY</td>
                  <td className="border border-gray-300 p-2">EARS (HEARING)</td>
                  <td className="border border-gray-300 p-2">BONES, HAIR (HEAD)</td>
                  <td className="border border-gray-300 p-2">FEAR</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-neutral-dark mb-4">
            Observe for imbalances and self-care accordingly for better health management.
          </p>
          
          <ul className="list-disc pl-5 space-y-2 mb-8 text-neutral-dark">
            <li>When you experience issues with your <strong className="text-green-700">EYES (SIGHT), TENDONS, NAILS</strong>, balance your <strong className="text-green-700">LIVER</strong>.</li>
            <li>When you experience issues with your <strong className="text-red-700">TONGUE (SPEECH), FACE, BLOOD VESSELS</strong>, balance your <strong className="text-red-700">HEART</strong>.</li>
            <li>When you experience issues with your <strong className="text-yellow-700">MOUTH (TASTE), MUSCLE, LIPS</strong>, balance your <strong className="text-yellow-700">SPLEEN</strong>.</li>
            <li>When you experience issues with your <strong className="text-gray-700">NOSE (SMELL), SKIN (SKIN HAIR)</strong>, balance your <strong className="text-gray-700">LUNG</strong>.</li>
            <li>When you experience issues with your <strong className="text-blue-700">EARS (HEARING), BONES, HAIR (HEAD)</strong>, balance your <strong className="text-blue-700">KIDNEY</strong>.</li>
          </ul>
          
          <p className="text-neutral-dark mb-8">
            With reference to the 5 elements chart, we can strengthen the respective organ with:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>respective food colour</li>
              <li>respective food taste</li>
              <li>managing respective emotion</li>
              <li>massaging the respective meridians</li>
            </ul>
          </p>
          
          <p className="text-neutral-dark mb-4">
            Application: when you experience dry eyes, you can focus to take care of your WOOD element. You can consume more green leafy vegetables. You can manage your anger and massage acupoints on the liver meridian (e.g. Tai Chong).
          </p>
          
          <div className="p-4 bg-secondary/10 rounded-lg border border-secondary mb-8">
            <p className="text-sm text-secondary italic">
              Note: These are general observations for simple self-care, for educational purpose. Do not self-diagnose. Consult a qualified Traditional Chinese Medicine practitioner to have a better understanding of your condition and advise appropriately.
            </p>
          </div>
          
          <h3 className="text-xl font-bold text-primary mb-4">More in the eCourse: Healthy Ageing with TCM</h3>
          
          <div className="mb-8">
            <h4 className="font-medium text-primary mb-2">Course objectives:</h4>
            <ul className="list-disc pl-5 space-y-2 text-neutral-dark">
              <li>Understand that TCM is all about balance, particularly the dynamic between Yin & Yang.</li>
              <li>Discover the basics of the 5 Elements and 12 Meridians, and how they relate to your body and mind.</li>
              <li>Practise practical self-care techniques using acupressure massage, tapping, and guasha to relieve common pains like headaches, eye strain, stiff neck and shoulders, and backaches.</li>
              <li>Apply element-based self-care routines to support your organ systems and emotional wellbeing.</li>
            </ul>
            
            <p className="mt-4 text-neutral-dark">
              This course empowers you with foundational TCM knowledge to support graceful and pain-free ageing. Learn how to restore and maintain balance in your body using time-tested principles from Traditional Chinese Medicine.
            </p>
            
            <div className="mt-4">
              <a 
                href="https://ouch.com.sg/ecourses/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark"
              >
                Explore eCourses
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-primary mb-4">Next: Understand Your Body Constitution</h3>
            <p className="text-neutral-dark mb-4">
              Your imbalances are influenced by your TCM Body Constitution. Knowing your constitution allows you to adopt personalised self-care practices that bring your body back into balance.
            </p>
            
            <div className="mt-4 mb-8">
              <Link
                to="/survey"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark"
              >
                Take the Body Constitution Questionnaire
              </Link>
            </div>
            
            <h3 className="text-xl font-bold text-primary mb-4">Next: Create Your Personalised Routine</h3>
            <p className="text-neutral-dark mb-4">
              Incorporate suitable TCM practices for your body constitution into your daily life. Find out the suitable TCM self-care practices for you from the eCourses.
            </p>
            
            <div className="mt-4">
              <a 
                href="https://ouch.com.sg/ecourses/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark"
              >
                Explore eCourses
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TcmElementsPage;