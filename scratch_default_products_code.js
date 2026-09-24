const DEFAULT_PRODUCTS = [
  {
    "id": "stealth-writer",
    "name": "Stealth Writer Premium Plan",
    "category": "aitools",
    "price": 799,
    "original_price": 1278,
    "badge": "IN STOCK",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Shared Account Policy & Guidelines\n          1) শুধুমাত্র ১টি ডিভাইসে ব্যবহার করা যাবে (Strictly 1 Device Only)।\n     ",
    "plans": [
      {
        "dur": "1 month",
        "price": 799
      },
      {
        "dur": "3 Month",
        "price": 1999
      }
    ]
  },
  {
    "id": "chatgpt-plus",
    "name": "ChatGPT PLUS",
    "category": "aitools",
    "price": 499,
    "original_price": 798,
    "badge": "HOT SELLER",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ ChatGPT PLUS Policies\n          🔹 Shared Account: ১টি ডিভাইসে স্মুথ এক্সেস, প্রাইভেট চ্যাট হিস্ট্রি, GPT-4o, DALL-E 3",
    "plans": [
      {
        "dur": "1 Month PLUS(Renewable)",
        "price": 499
      },
      {
        "dur": "3 Month PLUS(Renewable)",
        "price": 1350
      },
      {
        "dur": "1 Month PLUS(Personal)",
        "price": 2999
      }
    ]
  },
  {
    "id": "gamma-ai",
    "name": "Gamma AI",
    "category": "aitools",
    "price": 1499,
    "original_price": 2398,
    "badge": "IN STOCK",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Gamma AI Features\n          ✔ Presentation, Webpage & Document AI: ১ ক্লিকে আকর্ষণীয় স্লাইড ডেক এবং প্রেজেন্টেশন তৈরি ",
    "plans": [
      {
        "dur": "1 Month",
        "price": 1499
      },
      {
        "dur": "3 Month",
        "price": 3999
      }
    ]
  },
  {
    "id": "claude-pro",
    "name": "Claude Pro",
    "category": "aitools",
    "price": 1500,
    "original_price": 2400,
    "badge": "IN STOCK",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Claude Pro (3.5 Sonnet / Opus)\n          ✔ Claude 3.5 Sonnet: কোডিং, লেখালেখি ও ডাটা এনালাইসিসের জন্য বিশ্বের সেরা AI ",
    "plans": [
      {
        "dur": "1 Month",
        "price": 1500
      },
      {
        "dur": "1 Month",
        "price": 2999
      }
    ]
  },
  {
    "id": "grammarly-premium",
    "name": "Grammarly Premium",
    "category": "aitools",
    "price": 150,
    "original_price": 240,
    "badge": "POPULAR",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Grammarly Premium Features\n          ✔ Full Premium Access: গ্রামার, স্পেলিং, টোন এডজাস্টমেন্ট এবং সেন্টেন্স রিরাইট।\n ",
    "plans": [
      {
        "dur": "1 Month",
        "price": 150
      },
      {
        "dur": "3 Month",
        "price": 399
      },
      {
        "dur": "6 Month",
        "price": 699
      }
    ]
  },
  {
    "id": "jenni-ai",
    "name": "Jenni AI",
    "category": "aitools",
    "price": 499,
    "original_price": 798,
    "badge": "IN STOCK",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Jenni AI Research Assistant\n          ✔ Academic Citations: APA, MLA, Harvard সহ সকল ফরম্যাটে অটো সাইটেশন।\n          ✔",
    "plans": [
      {
        "dur": "1 Month PRO",
        "price": 499
      },
      {
        "dur": "3 Month PRO",
        "price": 1299
      }
    ]
  },
  {
    "id": "quillbot-premium",
    "name": "Quillbot Premium",
    "category": "aitools",
    "price": 150,
    "original_price": 240,
    "badge": "BEST SELLER",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Quillbot Premium Access\n          ✔ Unlimited Paraphrasing: আনলিমিটেড শব্দ প্যারাফ্রেজ করার সুবিধা।\n          ✔ All 8 ",
    "plans": [
      {
        "dur": "1 Month",
        "price": 150
      },
      {
        "dur": "3 Month",
        "price": 399
      },
      {
        "dur": "6 Month",
        "price": 699
      }
    ]
  },
  {
    "id": "hix-bypass",
    "name": "HIX Bypass",
    "category": "aitools",
    "price": 299,
    "original_price": 478,
    "badge": "IN STOCK",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ HIX Bypass Features\n          ✔ Undetectable AI: AI লেখা কন্টেন্টকে ১০০% হিউম্যানাইজ করে যে কোনো AI ডিটেক্টর বাইপাস কর",
    "plans": [
      {
        "dur": "1 Month",
        "price": 299
      },
      {
        "dur": "3 Month",
        "price": 799
      },
      {
        "dur": "6 Month",
        "price": 1499
      },
      {
        "dur": "1 Year",
        "price": 2799
      }
    ]
  },
  {
    "id": "perplexity-pro",
    "name": "Perplexity Pro",
    "category": "aitools",
    "price": 350,
    "original_price": 560,
    "badge": "POPULAR",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Perplexity Pro Capabilities\n          ✔ Copilot & Pro Search: আনলিমিটেড প্রো সার্চ ও রেফারেন্স সাইটেশন।\n          ✔ Mo",
    "plans": [
      {
        "dur": "1 Month",
        "price": 350
      },
      {
        "dur": "3 Month",
        "price": 899
      },
      {
        "dur": "1 Month",
        "price": 1499
      }
    ]
  },
  {
    "id": "capcut-pro",
    "name": "CapCut Pro",
    "category": "aitools",
    "price": 250,
    "original_price": 400,
    "badge": "TRENDING",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ CapCut Pro VIP Features\n          ✔ All VIP Effects & Filters: রিলস ও টিকটক ভিডিও তৈরির সকল প্রিমিয়াম এফেক্টস আনলক।\n  ",
    "plans": [
      {
        "dur": "1 Month",
        "price": 250
      },
      {
        "dur": "3 Month",
        "price": 650
      },
      {
        "dur": "1 Year",
        "price": 1499
      }
    ]
  },
  {
    "id": "paperpal",
    "name": "Paperpal",
    "category": "aitools",
    "price": 199,
    "original_price": 318,
    "badge": "ACADEMIC",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Paperpal Academic Editing\n          ✔ Journal Standard Proofreading: রিসার্চ পেপারের ভাষা আন্তর্জাতিক জার্নাল মানের কর",
    "plans": [
      {
        "dur": "1 Month",
        "price": 199
      },
      {
        "dur": "3 Month",
        "price": 499
      },
      {
        "dur": "6 Month",
        "price": 899
      }
    ]
  },
  {
    "id": "udemy",
    "name": "Udemy Business",
    "category": "aitools",
    "price": 450,
    "original_price": 720,
    "badge": "LEARNING",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Udemy Business Subscription\n          ✔ 10,000+ Top Rated Courses: ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং, AI, পাইথন সহ স",
    "plans": [
      {
        "dur": "3 Month",
        "price": 450
      },
      {
        "dur": "6 Month",
        "price": 799
      }
    ]
  },
  {
    "id": "basic-combo",
    "name": "Basic Research Combo (10 Tools)",
    "category": "combo",
    "price": 599,
    "original_price": 958,
    "badge": "💥 10 TOOLS",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✔ Basic Research Combo — Tools List\n          1. ChatGPT | 2. Perplexity Pro | 3. HIX.AI | 4. QuillBot | 5. Grammarly | ",
    "plans": [
      {
        "dur": "1 Month",
        "price": 599
      },
      {
        "dur": "3 Month",
        "price": 1799
      },
      {
        "dur": "6 Month",
        "price": 3399
      }
    ]
  },
  {
    "id": "standard-combo",
    "name": "Standard Research Combo (14 Tools)",
    "category": "combo",
    "price": 1199,
    "original_price": 1918,
    "badge": "👑 BEST VALUE",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✔ Standard Research Combo — Tools List\n          1. ChatGPT | 2. HIX.AI | 3. Perplexity Pro | 4. Stealth Writer | 5. Gra",
    "plans": [
      {
        "dur": "1 Month",
        "price": 1199
      },
      {
        "dur": "3 Month",
        "price": 3499
      },
      {
        "dur": "6 Month",
        "price": 6999
      }
    ]
  },
  {
    "id": "premium-combo",
    "name": "Premium Research Combo (17 Tools)",
    "category": "combo",
    "price": 1499,
    "original_price": 2398,
    "badge": "🌟 VIP COMBO",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✔ Premium Research Combo — 17 Tools List\n          1. ChatGPT | 2. HIX.AI | 3. Stealth Writer | 4. Perplexity | 5. Quill",
    "plans": [
      {
        "dur": "1 Month",
        "price": 1499
      },
      {
        "dur": "3 Month",
        "price": 4399
      },
      {
        "dur": "6 Month",
        "price": 8799
      }
    ]
  },
  {
    "id": "prod-canva",
    "name": "Canva Pro Verified Owner Account",
    "category": "post",
    "price": 999,
    "original_price": 1598,
    "badge": "👑 1-YEAR WARRANTY",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Canva Pro Owner Account\n          ✔ 1-Year Full Warranty: কোনো ড্রপ হবে না, ১ বছরের নিশ্চিত সার্ভিস।\n          ✔ Verif",
    "plans": [
      {
        "dur": "1 Year",
        "price": 999
      },
      {
        "dur": "2 Year",
        "price": 1699
      }
    ]
  },
  {
    "id": "prod-laravel",
    "name": "100+ Ready Laravel E-Commerce Codes",
    "category": "web",
    "price": 450,
    "original_price": 720,
    "badge": "💥 100 SOURCE CODES",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ 100+ Laravel E-Commerce Source Codes\n          ✔ 100+ Complete Projects: ফ্যাশন, গ্যাজেট, গ্রোসারি ও মাল্টি-ভেন্ডর ই-ক",
    "plans": [
      {
        "dur": "Lifetime Access",
        "price": 450
      }
    ]
  },
  {
    "id": "prod-mouza",
    "name": "All BD 250,000+ Mouza Map Collection",
    "category": "tools",
    "price": 200,
    "original_price": 320,
    "badge": "💥 ৳200 MEGA DEAL",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ All Bangladesh Mouza Map Archive\n          ✔ 64 Districts Covered: সারা বাংলাদেশের ২.৫ লক্ষাধিক নির্ভুল মৌজা ম্যাপ।\n  ",
    "plans": [
      {
        "dur": "Lifetime Download",
        "price": 200
      }
    ]
  },
  {
    "id": "prod-cartoon",
    "name": "Cartoon Video YouTube Earning Course",
    "category": "video",
    "price": 499,
    "original_price": 798,
    "badge": "🎬 100% MONETIZABLE",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ YouTube Cartoon Video Monetization Course\n          ✔ Copyright-Free Editing: কোনো স্ট্রাইক বা ক্লেইম ছাড়া গোপাল ভাঁড় ",
    "plans": [
      {
        "dur": "Full Course",
        "price": 499
      }
    ]
  },
  {
    "id": "prod-bin",
    "name": "Official 13-Digit Business BIN Service",
    "category": "tools",
    "price": 100,
    "original_price": 160,
    "badge": "🛡️ 13-DIGIT BIN",
    "image": "logo.jpg",
    "link": "details.html",
    "description": "✅ Official Verified Business BIN Number\n          ✔ Save 15% FB VAT: ফেসবুক বুস্টিংয়ে সরকারি ১৫% অতিরিক্ত ভ্যাট ছাড় সুবি",
    "plans": [
      {
        "dur": "Official BIN",
        "price": 100
      }
    ]
  }
];