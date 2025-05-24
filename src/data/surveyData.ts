import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'A',
    name: 'Neutral',
    chineseName: '平和质 (Ping He Zhi)',
    description: 'This constitution represents a balanced state where yin and yang are in harmony.',
    questions: [
      { id: 'A1', text: 'Do you feel energetic?', isReversed: false },
      { id: 'A2', text: 'Do you get tired easily?', isReversed: true },
      { id: 'A3', text: 'Do you find your voice soft and weak?', isReversed: true },
      { id: 'A4', text: 'Do you feel moody, low-spirited?', isReversed: true },
      { id: 'A5', text: 'Comparing to most people, do you have difficulty withstanding coldness? (in winter temperature, air-conditioning, electric fan)', isReversed: true },
      { id: 'A6', text: 'Can you adapt to natural, environmental or societal changes?', isReversed: false },
      { id: 'A7', text: 'Do you suffer from sleeplessness?', isReversed: true },
      { id: 'A8', text: 'Are you forgetful?', isReversed: true }
    ]
  },
  {
    id: 'B',
    name: 'Qi-deficient',
    chineseName: '气虚质 (Qi Xu Zhi)',
    description: 'This constitution is characterized by a lack of vital energy (Qi).',
    questions: [
      { id: 'B1', text: 'Do you get tired easily?' },
      { id: 'B2', text: 'Do you get breathless easily?' },
      { id: 'B3', text: 'Do you get frightened easily?' },
      { id: 'B4', text: 'Do you feel giddy or feel giddy upon standing up easily?' },
      { id: 'B5', text: 'Comparing to most people, do you catch a cold easily?' },
      { id: 'B6', text: 'Do you prefer quietness and/or unwilling to speak up?' },
      { id: 'B7', text: 'Do you find your voice soft and weak?' },
      { id: 'B8', text: 'Do you sweat easily after slight exertion?' }
    ]
  },
  {
    id: 'C',
    name: 'Yang-deficient',
    chineseName: '阳虚质 (Yang Xu Zhi)',
    description: 'This constitution shows signs of inadequate warmth and activity in the body.',
    questions: [
      { id: 'C1', text: 'Do you feel cold on your limbs?' },
      { id: 'C2', text: 'Do you feel cold on your abdomen, back, waist or knee?' },
      { id: 'C3', text: 'Comparing to most people, do you feel cold and/or do you tend to put on more clothing?' },
      { id: 'C4', text: 'Comparing to most people, do you have difficulty withstanding coldness? (in winter temperature, air-conditioning, electric fan)' },
      { id: 'C5', text: 'Comparing to most people, do you catch a cold easily?' },
      { id: 'C6', text: 'Do you feel uncomfortable after taking cold food/drinks or are you afraid of taking cold food/drinks?' },
      { id: 'C7', text: 'After taking cold food/drinks, do you get diarrhea easily?' }
    ]
  },
  {
    id: 'D',
    name: 'Yin-deficient',
    chineseName: '阴虚质 (Yin Xu Zhi)',
    description: 'This constitution lacks the cooling, moistening aspects of the body.',
    questions: [
      { id: 'D1', text: 'Do you feel warm on your palm and/or sole?' },
      { id: 'D2', text: 'Do you feel warm on your body and/or your face?' },
      { id: 'D3', text: 'Do you feel dry on your skin or lips?' },
      { id: 'D4', text: 'Comparing to most people, do your lips appear redder?' },
      { id: 'D5', text: 'Do you constipate easily or is your stool dry?' },
      { id: 'D6', text: 'Do you feel dryness in your eyes?' },
      { id: 'D7', text: 'After taking cold food/drinks, do you get diarrhea easily?' },
      { id: 'D8', text: 'Do you thirsty or dry in your mouth or throat and always wanting to drink?' }
    ]
  },
  {
    id: 'E',
    name: 'Phlegm-dampness',
    chineseName: '痰湿质 (Tan Shi Zhi)',
    description: 'This constitution has excessive moisture that congeals into phlegm.',
    questions: [
      { id: 'E1', text: 'Do you feel stuffy in your chest or bloated in your abdomen?' },
      { id: 'E2', text: 'Do you feel heaviness in your body?' },
      { id: 'E3', text: 'Is your abdomen fat and flabby?' },
      { id: 'E4', text: 'Is your forehead oily?' },
      { id: 'E5', text: 'Compare to most people, is your upper eyelid swollen?' },
      { id: 'E6', text: 'Do you feel stickiness in your mouth?' },
      { id: 'E7', text: 'Do you normally has phlegm, especially phlegm stuck in the throat?' },
      { id: 'E8', text: 'Is the coating on your tongue thick and sticky or do you feel the coating of your tongue is sticky?' }
    ]
  },
  {
    id: 'F',
    name: 'Damp-heat',
    chineseName: '湿热质 (Shi Re Zhi)',
    description: 'This constitution shows signs of excess heat combined with dampness.',
    questions: [
      { id: 'F1', text: 'Do you feel greasiness on your face or nose area?' },
      { id: 'F2', text: 'Do you have sores or furuncles easily?' },
      { id: 'F3', text: 'Do you feel bitterness or strange taste in your mouth?' },
      { id: 'F4', text: 'Is your stool sticky and/or unable to clear your bowels completely?' },
      { id: 'F5', text: 'Do you feel heaty in your urethra during urination and/or your urine is darker in colour?' },
      { id: 'F6', text: '(female only) Is your vaginal discharge yellowish' },
      { id: 'F7', text: '(male only) Is your scrotal region damp or moist?' }
    ]
  },
  {
    id: 'G',
    name: 'Blood-stasis',
    chineseName: '血瘀质 (Xue Yu Zhi)',
    description: 'This constitution has poor circulation leading to blood stagnation.',
    questions: [
      { id: 'G1', text: 'Do you have bruises for no reason?' },
      { id: 'G2', text: 'Do you have visible streaks of blood capillaries (telangiectasias) on your cheeks?' },
      { id: 'G3', text: 'Do you feel pain in any part of your body?' },
      { id: 'G4', text: 'Is your facial complexion dim and dark or do you get dark patches (melasma) on your face easily?' },
      { id: 'G5', text: 'Do you get dark eye-circles (periorbital dark circles) easily?' },
      { id: 'G6', text: 'Are you forgetful?' },
      { id: 'G7', text: 'Is your lip colour darker?' }
    ]
  },
  {
    id: 'H',
    name: 'Qi-stagnation',
    chineseName: '气郁质 (Qi Yu Zhi)',
    description: 'This constitution has energy that is stuck or not flowing properly.',
    questions: [
      { id: 'H1', text: 'Do you feel low-spirited or depressive?' },
      { id: 'H2', text: 'Do you feel stressed or worries easily?' },
      { id: 'H3', text: 'Do you feel overly sentimental and/or easily affected?' },
      { id: 'H4', text: 'Do you feel scared or get scared easily?' },
      { id: 'H5', text: 'Do you feel distending pain in the hypochondria or breasts?' },
      { id: 'H6', text: 'Do you sigh for no reason?' },
      { id: 'H7', text: 'Do you feel something stuck in the throat that you\'re unable to spit it out or swallow it down?' }
    ]
  },
  {
    id: 'I',
    name: 'Special',
    chineseName: '特禀质 (Te Bing Zhi)',
    description: 'This constitution has unique characteristics that do not fit other patterns.',
    questions: [
      { id: 'I1', text: 'Do you sneeze even when you have not caught a cold?' },
      { id: 'I2', text: 'Do you get nose-block or running nose even when you have not caught a cold?' },
      { id: 'I3', text: 'Do you cough and gasp when there is a peculiar smell or when there is climate or temperature change?' },
      { id: 'I4', text: 'Are you allergic to medication, food, smell, pollen, seasonal/climatic/temperature changes?' },
      { id: 'I5', text: 'Do you have hives easily?' },
      { id: 'I6', text: 'Do you have skin allergies and followed by getting purpura on your skin?' },
      { id: 'I7', text: 'Do your skin get red and get scratched marks after a scratch?' }
    ]
  }
];

export const likertOptions = [
  { value: 1, label: 'Never' },
  { value: 2, label: 'Seldom' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Always' }
];

export const getThresholds = (categoryId: string): { normal: number; positive: number } => {
  const thresholds = {
    'A': { normal: 27.2, positive: 27.3 },
    'B': { normal: 17.6, positive: 20.8 },
    'C': { normal: 15.4, positive: 18.2 },
    'D': { normal: 17.6, positive: 20.8 },
    'E': { normal: 17.6, positive: 20.8 },
    'F': { normal: 13.2, positive: 15.6 },
    'G': { normal: 15.4, positive: 18.2 },
    'H': { normal: 15.4, positive: 18.2 },
    'I': { normal: 15.4, positive: 18.2 }
  };
  
  return thresholds[categoryId as keyof typeof thresholds];
};