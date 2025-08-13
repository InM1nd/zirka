export const config = {
  app: {
    name: "ZIRKA",
    description: "Investment Intelligence Dashboard",
    version: "1.0.0",
  },
  features: {
    companyProfiling: {
      enabled: true,
      maxCompanies: 100,
      sources: ["PitchBook", "LSEG", "SEC"],
    },
    opportunityScreening: {
      enabled: true,
      maxOpportunities: 50,
      categories: ["Fintech", "Healthtech", "Agritech", "Insurtech", "Manufacturing", "Defense"],
    },
    marketScanning: {
      enabled: true,
      maxNewsItems: 100,
      updateInterval: 300000, // 5 minutes
    },
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
  },
  ui: {
    theme: "light",
    sidebarWidth: "20rem",
    maxContentWidth: "1200px",
  },
}
