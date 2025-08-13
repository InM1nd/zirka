# ZIRKA - Investment Intelligence Dashboard

AI-powered investment intelligence platform with comprehensive analysis tools for private markets investors.

## Features

### 1. Company Profiling
- Comprehensive company analysis and insights
- AI-powered company research
- Integration with multiple data sources (PitchBook, LSEG, SEC)
- Export and sharing capabilities

### 2. Opportunity Screening
- Automated investment opportunity screening
- Email-based opportunity input
- Categorization by industry verticals
- Fit-based classification (Best, Medium, Worst)
- Interactive dashboard with detailed summaries

### 3. Market Scanning
- Intelligent market analysis and monitoring
- Predictive opportunity detection
- Real-time news feed with categorization
- AI-powered market insights and recommendations
- Market metrics and analytics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components with modern design
- **State Management**: React hooks and local state

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── dashboard.tsx       # Main dashboard component
│   ├── sidebar.tsx         # Navigation sidebar
│   └── sections/
│       ├── company-profiling.tsx      # Company analysis section
│       ├── opportunity-screening.tsx  # Opportunity screening section
│       └── market-scanning.tsx        # Market intelligence section
└── lib/
    └── utils.ts            # Utility functions
```

## Design Philosophy

The dashboard follows modern design principles inspired by platforms like [Clarum.ai](https://clarum.ai) and [Rogo.ai](https://rogo.ai):

- Clean, minimalist interface
- Intuitive navigation with sidebar
- Responsive grid layouts
- Consistent color coding and visual hierarchy
- Interactive elements with smooth transitions

## Future Enhancements

- Real-time data integration
- Advanced AI models for analysis
- User authentication and profiles
- Customizable dashboards
- API endpoints for external integrations
- Advanced filtering and search capabilities

## Contributing

This is a prototype/demo project. For production use, additional features like authentication, data persistence, and real API integrations would be needed.

## License

Private project - All rights reserved.
