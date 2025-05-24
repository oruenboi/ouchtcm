import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Check, ExternalLink, Info, ArrowRight, ArrowDown } from 'lucide-react';
import FiveElementsCycle from './FiveElementsCycle';
import OrganSystemMap from './OrganSystemMap';

// TCM elements data
const elementsData = [
  {
    id: 'wood',
    name: 'Wood',
    chineseName: '木 (Mù)',
    color: 'bg-green-100',
    hoverColor: 'hover:bg-green-200',
    borderColor: 'border-green-600',
    textColor: 'text-green-800',
    accentColor: 'bg-green-600',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    icon: '🌳',
    organs: 'Liver (Yin) and Gallbladder (Yang)',
    traits: {
      sense: 'Eyes (Sight)',
      tissue: 'Tendons and Nails',
      emotion: 'Anger',
      color: 'Green',
      season: 'Spring',
      taste: 'Sour'
    },
    description: 'Wood represents growth and flexibility. It is associated with springtime and the power of renewal. Individuals with strong Wood energy tend to be assertive and organized, but an imbalance in Wood can lead to frustration or stagnation.',
    symptoms: [
      'Irritability or frequent anger outbursts',
      'Tension headaches, migraines',
      'Dry or itchy eyes, blurred vision',
      'Muscle spasms or twitches',
      'Brittle nails or nail problems',
      'Rib-side pain or distention',
      'Irregular menstruation',
      'Feeling "stuck" or indecisive'
    ],
    selfCare: [
      'Practice stress-relief techniques like deep breathing and meditation',
      'Incorporate flexibility exercises like stretching, yoga, or tai chi',
      'Include sour flavors moderately – lemon water, pickled vegetables, vinegar',
      'Eat leafy greens and avoid overly greasy foods that cause stagnation',
      'Reduce alcohol consumption as it aggravates Liver heat'
    ],
    acupoints: [
      {
        name: 'Liver 3 (Tai Chong)',
        location: 'On the top of the foot, in the depression between the first and second metatarsal bones',
        benefits: 'Releases Liver Qi stagnation, calms the mind, relieves headaches and eye strain',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Gallbladder 20 (Feng Chi)',
        location: 'At the base of the skull, in the depression between the two vertical neck muscles',
        benefits: 'Relieves headaches, dizziness, irritability, and eye problems',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Large Intestine 4 (He Gu)',
        location: 'On the highest spot of the muscle between thumb and index finger when they are brought close together',
        benefits: 'Used with Liver 3 as "Four Gates" to promote Qi flow and relieve stagnation',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'fire',
    name: 'Fire',
    chineseName: '火 (Huǒ)',
    color: 'bg-red-100',
    hoverColor: 'hover:bg-red-200',
    borderColor: 'border-red-600',
    textColor: 'text-red-800',
    accentColor: 'bg-red-600',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    icon: '🔥',
    organs: 'Heart (Yin) and Small Intestine (Yang)',
    traits: {
      sense: 'Tongue (Speech)',
      tissue: 'Blood vessels and Face',
      emotion: 'Joy',
      color: 'Red',
      season: 'Summer',
      taste: 'Bitter'
    },
    description: 'Fire embodies passion, warmth, and connection. It governs summertime, heat, and the spirit. In balance it brings joy and love; in excess it may lead to burnout or anxiety.',
    symptoms: [
      'Anxiety, restlessness, palpitations',
      'Insomnia or dream-disturbed sleep',
      'Excessive sweating',
      'Red tip on the tongue',
      'Speech issues or excessive talking',
      'Quick emotional changes (laughing/crying)',
      'Face flushing easily',
      'Mental confusion or forgetfulness'
    ],
    selfCare: [
      'Ensure adequate rest and downtime to counteract over-excitement',
      'Practice meditation, breathing exercises or gentle evening walks',
      'Consume hydrating, cooling foods like watermelon, cucumber, coconut water',
      'Include bitter foods like dandelion greens or bitter melon moderately',
      'Avoid caffeine, alcohol and spicy foods which "add fuel" to Fire'
    ],
    acupoints: [
      {
        name: 'Heart 7 (Shen Men)',
        location: 'On the wrist crease, on the little finger side, in line with the little finger',
        benefits: 'Calms the spirit, relieves insomnia, anxiety, and heart palpitations',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Pericardium 6 (Nei Guan)',
        location: 'Three finger-widths above the inner wrist crease, between the tendons',
        benefits: 'Relieves anxiety, nausea, motion sickness, and calms the mind',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Small Intestine 19 (Ting Gong)',
        location: 'In front of the ear, in the depression formed when the mouth is open',
        benefits: 'Helps with hearing issues and tinnitus related to Heart Fire',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    chineseName: '土 (Tǔ)',
    color: 'bg-yellow-100',
    hoverColor: 'hover:bg-yellow-200',
    borderColor: 'border-yellow-600',
    textColor: 'text-yellow-800',
    accentColor: 'bg-yellow-600',
    buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    icon: '⛰️',
    organs: 'Spleen (Yin) and Stomach (Yang)',
    traits: {
      sense: 'Mouth (Taste)',
      tissue: 'Muscles and Lips',
      emotion: 'Worry',
      color: 'Yellow',
      season: 'Late Summer',
      taste: 'Sweet'
    },
    description: 'Earth symbolizes nourishment, stability, and grounding. Late summer (or the transition between seasons) is its time. When Earth is strong, one feels centered and calm; when weak, worry and digestive troubles arise.',
    symptoms: [
      'Digestive issues: bloating, gas, slow digestion',
      'Loose stools or diarrhea (or sometimes constipation)',
      'Feeling heavy or foggy-headed',
      'Fluid retention or edema',
      'Sugar cravings or comfort eating',
      'Obsessive worry or overthinking',
      'Muscle weakness or fatigue',
      'Taking on others\' problems excessively'
    ],
    selfCare: [
      'Eat warm, cooked foods and avoid excessive cold/raw foods',
      'Include naturally sweet foods like sweet potato, pumpkin, carrots in moderation',
      'Add aromatic spices (ginger, cinnamon) to aid digestion if feeling sluggish',
      'Practice journaling to unload worry and overthinking',
      'Take a gentle walk after meals to aid digestion',
      'Learn to set healthy boundaries if you tend to care for everyone'
    ],
    acupoints: [
      {
        name: 'Stomach 36 (Zu San Li)',
        location: 'Four finger-widths below the kneecap, one finger-width outside the shinbone',
        benefits: 'Strengthens digestion, boosts energy, and improves immunity',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Spleen 6 (San Yin Jiao)',
        location: 'Four finger-widths above the inner ankle bone, just behind the tibia bone',
        benefits: 'Strengthens the Spleen, resolves dampness, and balances the lower body',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Spleen 3 (Tai Bai)',
        location: 'On the inside of the foot, in the depression behind the ball of the foot, near the big toe',
        benefits: 'Strengthens the Spleen and improves digestive function',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'metal',
    name: 'Metal',
    chineseName: '金 (Jīn)',
    color: 'bg-gray-100',
    hoverColor: 'hover:bg-gray-200',
    borderColor: 'border-gray-600',
    textColor: 'text-gray-800',
    accentColor: 'bg-gray-600',
    buttonColor: 'bg-gray-600 hover:bg-gray-700',
    icon: '🪙',
    organs: 'Lung (Yin) and Large Intestine (Yang)',
    traits: {
      sense: 'Nose (Smell)',
      tissue: 'Skin and Body Hair',
      emotion: 'Grief',
      color: 'White',
      season: 'Autumn',
      taste: 'Pungent/Spicy'
    },
    description: 'Metal represents purity, structure, and the ability to let go. Associated with autumn, it governs the process of contraction and release. Balanced Metal gives us integrity and clear boundaries; imbalanced Metal can lead to grief, isolation, or rigidity.',
    symptoms: [
      'Respiratory issues: frequent colds, coughs, asthma',
      'Allergies or sinus problems',
      'Skin conditions: dryness, rashes, eczema',
      'Constipation or irregular elimination',
      'Prolonged grief or emotional numbness',
      'Excessive perfectionism or rigidity',
      'Difficulty letting go of past issues',
      'Weak immune function'
    ],
    selfCare: [
      'Practice deep breathing exercises daily to strengthen Lung capacity',
      'Take brisk walks in fresh air to stimulate Lung Qi',
      'Use pungent foods and herbs like ginger, garlic, or peppermint tea',
      'Keep skin moisturized and protected in dry weather',
      'Ensure adequate hydration and fiber intake for healthy bowel movements',
      'Process grief through journaling or talking with a friend/therapist',
      'Practice letting go of something small each day (an old item or a worry)'
    ],
    acupoints: [
      {
        name: 'Lung 9 (Tai Yuan)',
        location: 'On the wrist crease, on the thumb side, in the depression next to the radial artery',
        benefits: 'Strengthens the Lungs, benefits the throat, and regulates the pulse',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Large Intestine 4 (He Gu)',
        location: 'On the highest spot of the muscle between thumb and index finger when they are brought close together',
        benefits: 'Relieves pain, promotes bowel movements, and strengthens immunity',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Conception Vessel 6 (Qi Hai)',
        location: 'Two finger-widths below the navel, on the midline of the abdomen',
        benefits: 'Strengthens overall Qi and supports core energy',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    chineseName: '水 (Shuǐ)',
    color: 'bg-blue-100',
    hoverColor: 'hover:bg-blue-200',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-800',
    accentColor: 'bg-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    icon: '💧',
    organs: 'Kidney (Yin) and Urinary Bladder (Yang)',
    traits: {
      sense: 'Ears (Hearing)',
      tissue: 'Bones and Head Hair',
      emotion: 'Fear',
      color: 'Blue/Black',
      season: 'Winter',
      taste: 'Salty'
    },
    description: 'Water symbolizes wisdom, adaptability, and depth. It corresponds to winter, the season of stillness and storage. A balanced Water element gives willpower and intuition; an imbalance can cause fear or lack of drive. Water is the source of life in TCM – it stores our essence (Jing) and governs birth, growth, and reproduction.',
    symptoms: [
      'Low back pain or knee problems',
      'Chronic fatigue not relieved by rest',
      'Feeling cold (cold hands and feet)',
      'Hot flashes or night sweats (Kidney Yin deficiency)',
      'Frequent urination or urinary issues',
      'Tinnitus (ringing in ears) or hearing decline',
      'Premature graying hair',
      'Excessive fear or lack of willpower'
    ],
    selfCare: [
      'Ensure adequate rest and gentle exercise like qi gong or gentle yoga',
      'Keep warm, especially the lower back and feet',
      'Eat kidney-nourishing foods: black beans, bone broth, seaweed, seeds',
      'Choose soups and stews to hydrate and warm the body',
      'Avoid excessive raw, cold foods or icy drinks',
      'Use salt in moderation (in soups, for example)',
      'Address fears gradually through journaling or supportive counseling'
    ],
    acupoints: [
      {
        name: 'Kidney 3 (Tai Xi)',
        location: 'In the depression midway between the inner ankle bone and the Achilles tendon',
        benefits: 'Tonifies Kidney yin and yang, strengthens the lower back and knees',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Kidney 1 (Yong Quan)',
        location: 'On the sole of the foot, in the depression formed when the foot is curled, at the junction of the front and middle third of the sole',
        benefits: 'Grounds energy, calms the mind, and strengthens the Kidneys',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      },
      {
        name: 'Bladder 23 (Shen Shu)',
        location: 'On the lower back, about two finger-widths away from the spine at the level of the second lumbar vertebra',
        benefits: 'Strengthens the Kidneys and benefits the lower back',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  }
];

const TcmElementsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSymptoms, setSelectedSymptoms] = useState<{[key: string]: boolean}>({});
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [dominantElement, setDominantElement] = useState<string | null>(null);
  
  // Function to toggle symptom selection
  const toggleSymptom = (elementId: string, symptomIndex: number) => {
    const symptomKey = `${elementId}-${symptomIndex}`;
    setSelectedSymptoms(prev => ({
      ...prev,
      [symptomKey]: !prev[symptomKey]
    }));
  };
  
  // Calculate the dominant element based on selected symptoms
  useEffect(() => {
    // Only analyze if there are symptoms selected
    if (Object.values(selectedSymptoms).filter(v => v).length > 0) {
      // Count symptoms for each element
      const elementCounts = elementsData.reduce((counts, element) => {
        const elementSymptomCount = element.symptoms.reduce((count, _, index) => {
          const isSelected = selectedSymptoms[`${element.id}-${index}`] || false;
          return isSelected ? count + 1 : count;
        }, 0);
        
        return {
          ...counts,
          [element.id]: elementSymptomCount
        };
      }, {} as {[key: string]: number});
      
      // Find the element with the most symptoms
      let maxCount = 0;
      let dominant: string | null = null;
      
      Object.entries(elementCounts).forEach(([elementId, count]) => {
        if (count > maxCount) {
          maxCount = count;
          dominant = elementId;
        }
      });
      
      // Set the dominant element if there's at least one symptom
      setDominantElement(maxCount > 0 ? dominant : null);
    } else {
      setDominantElement(null);
    }
  }, [selectedSymptoms]);
  
  // Handle analyzing symptoms
  const handleAnalyzeSymptoms = () => {
    setShowRecommendation(true);
    
    // If a dominant element is found, activate that element's tab
    if (dominantElement) {
      setActiveElement(dominantElement);
      setActiveTab('overview');
      
      // Scroll to the element details section
      const elementDetailsSection = document.getElementById('element-details');
      if (elementDetailsSection) {
        elementDetailsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral py-6 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Five Elements of Traditional Chinese Medicine</h1>
          <p className="text-xl text-neutral-dark">Understanding the relationships between elements, organs, and health</p>
        </div>
        
        {/* Five Elements Cycle Visualization */}
        <FiveElementsCycle />
        
        {/* Organ System Map */}
        <OrganSystemMap />
        
        {/* Symptom Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">Check Your Symptoms</h2>
            <button
              onClick={handleAnalyzeSymptoms}
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark flex items-center"
              disabled={Object.values(selectedSymptoms).filter(v => v).length === 0}
            >
              Analyze Symptoms
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <p className="text-neutral-dark mb-6">
            Select the symptoms you're experiencing to get insights about which element might be out of balance.
            This is a simple assessment tool and not a substitute for professional medical advice.
          </p>
          
          {/* Symptom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elementsData.map((element) => (
              <div key={element.id} className={`border ${element.borderColor} rounded-lg p-4 ${element.color}`}>
                <h3 className={`text-lg font-semibold ${element.textColor} flex items-center`}>
                  <span className="mr-2">{element.icon}</span>
                  {element.name} Element
                </h3>
                <p className="text-sm text-taupe mb-3">{element.chineseName}</p>
                
                <div className="space-y-2">
                  {element.symptoms.slice(0, 5).map((symptom, index) => (
                    <div 
                      key={`${element.id}-symptom-${index}`}
                      className="flex items-start"
                    >
                      <div 
                        className={`flex-shrink-0 h-5 w-5 border rounded cursor-pointer mr-2 ${
                          selectedSymptoms[`${element.id}-${index}`] 
                            ? `${element.accentColor} text-white` 
                            : 'border-gray-300 bg-white'
                        } flex items-center justify-center`}
                        onClick={() => toggleSymptom(element.id, index)}
                      >
                        {selectedSymptoms[`${element.id}-${index}`] && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                      <label 
                        className="text-sm text-neutral-dark cursor-pointer"
                        onClick={() => toggleSymptom(element.id, index)}
                      >
                        {symptom}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Recommendation Section */}
          {showRecommendation && dominantElement && (
            <div className="mt-8 p-5 border rounded-lg animate-fadeIn">
              {elementsData.filter(e => e.id === dominantElement).map(element => (
                <div key={element.id} className={`${element.color} p-4 rounded-lg border ${element.borderColor}`}>
                  <h3 className={`text-xl font-semibold ${element.textColor} flex items-center`}>
                    <span className="mr-2">{element.icon}</span>
                    Your answers suggest an imbalance in the {element.name} element
                  </h3>
                  <p className="mt-2 text-neutral-dark">
                    Based on your symptom selection, you may be experiencing an imbalance related to your {element.organs}.
                    Consider exploring the {element.name} element section below for self-care recommendations.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setActiveElement(element.id);
                        setActiveTab('selfCare');
                        const elementDetailsSection = document.getElementById('element-details');
                        if (elementDetailsSection) {
                          elementDetailsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`px-4 py-2 text-white rounded-md ${element.buttonColor} flex items-center`}
                    >
                      View Self-Care Tips
                      <ArrowDown className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Element Details Section */}
        <div id="element-details" className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Detailed Element Information</h2>
          
          {/* Element Selector Tabs */}
          <div className="flex flex-wrap border-b mb-6">
            {elementsData.map((element) => (
              <button
                key={element.id}
                className={`px-4 py-2 mr-2 rounded-t-lg ${
                  activeElement === element.id 
                    ? `${element.color} border-b-2 ${element.borderColor} font-medium` 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => {
                  setActiveElement(element.id);
                  setActiveTab('overview');
                }}
              >
                <span className="mr-1">{element.icon}</span>
                {element.name}
              </button>
            ))}
          </div>
          
          {/* Selected Element Content */}
          {activeElement ? (
            <div className="animate-fadeIn">
              {elementsData.filter(e => e.id === activeElement).map(element => (
                <div key={element.id}>
                  {/* Content Navigation Tabs */}
                  <div className="flex flex-wrap mb-4 border-b">
                    <button
                      className={`px-4 py-2 mr-2 ${
                        activeTab === 'overview' 
                          ? `border-b-2 ${element.borderColor} font-medium` 
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`px-4 py-2 mr-2 ${
                        activeTab === 'symptoms' 
                          ? `border-b-2 ${element.borderColor} font-medium` 
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('symptoms')}
                    >
                      Symptoms
                    </button>
                    <button
                      className={`px-4 py-2 mr-2 ${
                        activeTab === 'selfCare' 
                          ? `border-b-2 ${element.borderColor} font-medium` 
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('selfCare')}
                    >
                      Self-Care
                    </button>
                    <button
                      className={`px-4 py-2 mr-2 ${
                        activeTab === 'acupoints' 
                          ? `border-b-2 ${element.borderColor} font-medium` 
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('acupoints')}
                    >
                      Acupoints
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="p-2">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div>
                        <div className={`p-4 rounded-lg ${element.color} border ${element.borderColor} mb-6`}>
                          <h3 className={`text-xl font-semibold ${element.textColor} flex items-center`}>
                            <span className="mr-2">{element.icon}</span>
                            {element.name} Element ({element.chineseName})
                          </h3>
                          <p className="mt-2 text-neutral-dark">{element.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-primary mb-2">Associated Organs</h4>
                            <p className="text-neutral-dark">{element.organs}</p>
                            
                            <h4 className="font-semibold text-primary mt-4 mb-2">Key Traits</h4>
                            <ul className="space-y-1 text-neutral-dark">
                              <li><span className="font-medium">Sense Organ:</span> {element.traits.sense}</li>
                              <li><span className="font-medium">Tissue:</span> {element.traits.tissue}</li>
                              <li><span className="font-medium">Emotion:</span> {element.traits.emotion}</li>
                              <li><span className="font-medium">Color:</span> {element.traits.color}</li>
                              <li><span className="font-medium">Season:</span> {element.traits.season}</li>
                              <li><span className="font-medium">Taste:</span> {element.traits.taste}</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-primary mb-2">Element Relationships</h4>
                            <ul className="space-y-1 text-neutral-dark">
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
                      </div>
                    )}
                    
                    {/* Symptoms Tab */}
                    {activeTab === 'symptoms' && (
                      <div>
                        <h3 className={`text-xl font-semibold ${element.textColor} mb-4`}>Common Symptoms of {element.name} Element Imbalance</h3>
                        <p className="text-neutral-dark mb-4">
                          When the {element.name} element is out of balance, you may experience some of these symptoms:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {element.symptoms.map((symptom, index) => (
                            <div 
                              key={index} 
                              className={`p-3 ${element.color} rounded-lg border ${element.borderColor} flex items-center`}
                            >
                              <Info className={`h-5 w-5 ${element.textColor} mr-2 flex-shrink-0`} />
                              <span className="text-neutral-dark">{symptom}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 bg-neutral rounded-lg">
                          <p className="text-sm text-secondary italic flex items-center">
                            <Info className="h-4 w-4 text-secondary mr-2" />
                            Note: Symptoms may overlap between elements and can have multiple causes. This information is for educational purposes only.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Self-Care Tab */}
                    {activeTab === 'selfCare' && (
                      <div>
                        <h3 className={`text-xl font-semibold ${element.textColor} mb-4`}>Self-Care for {element.name} Element Balance</h3>
                        <p className="text-neutral-dark mb-4">
                          These practices can help restore balance to your {element.name} element:
                        </p>
                        
                        <div className="space-y-4 mb-6">
                          {element.selfCare.map((tip, index) => (
                            <div 
                              key={index} 
                              className={`p-4 rounded-lg flex items-start ${index % 2 === 0 ? element.color : 'bg-white border'}`}
                            >
                              <div className={`${element.accentColor} text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3`}>
                                {index + 1}
                              </div>
                              <span className="text-neutral-dark">{tip}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 bg-neutral rounded-lg">
                          <h4 className="font-medium text-primary mb-2">Dietary Suggestions</h4>
                          <p className="text-neutral-dark mb-2">
                            Foods that support the {element.name} element often have these characteristics:
                          </p>
                          <ul className="list-disc pl-5 text-neutral-dark">
                            {element.id === 'wood' && (
                              <>
                                <li>Sour flavor: lemon, vinegar, pickled vegetables</li>
                                <li>Green foods: leafy greens, broccoli, green apples</li>
                                <li>Cleansing foods: dandelion, milk thistle, turmeric</li>
                              </>
                            )}
                            {element.id === 'fire' && (
                              <>
                                <li>Bitter flavor: dark leafy greens, coffee, bitter melon</li>
                                <li>Red foods: tomatoes, red peppers, strawberries</li>
                                <li>Cooling foods: watermelon, cucumber, mint</li>
                              </>
                            )}
                            {element.id === 'earth' && (
                              <>
                                <li>Sweet flavor: sweet potatoes, carrots, dates</li>
                                <li>Yellow/orange foods: pumpkin, corn, yellow peppers</li>
                                <li>Warming spices: ginger, cinnamon, nutmeg</li>
                              </>
                            )}
                            {element.id === 'metal' && (
                              <>
                                <li>Pungent/spicy flavor: onions, garlic, radish</li>
                                <li>White foods: rice, cauliflower, white mushrooms</li>
                                <li>Moistening foods: pears, honey, seaweed</li>
                              </>
                            )}
                            {element.id === 'water' && (
                              <>
                                <li>Salty flavor: sea salt, seaweed, miso</li>
                                <li>Blue/black foods: blueberries, black beans, black rice</li>
                                <li>Warming foods: bone broth, walnuts, kidney beans</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {/* Acupoints Tab */}
                    {activeTab === 'acupoints' && (
                      <div>
                        <h3 className={`text-xl font-semibold ${element.textColor} mb-4`}>Key Acupoints for {element.name} Element</h3>
                        <p className="text-neutral-dark mb-4">
                          These acupressure points can help balance the {element.name} element. Press and massage each point gently for 1-2 minutes while taking deep breaths.
                        </p>
                        
                        <div className="space-y-6 mb-6">
                          {element.acupoints.map((point, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                              <div className={`p-4 ${element.color}`}>
                                <h4 className={`font-semibold ${element.textColor}`}>{point.name}</h4>
                              </div>
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="md:col-span-2">
                                    <p className="text-neutral-dark mb-3">
                                      <span className="font-medium">Location:</span> {point.location}
                                    </p>
                                    <p className="text-neutral-dark">
                                      <span className="font-medium">Benefits:</span> {point.benefits}
                                    </p>
                                  </div>
                                  {/* This is a placeholder - in a real implementation, we would use specific acupoint images */}
                                  <div className="relative h-40 bg-neutral rounded">
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-dark text-sm">
                                      [Acupoint Diagram]
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="p-4 bg-secondary/10 rounded-lg border border-secondary">
                          <p className="text-sm text-secondary italic flex items-center">
                            <Info className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                            Acupressure is generally safe, but consult a qualified practitioner before treating any serious conditions. Pregnant women should avoid certain points, particularly on the lower abdomen, low back, and points that can strongly stimulate the body.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-dark">
              <p className="mb-4">Select an element above to view detailed information about its properties, symptoms, and self-care recommendations.</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {elementsData.map(element => (
                  <button
                    key={element.id}
                    onClick={() => {
                      setActiveElement(element.id);
                      setActiveTab('overview');
                    }}
                    className={`px-4 py-2 rounded-full ${element.color} ${element.hoverColor} border ${element.borderColor} ${element.textColor}`}
                  >
                    <span className="mr-1">{element.icon}</span>
                    {element.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Resources and Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Next Steps in Your TCM Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">Understand Your Constitution</h3>
              <p className="text-neutral-dark mb-4">
                While the Five Elements help us understand the relationships between organs and symptoms,
                your TCM Body Constitution provides insight into your overall tendencies and predispositions.
              </p>
              <p className="text-neutral-dark mb-6">
                Take our comprehensive Body Constitution questionnaire to receive personalized recommendations
                for your unique body type.
              </p>
              <Link
                to="/survey"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark"
              >
                Take the Constitution Questionnaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">Learn Practical TCM Self-Care</h3>
              <p className="text-neutral-dark mb-4">
                Deepen your understanding of TCM and learn practical techniques for daily self-care with our
                "Healthy Ageing with TCM" eCourse.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-dark mb-6">
                <li>Understand the dynamics of Yin & Yang balance</li>
                <li>Learn practical acupressure, tapping, and guasha techniques</li>
                <li>Develop element-based self-care routines</li>
                <li>Address common issues like headaches, eye strain, and backaches</li>
              </ul>
              <a 
                href="https://ouch.com.sg/ecourses/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark"
              >
                Explore eCourses
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="mt-10 p-5 bg-neutral rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-3">Disclaimer</h3>
            <p className="text-sm text-neutral-dark">
              This information is provided for educational purposes only and is not intended to diagnose, 
              treat, cure, or prevent any disease. Always consult with a qualified healthcare provider for 
              medical advice. The self-care suggestions and acupressure points described are general practices 
              that may not be suitable for everyone. If you experience persistent symptoms or have a medical 
              condition, please seek appropriate professional care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TcmElementsPage;