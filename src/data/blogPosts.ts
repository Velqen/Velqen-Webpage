// --- Type Definitions ---
type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullet"; items: string[] }
  | { type: "image"; src: string; alt?: string };

interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: BlogContentBlock[];
  hasIcons?: boolean;
}

// --- Blog Post Data ---
const blogPosts: BlogPostItem[] = [
  {
    id: 1,
    slug: "free-ai-transaction-classification",
    title: "We're launching free AI-powered transaction classification for all users",
    category: "Product",
    date: "May 30, 2025",
    image: "/blog/post1.jpg",
   content: [
    { type: "paragraph", text: "We're excited to announce that AI-powered transaction classification is now free for everyone!" },
    { type: "paragraph", text: `No more messy spreadsheets or guesswork. Our assistant categorises your spending into clear categories in split seconds. 
  It understands your transaction descriptions, merchant names, and other details, then sorts everything into three distinct layers:` },
    { type: "bullet", items: [
      "Main Category",
      "Sub Category",
      "Detailed Category"
    ]},
    { type: "paragraph", text: "Start simplifying your finances today." }
  ],
  },
  {
    id: 2,
    slug: "free-ocr-invoice-extraction",
    title: "Free OCR invoice extraction is now available for everyone",
    category: "Product",
    date: "April 23, 2025",
    image: "/blog/post2.jpg",
    content: [
      { type: "paragraph", text: "Tired of typing out invoice details?" },
      { type: "paragraph", text: `Our system combines OCR with Large Language Models (LLMs) to extract key details like invoice numbers, amounts, and dates.` },
      { type: "paragraph", text: `OCR (Optical Character Recognition) is an AI technology that scans printed or handwritten text, like from images or documents, and converts it into digital text, 
    making data entry faster and more accurate. The advent of OCR has therefore been a game-changer for digitising paper documents.` },
      { type: "paragraph", text: `LLMs, like ChatGPT,
    are smart AI models capable of understanding human languages, helping you clean up and organise your document data.` },
      { type: "paragraph", text: "It’s fast, free, and built right into your finance dashboard." }
    ],
  },
  {
    id: 3,
    slug: "meet-velqen-ai-finance-assistant",
    title: "Meet Velqen: Your friendly AI finance assistant",
    category: "AI Assistant",
    date: "May 18, 2025",
    hasIcons: true,
    image: "/blog/post3.3.jpg",
    content: [
      { type: "paragraph", text: `Velqen is your AI financial assistant that actually pulls its weight. With features like AI-powered transaction classification, 
      OCR invoice extraction, and smart record reconciliation, Velqen takes care of the boring stuff. Each feature is designed to be quick and simple to use, 
      and let's not forget, your data stays safe throughout.` },
      { type: "image", src: "/blog/post3.2.jpg", alt: "Velqen finance assistant UI preview" },

      { type: "paragraph", text: `There's more! With our Agentic AI Chatbot, it can now analyse your transactions, suggest tax strategies, and provide helpful advice, all based on your own financial data.
      Everything happens through a built-in chatbot, right inside your dashboard.` },
      { type: "paragraph", text: "This is an AI accounting app built for non-accountants. (For professionals, we have advanced features too.)" }
    ],
  },
  {
    id: 4,
    slug: "safe-and-private-data",
    title: "We Don’t Store Your Data. It’s 100% Safe and Private",
    category: "Security",
    date: "June 27, 2025",
    hasIcons: true,
    image: "/blog/post4.jpg",
    content: [
      { type: "paragraph", text: "We take data security seriously. Your privacy is a priority." },
      { type: "paragraph", text: `When you use our AI tools, your data is processed instantly and securely on safe servers. Nothing is stored. 
      We don’t save any invoices or company information to our servers or databases. Once your session ends, everything disappears as if it was never there, keeping your data protected at all times.` },
      { type: "paragraph", text: "The only time we store your data is when you intentionally upload it to your account. Even then, it's encrypted and protected. No storage without consent. No leaks. No worries." }
    ],
  },
  {
    id: 5,
    slug: "ai-bank-reconciliation-free",
    title: "Free Bank Record Reconciliation with AI",
    category: "Product",
    date: "June 9, 2025",
    hasIcons: true,
    image: "/blog/post5.jpg",
    content: [
      { type: "paragraph", text: "Reconciling your bank records doesn't have to be a headache anymore." },
      { type: "paragraph", text: `We use sentence transformers to match transaction descriptions that look different but mean the same thing. This helps ensure your records stay consistent, 
    even when descriptions vary. Rule-based systems often fail here, but AI understands context. For example, "Bought a donut" and "Buy one doughnut" may seem different, but our model recognises they’re the same.` },
      { type: "paragraph", text: "It’s completely free. No subscriptions, no hidden charges. Just clean, effortless reconciliation driven by smart AI." }
    ],
  },
  {
    id: 6,
    slug: "we-prioritise-user-experience",
    title: "We Prioritise User Experience",
    category: "Company",
    date: "July 3, 2025",
    image: "/blog/post6.jpg",
    content: [
      { type: "paragraph", text: "Most AI platforms start by talking about themselves. We flipped that approach." },
      { type: "paragraph", text: `Instead of filling our homepage with mission statements or bios, we focused on you — the user. From the moment you land, you can try free AI tools like 
    transaction classification, invoice OCR, and record reconciliation. No fluff. Just value.` },
      { type: "paragraph", text: "We believe real trust is earned by showing what we can do, not by telling you who we are. That’s why we lead with functionality and let the product speak for itself." }
    ]
  },
  {
    id: 7,
    slug: "no-credit-card-needed",
    title: "Why We Don’t Ask for Your Credit Card",
    category: "Company",
    date: "June 21, 2025",
    image: "/blog/post7.jpg",
    content: [
      { type: "paragraph", text: `We don’t ask for your credit card up front because exploring something new shouldn’t come with strings attached. All AI finance features on the homepage are free to try. 
    To access the full dashboard and use our AI assistant, just sign in. No trials, no hidden fees, no charges.` },
      { type: "paragraph", text: "By removing barriers we let you explore real value before making any commitment. Trust is earned by experience, not locked behind payment walls. Try it now and see for yourself." }
    ]
  },
];

export default blogPosts;
