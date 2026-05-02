export type VideoEntry = {
  id: number
  title: string
  views: number
  engagementRate: number
  hookScore: number
  hookType: string
  trigger: string
  pacing: 'Dynamic' | 'Slow' | 'Moderate'
  textOverlay: string
  spokenHook: string
  visualElements: string
  spokenHookAnalysis: string
  whyItWorks: string
  improvement: string
  likes: number
  shares: number
  saves: number
  comments: number
}

export type ReportData = {
  creator: {
    handle: string
    niche: string
    followerCount: number
    avatarUrl: string
  }
  hookScore: {
    score: number
    label: string
    reason: string
  }
  audienceSignals: {
    ageRange: string
    topLocations: { name: string; percentage: number }[]
    peakHours: string
    watchTimeAvg: string
    timingHeatmap: { label: string; intensity: number }[]
  }
  sentiment: {
    positive: number
    neutral: number
    negative: number
    exampleComments: { text: string; tone: 'positive' | 'neutral' | 'negative' }[]
  }
  postIdeas: {
    title: string
    rationale: string
  }[]
  videoBreakdown: VideoEntry[]
  followerGrowth: number[]
  generatedAt: string
  plainSummary: {
    hookScore: string
    audience: string
    sentiment: string
  }
}

export const mockReport: ReportData = {
  creator: {
    handle: '@maelingkitchen',
    niche: 'Food / Lifestyle',
    followerCount: 47800,
    avatarUrl: '',
  },
  hookScore: {
    score: 72,
    label: 'Strong',
    reason:
      'Your question-hook openings in the first 2 seconds consistently outperform statement hooks. Posts that open with "ano ang pinaka-masarap na..." hold 3× more viewers past the 5-second mark.',
  },
  audienceSignals: {
    ageRange: '18–24',
    topLocations: [
      { name: 'Metro Manila', percentage: 58 },
      { name: 'Cebu', percentage: 19 },
      { name: 'Davao', percentage: 12 },
      { name: 'Laguna', percentage: 7 },
      { name: 'Others', percentage: 4 },
    ],
    peakHours: '7–9 PM',
    watchTimeAvg: '67%',
    timingHeatmap: [
      { label: '6AM',  intensity: 0.20 },
      { label: '9AM',  intensity: 0.35 },
      { label: '12PM', intensity: 0.55 },
      { label: '3PM',  intensity: 0.45 },
      { label: '6PM',  intensity: 0.75 },
      { label: '9PM',  intensity: 0.95 },
      { label: '12AM', intensity: 0.30 },
    ],
  },
  sentiment: {
    positive: 68,
    neutral: 22,
    negative: 10,
    exampleComments: [
      {
        text: 'Grabe ang sarap ng niluto mo! Gagawin ko ito bukas for sure 😍',
        tone: 'positive',
      },
      {
        text: 'Ok naman pero mas gusto ko yung dati mong recipe. Both are good though.',
        tone: 'neutral',
      },
      {
        text: 'Sana more detailed ang instructions, medyo nalito ako sa steps.',
        tone: 'negative',
      },
    ],
  },
  postIdeas: [
    {
      title: '"Ano ang kinakain ng Cebuano kapag Fiesta?" — a local deep-dive',
      rationale:
        'Your Cebu audience is loyal but underserved — only 3 posts in the last 30 days were Cebu-specific vs 24 Manila-focused. A regional spotlight post has 2× the share rate in niche food communities.',
    },
    {
      title: 'The 7PM "what\'s for dinner?" series — one quick recipe, every weeknight',
      rationale:
        'Your engagement spikes sharply at 7–9PM when your Metro Manila audience is winding down. A recurring dinner-time format builds appointment viewing and consistently outperforms your morning posts by 2×.',
    },
    {
      title: 'Open with the question: "Mas masarap ba pag lutuin mo sa bahay?" — a comparison post',
      rationale:
        'Question hooks are your strongest format — they hold 3× more viewers past the 5-second mark. A comparison format (home-cooked vs restaurant) combines your top hook type with high-shareability content.',
    },
  ],
  videoBreakdown: [
    {
      id: 1,
      title: 'Ano ang pinaka-masarap na lutuin kapag tag-ulan? 🌧️',
      views: 48200,
      engagementRate: 8.4,
      hookScore: 9,
      hookType: 'CURIOSITY_GAP',
      trigger: 'Curiosity',
      pacing: 'Dynamic',
      textOverlay: 'Ano ang pinaka-masarap na lutuin kapag tag-ulan? 🌧️',
      spokenHook: 'Guys, isa lang ang sagot ko kapag tag-ulan — kailangan mong maluto to ngayon.',
      visualElements: 'Close-up of a steaming clay pot, rain visible through the kitchen window, warm overhead lamp, condensation on the lid',
      spokenHookAnalysis: 'The hook opens with a question that feels personal and timely. The rain reference triggers an immediate emotional and sensory response for Filipino viewers who strongly associate rainy weather with comfort food — it bypasses skepticism and lands directly on craving.',
      whyItWorks: 'The question hook combined with a seasonal trigger creates urgency to watch through. "Pinaka-masarap" signals a definitive answer is coming, which rewards the viewer for staying. Weather-based hooks also have high share rate because viewers forward them to people in the same weather.',
      improvement: 'Show a 1-second close-up of the final dish before cutting to the question. The anticipation of seeing the food before asking "which one?" makes the curiosity gap even sharper.',
      likes: 3200,
      shares: 890,
      saves: 1400,
      comments: 560,
    },
    {
      id: 2,
      title: 'Cebu fiesta food that Manila doesn\'t talk about enough',
      views: 31500,
      engagementRate: 7.6,
      hookScore: 8,
      hookType: 'RELATABILITY',
      trigger: 'Regional Pride',
      pacing: 'Moderate',
      textOverlay: 'Cebu fiesta food na hindi masyado kilala sa Manila 🫶',
      spokenHook: 'Pag fiesta sa Cebu, hindi lang lechon ang inihahanda. Meron pang isang ulam na hindi mo mahahanap sa kahit saang restaurant sa Manila.',
      visualElements: 'Colorful fiesta table spread, close-up of ngohiong, labahita fish, hands scooping food onto banana leaf',
      spokenHookAnalysis: 'Opening with a regional identity hook immediately activates loyalty among Cebu viewers while generating curiosity in non-Cebuano audiences. The phrase "hindi mo mahahanap sa Manila" positions the content as exclusive regional knowledge — a strong pull for anyone outside Cebu.',
      whyItWorks: 'Regional content has disproportionately high share rate among diaspora communities. This video reached Cebu expats abroad who tagged family, driving shares well above average. The framing as "underrated" gives viewers a sense of discovering something others missed.',
      improvement: 'Lead with the most visually striking dish first — ngohiong\'s golden color reads well on camera. The current opening shot (table spread) gives context but delays the visual payoff by 3 seconds.',
      likes: 2100,
      shares: 1240,
      saves: 980,
      comments: 320,
    },
    {
      id: 3,
      title: 'Mas masarap ba talaga kapag lutuin mo sa bahay? Tinry ko.',
      views: 39800,
      engagementRate: 9.1,
      hookScore: 9,
      hookType: 'CONTROVERSY',
      trigger: 'Debate / Opinion',
      pacing: 'Dynamic',
      textOverlay: 'Mas masarap ba talaga kapag lutuin mo sa bahay? Tested.',
      spokenHook: 'May mga nagtatanong kung mas masarap ba talaga ang home-cooked food kaysa restaurant. Tinry ko. Surprised ako sa sagot.',
      visualElements: 'Split-screen reveal setup, restaurant takeout container on left, home-cooked version on right, taste-test reaction close-up',
      spokenHookAnalysis: 'The controversy hook frames the video as a test of a widely-held belief — neither confirming nor denying it in the opener. "Surprised ako sa sagot" creates a strong curiosity gap by signaling the outcome was unexpected, which drives high completion rate.',
      whyItWorks: 'Comparison content has consistently high share rate because viewers forward it to prove a point to someone they\'re debating with. The question format also generates comment engagement — people argue their side before watching.',
      improvement: 'The taste-test reveal at 0:45 is too late — cut it to 0:25. Viewers who would drop off between 0:25 and 0:45 represent your largest retention loss in this video.',
      likes: 3800,
      shares: 1560,
      saves: 710,
      comments: 940,
    },
    {
      id: 4,
      title: '3 ingredients lang. Wala nang iba. Grabe.',
      views: 22400,
      engagementRate: 6.8,
      hookScore: 7,
      hookType: 'PROBLEM_SOLUTION',
      trigger: 'Simplicity / Accessibility',
      pacing: 'Dynamic',
      textOverlay: '3 ingredients. Walang dagdag. Grabe talaga.',
      spokenHook: 'Tatlo lang. Tatlong sangkap. Yun lang kailangan mo para sa ulam na ito.',
      visualElements: 'Three ingredients laid flat on a cutting board in overhead shot, deliberate wide empty space around them to emphasize minimalism',
      spokenHookAnalysis: 'The repetition of "tatlo" and "tatlong" anchors the hook\'s promise in the viewer\'s memory within 3 seconds. The overhead minimalist shot visually confirms the verbal claim — the composition does half the hook\'s work before a word is spoken.',
      whyItWorks: 'Low-barrier recipe content performs well with the 18-24 audience segment who are cooking independently for the first time. The "only 3 ingredients" format is a proven format that converts well to saves — viewers bookmark it for later.',
      improvement: 'Add a cost indicator on the text overlay — "3 ingredients, under ₱150" would triple saves from budget-conscious viewers. Price anchoring is the top missing element in this video.',
      likes: 1400,
      shares: 380,
      saves: 1890,
      comments: 210,
    },
    {
      id: 5,
      title: 'Sana all may ganito sa Cebu... 🥺',
      views: 17600,
      engagementRate: 11.2,
      hookScore: 8,
      hookType: 'RELATABILITY',
      trigger: 'Aspiration / FOMO',
      pacing: 'Slow',
      textOverlay: 'Sana all... 🥺',
      spokenHook: 'Ito ang kinain ko ngayong weekend at hindi ko makalimutan. Sana all may ganito sa inyong lugar.',
      visualElements: 'Candlelit dinner table, plating close-up, creator\'s genuine reaction on first bite, cozy ambient restaurant setting',
      spokenHookAnalysis: '"Sana all" is one of the most engagement-triggering phrases in Filipino internet culture — it functions as both a compliment and an invitation for viewers to share their own experiences. The slow pacing matches the emotional register of the content.',
      whyItWorks: 'This video had the highest comment-to-view ratio of any post in the last 30 days. "Sana all" generates replies because viewers naturally respond with "may ganito din dito sa [lugar]" — driving a thread of regional food recommendations in the comments.',
      improvement: 'Pin a comment that asks "Saan kayo sa Cebu? May ganito ba sa inyo?" immediately after posting. Comment pinning on this video would likely extend the thread from 210 to 400+ replies.',
      likes: 1960,
      shares: 420,
      saves: 580,
      comments: 1010,
    },
    {
      id: 6,
      title: 'My nanay\'s sinigang recipe pero mas upgraded',
      views: 28100,
      engagementRate: 7.2,
      hookScore: 8,
      hookType: 'SOCIAL_PROOF',
      trigger: 'Nostalgia / Authority',
      pacing: 'Moderate',
      textOverlay: 'Nanay\'s sinigang pero may upgrade 🍲',
      spokenHook: 'Nanay ko ang nagturo nito sa akin. Pero may isang bagay siyang ginagawa na hindi ko nakita sa kahit anong recipe online — at ito ang dahilan kaya mas masarap yung kanya.',
      visualElements: 'Handwritten recipe card visible in background, familiar worn kitchen, creator\'s hands following traditional prep steps then deviating for the "upgrade"',
      spokenHookAnalysis: 'Family recipe authority is a strong trust signal — the claim "hindi ko nakita sa kahit anong recipe online" positions the content as exclusive knowledge. The upgrade framing ensures even viewers who know the traditional recipe stay for the revelation.',
      whyItWorks: 'Nostalgia-anchored food content consistently outperforms trend-based content on saves and shares. Viewers save it to try and share it to prove to family members that "ganito pala yun ginagawa ng iba."',
      improvement: 'Show the recipe card close-up for 2 seconds at the start. The handwritten card is a powerful visual anchor that reads "this is real, passed down" — it\'s currently in the background and easy to miss.',
      likes: 2200,
      shares: 640,
      saves: 1320,
      comments: 410,
    },
    {
      id: 7,
      title: 'POV: 7pm, gutom ka, wala pang ulam',
      views: 44600,
      engagementRate: 8.8,
      hookScore: 9,
      hookType: 'RELATABILITY',
      trigger: 'Shared Experience / Pain Point',
      pacing: 'Dynamic',
      textOverlay: 'POV: 7pm. Gutom. Wala pang ulam.',
      spokenHook: 'Pitong PM na. Gutom na gutom ka na. Wala pang ulam. Yun ang sitwasyon ko kahapon — kaya ginawa ko to.',
      visualElements: 'Clock on phone showing 7:02 PM, empty refrigerator open shot, creator scrambling in kitchen — then fast cut to finished dish',
      spokenHookAnalysis: 'The POV format creates immediate identification by naming a universal Filipino dinnertime scenario. The time stamp (7PM) is precise — specificity makes the relatability feel earned rather than generic. The hard cut from problem to solution creates momentum that carries through the entire video.',
      whyItWorks: 'This is your best-performing video in the last 30 days at 44,600 views. The 7PM timing aligns exactly with your peak audience window (7-9PM) — the viewer is watching at the same time the scenario is set, making the relatability hit twice as hard.',
      improvement: 'Build a recurring "7PM Series" around this exact format — same time stamp, same POV framing, different recipe each weeknight. Your engagement at 7PM is 2× your average; this format is purpose-built for that window.',
      likes: 3400,
      shares: 1180,
      saves: 2100,
      comments: 720,
    },
    {
      id: 8,
      title: 'Bakit palagi akong pumipili ng wrong ulam sa palengke',
      views: 14800,
      engagementRate: 5.9,
      hookScore: 7,
      hookType: 'VISUAL_PATTERN_INTERRUPT',
      trigger: 'Self-Deprecating Humor',
      pacing: 'Dynamic',
      textOverlay: 'Bakit palagi akong mali sa palengke 😭',
      spokenHook: 'Guys, pumunta ako sa palengke kanina at — hindi ko alam kung paano — pero mali na naman ang binili ko. Tingnan nyo to.',
      visualElements: 'Chaotic close-up of wrong cut of meat, confused face, then pivot to making the best of it — comedic pacing with jump cuts',
      spokenHookAnalysis: 'Self-deprecating humor hooks work because they neutralize the creator\'s "expert" positioning — a food creator admitting a grocery mistake is unexpected and immediately humanizing. The "palagi" (always) signals this is a recurring pattern, which is funnier and more relatable than a one-time mistake.',
      whyItWorks: 'Despite lower overall views, this video had a 34% comment rate among people who watched past 30 seconds — the highest of any video this month. Humor-based content drives direct engagement from people who want to share they have the same problem.',
      improvement: 'The comedic payoff lands at 0:38 but the setup runs 22 seconds. Tighten the setup to 12 seconds. The laugh is at "mali na naman" — get there faster and the retention curve improves significantly.',
      likes: 870,
      shares: 290,
      saves: 340,
      comments: 500,
    },
  ],
  followerGrowth: [
    41000, 41250, 41180, 41520, 41900, 42150, 42040, 42380, 42860, 43100,
    43220, 43010, 43450, 43940, 44180, 44090, 44560, 45020, 44800, 45250,
    45640, 45920, 46210, 46080, 46540, 46820, 47050, 47230, 47510, 47800,
  ],
  plainSummary: {
    hookScore:
      'Your hook score is 72 — your intros are strong. Viewers are sticking around past the 5-second mark.',
    audience:
      'Most of your audience is in Metro Manila and most active between 7–9 PM — post during these windows.',
    sentiment:
      'Your comments are overwhelmingly positive. Your audience genuinely loves what you\'re making.',
  },
  generatedAt: '2026-05-01T19:32:00+08:00',
}
