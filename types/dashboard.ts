 export type EarningsStats = {
    earningNetUser: string;           // The net earnings for the user
    earningNetSubscriptions: number;  // Net earnings from subscriptions
    earningNetTips: number;           // Net earnings from tips
    earningNetPPV: number;            // Net earnings from Pay-Per-View (PPV)
    subscriptionsActive: number;      // Number of active subscriptions
    stat_revenue_today: number;       // Revenue for today
    stat_revenue_yesterday: number;   // Revenue for yesterday
    stat_revenue_week: number;        // Revenue for this week
    stat_revenue_last_week: number;   // Revenue for last week
    stat_revenue_month: string;       // Revenue for this month
    stat_revenue_last_month: number;  // Revenue for last month
  };
  