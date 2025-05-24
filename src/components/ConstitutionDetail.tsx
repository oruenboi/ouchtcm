import React, { useState } from 'react';
import { CategoryResult } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ConstitutionDetailProps {
  result: CategoryResult;
}

const ConstitutionDetail: React.FC<ConstitutionDetailProps> = ({ result }) => {
  const { t, language, getCategoryName, getCategoryDescription } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get description based on constitution type
  const getDescription = (type: string) => {
    if (language === 'en') {
      const descriptions = {
        'A': 'The Neutral constitution represents balance and harmony in your body systems. People with this constitution generally adapt well to environmental changes, have good energy levels, and maintain overall health and wellbeing.',
        'B': 'The Qi-deficient constitution indicates a lack of vital energy. People with this constitution may experience fatigue, shortness of breath, spontaneous sweating, and are prone to catching colds easily.',
        'C': 'The Yang-deficient constitution shows signs of inadequate warmth and activity. Common symptoms include cold extremities, preference for warm environments, sensitivity to cold, and feelings of tiredness or lethargy.',
        'D': 'The Yin-deficient constitution lacks cooling and moistening aspects. Individuals may experience feelings of heat, dryness, night sweats, insomnia, and restlessness.',
        'E': 'The Phlegm-dampness constitution has excessive moisture that congeals. Symptoms may include feelings of heaviness, excess phlegm, daytime sleepiness, and easy weight gain.',
        'F': 'The Damp-heat constitution shows signs of excess heat combined with dampness. Characteristics include discomfort in humid weather, oily skin, dark urine, and acne or skin rashes.',
        'G': 'The Blood-stasis constitution has poor circulation. People with this constitution may bruise easily, experience sharp pains, have a dark or purple tinge to lips or tongue, and may have dry or rough skin.',
        'H': 'The Qi-stagnation constitution indicates energy that is stuck or not flowing properly. Signs include frequent sighing, mood swings, emotional stress in the chest or stomach, and difficulty coping with stress.',
        'I': 'The Special constitution has unique characteristics that don\'t fit other patterns. People with this constitution may be sensitive to medications, have allergies, recover slowly from illness, and have unusual symptoms.'
      };
      
      return descriptions[type as keyof typeof descriptions] || '';
    } else {
      // Chinese descriptions
      const descriptions = {
        'A': '平和体质代表你的身体系统中的平衡与和谐。具有这种体质的人通常能很好地适应环境变化，拥有良好的精力水平，并保持整体健康与幸福。',
        'B': '气虚体质表明缺乏生命能量。具有这种体质的人可能会经历疲劳、气短、自汗，且容易感冒。',
        'C': '阳虚体质显示出缺乏温暖和活力的迹象。常见症状包括四肢冰冷、偏爱温暖环境、对寒冷敏感以及疲倦或无力感。',
        'D': '阴虚体质缺乏冷却和滋润方面。个体可能体验热感、干燥、盗汗、失眠和烦躁。',
        'E': '痰湿体质有凝结的过多水分。症状可能包括沉重感、多痰、日间嗜睡和容易增重。',
        'F': '湿热体质显示出过多的热与湿气结合的迹象。特征包括在潮湿天气不适、油性皮肤、深色尿液和痤疮或皮疹。',
        'G': '血瘀体质有不良循环。具有这种体质的人可能容易瘀青，经历尖锐疼痛，嘴唇或舌头有深色或紫色色调，且可能有干燥或粗糙的皮肤。',
        'H': '气郁体质表明能量阻塞或不能正常流动。迹象包括频繁叹息、情绪波动、胸部或胃部的情绪压力，以及应对压力困难。',
        'I': '特禀体质有不适合其他模式的独特特征。具有这种体质的人可能对药物敏感，有过敏症，病后恢复缓慢，且有不寻常的症状。'
      };
      
      return descriptions[type as keyof typeof descriptions] || '';
    }
  };
  
  // Get recommendations based on constitution type
  const getRecommendations = (type: string) => {
    if (language === 'en') {
      const recommendations = {
        'A': [
          'Maintain your balanced lifestyle',
          'Practice moderate exercise regularly',
          'Follow a diverse and balanced diet',
          'Get adequate rest and sleep',
          'Manage stress through mindfulness practices'
        ],
        'B': [
          'Avoid overexertion and prioritize rest',
          'Consume warming, easy-to-digest foods',
          'Practice gentle exercise like walking or tai chi',
          'Consider qi-building herbs like ginseng (with professional guidance)',
          'Establish regular meal and sleep schedules'
        ],
        'C': [
          'Keep warm, especially extremities',
          'Eat warming foods like ginger, cinnamon, and lamb',
          'Avoid cold foods and raw vegetables',
          'Practice gentle movement exercises like tai chi',
          'Consider moxibustion therapy from a licensed practitioner'
        ],
        'D': [
          'Stay hydrated and consume yin-nourishing foods',
          'Avoid spicy, hot, and stimulating foods',
          'Practice gentle exercises like yoga or swimming',
          'Get adequate rest and avoid overwork',
          'Consider acupuncture or herbs that nourish yin (with professional guidance)'
        ],
        'E': [
          'Reduce consumption of dairy, sugar, and greasy foods',
          'Incorporate regular moderate exercise',
          'Include warming spices like ginger in your diet',
          'Practice deep breathing exercises',
          'Consider herbs that resolve dampness (with professional guidance)'
        ],
        'F': [
          'Avoid spicy, greasy, and fried foods',
          'Stay well-hydrated with room temperature water',
          'Reduce alcohol consumption',
          'Consider bitter and cooling foods like celery and cucumber',
          'Practice regular exercise to promote sweating'
        ],
        'G': [
          'Increase cardiovascular exercise',
          'Include circulation-promoting foods like turmeric and ginger',
          'Stay well-hydrated',
          'Consider massage therapy',
          'Avoid prolonged sitting or standing'
        ],
        'H': [
          'Practice stress reduction techniques like meditation',
          'Engage in regular physical activity',
          'Express emotions in healthy ways',
          'Consider massage therapy',
          'Maintain a regular schedule for meals and sleep'
        ],
        'I': [
          'Work with a qualified TCM practitioner for personalized advice',
          'Keep a detailed health journal to track patterns',
          'Adopt an elimination diet to identify food sensitivities',
          'Consider gentle detoxification practices',
          'Practice mind-body techniques like qigong'
        ]
      };
      
      return recommendations[type as keyof typeof recommendations] || [];
    } else {
      // Chinese recommendations
      const recommendations = {
        'A': [
          '保持平衡的生活方式',
          '定期进行适度运动',
          '遵循多样化和均衡的饮食',
          '充分休息和睡眠',
          '通过正念练习管理压力'
        ],
        'B': [
          '避免过度劳累，优先休息',
          '食用温热、易消化的食物',
          '进行温和的运动如步行或太极',
          '考虑在专业指导下使用补气草药如人参',
          '建立规律的饮食和睡眠计划'
        ],
        'C': [
          '保持温暖，特别是四肢',
          '食用姜、肉桂和羊肉等温热食物',
          '避免冷食和生蔬菜',
          '练习太极等温和运动',
          '考虑在持证中医师的指导下进行艾灸治疗'
        ],
        'D': [
          '保持水分充足，摄入滋阴食物',
          '避免辛辣、热性和刺激性食物',
          '进行瑜伽或游泳等温和运动',
          '充分休息，避免过度工作',
          '考虑在专业指导下进行针灸或服用滋阴草药'
        ],
        'E': [
          '减少奶制品、糖和油腻食物的摄入',
          '融入定期适度运动',
          '在饮食中加入姜等温热香料',
          '练习深呼吸',
          '考虑在专业指导下服用化痰祛湿的草药'
        ],
        'F': [
          '避免辛辣、油腻和油炸食物',
          '多喝常温水保持水分',
          '减少酒精摄入',
          '考虑食用芹菜和黄瓜等苦味和凉性食物',
          '进行规律运动促进出汗'
        ],
        'G': [
          '增加心血管运动',
          '加入促进血液循环的食物如姜黄和生姜',
          '保持水分充足',
          '考虑按摩疗法',
          '避免长时间坐立'
        ],
        'H': [
          '练习减压技术如冥想',
          '定期进行体育活动',
          '以健康方式表达情感',
          '考虑按摩疗法',
          '保持饮食和睡眠的规律时间表'
        ],
        'I': [
          '寻求合格中医师的个性化建议',
          '保持详细的健康日记记录模式',
          '采用排除饮食法识别食物敏感性',
          '考虑温和的排毒实践',
          '练习气功等身心技术'
        ]
      };
      
      return recommendations[type as keyof typeof recommendations] || [];
    }
  };
  
  // Get acupoint recommendations by constitution type
  const getAcupointRecommendations = (type: string) => {
    if (language === 'en') {
      const acupoints = {
        'A': [
          'Zhong Wan (CV12) - Regulates and harmonizes stomach qi',
          'Qi Hai (CV6) - Supports overall qi balance',
          'Zu San Li (ST36) - Strengthens the body and maintains health'
        ],
        'B': [
          'Zu San Li (ST36) - Tonifies qi and boosts energy',
          'Qi Hai (CV6) - Strengthens source qi',
          'Guan Yuan (CV4) - Reinforces original qi',
          'Bai Hui (GV20) - Raises yang energy'
        ],
        'C': [
          'Guan Yuan (CV4) - Warms and tonifies yang',
          'Ming Men (GV4) - Strengthens kidney yang',
          'Zu San Li (ST36) - Strengthens overall energy',
          'Shen Que (CV8) - Warms the middle jiao'
        ],
        'D': [
          'San Yin Jiao (SP6) - Nourishes yin and blood',
          'Tai Xi (KI3) - Strengthens kidney yin',
          'Zhao Hai (KI6) - Nourishes yin and clears deficiency heat',
          'Fu Liu (KI7) - Strengthens kidney function'
        ],
        'E': [
          'Feng Long (ST40) - Resolves phlegm',
          'Zu San Li (ST36) - Strengthens spleen and resolves dampness',
          'Pi Shu (BL20) - Tonifies spleen to resolve dampness',
          'Zhong Wan (CV12) - Harmonizes the middle jiao'
        ],
        'F': [
          'Yin Ling Quan (SP9) - Clears damp-heat',
          'Qu Chi (LI11) - Clears heat',
          'San Jiao Shu (BL22) - Regulates water metabolism',
          'Zhong Ji (CV3) - Clears heat in the lower jiao'
        ],
        'G': [
          'Xue Hai (SP10) - Moves and nourishes blood',
          'Ge Shu (BL17) - Regulates blood',
          'San Yin Jiao (SP6) - Moves blood and resolves stasis',
          'He Gu (LI4) - Promotes circulation and relieves pain'
        ],
        'H': [
          'Tai Chong (LR3) - Spreads liver qi and relieves stagnation',
          'Qu Chi (LI11) - Regulates qi and blood',
          'Nei Guan (PC6) - Calms the mind and regulates qi',
          'Zhong Wan (CV12) - Harmonizes the stomach and intestines'
        ],
        'I': [
          'Qu Chi (LI11) - Regulates immune function and clears heat',
          'Xing Jian (LR2) - Clears liver heat',
          'Feng Shi (GB31) - Clears wind and reduces sensitivity',
          'He Gu (LI4) - General point for allergies and immune regulation'
        ]
      };
      
      return acupoints[type as keyof typeof acupoints] || [];
    } else {
      // Chinese acupoints
      const acupoints = {
        'A': [
          '中脘 (CV12) - 调节和协调胃气',
          '气海 (CV6) - 支持整体气平衡',
          '足三里 (ST36) - 强健身体和维持健康'
        ],
        'B': [
          '足三里 (ST36) - 补气和提高能量',
          '气海 (CV6) - 强化源气',
          '关元 (CV4) - 增强原气',
          '百会 (GV20) - 提升阳气'
        ],
        'C': [
          '关元 (CV4) - 温暖和补阳',
          '命门 (GV4) - 强化肾阳',
          '足三里 (ST36) - 增强整体能量',
          '神阙 (CV8) - 温暖中焦'
        ],
        'D': [
          '三阴交 (SP6) - 滋养阴和血',
          '太溪 (KI3) - 强化肾阴',
          '照海 (KI6) - 滋养阴和清除虚热',
          '复溜 (KI7) - 增强肾功能'
        ],
        'E': [
          '丰隆 (ST40) - 化痰',
          '足三里 (ST36) - 强化脾和祛湿',
          '脾俞 (BL20) - 补脾祛湿',
          '中脘 (CV12) - 调和中焦'
        ],
        'F': [
          '阴陵泉 (SP9) - 清除湿热',
          '曲池 (LI11) - 清热',
          '三焦俞 (BL22) - 调节水代谢',
          '中极 (CV3) - 清除下焦热'
        ],
        'G': [
          '血海 (SP10) - 活血和养血',
          '膈俞 (BL17) - 调节血',
          '三阴交 (SP6) - 活血和消除淤滞',
          '合谷 (LI4) - 促进循环和缓解疼痛'
        ],
        'H': [
          '太冲 (LR3) - 疏肝气和解除淤滞',
          '曲池 (LI11) - 调节气和血',
          '内关 (PC6) - 安心和调节气',
          '中脘 (CV12) - 调和胃和肠'
        ],
        'I': [
          '曲池 (LI11) - 调节免疫功能和清热',
          '行间 (LR2) - 清肝热',
          '风市 (GB31) - 祛风和减少敏感性',
          '合谷 (LI4) - 一般用于过敏和免疫调节'
        ]
      };
      
      return acupoints[type as keyof typeof acupoints] || [];
    }
  };
  
  // Get herb recommendations by constitution type
  const getHerbRecommendations = (type: string) => {
    if (language === 'en') {
      const herbs = {
        'A': [
          'Ginseng (mild formula) - Gentle support for overall qi balance',
          'Astragalus (Huang Qi) - Maintains immune system health',
          'Licorice root (Gan Cao) - Harmonizes other herbs and supports digestion'
        ],
        'B': [
          'Ginseng (Ren Shen) - Powerfully tonifies qi',
          'Astragalus (Huang Qi) - Strengthens wei qi (defensive energy)',
          'Codonopsis (Dang Shen) - Gentle qi tonic',
          'Dang Gui (Angelica) - Supports blood production'
        ],
        'C': [
          'Cinnamon bark (Rou Gui) - Warms the interior and dispels cold',
          'Prepared Aconite (Fu Zi) - Warms and tonifies kidney yang',
          'Dried Ginger (Gan Jiang) - Warms the middle jiao',
          'Eucommia bark (Du Zhong) - Tonifies kidney and liver yang'
        ],
        'D': [
          'American ginseng (Xi Yang Shen) - Nourishes yin without being too cloying',
          'Rehmannia (Shu Di Huang) - Nourishes blood and yin',
          'Goji berry (Gou Qi Zi) - Nourishes yin and blood',
          'Ophiopogon (Mai Men Dong) - Moistens the lungs and stomach'
        ],
        'E': [
          'Poria (Fu Ling) - Drains dampness and strengthens spleen',
          'Pinellia (Ban Xia) - Resolves phlegm and dampness',
          'Citrus peel (Chen Pi) - Regulates qi and dries dampness',
          'White atractylodes (Bai Zhu) - Strengthens spleen and resolves dampness'
        ],
        'F': [
          'Coptis (Huang Lian) - Clears damp-heat',
          'Scutellaria (Huang Qin) - Clears heat from upper jiao',
          'Phellodendron (Huang Bai) - Clears heat from lower jiao',
          'Alisma (Ze Xie) - Drains dampness through urination'
        ],
        'G': [
          'Salvia (Dan Shen) - Invigorates blood and disperses stasis',
          'Red peony (Chi Shao) - Cools blood and disperses stasis',
          'Persica (Tao Ren) - Breaks up blood stasis',
          'Carthamus (Hong Hua) - Invigorates blood circulation'
        ],
        'H': [
          'Bupleurum (Chai Hu) - Spreads liver qi and relieves stagnation',
          'Cyperus (Xiang Fu) - Regulates liver qi',
          'White peony (Bai Shao) - Nourishes blood and calms liver',
          'Citrus Aurantium (Zhi Ke) - Moves qi stagnation in chest and abdomen'
        ],
        'I': [
          'Magnolia bark (Hou Po) - Relieves wind symptoms and opens nasal passages',
          'Mint (Bo He) - Disperses wind and clears the head',
          'Schizonepeta (Jing Jie) - Expels wind and alleviates itching',
          'Dictamnus bark (Bai Xian Pi) - Clears wind-heat and relieves itching'
        ]
      };
      
      return herbs[type as keyof typeof herbs] || [];
    } else {
      // Chinese herbs
      const herbs = {
        'A': [
          '人参（温和配方）- 温和支持整体气平衡',
          '黄芪 (Huang Qi) - 维持免疫系统健康',
          '甘草 (Gan Cao) - 协调其他草药和支持消化'
        ],
        'B': [
          '人参 (Ren Shen) - 强力补气',
          '黄芪 (Huang Qi) - 增强卫气（防御能量）',
          '党参 (Dang Shen) - 温和的气补剂',
          '当归 (Dang Gui) - 支持血液生成'
        ],
        'C': [
          '肉桂 (Rou Gui) - 温暖内部和驱散寒冷',
          '附子 (Fu Zi) - 温暖和补肾阳',
          '干姜 (Gan Jiang) - 温暖中焦',
          '杜仲 (Du Zhong) - 补肾和肝阳'
        ],
        'D': [
          '西洋参 (Xi Yang Shen) - 滋阴而不腻',
          '熟地黄 (Shu Di Huang) - 滋养血和阴',
          '枸杞子 (Gou Qi Zi) - 滋养阴和血',
          '麦门冬 (Mai Men Dong) - 润肺和胃'
        ],
        'E': [
          '茯苓 (Fu Ling) - 排除湿气和强化脾',
          '半夏 (Ban Xia) - 化痰和祛湿',
          '陈皮 (Chen Pi) - 调节气和去湿',
          '白术 (Bai Zhu) - 补脾和祛湿'
        ],
        'F': [
          '黄连 (Huang Lian) - 清湿热',
          '黄芩 (Huang Qin) - 清上焦热',
          '黄柏 (Huang Bai) - 清下焦热',
          '泽泻 (Ze Xie) - 通过排尿排除湿气'
        ],
        'G': [
          '丹参 (Dan Shen) - 活血和消散淤滞',
          '赤芍 (Chi Shao) - 凉血和消散淤滞',
          '桃仁 (Tao Ren) - 打破血淤滞',
          '红花 (Hong Hua) - 促进血液循环'
        ],
        'H': [
          '柴胡 (Chai Hu) - 疏肝气和减轻淤滞',
          '香附 (Xiang Fu) - 调节肝气',
          '白芍 (Bai Shao) - 滋养血和安肝',
          '枳壳 (Zhi Ke) - 移动胸腹气淤滞'
        ],
        'I': [
          '厚朴 (Hou Po) - 缓解风症状和打开鼻腔',
          '薄荷 (Bo He) - 分散风和清头',
          '荆芥 (Jing Jie) - 驱风和缓解瘙痒',
          '白鲜皮 (Bai Xian Pi) - 清风热和缓解瘙痒'
        ]
      };
      
      return herbs[type as keyof typeof herbs] || [];
    }
  };
  
  const getBadgeColor = (classification: string) => {
    switch (classification) {
      case 'For sure':
        return 'bg-accent text-white';
      case 'Somewhat':
        return 'bg-secondary text-white';
      case 'Not':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Translate classification
  const getTranslatedClassification = (classification: string) => {
    switch (classification) {
      case 'For sure':
        return t('class.forsure');
      case 'Somewhat':
        return t('class.somewhat');
      case 'Not':
        return t('class.not');
      default:
        return classification;
    }
  };
  
  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <div 
        className="flex justify-between items-start sm:items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-medium text-primary">
            Type {result.categoryId}: {getCategoryName(result.categoryId, result.name)}
          </h3>
          <p className="text-sm text-taupe mt-1">{result.chineseName}</p>
          <div className="flex flex-wrap items-center mt-1 gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(result.classification)}`}>
              {getTranslatedClassification(result.classification)}
            </span>
            <span className="text-sm text-neutral-dark">
              {t('results.score')} {result.normalizedPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-neutral-dark mt-1 sm:mt-0 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-dark mt-1 sm:mt-0 flex-shrink-0" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-neutral border-t">
          <p className="mb-4 text-neutral-dark">{getDescription(result.categoryId)}</p>
          
          <div className="mb-4">
            <h4 className="font-medium text-primary mb-2">{t('results.raw.score')}</h4>
            <p className="text-sm text-neutral-dark">{t('results.raw.score')} {result.rawScore}</p>
            <p className="text-sm text-neutral-dark">{t('results.status')} {result.isPositive ? t('results.positive') : result.isNormal ? t('results.normal') : t('results.intermediate')}</p>
          </div>
          
          {(result.classification === 'For sure' || result.classification === 'Somewhat') && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-primary mb-2">{t('results.lifestyle')}</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {getRecommendations(result.categoryId).map((rec, index) => (
                    <li key={index} className="text-neutral-dark">{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-primary mb-2">{t('results.acupoint')}</h4>
                <p className="text-sm text-secondary italic mb-2">{t('results.acupoint.warning')}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {getAcupointRecommendations(result.categoryId).map((point, index) => (
                    <li key={index} className="text-neutral-dark">{point}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-primary mb-2">{t('results.herbal')}</h4>
                <p className="text-sm text-secondary italic mb-2">{t('results.herbal.warning')}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {getHerbRecommendations(result.categoryId).map((herb, index) => (
                    <li key={index} className="text-neutral-dark">{herb}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConstitutionDetail;