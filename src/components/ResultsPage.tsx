import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyResult, CategoryResult } from '../types';
import ResultsBarChart from './ResultsBarChart';
import ConstitutionDetail from './ConstitutionDetail';
import { ArrowLeft, FileDown, Copy, FileText, Info, Loader, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

// TypeScript type for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const ResultsPage: React.FC = () => {
  const { t, language, getCategoryName, getCategoryDescription } = useLanguage();
  const navigate = useNavigate();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [showScoringInfo, setShowScoringInfo] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  
  useEffect(() => {
    // Fetch results from localStorage
    const storedResults = localStorage.getItem('surveyResults');
    const storedName = localStorage.getItem('userName') || '';
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    
    setUserName(storedName);
    setLoading(false);
  }, []);
  
  const handleStartNew = () => {
    // Clear previous results
    localStorage.removeItem('surveyResults');
    navigate('/');
  };
  
  const getPrimaryConstitutions = (categories: CategoryResult[]) => {
    return categories
      .filter(cat => cat.classification === 'For sure')
      .sort((a, b) => b.normalizedPercentage - a.normalizedPercentage);
  };
  
  const getSecondaryConstitutions = (categories: CategoryResult[]) => {
    return categories
      .filter(cat => cat.classification === 'Somewhat')
      .sort((a, b) => b.normalizedPercentage - a.normalizedPercentage);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  const downloadResults = () => {
    if (!results) return;
    
    // Create CSV content
    let csvContent = `${language === 'en' ? 'Name' : '姓名'},${userName}\n`;
    csvContent += `${language === 'en' ? 'Date' : '日期'},${new Date(results.date).toISOString()}\n\n`;
    csvContent += language === 'en' 
      ? "Category,Name,Chinese Name,Raw Score,Normalized Percentage,Classification,Is Normal,Is Positive\n"
      : "类别,名称,中文名称,原始得分,标准化百分比,分类,是否正常,是否阳性\n";
    
    results.categories.forEach(cat => {
      const classificationText = language === 'en' 
        ? cat.classification 
        : cat.classification === 'For sure' 
          ? '确定' 
          : cat.classification === 'Somewhat' 
            ? '有些' 
            : '非';

      const normalText = language === 'en' ? 'true' : '是';
      const positiveText = language === 'en' ? 'true' : '是';
      const falseText = language === 'en' ? 'false' : '否';

      csvContent += `${cat.categoryId},${getCategoryName(cat.categoryId, cat.name)},"${cat.chineseName}",${cat.rawScore},${cat.normalizedPercentage.toFixed(2)},${classificationText},${cat.isNormal ? normalText : falseText},${cat.isPositive ? positiveText : falseText}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = language === 'en' 
      ? `${userName.trim() ? userName + '-' : ''}tcm-constitution-results-${new Date().toISOString().split('T')[0]}.csv`
      : `${userName.trim() ? userName + '-' : ''}中医体质调查结果-${new Date().toISOString().split('T')[0]}.csv`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const copyToClipboard = () => {
    if (!results) return;
    
    let textContent = language === 'en' 
      ? "TCM Body Constitution Survey Results\n\n" 
      : "中医体质调查结果\n\n";

    if (userName) {
      textContent += language === 'en' 
        ? `Name: ${userName}\n` 
        : `姓名: ${userName}\n`;
    }
    
    textContent += language === 'en' 
      ? `Date: ${formatDate(results.date)}\n\n` 
      : `日期: ${formatDate(results.date)}\n\n`;
    
    textContent += language === 'en' 
      ? "Constitution Types:\n" 
      : "体质类型:\n";

    results.categories.forEach(cat => {
      const classificationText = language === 'en' 
        ? cat.classification 
        : cat.classification === 'For sure' 
          ? '确定' 
          : cat.classification === 'Somewhat' 
            ? '有些' 
            : '非';

      textContent += language === 'en'
        ? `Type ${cat.categoryId} (${getCategoryName(cat.categoryId, cat.name)} - ${cat.chineseName}): ${cat.normalizedPercentage.toFixed(2)}% - ${classificationText}\n`
        : `类型 ${cat.categoryId} (${getCategoryName(cat.categoryId, cat.name)} - ${cat.chineseName}): ${cat.normalizedPercentage.toFixed(2)}% - ${classificationText}\n`;
    });
    
    navigator.clipboard.writeText(textContent)
      .then(() => alert(language === 'en' ? "Results copied to clipboard" : "结果已复制到剪贴板"))
      .catch(err => console.error("Failed to copy: ", err));
  };
  
  // Function to print the results page
  const printResults = () => {
    window.print();
  };
  
  // Function to generate and download PDF report
  const generatePdfReport = () => {
    if (!results) return;
    
    // Set loading state to show feedback to user
    setIsPdfGenerating(true);
    
    try {
      // Create PDF with English format
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Generate English PDF for both languages
      generateEnglishPDF(doc, pageWidth);
      
      // Save the PDF
      const fileName = `${userName.trim() ? userName + '-' : ''}tcm-constitution-report-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      // Show success message
      setTimeout(() => {
        alert(language === 'en'
          ? "PDF report has been generated and download should start automatically."
          : "PDF报告已生成，下载应该会自动开始。");
        setIsPdfGenerating(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(language === 'en'
        ? "There was an error generating the PDF report. Please try again."
        : "生成PDF报告时出错。请再试一次。");
      setIsPdfGenerating(false);
    }
  };

  // Generate English version of the PDF with full text support
  const generateEnglishPDF = (doc: jsPDF, pageWidth: number) => {
    if (!results) return;

    // Add Ouch Logo header
    doc.setFontSize(16);
    doc.setTextColor(115, 84, 74); // Brown color
    doc.text('Ouch!', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('https://ouch.com.sg/', 14, 25);
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(115, 84, 74); // Brown color
    doc.text('TCM Body Constitution Survey Results', pageWidth / 2, 35, { align: 'center' });
    
    // Add name if available
    let yPosition = 45;
    if (userName) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${userName}`, 14, yPosition);
      yPosition += 8;
    }
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Date: ${formatDate(results.date)}`, 14, yPosition);
    yPosition += 10;
    
    // Add summary section heading
    doc.setFontSize(16);
    doc.setTextColor(115, 84, 74); // Brown color
    doc.text('Summary', 14, yPosition);
    yPosition += 10;
    
    // Get primary and secondary constitutions
    const primaryConstitutions = getPrimaryConstitutions(results.categories);
    const secondaryConstitutions = getSecondaryConstitutions(results.categories);
    
    // Add primary constitutions if any
    doc.setTextColor(0, 0, 0);
    if (primaryConstitutions.length > 0) {
      doc.setFontSize(14);
      doc.text('Primary Constitution Types:', 14, yPosition);
      yPosition += 10;
      
      primaryConstitutions.forEach(con => {
        doc.setFontSize(12);
        const text = `• Type ${con.categoryId}: ${getCategoryName(con.categoryId, con.name)} (${con.normalizedPercentage.toFixed(1)}%)`;
        doc.text(text, 20, yPosition);
        yPosition += 7;
      });
    } else {
      doc.setFontSize(12);
      doc.text('No primary constitution types identified.', 14, yPosition);
      yPosition += 10;
    }
    
    // Add secondary constitutions if any
    if (secondaryConstitutions.length > 0) {
      doc.setFontSize(14);
      doc.text('Secondary Constitution Types:', 14, yPosition);
      yPosition += 10;
      
      secondaryConstitutions.forEach(con => {
        doc.setFontSize(12);
        const text = `• Type ${con.categoryId}: ${getCategoryName(con.categoryId, con.name)} (${con.normalizedPercentage.toFixed(1)}%)`;
        doc.text(text, 20, yPosition);
        yPosition += 7;
      });
    }
    
    yPosition += 10;
    
    // Add detailed results table
    doc.setFontSize(16);
    doc.setTextColor(115, 84, 74); // Brown color
    doc.text('Detailed Results', 14, yPosition);
    yPosition += 10;
    
    const tableData = results.categories.map(cat => {
      // Extract romanized part for better compatibility
      const romanizedName = cat.chineseName.match(/\(([^)]+)\)/)?.[1] || '';
      
      return [
        `Type ${cat.categoryId}`,
        cat.name,
        romanizedName,
        cat.rawScore.toString(),
        `${cat.normalizedPercentage.toFixed(1)}%`,
        cat.classification
      ];
    });
    
    doc.autoTable({
      startY: yPosition,
      head: [['Type', 'Name', 'Chinese Name', 'Raw Score', 'Percentage', 'Classification']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [115, 84, 74] } // Brown color
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
    
    // Add recommendations for primary constitutions
    if (primaryConstitutions.length > 0) {
      // Check if we need a new page
      if (yPosition > 230) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(115, 84, 74); // Brown color
      doc.text('Recommendations', 14, yPosition);
      yPosition += 10;
      
      primaryConstitutions.forEach(con => {
        // Get recommendations for this constitution type
        const recommendations = getRecommendationsForType(con.categoryId);
        const acupoints = getAcupointsForType(con.categoryId);
        const herbs = getHerbsForType(con.categoryId);
        
        // Add heading for this constitution type
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`For Type ${con.categoryId} (${getCategoryName(con.categoryId, con.name)}):`, 14, yPosition);
        yPosition += 10;
        
        // Add lifestyle recommendations
        doc.setFontSize(12);
        doc.text('Lifestyle Recommendations:', 16, yPosition);
        yPosition += 7;
        
        recommendations.forEach(rec => {
          doc.setFontSize(10);
          doc.text(`• ${rec}`, 20, yPosition);
          yPosition += 6;
          
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
        });
        
        yPosition += 5;
        
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add acupoint recommendations
        doc.setFontSize(12);
        doc.text('Recommended Acupoints:', 16, yPosition);
        yPosition += 7;
        
        doc.setFontSize(8);
        doc.text('(Consult a licensed acupuncturist before any treatment)', 20, yPosition);
        yPosition += 5;
        
        acupoints.forEach(point => {
          doc.setFontSize(10);
          const pointParts = point.split(' - ');
          const pointName = pointParts[0];
          const pointDescription = pointParts.length > 1 ? pointParts[1] : '';
          
          doc.text(`• ${pointName}`, 20, yPosition);
          
          if (pointDescription) {
            doc.setFontSize(9);
            doc.text(`  ${pointDescription}`, 20, yPosition + 4);
            yPosition += 9;
          } else {
            yPosition += 6;
          }
          
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
        });
        
        yPosition += 5;
        
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add herb recommendations
        doc.setFontSize(12);
        doc.text('Recommended Herbs:', 16, yPosition);
        yPosition += 7;
        
        doc.setFontSize(8);
        doc.text('(Always consult with a TCM practitioner before taking any herbs)', 20, yPosition);
        yPosition += 5;
        
        herbs.forEach(herb => {
          doc.setFontSize(10);
          const herbParts = herb.split(' - ');
          const herbName = herbParts[0];
          const herbDescription = herbParts.length > 1 ? herbParts[1] : '';
          
          doc.text(`• ${herbName}`, 20, yPosition);
          
          if (herbDescription) {
            doc.setFontSize(9);
            doc.text(`  ${herbDescription}`, 20, yPosition + 4);
            yPosition += 9;
          } else {
            yPosition += 6;
          }
          
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
        });
        
        yPosition += 10;
        
        // Check if we need a new page before next constitution type
        if (yPosition > 230) {
          doc.addPage();
          yPosition = 20;
        }
      });
    }
    
    // Add disclaimer
    const disclaimer = 'Disclaimer: This survey is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider. Acupoints and herbs should only be used under professional guidance.';
    
    // Check if we need a new page for disclaimer
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    
    const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 30);
    doc.text(splitDisclaimer, 14, yPosition);
    
    // Add Ouch logo and attribution
    yPosition += splitDisclaimer.length * 5 + 10;
    doc.setFontSize(8);
    doc.text('Report generated by Ouch - https://ouch.com.sg/', pageWidth / 2, yPosition, { align: 'center' });
    
    // If Chinese language is selected, add a note about Chinese content
    if (language === 'zh') {
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(115, 84, 74);
      doc.text('Chinese Language Support', pageWidth / 2, 30, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const noteText = "For detailed recommendations in Chinese, please visit our website or print this page directly from your browser.";
      const noteLines = doc.splitTextToSize(noteText, pageWidth - 40);
      doc.text(noteLines, pageWidth / 2, 50, { align: 'center' });
      
      doc.setFontSize(14);
      doc.text("https://ouch.com.sg/", pageWidth / 2, 70, { align: 'center' });
    }
  };
  
  // Helper function to get lifestyle recommendations for a constitution type
  const getRecommendationsForType = (type: string): string[] => {
    if (language === 'en') {
      const recommendations: Record<string, string[]> = {
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
      const recommendations: Record<string, string[]> = {
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
  
  // Helper function to get acupoint recommendations for a constitution type
  const getAcupointsForType = (type: string): string[] => {
    if (language === 'en') {
      const acupoints: Record<string, string[]> = {
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
      // Simplified point names for Chinese version
      const acupoints: Record<string, string[]> = {
        'A': [
          '中脘 (CV12)',
          '气海 (CV6)',
          '足三里 (ST36)'
        ],
        'B': [
          '足三里 (ST36)', 
          '气海 (CV6)',
          '关元 (CV4)', 
          '百会 (GV20)'
        ],
        'C': [
          '关元 (CV4)',
          '命门 (GV4)',
          '足三里 (ST36)',
          '神阙 (CV8)'
        ],
        'D': [
          '三阴交 (SP6)',
          '太溪 (KI3)',
          '照海 (KI6)',
          '复溜 (KI7)'
        ],
        'E': [
          '丰隆 (ST40)',
          '足三里 (ST36)',
          '脾俞 (BL20)',
          '中脘 (CV12)'
        ],
        'F': [
          '阴陵泉 (SP9)',
          '曲池 (LI11)',
          '三焦俞 (BL22)',
          '中极 (CV3)'
        ],
        'G': [
          '血海 (SP10)',
          '膈俞 (BL17)',
          '三阴交 (SP6)',
          '合谷 (LI4)'
        ],
        'H': [
          '太冲 (LR3)',
          '曲池 (LI11)',
          '内关 (PC6)',
          '中脘 (CV12)'
        ],
        'I': [
          '曲池 (LI11)',
          '行间 (LR2)',
          '风市 (GB31)',
          '合谷 (LI4)'
        ]
      };
      
      return acupoints[type as keyof typeof acupoints] || [];
    }
  };
  
  // Helper function to get herb recommendations for a constitution type
  const getHerbsForType = (type: string): string[] => {
    if (language === 'en') {
      const herbs: Record<string, string[]> = {
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
      // Simplified herb names for Chinese version
      const herbs: Record<string, string[]> = {
        'A': [
          '人参（温和配方）',
          '黄芪 (Huang Qi)',
          '甘草 (Gan Cao)'
        ],
        'B': [
          '人参 (Ren Shen)',
          '黄芪 (Huang Qi)',
          '党参 (Dang Shen)',
          '当归 (Dang Gui)'
        ],
        'C': [
          '肉桂 (Rou Gui)',
          '附子 (Fu Zi)',
          '干姜 (Gan Jiang)',
          '杜仲 (Du Zhong)'
        ],
        'D': [
          '西洋参 (Xi Yang Shen)',
          '熟地黄 (Shu Di Huang)',
          '枸杞子 (Gou Qi Zi)',
          '麦门冬 (Mai Men Dong)'
        ],
        'E': [
          '茯苓 (Fu Ling)',
          '半夏 (Ban Xia)',
          '陈皮 (Chen Pi)',
          '白术 (Bai Zhu)'
        ],
        'F': [
          '黄连 (Huang Lian)',
          '黄芩 (Huang Qin)',
          '黄柏 (Huang Bai)',
          '泽泻 (Ze Xie)'
        ],
        'G': [
          '丹参 (Dan Shen)',
          '赤芍 (Chi Shao)',
          '桃仁 (Tao Ren)',
          '红花 (Hong Hua)'
        ],
        'H': [
          '柴胡 (Chai Hu)',
          '香附 (Xiang Fu)',
          '白芍 (Bai Shao)',
          '枳壳 (Zhi Ke)'
        ],
        'I': [
          '厚朴 (Hou Po)',
          '薄荷 (Bo He)',
          '荆芥 (Jing Jie)',
          '白鲜皮 (Bai Xian Pi)'
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
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-neutral-dark">{t('results.generating')}</p>
      </div>
    );
  }
  
  if (!results) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-secondary mb-4">No Results Found</h1>
        <p className="text-neutral-dark mb-8">You need to complete the survey first to see your results.</p>
        <button
          onClick={() => navigate('/survey')}
          className="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-dark"
        >
          Take the Survey
        </button>
      </div>
    );
  }
  
  const primaryConstitutions = getPrimaryConstitutions(results.categories);
  const secondaryConstitutions = getSecondaryConstitutions(results.categories);
  
  return (
    <div className="min-h-screen bg-neutral py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <button
            onClick={handleStartNew}
            className="flex items-center justify-center sm:justify-start text-neutral-dark hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            {t('results.take.again')}
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center px-4 py-2 text-sm text-neutral-dark bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Copy className="h-4 w-4 mr-2" />
              {t('results.copy')}
            </button>
            <button
              onClick={downloadResults}
              className="flex items-center justify-center px-4 py-2 text-sm text-white bg-secondary rounded-md hover:bg-secondary-dark"
            >
              <FileDown className="h-4 w-4 mr-2" />
              {t('results.download.csv')}
            </button>
            
            {language === 'zh' ? (
              <button
                onClick={printResults}
                className="flex items-center justify-center px-4 py-2 text-sm text-white bg-accent rounded-md hover:bg-accent-dark"
              >
                <Printer className="h-4 w-4 mr-2" />
                {t('results.print')}
              </button>
            ) : (
              <button
                onClick={generatePdfReport}
                disabled={isPdfGenerating}
                className={`flex items-center justify-center px-4 py-2 text-sm text-white bg-accent rounded-md ${
                  isPdfGenerating ? 'opacity-70 cursor-wait' : 'hover:bg-accent-dark'
                }`}
              >
                {isPdfGenerating ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    {t('results.generating')}
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    {t('results.generate.pdf')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <a href="https://ouch.com.sg/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://ouch.com.sg/wp-content/uploads/2022/05/ouch-logo-120x87.png" 
                  alt="Ouch Logo" 
                  className="h-12"
                />
              </a>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              {t('results.title')}
            </h1>
            {userName && (
              <p className="mt-2 text-lg text-neutral-dark">
                {t('results.name')} {userName}
              </p>
            )}
            <p className="mt-2 text-neutral-dark">
              {t('results.completed')} {formatDate(results.date)}
            </p>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary mb-4">{t('results.summary')}</h2>
              <button 
                onClick={() => setShowScoringInfo(!showScoringInfo)}
                className="flex items-center text-xs text-secondary underline"
              >
                <Info className="h-3 w-3 mr-1" />
                {showScoringInfo ? t('results.hide.scoring') : t('results.scoring.info')}
              </button>
            </div>
            
            {showScoringInfo && (
              <div className="mb-6 p-3 border border-secondary border-dashed rounded-md bg-neutral">
                <h3 className="text-sm font-medium text-secondary mb-2">{t('results.scoring.title')}</h3>
                <p className="text-xs text-neutral-dark mb-2">
                  {t('results.scoring.desc')}
                </p>
                <ul className="text-xs text-neutral-dark list-disc ml-4 space-y-1">
                  <li>Questions that use normal scoring (Never:1, Always:5): "Do you feel energetic?", "Can you adapt to natural, environmental or societal changes?"</li>
                  <li>Questions that use reversed scoring (Never:5, Always:1): All other questions in the Neutral category</li>
                </ul>
                <p className="text-xs text-neutral-dark mt-2">
                  This special scoring reflects that for the Neutral type, positive health indicators like energy and adaptability score higher when present, while negative indicators like fatigue and moodiness score higher when absent.
                </p>
              </div>
            )}
            
            {primaryConstitutions.length > 0 ? (
              <div className="mb-4">
                <h3 className="font-medium text-neutral-dark">{t('results.primary')}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {primaryConstitutions.map(con => (
                    <span 
                      key={con.categoryId}
                      className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium"
                    >
                      Type {con.categoryId}: {getCategoryName(con.categoryId, con.name)} ({con.normalizedPercentage.toFixed(1)}%)
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-neutral-dark mb-4">{t('results.no.primary')}</p>
            )}
            
            {secondaryConstitutions.length > 0 && (
              <div>
                <h3 className="font-medium text-neutral-dark">{t('results.secondary')}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {secondaryConstitutions.map(con => (
                    <span 
                      key={con.categoryId}
                      className="px-3 py-1 bg-secondary text-white rounded-full text-sm font-medium"
                    >
                      Type {con.categoryId}: {getCategoryName(con.categoryId, con.name)} ({con.normalizedPercentage.toFixed(1)}%)
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <ResultsBarChart results={results.categories} />
          
          <div className="mt-10 sm:mt-12">
            <h2 className="text-xl font-semibold text-primary mb-4">{t('results.detailed')}</h2>
            <div className="space-y-2">
              {results.categories.map(result => (
                <ConstitutionDetail key={result.categoryId} result={result} />
              ))}
            </div>
          </div>
          
          <div className="mt-10 sm:mt-12 pt-6 border-t">
            <h3 className="text-lg font-medium text-primary mb-4">{t('results.what.next')}</h3>
            <div className="prose text-neutral-dark">
              <p>
                {t('results.next.desc1')}
              </p>
              <p className="mt-2">
                {t('results.next.desc2')}
              </p>
              <p className="mt-2 text-sm text-neutral-dark">
                {t('results.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;