import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getQuestionText: (text: string) => string;
  getCategoryName: (id: string, name: string) => string;
  getCategoryDescription: (id: string, description: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Landing Page
    'title': 'Traditional Chinese Medicine Body Constitution Survey',
    'subtitle': 'Discover your body constitution type according to Traditional Chinese Medicine principles',
    'about.title': 'About This Survey',
    'about.description': 'This comprehensive survey analyzes your body constitution based on Traditional Chinese Medicine (TCM) principles. It evaluates nine distinct constitution types through a series of questions about your physical and emotional patterns.',
    'about.insight': 'Your responses will help identify your dominant constitution types, providing insights into your health tendencies and potential areas for balance and improvement.',
    'types.title': 'The Nine TCM Constitution Types:',
    'type.a': 'Type A: Neutral - Balanced state where yin and yang are in harmony',
    'type.b': 'Type B: Qi-deficient - Characterized by lack of vital energy',
    'type.c': 'Type C: Yang-deficient - Shows signs of inadequate warmth and activity',
    'type.d': 'Type D: Yin-deficient - Lacks cooling, moistening aspects',
    'type.e': 'Type E: Phlegm-dampness - Has excessive moisture that congeals',
    'type.f': 'Type F: Damp-heat - Shows excess heat combined with dampness',
    'type.g': 'Type G: Blood-stasis - Poor circulation leading to blood stagnation',
    'type.h': 'Type H: Qi-stagnation - Energy that is stuck or not flowing properly',
    'type.i': 'Type I: Special - Unique characteristics that don\'t fit other patterns',
    'instructions.title': 'Survey Instructions:',
    'instructions.step1': 'The survey contains questions divided into nine categories.',
    'instructions.step2': 'For each question, select the option that best reflects your experience:',
    'instructions.never': 'Never (1) - You never experience this or it doesn\'t apply to you',
    'instructions.seldom': 'Seldom (2) - You rarely experience this (less than once a month)',
    'instructions.sometimes': 'Sometimes (3) - You occasionally experience this (a few times a month)',
    'instructions.often': 'Often (4) - You frequently experience this (a few times a week)',
    'instructions.always': 'Always (5) - You experience this daily or almost daily',
    'instructions.step3': 'Answer honestly based on your typical condition, not temporary states.',
    'instructions.step4': 'Complete all questions to receive accurate results.',
    'instructions.step5': 'The survey takes approximately 10-15 minutes to complete.',
    'name.label': 'Enter your name:',
    'name.placeholder': 'Your name',
    'gender.label': 'Please select your gender:',
    'gender.female': 'Female',
    'gender.male': 'Male',
    'gender.required': '* This selection is required as some questions are gender-specific',
    'begin.button': 'Begin Survey',

    // Survey Form
    'survey.title': 'TCM Body Constitution Survey',
    'survey.instructions': 'Please answer all questions based on your typical condition',
    'survey.progress': '% completed',
    'survey.answered': 'of',
    'survey.questions': 'questions answered',
    'survey.category': 'Category',
    'survey.of': 'of',
    'survey.prev': 'Previous',
    'survey.next': 'Next',
    'survey.submit': 'Submit',
    'survey.complete': 'Complete Survey and View Results',

    // Question Options
    'option.never': 'Never',
    'option.seldom': 'Seldom',
    'option.sometimes': 'Sometimes',
    'option.often': 'Often',
    'option.always': 'Always',
    'reversed.label': '(Reversed scoring)',

    // Results Page
    'results.title': 'Your TCM Constitution Results',
    'results.completed': 'Completed on',
    'results.name': 'Name:',
    'results.take.again': 'Take Survey Again',
    'results.copy': 'Copy Results',
    'results.download.csv': 'Download CSV',
    'results.generate.pdf': 'Generate PDF',
    'results.print': 'Print Results',
    'results.generating': 'Generating...',
    'results.summary': 'Summary',
    'results.scoring.info': 'Show scoring info',
    'results.hide.scoring': 'Hide scoring info',
    'results.scoring.title': 'Special Scoring for Neutral Constitution',
    'results.scoring.desc': 'For Type A (Neutral), some questions use inverted scoring as they represent positive traits when answered "Always":',
    'results.primary': 'Primary Constitution Types:',
    'results.secondary': 'Secondary Constitution Types:',
    'results.no.primary': 'No primary constitution types identified.',
    'results.distribution': 'Constitution Types Distribution',
    'results.detailed': 'Detailed Results',
    'results.score': 'Score:',
    'results.raw.score': 'Raw Score:',
    'results.status': 'Status:',
    'results.normal': 'Normal (N)',
    'results.positive': 'Positive indication (Y)',
    'results.intermediate': 'Intermediate',
    'results.lifestyle': 'Lifestyle Recommendations:',
    'results.acupoint': 'Acupoint Therapy:',
    'results.acupoint.warning': 'Consult a licensed acupuncturist before any acupoint treatment.',
    'results.herbal': 'Herbal Support:',
    'results.herbal.warning': 'Always consult with a TCM practitioner before taking any herbs.',
    'results.what.next': 'What to do with these results?',
    'results.next.desc1': 'Your TCM constitution results offer valuable insights into your body\'s natural tendencies and imbalances. These insights can guide lifestyle, dietary, and health practice choices to help you achieve better balance.',
    'results.next.desc2': 'For the most personalized guidance based on these results, consider consulting with a qualified TCM practitioner who can develop a tailored plan addressing your specific constitution types, including acupuncture treatments and herbal formulations.',
    'results.disclaimer': 'Disclaimer: This survey is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider. The acupoints and herbs listed should only be used under professional guidance.',

    // Footer
    'footer.proudly': 'Proudly crafted by',

    // Classification
    'class.not': 'Not',
    'class.somewhat': 'Somewhat',
    'class.forsure': 'For sure',

    // Category Names
    'category.A.name': 'Neutral',
    'category.B.name': 'Qi-deficient',
    'category.C.name': 'Yang-deficient',
    'category.D.name': 'Yin-deficient',
    'category.E.name': 'Phlegm-dampness',
    'category.F.name': 'Damp-heat',
    'category.G.name': 'Blood-stasis',
    'category.H.name': 'Qi-stagnation',
    'category.I.name': 'Special',

    // Category Descriptions
    'category.A.desc': 'This constitution represents a balanced state where yin and yang are in harmony.',
    'category.B.desc': 'This constitution is characterized by a lack of vital energy (Qi).',
    'category.C.desc': 'This constitution shows signs of inadequate warmth and activity in the body.',
    'category.D.desc': 'This constitution lacks the cooling, moistening aspects of the body.',
    'category.E.desc': 'This constitution has excessive moisture that congeals into phlegm.',
    'category.F.desc': 'This constitution shows signs of excess heat combined with dampness.',
    'category.G.desc': 'This constitution has poor circulation leading to blood stagnation.',
    'category.H.desc': 'This constitution has energy that is stuck or not flowing properly.',
    'category.I.desc': 'This constitution has unique characteristics that do not fit other patterns.',

    // Questions Type A
    'question.A1': 'Do you feel energetic?',
    'question.A2': 'Do you get tired easily?',
    'question.A3': 'Do you find your voice soft and weak?',
    'question.A4': 'Do you feel moody, low-spirited?',
    'question.A5': 'Comparing to most people, do you have difficulty withstanding coldness? (in winter temperature, air-conditioning, electric fan)',
    'question.A6': 'Can you adapt to natural, environmental or societal changes?',
    'question.A7': 'Do you suffer from sleeplessness?',
    'question.A8': 'Are you forgetful?',

    // Questions Type B
    'question.B1': 'Do you get tired easily?',
    'question.B2': 'Do you get breathless easily?',
    'question.B3': 'Do you get frightened easily?',
    'question.B4': 'Do you feel giddy or feel giddy upon standing up easily?',
    'question.B5': 'Comparing to most people, do you catch a cold easily?',
    'question.B6': 'Do you prefer quietness and/or unwilling to speak up?',
    'question.B7': 'Do you find your voice soft and weak?',
    'question.B8': 'Do you sweat easily after slight exertion?',

    // Questions Type C
    'question.C1': 'Do you feel cold on your limbs?',
    'question.C2': 'Do you feel cold on your abdomen, back, waist or knee?',
    'question.C3': 'Comparing to most people, do you feel cold and/or do you tend to put on more clothing?',
    'question.C4': 'Comparing to most people, do you have difficulty withstanding coldness? (in winter temperature, air-conditioning, electric fan)',
    'question.C5': 'Comparing to most people, do you catch a cold easily?',
    'question.C6': 'Do you feel uncomfortable after taking cold food/drinks or are you afraid of taking cold food/drinks?',
    'question.C7': 'After taking cold food/drinks, do you get diarrhea easily?',

    // Questions Type D
    'question.D1': 'Do you feel warm on your palm and/or sole?',
    'question.D2': 'Do you feel warm on your body and/or your face?',
    'question.D3': 'Do you feel dry on your skin or lips?',
    'question.D4': 'Comparing to most people, do your lips appear redder?',
    'question.D5': 'Do you constipate easily or is your stool dry?',
    'question.D6': 'Do you feel dryness in your eyes?',
    'question.D7': 'After taking cold food/drinks, do you get diarrhea easily?',
    'question.D8': 'Do you thirsty or dry in your mouth or throat and always wanting to drink?',

    // Questions Type E
    'question.E1': 'Do you feel stuffy in your chest or bloated in your abdomen?',
    'question.E2': 'Do you feel heaviness in your body?',
    'question.E3': 'Is your abdomen fat and flabby?',
    'question.E4': 'Is your forehead oily?',
    'question.E5': 'Compare to most people, is your upper eyelid swollen?',
    'question.E6': 'Do you feel stickiness in your mouth?',
    'question.E7': 'Do you normally has phlegm, especially phlegm stuck in the throat?',
    'question.E8': 'Is the coating on your tongue thick and sticky or do you feel the coating of your tongue is sticky?',

    // Questions Type F
    'question.F1': 'Do you feel greasiness on your face or nose area?',
    'question.F2': 'Do you have sores or furuncles easily?',
    'question.F3': 'Do you feel bitterness or strange taste in your mouth?',
    'question.F4': 'Is your stool sticky and/or unable to clear your bowels completely?',
    'question.F5': 'Do you feel heaty in your urethra during urination and/or your urine is darker in colour?',
    'question.F6': '(female only) Is your vaginal discharge yellowish',
    'question.F7': '(male only) Is your scrotal region damp or moist?',

    // Questions Type G
    'question.G1': 'Do you have bruises for no reason?',
    'question.G2': 'Do you have visible streaks of blood capillaries (telangiectasias) on your cheeks?',
    'question.G3': 'Do you feel pain in any part of your body?',
    'question.G4': 'Is your facial complexion dim and dark or do you get dark patches (melasma) on your face easily?',
    'question.G5': 'Do you get dark eye-circles (periorbital dark circles) easily?',
    'question.G6': 'Are you forgetful?',
    'question.G7': 'Is your lip colour darker?',

    // Questions Type H
    'question.H1': 'Do you feel low-spirited or depressive?',
    'question.H2': 'Do you feel stressed or worries easily?',
    'question.H3': 'Do you feel overly sentimental and/or easily affected?',
    'question.H4': 'Do you feel scared or get scared easily?',
    'question.H5': 'Do you feel distending pain in the hypochondria or breasts?',
    'question.H6': 'Do you sigh for no reason?',
    'question.H7': 'Do you feel something stuck in the throat that you\'re unable to spit it out or swallow it down?',

    // Questions Type I
    'question.I1': 'Do you sneeze even when you have not caught a cold?',
    'question.I2': 'Do you get nose-block or running nose even when you have not caught a cold?',
    'question.I3': 'Do you cough and gasp when there is a peculiar smell or when there is climate or temperature change?',
    'question.I4': 'Are you allergic to medication, food, smell, pollen, seasonal/climatic/temperature changes?',
    'question.I5': 'Do you have hives easily?',
    'question.I6': 'Do you have skin allergies and followed by getting purpura on your skin?',
    'question.I7': 'Do your skin get red and get scratched marks after a scratch?'
  },
  zh: {
    // Landing Page
    'title': '传统中医体质调查',
    'subtitle': '根据传统中医原理发现您的体质类型',
    'about.title': '关于此调查',
    'about.description': '这项全面的调查根据传统中医(TCM)原理分析您的体质。它通过一系列关于您的身体和情绪模式的问题评估九种不同的体质类型。',
    'about.insight': '您的回答将帮助确定您的主要体质类型，提供关于您的健康倾向和潜在平衡与改善领域的见解。',
    'types.title': '九种中医体质类型:',
    'type.a': '类型A: 平和质 - 阴阳平衡的状态',
    'type.b': '类型B: 气虚质 - 特点是缺乏生命能量',
    'type.c': '类型C: 阳虚质 - 显示出缺乏温暖和活力的迹象',
    'type.d': '类型D: 阴虚质 - 缺乏冷却、滋润方面',
    'type.e': '类型E: 痰湿质 - 有凝结的过多水分',
    'type.f': '类型F: 湿热质 - 显示过多的热与湿气结合',
    'type.g': '类型G: 血瘀质 - 血液循环不良导致血液淤滞',
    'type.h': '类型H: 气郁质 - 能量阻塞或不能正常流动',
    'type.i': '类型I: 特禀质 - 不适合其他模式的独特特征',
    'instructions.title': '调查说明:',
    'instructions.step1': '调查包含分为九个类别的问题。',
    'instructions.step2': '对于每个问题，选择最能反映您体验的选项:',
    'instructions.never': '从不 (1) - 您从不经历这种情况或它不适用于您',
    'instructions.seldom': '很少 (2) - 您很少经历这种情况(每月少于一次)',
    'instructions.sometimes': '有时 (3) - 您偶尔经历这种情况(每月几次)',
    'instructions.often': '经常 (4) - 您频繁经历这种情况(每周几次)',
    'instructions.always': '总是 (5) - 您每天或几乎每天都经历这种情况',
    'instructions.step3': '根据您的典型状况诚实回答，而不是临时状态。',
    'instructions.step4': '完成所有问题以获得准确结果。',
    'instructions.step5': '调查大约需要10-15分钟完成。',
    'name.label': '输入您的名字:',
    'name.placeholder': '您的名字',
    'gender.label': '请选择您的性别:',
    'gender.female': '女',
    'gender.male': '男',
    'gender.required': '* 此选择是必需的，因为某些问题是特定性别的',
    'begin.button': '开始调查',

    // Survey Form
    'survey.title': '中医体质调查',
    'survey.instructions': '请根据您的典型状况回答所有问题',
    'survey.progress': '% 已完成',
    'survey.answered': '已回答',
    'survey.questions': '个问题',
    'survey.category': '类别',
    'survey.of': '共',
    'survey.prev': '上一步',
    'survey.next': '下一步',
    'survey.submit': '提交',
    'survey.complete': '完成调查并查看结果',

    // Question Options
    'option.never': '从不',
    'option.seldom': '很少',
    'option.sometimes': '有时',
    'option.often': '经常',
    'option.always': '总是',
    'reversed.label': '(反向评分)',

    // Results Page
    'results.title': '您的中医体质结果',
    'results.completed': '完成于',
    'results.name': '姓名:',
    'results.take.again': '再次进行调查',
    'results.copy': '复制结果',
    'results.download.csv': '下载CSV',
    'results.generate.pdf': '生成PDF',
    'results.print': '打印结果',
    'results.generating': '生成中...',
    'results.summary': '摘要',
    'results.scoring.info': '显示评分信息',
    'results.hide.scoring': '隐藏评分信息',
    'results.scoring.title': '平和质的特殊评分',
    'results.scoring.desc': '对于类型A(平和质)，某些问题使用反向评分，因为它们在回答"总是"时代表积极特征:',
    'results.primary': '主要体质类型:',
    'results.secondary': '次要体质类型:',
    'results.no.primary': '未确定主要体质类型。',
    'results.distribution': '体质类型分布',
    'results.detailed': '详细结果',
    'results.score': '分数:',
    'results.raw.score': '原始分数:',
    'results.status': '状态:',
    'results.normal': '正常 (N)',
    'results.positive': '阳性指示 (Y)',
    'results.intermediate': '中间值',
    'results.lifestyle': '生活方式建议:',
    'results.acupoint': '穴位治疗:',
    'results.acupoint.warning': '在进行任何穴位治疗前请咨询持证针灸师。',
    'results.herbal': '草药支持:',
    'results.herbal.warning': '在服用任何草药之前，请务必咨询中医从业者。',
    'results.what.next': '如何利用这些结果?',
    'results.next.desc1': '您的中医体质结果提供了关于您身体自然倾向和不平衡的宝贵见解。这些见解可以指导生活方式、饮食和健康实践选择，帮助您实现更好的平衡。',
    'results.next.desc2': '要根据这些结果获得最个性化的指导，请考虑咨询合格的中医从业者，他们可以制定针对您特定体质类型的定制计划，包括针灸治疗和草药配方。',
    'results.disclaimer': '免责声明：本调查仅供教育目的，不能替代专业医疗建议、诊断或治疗。始终寻求您的医生或其他合格健康提供者的建议。列出的穴位和草药只能在专业指导下使用。',

    // Footer
    'footer.proudly': '自豪地由',

    // Classification
    'class.not': '非',
    'class.somewhat': '有些',
    'class.forsure': '确定',

    // Category Names
    'category.A.name': '平和质',
    'category.B.name': '气虚质',
    'category.C.name': '阳虚质',
    'category.D.name': '阴虚质',
    'category.E.name': '痰湿质',
    'category.F.name': '湿热质',
    'category.G.name': '血瘀质',
    'category.H.name': '气郁质',
    'category.I.name': '特禀质',

    // Category Descriptions
    'category.A.desc': '此体质表示阴阳处于和谐平衡的状态。',
    'category.B.desc': '此体质的特点是缺乏生命能量（气）。',
    'category.C.desc': '此体质显示出身体缺乏温暖和活力的迹象。',
    'category.D.desc': '此体质缺乏身体的冷却、滋润方面。',
    'category.E.desc': '此体质有凝结成痰的过多水分。',
    'category.F.desc': '此体质显示过多的热与湿气结合的迹象。',
    'category.G.desc': '此体质有导致血液淤滞的不良循环。',
    'category.H.desc': '此体质的能量被阻塞或不能正常流动。',
    'category.I.desc': '此体质有不适合其他模式的独特特征。',

    // Questions Type A
    'question.A1': '您感觉精力充沛吗？',
    'question.A2': '您容易疲劳吗？',
    'question.A3': '您觉得您的声音轻弱无力吗？',
    'question.A4': '您情绪低落、情绪不佳吗？',
    'question.A5': '与大多数人相比，您是否难以忍受寒冷？（在冬季温度、空调、电风扇下）',
    'question.A6': '您能适应自然、环境或社会变化吗？',
    'question.A7': '您失眠吗？',
    'question.A8': '您健忘吗？',

    // Questions Type B
    'question.B1': '您容易疲劳吗？',
    'question.B2': '您容易气喘吗？',
    'question.B3': '您容易受惊吗？',
    'question.B4': '您感到头晕或起立时容易头晕吗？',
    'question.B5': '与大多数人相比，您容易感冒吗？',
    'question.B6': '您是否喜欢安静和/或不愿意说话？',
    'question.B7': '您觉得您的声音轻弱无力吗？',
    'question.B8': '您稍微活动就容易出汗吗？',

    // Questions Type C
    'question.C1': '您四肢感到冷吗？',
    'question.C2': '您腹部、背部、腰部或膝盖感到冷吗？',
    'question.C3': '与大多数人相比，您感觉冷和/或倾向于穿更多衣服吗？',
    'question.C4': '与大多数人相比，您是否难以忍受寒冷？（在冬季温度、空调、电风扇下）',
    'question.C5': '与大多数人相比，您容易感冒吗？',
    'question.C6': '您在食用冷食/饮料后感到不适或害怕食用冷食/饮料吗？',
    'question.C7': '食用冷食/饮料后，您容易腹泻吗？',

    // Questions Type D
    'question.D1': '您手掌和/或脚底感到热吗？',
    'question.D2': '您身体和/或面部感到热吗？',
    'question.D3': '您皮肤或嘴唇感到干燥吗？',
    'question.D4': '与大多数人相比，您的嘴唇是否看起来更红？',
    'question.D5': '您容易便秘或大便干燥吗？',
    'question.D6': '您眼睛感到干涩吗？',
    'question.D7': '食用冷食/饮料后，您容易腹泻吗？',
    'question.D8': '您口渴或口腔或喉咙干燥，总是想喝水吗？',

    // Questions Type E
    'question.E1': '您胸闷或腹胀吗？',
    'question.E2': '您身体感到沉重吗？',
    'question.E3': '您的腹部肥胖松弛吗？',
    'question.E4': '您的前额油腻吗？',
    'question.E5': '与大多数人相比，您的上眼皮肿胀吗？',
    'question.E6': '您口腔感到黏腻吗？',
    'question.E7': '您通常有痰，特别是喉咙里有痰吗？',
    'question.E8': '您的舌苔厚腻或您感觉舌苔黏腻吗？',

    // Questions Type F
    'question.F1': '您的面部或鼻子区域感到油腻吗？',
    'question.F2': '您容易长疮或疖子吗？',
    'question.F3': '您口中感到苦涩或奇怪的味道吗？',
    'question.F4': '您的大便黏腻和/或无法完全清除肠道吗？',
    'question.F5': '排尿时尿道感到燥热和/或尿液颜色较深吗？',
    'question.F6': '（仅限女性）您的阴道分泌物发黄吗？',
    'question.F7': '（仅限男性）您的阴囊区域潮湿吗？',

    // Questions Type G
    'question.G1': '您无缘无故有瘀伤吗？',
    'question.G2': '您的脸颊上有可见的血管毛细血管（毛细血管扩张）吗？',
    'question.G3': '您身体任何部位感到疼痛吗？',
    'question.G4': '您的面色暗沉或容易在面部出现黑斑（黄褐斑）吗？',
    'question.G5': '您容易出现黑眼圈（眼周黑圈）吗？',
    'question.G6': '您健忘吗？',
    'question.G7': '您的唇色较深吗？',

    // Questions Type H
    'question.H1': '您感到情绪低落或抑郁吗？',
    'question.H2': '您容易感到压力或担忧吗？',
    'question.H3': '您感到过度感伤和/或容易受影响吗？',
    'question.H4': '您感到害怕或容易受惊吗？',
    'question.H5': '您肋骨下或乳房感到胀痛吗？',
    'question.H6': '您无缘无故叹气吗？',
    'question.H7': '您感到喉咙里有东西堵着，无法吐出或咽下吗？',

    // Questions Type I
    'question.I1': '您在没有感冒的情况下打喷嚏吗？',
    'question.I2': '您在没有感冒的情况下鼻塞或流鼻涕吗？',
    'question.I3': '当有异味或气候或温度变化时，您咳嗽和喘息吗？',
    'question.I4': '您对药物、食物、气味、花粉、季节性/气候/温度变化过敏吗？',
    'question.I5': '您容易起荨麻疹吗？',
    'question.I6': '您有皮肤过敏并随后在皮肤上出现紫癜吗？',
    'question.I7': '刮伤后您的皮肤变红并出现刮痕吗？'
  }
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Function to get the translated question text
  const getQuestionText = (text: string): string => {
    const questionId = text.substring(0, 2); // e.g., "A1", "B2", etc.
    const translationKey = `question.${questionId}`;
    return translations[language][translationKey] || text;
  };

  // Function to get the translated category name
  const getCategoryName = (id: string, name: string): string => {
    const translationKey = `category.${id}.name`;
    return translations[language][translationKey] || name;
  };

  // Function to get the translated category description
  const getCategoryDescription = (id: string, description: string): string => {
    const translationKey = `category.${id}.desc`;
    return translations[language][translationKey] || description;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getQuestionText, getCategoryName, getCategoryDescription }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};