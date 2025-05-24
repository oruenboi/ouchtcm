# Traditional Chinese Medicine (TCM) Body Constitution Survey

## Overview

This application allows users to assess their body constitution according to Traditional Chinese Medicine (TCM) principles. It evaluates nine distinct constitution types through a comprehensive questionnaire and provides detailed results with personalized recommendations.

## Features

- **Comprehensive Assessment**: Evaluates nine different TCM constitution types
- **User-friendly Interface**: Modern, responsive design with clear navigation
- **Detailed Results**: Shows raw scores, normalized percentages, and classifications
- **Visual Representation**: Bar chart visualization of constitution distribution
- **Personalized Recommendations**: Tailored advice based on identified constitution types
- **Export Options**: Download results as CSV or copy to clipboard

## TCM Constitution Types

The survey evaluates the following nine constitution types:

1. **Type A: Neutral** - Balanced state where yin and yang are in harmony
2. **Type B: Qi-deficient** - Characterized by lack of vital energy
3. **Type C: Yang-deficient** - Shows signs of inadequate warmth and activity
4. **Type D: Yin-deficient** - Lacks cooling, moistening aspects
5. **Type E: Phlegm-dampness** - Has excessive moisture that congeals
6. **Type F: Damp-heat** - Shows excess heat combined with dampness
7. **Type G: Blood-stasis** - Poor circulation leading to blood stagnation
8. **Type H: Qi-stagnation** - Energy that is stuck or not flowing properly
9. **Type I: Special** - Unique characteristics that don't fit other patterns

## Technical Implementation

### Frontend

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router for navigation between pages
- **State Management**: React hooks for local state management
- **Icons**: Lucide React for UI icons

### Score Calculation

The application uses the following formulas to calculate normalized percentage scores:

- For categories with 6 items: `(Raw Score - 6) / 24 * 100`
- For categories with 7 items: `(Raw Score - 7) / 28 * 100`
- For categories with 8 items: `(Raw Score - 8) / 32 * 100`

Classifications are determined based on these scores:

- **Type A (Neutral)**:
  - Above 60%: "For sure" Type A
  - Below 60%: Not Type A
  - Raw score ≤ 27.2: Normal (N)
  - Raw score ≥ 27.3: Positive indication (Y)

- **Types B-I**:
  - Below 30%: "Not" the type
  - Between 30-40%: "Somewhat" the type
  - Above 40%: "For sure" the type

Each type has specific thresholds for normal (N) and positive (Y) indications.

## Project Structure

```
/src
  /components           # React components
    LandingPage.tsx     # Introduction and instructions
    SurveyForm.tsx      # Main survey form
    CategorySection.tsx # Section for each constitution type
    QuestionItem.tsx    # Individual question component
    ProgressBar.tsx     # Survey progress indicator
    ResultsPage.tsx     # Results display page
    ResultsBarChart.tsx # Bar chart visualization
    ConstitutionDetail.tsx # Detailed constitution information
  /data
    surveyData.ts       # Questions and categories data
  /types
    index.ts           # TypeScript type definitions
  /utils
    calculations.ts    # Score calculation functions
  App.tsx              # Main application component
  main.tsx             # Application entry point
```

## Setup and Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/tcm-constitution-survey.git
   cd tcm-constitution-survey
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

This application can be deployed to any static hosting service.

### Build for Production

```
npm run build
```

This will create a `dist` folder with production-ready files.

### Deployment Options

- **Netlify**: Connect your repository or upload the `dist` folder
- **Vercel**: Connect your repository for automatic deployment
- **GitHub Pages**: Upload the `dist` folder to a gh-pages branch

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This survey is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.