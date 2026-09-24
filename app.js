/* ===================================================
   AI Future Agency - Deluxe Liquid Glass Engine
   - 300 Frames Smooth Scroll Canvas Engine
   - Instant Dual Theme Switcher (Cyber Cyan 💙 & Royal Gold 👑)
   - 100% Comprehensive Bilingual Translation (English Default & Bengali)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. SMOOTH SCROLL CANVAS BACKGROUND ENGINE (UNTOUCHED) ---
  const TOTAL_FRAMES = 300;
  const canvas = document.getElementById('animationCanvas');
  const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
  const preloader = document.getElementById('preloader');
  const loaderText = document.getElementById('loaderText');

  const images = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let targetFrame = 0;
  let currentFrame = 0;
  let lastDrawnFrame = -1;
  let isReady = false;

  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(3, '0');
    return `ezgif-frame-${frameNum}.jpg`;
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    lastDrawnFrame = -1;
    renderFrame(Math.round(currentFrame));
  }

  function renderFrame(index) {
    if (!canvas || !ctx) return;
    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (lastDrawnFrame === index) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;

    const scale = Math.max(width / imgWidth, height / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    lastDrawnFrame = index;
  }

  function updateTargetFrame() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    targetFrame = progress * (TOTAL_FRAMES - 1);
  }

  function canvasAnimationLoop() {
    const delta = targetFrame - currentFrame;
    currentFrame += delta * 0.14;

    if (Math.abs(delta) < 0.001) {
      currentFrame = targetFrame;
    }

    const frameIndex = Math.min(Math.max(Math.round(currentFrame), 0), TOTAL_FRAMES - 1);
    renderFrame(frameIndex);

    requestAnimationFrame(canvasAnimationLoop);
  }

  function preloadImages() {
    // Fast initial frame load
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      loadedCount++;
      resizeCanvas();
      renderFrame(0);
    };

    // Smooth & snappy preloader animation (< 2.5s)
    let fakeProgress = 0;
    const progressInterval = setInterval(() => {
      fakeProgress += Math.floor(Math.random() * 8) + 6;
      if (fakeProgress >= 100) {
        fakeProgress = 100;
        clearInterval(progressInterval);
        if (loaderText) loaderText.textContent = `Loading Animation 100%`;
        setTimeout(() => {
          onPreloadComplete();
        }, 150);
      } else {
        if (loaderText) loaderText.textContent = `Loading Animation ${fakeProgress}%`;
      }
    }, 85); // 85ms * ~15 steps ≈ 1.3 to 1.8 seconds max!

    // Load remaining frames asynchronously in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        images[i] = img;
      };
      img.onerror = () => {
        loadedCount++;
      };
    }
  }

  function onPreloadComplete() {
    if (isReady) return;
    isReady = true;
    if (preloader) {
      preloader.classList.add('hidden');
    }
    resizeCanvas();
    updateTargetFrame();
    renderFrame(0);
  }

  if (canvas) {
    preloadImages();
    resizeCanvas();
    requestAnimationFrame(canvasAnimationLoop);
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', updateTargetFrame, { passive: true });
  }

  // --- 2. CONFIGURATION & STATE ---
  let WHATSAPP_NUMBER = '880163935198';
  try {
    const savedSiteSettings = JSON.parse(localStorage.getItem('afa_site_settings') || '{}');
    if (savedSiteSettings.whatsapp) {
      WHATSAPP_NUMBER = savedSiteSettings.whatsapp.replace(/[^0-9]/g, '');
    }
  } catch(e) {}
  const FB_PAGE_URL = 'https://www.facebook.com/AiFutureAgency';
  const FB_MESSENGER_URL = 'https://m.me/AiFutureAgency';
  const USD_TO_BDT_RATE = 150;
  let currentLang = 'en'; // Default is English on entry
  let currentTheme = 'cyan'; // 'cyan' or 'gold'

  // --- 3. COMPREHENSIVE BILINGUAL DATA ---
  const i18n = {
    en: {
      // Navbar
      nav_home: 'Home',
      nav_products: 'Digital Products',
      nav_boost: 'FB Boost & Ads',
      nav_production: 'Production & Web',
      nav_pricing: 'Packages',
      nav_faq: 'FAQ',
      nav_whatsapp: 'WhatsApp',

      // Hero
      hero_tag: 'Modern Digital Marketing & AI Agency',
      hero_title_1: 'Scale Your Business Sales With',
      hero_title_highlight: 'Premium Digital Products',
      hero_title_2: '& Facebook Services',
      hero_desc: 'Get 100+ Laravel source codes, 2.5L+ Mouza map archive, Canva Owner accounts, YouTube monetization course, verified BIN service, precision Facebook boosting, and bespoke web design to scale your brand to the next level.',
      hero_btn_products: 'Explore Products & Services',
      hero_btn_consult: 'Get Free Consultation',
      stat_clients_num: '5,000+',
      stat_clients_label: 'Successful Clients & Campaigns',
      stat_satisfaction_num: '99.2%',
      stat_satisfaction_label: 'Positive Client Satisfaction',
      stat_support_num: '24/7',
      stat_support_label: 'Dedicated Priority Support',
      badge_growth: '10X Sales Growth',
      badge_growth_sub: 'High ROI Campaigns',
      badge_delivery: 'Instant Access',
      badge_delivery_sub: 'Delivered in 1 Minute',

      // Products Section
      prod_badge: 'Digital Product Store',
      prod_sec_main_title: 'Featured Products',
      featured_prods_subtitle: 'Premium digital products, ready to activate today.',
      search_tools_ph: 'Search for tools...',
      filter_all: 'All Tools & Products',
      filter_aitools: 'AI Premium Tools',
      filter_combo: 'Research Combos',
      filter_web: 'Laravel & Web',
      filter_post: 'Design & Canva',
      filter_video: 'Video & Course',
      filter_tools: 'Maps & BIN',
      prod_title_1: 'Ready-Made Premium',
      prod_title_highlight: 'Digital Assets & Bundles',
      prod_subtitle: 'Ready-to-use solutions to save time on tech development, content creation and double your sales',
      btn_buy: 'Buy Now',
      btn_view_details: 'View Details',

      // Boost Section
      boost_badge: 'Facebook Boost & Growth',
      boost_title_1: 'Targeted Facebook Boost &',
      boost_title_highlight: 'Live ROI Calculator',
      boost_subtitle: 'Reach your ideal audience with laser-targeted ads and maximize sales conversions',
      calc_title: 'Boost Budget & Reach Estimator',
      calc_goal_label: 'Campaign Goal:',
      goal_sales: 'Sales & Messages',
      goal_leads: 'Lead Generation',
      goal_growth: 'Page Likes & Reach',
      calc_budget_label: 'Ad Budget (USD):',
      calc_duration_label: 'Campaign Duration (Days):',
      calc_est_reach: 'Estimated Audience Reach',
      calc_est_clicks: 'Estimated Clicks / Engagement',
      calc_est_total: 'Total Cost (All Charges Included)',
      btn_start_boost: 'Start Boost With This Budget',

      // Pricing Section
      pricing_title_1: 'Popular',
      pricing_title_highlight: 'Boost & Growth Packages',
      pkg_select_btn: 'Select Package',
      pkg_popular_badge: 'Most Popular',

      // Production Section
      prod_sec_badge: 'Media & Web Production',
      prod_sec_title_1: 'Professional',
      prod_sec_title_highlight: 'Web Dev, Video & Content',
      prod_sec_subtitle: 'Portfolio websites, custom Laravel e-commerce stores, high-converting video ads and social media branding',
      service_order_btn: 'Order Service',

      // Reviews Section
      reviews_badge: 'Client Testimonials',
      reviews_title_1: 'What Our',
      reviews_title_highlight: 'Clients Say',
      reviews_subtitle: 'Feedback from entrepreneurs 100% satisfied with our products & boosting',

      // FAQ Section
      faq_badge: 'Frequently Asked Questions',
      faq_title_1: 'Frequently',
      faq_title_highlight: 'Asked Questions',
      faq_subtitle: 'Clear answers to everything you need to know about our services',

      // CTA Banner
      cta_title: 'Start Scaling Your Business Today!',
      cta_desc: 'Skyrocket your sales with the right audience, verified services, and premium digital assets. We are with you 24/7.',
      cta_btn: 'Chat on WhatsApp Directly',

      // Footer
      footer_desc: 'Your trusted digital product & business growth partner. We combine state-of-the-art AI technology, Laravel mastery, and creative marketing to scale your brand.',
      footer_quick_links: 'Quick Links',
      footer_categories: 'Categories',
      footer_payment_title: 'Payment & Security',
      footer_payment_desc: '100% secure transactions via bKash, Nagad, Rocket, and Bank Cards.',
      footer_rights: '© 2026 AI Future Agency. All rights reserved.',

      // Modal
      modal_title: 'Instant Order / Consultation',
      modal_subtitle: 'Provide your details to connect directly on WhatsApp.',
      modal_lbl_item: 'Service / Product Name:',
      modal_lbl_price: 'Price / Budget:',
      modal_lbl_name: 'Your Full Name:',
      modal_ph_name: 'e.g. John Doe / মো: রফিকুল ইসলাম',
      modal_lbl_phone: 'WhatsApp / Phone Number:',
      modal_ph_phone: 'e.g. 0163935198',
      modal_lbl_notes: 'Page Link or Special Requirements (Optional):',
      modal_ph_notes: 'Your Facebook page name or specific requirements',
      modal_btn_submit: 'Confirm on WhatsApp'
    },

    bn: {
      // Navbar
      nav_home: 'হোম',
      nav_products: 'ডিজিটাল প্রোডাক্ট',
      nav_boost: 'ফেসবুক বুস্ট',
      nav_production: 'প্রোডাকশন ও ওয়েব',
      nav_pricing: 'প্যাকেজ সমূহ',
      nav_faq: 'FAQ',
      nav_whatsapp: 'হোয়াটসঅ্যাপ',

      // Hero
      hero_tag: 'আধুনিক ডিজিটাল মার্কেটিং ও এআই এজেন্সি',
      hero_title_1: 'আপনার বিজনেসের সেলস বাড়ান',
      hero_title_highlight: 'প্রিমিয়াম ডিজিটাল প্রোডাক্ট',
      hero_title_2: 'ও ফেসবুক সার্ভিসে',
      hero_desc: 'আমরা দিচ্ছি ১০০+ লারাভেল ই-কমার্স সোর্স কোড, সারা দেশের ২.৫ লাখ মৌজা ম্যাপ, ক্যানভা ওনার একাউন্ট, ইউটিউব কার্টুন মনিটাইজেশন কোর্স, ভেরিফাইড BIN নাম্বার, অর্গানিক ফলোয়ার ও ফেসবুক বুস্টিং এবং প্রফেশনাল পোর্টফোলিও ওয়েবসাইট তৈরির সেরা সমাধান।',
      hero_btn_products: 'প্রোডাক্ট ও সার্ভিস দেখুন',
      hero_btn_consult: 'ফ্রি কনসালটেশন নিন',
      stat_clients_num: '৫,০০০+',
      stat_clients_label: 'সফল ক্লায়েন্ট ও ক্যাম্পেইন',
      stat_satisfaction_num: '৯৯.২%',
      stat_satisfaction_label: 'পজিটিভ ক্লায়েন্ট স্যাটিসফ্যাকশন',
      stat_support_num: '২৪/৭',
      stat_support_label: 'ডেডিকেটেড কাস্টমার সাপোর্ট',
      badge_growth: '১০X সেলস গ্রোথ',
      badge_growth_sub: 'হাই আরওআই ক্যাম্পেইন',
      badge_delivery: 'ইনস্ট্যান্ট এক্সেস',
      badge_delivery_sub: '১ মিনিটে ডেলিভারি',

      // Products Section
      prod_badge: 'ডিজিটাল প্রোডাক্ট স্টোর',
      prod_sec_main_title: 'ফিচার্ড ডিজিটাল প্রোডাক্টস',
      featured_prods_subtitle: 'প্রিমিয়াম ডিজিটাল টুলস ও প্রোডাক্টস, আজই অ্যাক্টিভেট করুন।',
      search_tools_ph: 'প্রোডাক্ট বা টুলস খুঁজুন...',
      filter_all: 'সবগুলো প্রোডাক্ট',
      filter_aitools: 'AI প্রিমিয়াম টুলস',
      filter_combo: 'রিসার্চ কম্বো',
      filter_web: 'লারাভেল ও ওয়েব',
      filter_post: 'ডিজাইন ও ক্যানভা',
      filter_video: 'ভিডিও ও কোর্স',
      filter_tools: 'ম্যাপ ও BIN',
      prod_title_1: 'রেডিমেড প্রিমিয়াম',
      prod_title_highlight: 'ডিজিটাল অ্যাসেট ও বান্ডেল',
      prod_subtitle: 'আপনার কোডিং, কন্টেন্ট ক্রিয়েশন ও বিজনেসের সময় বাঁচিয়ে সেলস দ্বিগুণ করার নির্ভরযোগ্য রেডিমেড সল্যুশন',
      btn_buy: 'কিনুন',
      btn_view_details: 'View Details',

      // Boost Section
      boost_badge: 'ফেসবুক বুস্ট ও সোশ্যাল গ্রোথ',
      boost_title_1: 'টার্গেটেড ফেসবুক বুস্ট ও',
      boost_title_highlight: 'লাইভ আরওআই ক্যালকুলেটর',
      boost_subtitle: 'আপনার নির্দিষ্ট অডিয়েন্সের কাছে সঠিক মেসেজ পৌঁছে দিয়ে সর্বোচ্চ সেলস নিশ্চিত করুন',
      calc_title: 'বুস্ট বাজেট ও এস্টিমেটর',
      calc_goal_label: 'আপনার ক্যাম্পেইন লক্ষ্য (Goal):',
      goal_sales: 'সেলস ও মেসেজ',
      goal_leads: 'লিড জেনারেশন',
      goal_growth: 'পেজ লাইক ও রিচ',
      calc_budget_label: 'বিজ্ঞাপন বাজেট (USD):',
      calc_duration_label: 'ক্যাম্পেইনের মেয়াদ (Days):',
      calc_est_reach: 'সম্ভাব্য অডিয়েন্স রিচ (Estimated Reach)',
      calc_est_clicks: 'সম্ভাব্য ক্লিক / এনগেজমেন্ট',
      calc_est_total: 'মোট খরচ (সকল চার্জ সহ)',
      btn_start_boost: 'এই বাজেটে বুস্ট শুরু করুন',

      // Pricing Section
      pricing_title_1: 'জনপ্রিয়',
      pricing_title_highlight: 'বুস্ট ও গ্রোথ প্যাকেজ',
      pkg_select_btn: 'প্যাকেজটি সিলেক্ট করুন',
      pkg_popular_badge: 'সবচেয়ে জনপ্রিয়',

      // Production Section
      prod_sec_badge: 'মিডিয়া ও ওয়েব প্রোডাকশন',
      prod_sec_title_1: 'প্রফেশনাল',
      prod_sec_title_highlight: 'ওয়েবসাইট, ভিডিও ও কন্টেন্ট',
      prod_sec_subtitle: 'প্রফেশনাল পোর্টফোলিও ওয়েবসাইট, কাস্টম লারাভেল শপ, হাই-কনভার্টিং ভিডিও এডস ও সোশ্যাল মিডিয়া পোস্ট ডিজাইন',
      service_order_btn: 'অর্ডার করুন',

      // Reviews Section
      reviews_badge: 'ক্লায়েন্ট মতামত',
      reviews_title_1: 'আমাদের ক্লায়েন্টরা',
      reviews_title_highlight: 'কী বলছেন?',
      reviews_subtitle: 'আমাদের ডিজিটাল প্রোডাক্ট ও বুস্ট সার্ভিসে ১০০% সন্তুষ্ট উদ্যোক্তাদের প্রতিক্রিয়া',

      // FAQ Section
      faq_badge: 'সাধারণ জিজ্ঞাসা',
      faq_title_1: 'সচরাচর',
      faq_title_highlight: 'জিজ্ঞাসিত প্রশ্নসমূহ',
      faq_subtitle: 'আপনার প্রয়োজনীয় সব প্রশ্নের সহজ ও পরিষ্কার উত্তর এখানে পেয়ে যাবেন',

      // CTA Banner
      cta_title: 'আজই আপনার বিজনেসের গ্রোথ শুরু করুন!',
      cta_desc: 'সঠিক অডিয়েন্স, ভেরিফাইড সার্ভিস এবং প্রিমিয়াম ডিজিটাল অ্যাসেটের মাধ্যমে আপনার সেলস বাড়িয়ে নিন কয়েক গুণ। আমরা আছি আপনার পাশে।',
      cta_btn: 'সরাসরি হোয়াটসঅ্যাপে কথা বলুন',

      // Footer
      footer_desc: 'আপনার বিশ্বস্ত ডিজিটাল প্রোডাক্ট ও গ্রোথ পার্টনার। আমরা সর্বাধুনিক টেকনোলজি, লারাভেল ডেভেলপমেন্ট ও ক্রিয়েটিভিটি ব্যবহার করে আপনার ব্র্যান্ডকে এগিয়ে নিয়ে যাই।',
      footer_quick_links: 'কুইক লিংক',
      footer_categories: 'সার্ভিস ক্যাটাগরি',
      footer_payment_title: 'পেমেন্ট মেথড ও সাপোর্ট',
      footer_payment_desc: 'বিকাশ, নগদ, রকেট ও ব্যাংক কার্ডের মাধ্যমে ১০০% নিরাপদ লেনদেন।',
      footer_rights: '© ২০২৬ AI Future Agency. সর্বস্বত্ব সংরক্ষিত।',

      // Modal
      modal_title: 'ইনস্ট্যান্ট অর্ডার / কনসালটেশন',
      modal_subtitle: 'আপনার তথ্য দিন, আমরা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করব।',
      modal_lbl_item: 'সার্ভিস / প্রোডাক্টের নাম:',
      modal_lbl_price: 'মূল্য / সম্ভাব্য বাজেট:',
      modal_lbl_name: 'আপনার নাম:',
      modal_ph_name: 'যেমন: মো: রফিকুল ইসলাম',
      modal_lbl_phone: 'হোয়াটসঅ্যাপ / মোবাইল নাম্বার:',
      modal_ph_phone: 'যেমন: 0163935198',
      modal_lbl_notes: 'পেজ লিংক অথবা কোনো বিশেষ চাহিদা (ঐচ্ছিক):',
      modal_ph_notes: 'আপনার ফেসবুক পেজের নাম বা লিংক',
      modal_btn_submit: 'হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন'
    }
  };

  // Products Data (AI Future Agency Premium Storefront Catalog)
  const products = [
    {
      id: 'stealth-writer',
      category: 'aitools',
      name: { en: 'Stealth Writer Premium Plan', bn: 'Stealth Writer Premium Plan' },
      rating: '4.9',
      review_count: '30',
      sales: '207+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 month', price_bdt: 799, price_usd: 8 },
        { type: 'Shared', duration: '3 Month', price_bdt: 1999, price_usd: 20 }
      ],
      icon: 'fa-user-ninja',
      themeGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      accentColor: '#38bdf8',
      badge: 'IN STOCK',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Shared Account Policy & Guidelines</h4>
          <p><b>1) শুধুমাত্র ১টি ডিভাইসে ব্যবহার করা যাবে (Strictly 1 Device Only)।</b></p>
          <p><b>2) আপনার Chat / Paraphrase History ১০০% Private থাকবে — অন্য কেউ দেখতে বা এডিট করতে পারবে না।</b></p>
          <p><b>3) এটি 100% Undetectable AI Content Rewriter — Turnitin, GPTZero ও Originality.AI বাইপাস করতে সক্ষম।</b></p>
          <p><b>4) একই একাউন্ট মেয়াদ শেষে পুনরায় Renew করা যাবে।</b></p>
          <p><b>5) ডেলিভারি: অর্ডার ও পেমেন্টের সাথে সাথেই Instant Delivery দেওয়া হবে।</b></p>
          <p><b>6) একাউন্টের কোনো ইনফরমেশন (Email / Password) পরিবর্তন করা সম্পূর্ণ নিষিদ্ধ।</b></p>
        </div>
      `,
      reviews: [
        { name: 'Mahfujur Rahman', date: '18 Mar', stars: 5, comment: 'Nice fast and good one! Undetectable on Turnitin.' },
        { name: 'Faiz', date: '11 Feb', stars: 5, comment: 'I am very satisfied with their way of approaching clients.' },
        { name: 'Ahsan Habib', date: '04 Jan', stars: 5, comment: 'Best AI bypass tool ever. Instant access within 2 minutes.' }
      ]
    },
    {
      id: 'chatgpt-plus',
      category: 'aitools',
      name: { en: 'ChatGPT PLUS', bn: 'ChatGPT PLUS' },
      rating: '4.8',
      review_count: '98',
      sales: '678+',
      types: ['Shared', 'Personal'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month PLUS(Renewable)', price_bdt: 499, price_usd: 5 },
        { type: 'Shared', duration: '3 Month PLUS(Renewable)', price_bdt: 1350, price_usd: 13.5 },
        { type: 'Personal', duration: '1 Month PLUS(Personal)', price_bdt: 2999, price_usd: 25 }
      ],
      icon: 'fa-robot',
      themeGradient: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)',
      accentColor: '#10b981',
      badge: 'HOT SELLER',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ ChatGPT PLUS Policies</h4>
          <p><b>🔹 Shared Account:</b> ১টি ডিভাইসে স্মুথ এক্সেস, প্রাইভেট চ্যাট হিস্ট্রি, GPT-4o, DALL-E 3 ইমেজ জেনারেশন ও ওয়েব ব্রাউজিং সুবিধা।</p>
          <p><b>🔹 Personal Account:</b> আপনার নিজস্ব ইমেইলে ফুল পার্সোনাল একাউন্ট, কোনো হিস্ট্রি শেয়ারিং নেই, আনলিমিটেড এক্সেস।</p>
          <p><b>🔹 সুবিধা:</b> ফাস্ট রেসপন্স, ভয়েস মোড এবং সকল লেটেস্ট ফিচার আনলকড।</p>
        </div>
      `,
      reviews: [
        { name: 'Tanvir Islam', date: '22 Feb', stars: 5, comment: 'Awesome service, GPT-4o works flawlessly.' },
        { name: 'Saiful Islam', date: '15 Feb', stars: 5, comment: 'Shared account is very private and smooth.' }
      ]
    },
    {
      id: 'gamma-ai',
      category: 'aitools',
      name: { en: 'Gamma AI', bn: 'Gamma AI' },
      rating: '4.8',
      review_count: '14',
      sales: '97+',
      types: ['Personal'],
      defaultType: 'Personal',
      plans: [
        { type: 'Personal', duration: '1 Month', price_bdt: 1499, price_usd: 15 },
        { type: 'Personal', duration: '3 Month', price_bdt: 3999, price_usd: 40 }
      ],
      icon: 'fa-wand-magic-sparkles',
      themeGradient: 'linear-gradient(135deg, #4a044e 0%, #701a75 100%)',
      accentColor: '#f472b6',
      badge: 'IN STOCK',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Gamma AI Features</h4>
          <p><b>✔ Presentation, Webpage & Document AI:</b> ১ ক্লিকে আকর্ষণীয় স্লাইড ডেক এবং প্রেজেন্টেশন তৈরি করুন।</p>
          <p><b>✔ Unlimited AI Generation:</b> আনলিমিটেড AI ক্রেডিট ও প্রিমিয়াম এক্সপোর্ট (PDF/PPT)।</p>
          <p><b>✔ Custom Branding:</b> নিজের ব্র্যান্ড লোগো ও ফন্ট ব্যবহারের সুবিধা।</p>
        </div>
      `,
      reviews: [
        { name: 'Nahid Hasan', date: '12 Jan', stars: 5, comment: 'Created my business deck in 10 minutes with Gamma!' }
      ]
    },
    {
      id: 'claude-pro',
      category: 'aitools',
      name: { en: 'Claude Pro', bn: 'Claude Pro' },
      rating: '5.0',
      review_count: '24',
      sales: '150+',
      types: ['Shared', 'Personal'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 1500, price_usd: 15 },
        { type: 'Personal', duration: '1 Month', price_bdt: 2999, price_usd: 25 }
      ],
      icon: 'fa-brain',
      themeGradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 100%)',
      accentColor: '#fb923c',
      badge: 'IN STOCK',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Claude Pro (3.5 Sonnet / Opus)</h4>
          <p><b>✔ Claude 3.5 Sonnet:</b> কোডিং, লেখালেখি ও ডাটা এনালাইসিসের জন্য বিশ্বের সেরা AI মডেল।</p>
          <p><b>✔ 200K Context Window:</b> সম্পূর্ণ বই বা দীর্ঘ কোডবেস একসাথে আপলোড করে এনালাইসিস করার ক্ষমতা।</p>
          <p><b>✔ Artifacts Feature:</b> লাইভ কোড ও অ্যাপ প্রিভিউ দেখার সুবিধা।</p>
        </div>
      `,
      reviews: [
        { name: 'Kazi Farhan', date: '28 Jan', stars: 5, comment: 'Sonnet 3.5 is unbeatable for coding. Fast delivery.' }
      ]
    },
    {
      id: 'grammarly-premium',
      category: 'aitools',
      name: { en: 'Grammarly Premium', bn: 'Grammarly Premium' },
      rating: '4.8',
      review_count: '78',
      sales: '431+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 150, price_usd: 1.5 },
        { type: 'Shared', duration: '3 Month', price_bdt: 399, price_usd: 4 },
        { type: 'Shared', duration: '6 Month', price_bdt: 699, price_usd: 7 }
      ],
      icon: 'fa-spell-check',
      themeGradient: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)',
      accentColor: '#34d399',
      badge: 'POPULAR',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Grammarly Premium Features</h4>
          <p><b>✔ Full Premium Access:</b> গ্রামার, স্পেলিং, টোন এডজাস্টমেন্ট এবং সেন্টেন্স রিরাইট।</p>
          <p><b>✔ Plagiarism Checker:</b> কোটি কোটি ওয়েব পেজ থেকে নির্ভুল প্লেজিয়ারিজম চেক।</p>
          <p><b>✔ Browser Extension:</b> Chrome, Edge, Word ও Desktop অ্যাপে সরাসরি ব্যবহারযোগ্য।</p>
        </div>
      `,
      reviews: [
        { name: 'Sumaiya Akter', date: '05 Feb', stars: 5, comment: 'Very cheap and works perfectly for thesis writing.' }
      ]
    },
    {
      id: 'jenni-ai',
      category: 'aitools',
      name: { en: 'Jenni AI', bn: 'Jenni AI' },
      rating: '4.9',
      review_count: '17',
      sales: '143+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month PRO', price_bdt: 499, price_usd: 5 },
        { type: 'Shared', duration: '3 Month PRO', price_bdt: 1299, price_usd: 13 }
      ],
      icon: 'fa-feather-alt',
      themeGradient: 'linear-gradient(135deg, #172554 0%, #1e40af 100%)',
      accentColor: '#60a5fa',
      badge: 'IN STOCK',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Jenni AI Research Assistant</h4>
          <p><b>✔ Academic Citations:</b> APA, MLA, Harvard সহ সকল ফরম্যাটে অটো সাইটেশন।</p>
          <p><b>✔ AI Autocomplete:</b> একাডেমিক রিসার্চ পেপার ও থিসিস লেখার বিশেষ AI অ্যাসিস্ট্যান্ট।</p>
        </div>
      `,
      reviews: [
        { name: 'Dr. Rafiq', date: '19 Jan', stars: 5, comment: 'Huge help for academic journal paper drafting.' }
      ]
    },
    {
      id: 'quillbot-premium',
      category: 'aitools',
      name: { en: 'Quillbot Premium', bn: 'Quillbot Premium' },
      rating: '4.8',
      review_count: '78',
      sales: '476+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 150, price_usd: 1.5 },
        { type: 'Shared', duration: '3 Month', price_bdt: 399, price_usd: 4 },
        { type: 'Shared', duration: '6 Month', price_bdt: 699, price_usd: 7 }
      ],
      icon: 'fa-feather',
      themeGradient: 'linear-gradient(135deg, #14532d 0%, #16a34a 100%)',
      accentColor: '#4ade80',
      badge: 'BEST SELLER',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Quillbot Premium Access</h4>
          <p><b>✔ Unlimited Paraphrasing:</b> আনলিমিটেড শব্দ প্যারাফ্রেজ করার সুবিধা।</p>
          <p><b>✔ All 8 Modes Unlocked:</b> Standard, Fluency, Formal, Academic, Simple, Creative, Expand & Shorten।</p>
        </div>
      `,
      reviews: [
        { name: 'Rifat Chowdhury', date: '02 Feb', stars: 5, comment: 'Works 24/7 without any logout issues.' }
      ]
    },
    {
      id: 'hix-bypass',
      category: 'aitools',
      name: { en: 'HIX Bypass', bn: 'HIX Bypass' },
      rating: '4.8',
      review_count: '37',
      sales: '237+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 299, price_usd: 3 },
        { type: 'Shared', duration: '3 Month', price_bdt: 799, price_usd: 8 },
        { type: 'Shared', duration: '6 Month', price_bdt: 1499, price_usd: 15 },
        { type: 'Shared', duration: '1 Year', price_bdt: 2799, price_usd: 28 }
      ],
      icon: 'fa-shield-alt',
      themeGradient: 'linear-gradient(135deg, #022c22 0%, #0f766e 100%)',
      accentColor: '#2dd4bf',
      badge: 'IN STOCK',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ HIX Bypass Features</h4>
          <p><b>✔ Undetectable AI:</b> AI লেখা কন্টেন্টকে ১০০% হিউম্যানাইজ করে যে কোনো AI ডিটেক্টর বাইপাস করে।</p>
          <p><b>✔ SEO Friendly:</b> মূল অর্থ অপরিবর্তিত রেখে হাই-কোয়ালিটি কনটেন্ট তৈরি।</p>
        </div>
      `,
      reviews: [
        { name: 'Arifur Rahman', date: '21 Jan', stars: 5, comment: 'Passed GPTZero with 100% human score.' }
      ]
    },
    {
      id: 'perplexity-pro',
      category: 'aitools',
      name: { en: 'Perplexity Pro', bn: 'Perplexity Pro' },
      rating: '4.8',
      review_count: '67',
      sales: '275+',
      types: ['Shared', 'Personal'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 350, price_usd: 3.5 },
        { type: 'Shared', duration: '3 Month', price_bdt: 899, price_usd: 9 },
        { type: 'Personal', duration: '1 Month', price_bdt: 1499, price_usd: 15 }
      ],
      icon: 'fa-search-plus',
      themeGradient: 'linear-gradient(135deg, #083344 0%, #0e7490 100%)',
      accentColor: '#22d3ee',
      badge: 'POPULAR',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Perplexity Pro Capabilities</h4>
          <p><b>✔ Copilot & Pro Search:</b> আনলিমিটেড প্রো সার্চ ও রেফারেন্স সাইটেশন।</p>
          <p><b>✔ Model Selection:</b> Claude 3.5 Sonnet, GPT-4o ও Sonar Large মডেলের মধ্যে সুইচ করার সুবিধা।</p>
        </div>
      `,
      reviews: [
        { name: 'Shakil Ahmed', date: '14 Feb', stars: 5, comment: 'Perplexity Pro is the best research assistant.' }
      ]
    },
    {
      id: 'capcut-pro',
      category: 'aitools',
      name: { en: 'CapCut Pro', bn: 'CapCut Pro' },
      rating: '4.9',
      review_count: '34',
      sales: '183+',
      types: ['Shared', 'Personal'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 250, price_usd: 2.5 },
        { type: 'Shared', duration: '3 Month', price_bdt: 650, price_usd: 6.5 },
        { type: 'Personal', duration: '1 Year', price_bdt: 1499, price_usd: 15 }
      ],
      icon: 'fa-video',
      themeGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      accentColor: '#38bdf8',
      badge: 'TRENDING',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ CapCut Pro VIP Features</h4>
          <p><b>✔ All VIP Effects & Filters:</b> রিলস ও টিকটক ভিডিও তৈরির সকল প্রিমিয়াম এফেক্টস আনলক।</p>
          <p><b>✔ Auto Caption & 4K Export:</b> ওয়াটারমার্ক ছাড়া আল্ট্রা হাই-কোয়ালিটি এক্সপোর্ট।</p>
        </div>
      `,
      reviews: [
        { name: 'Mehedi Hasan', date: '29 Jan', stars: 5, comment: 'Works on Windows PC without any issue.' }
      ]
    },
    {
      id: 'paperpal',
      category: 'aitools',
      name: { en: 'Paperpal', bn: 'Paperpal' },
      rating: '4.8',
      review_count: '21',
      sales: '63+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 199, price_usd: 2 },
        { type: 'Shared', duration: '3 Month', price_bdt: 499, price_usd: 5 },
        { type: 'Shared', duration: '6 Month', price_bdt: 899, price_usd: 9 }
      ],
      icon: 'fa-file-alt',
      themeGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      accentColor: '#93c5fd',
      badge: 'ACADEMIC',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Paperpal Academic Editing</h4>
          <p><b>✔ Journal Standard Proofreading:</b> রিসার্চ পেপারের ভাষা আন্তর্জাতিক জার্নাল মানের করে সাজিয়ে দেয়।</p>
        </div>
      `,
      reviews: [
        { name: 'Dr. Tariqul', date: '08 Feb', stars: 5, comment: 'Indispensable for Scopus journal submission.' }
      ]
    },
    {
      id: 'udemy',
      category: 'aitools',
      name: { en: 'Udemy Business', bn: 'Udemy Business' },
      rating: '5.0',
      review_count: '15',
      sales: '90+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '3 Month', price_bdt: 450, price_usd: 4.5 },
        { type: 'Shared', duration: '6 Month', price_bdt: 799, price_usd: 8 }
      ],
      icon: 'fa-graduation-cap',
      themeGradient: 'linear-gradient(135deg, #4c0519 0%, #be123c 100%)',
      accentColor: '#fb7185',
      badge: 'LEARNING',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Udemy Business Subscription</h4>
          <p><b>✔ 10,000+ Top Rated Courses:</b> ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং, AI, পাইথন সহ সকল কোর্স ফ্রি এক্সেস।</p>
          <p><b>✔ Official Certificates:</b> প্রতিটি কোর্স শেষে সার্টিফিকেট ডাউনলোড সুবিধা।</p>
        </div>
      `,
      reviews: [
        { name: 'Jamil Hossain', date: '16 Feb', stars: 5, comment: 'Completed web development course. Great value.' }
      ]
    },
    {
      id: 'basic-combo',
      category: 'combo',
      name: { en: 'Basic Research Combo (10 Tools)', bn: 'Basic Research Combo (১০টি টুলস)' },
      rating: '4.7',
      review_count: '27',
      sales: '397+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 599, price_usd: 6 },
        { type: 'Shared', duration: '3 Month', price_bdt: 1799, price_usd: 18 },
        { type: 'Shared', duration: '6 Month', price_bdt: 3399, price_usd: 34 }
      ],
      icon: 'fa-cubes',
      themeGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
      accentColor: '#818cf8',
      badge: '💥 10 TOOLS',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✔ Basic Research Combo — Tools List</h4>
          <p><b>1. ChatGPT</b> | <b>2. Perplexity Pro</b> | <b>3. HIX.AI</b> | <b>4. QuillBot</b> | <b>5. Grammarly</b> | <b>6. Grok AI</b> | <b>7. SlideShare</b> | <b>8. Scribd</b> | <b>9. Canva</b> | <b>10. Udemy</b></p>
          <p>স্টুডেন্ট এবং রিসার্চারদের জন্য এক প্যাকেজেই প্রয়োজনীয় সকল প্রিমিয়াম টুলসের সেরা সমাধান।</p>
        </div>
      `,
      reviews: [
        { name: 'Sabbir Hossain', date: '25 Feb', stars: 5, comment: 'All 10 tools worked instantly. Excellent bundle.' }
      ]
    },
    {
      id: 'standard-combo',
      category: 'combo',
      name: { en: 'Standard Research Combo (14 Tools)', bn: 'Standard Research Combo (১৪টি টুলস)' },
      rating: '4.9',
      review_count: '49',
      sales: '291+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 1199, price_usd: 12 },
        { type: 'Shared', duration: '3 Month', price_bdt: 3499, price_usd: 35 },
        { type: 'Shared', duration: '6 Month', price_bdt: 6999, price_usd: 70 }
      ],
      icon: 'fa-layer-group',
      themeGradient: 'linear-gradient(135deg, #14532d 0%, #15803d 100%)',
      accentColor: '#4ade80',
      badge: '👑 BEST VALUE',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✔ Standard Research Combo — Tools List</h4>
          <p><b>1. ChatGPT</b> | <b>2. HIX.AI</b> | <b>3. Perplexity Pro</b> | <b>4. Stealth Writer</b> | <b>5. Grammarly</b> | <b>6. Grok AI</b> | <b>7. QuillBot</b> | <b>8. Udemy</b> | <b>9. Coursera</b> | <b>10. Consensus</b> | <b>11. SlideShare</b> | <b>12. Scribd</b> | <b>13. Canva</b> | <b>14. Netflix + Bonus</b></p>
        </div>
      `,
      reviews: [
        { name: 'Tanzir Ahmed', date: '27 Feb', stars: 5, comment: 'Stealth Writer + ChatGPT + Perplexity combo is awesome.' }
      ]
    },
    {
      id: 'premium-combo',
      category: 'combo',
      name: { en: 'Premium Research Combo (17 Tools)', bn: 'Premium Research Combo (১৭টি টুলস)' },
      rating: '4.9',
      review_count: '31',
      sales: '107+',
      types: ['Shared'],
      defaultType: 'Shared',
      plans: [
        { type: 'Shared', duration: '1 Month', price_bdt: 1499, price_usd: 15 },
        { type: 'Shared', duration: '3 Month', price_bdt: 4399, price_usd: 44 },
        { type: 'Shared', duration: '6 Month', price_bdt: 8799, price_usd: 88 }
      ],
      icon: 'fa-crown',
      themeGradient: 'linear-gradient(135deg, #701a75 0%, #a21caf 100%)',
      accentColor: '#e879f9',
      badge: '🌟 VIP COMBO',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✔ Premium Research Combo — 17 Tools List</h4>
          <p><b>1. ChatGPT</b> | <b>2. HIX.AI</b> | <b>3. Stealth Writer</b> | <b>4. Perplexity</b> | <b>5. QuillBot</b> | <b>6. Grammarly</b> | <b>7. Coursera</b> | <b>8. Grok AI</b> | <b>9. SlideShare</b> | <b>10. Consensus</b> | <b>11. SciSpace</b> | <b>12. Jenni AI</b> | <b>13. Paperpal</b> | <b>14. Scribd</b> | <b>15. Udemy</b> | <b>16. Canva</b> | <b>17. Netflix + Expert Guidance</b></p>
        </div>
      `,
      reviews: [
        { name: 'Kamrul Hasan', date: '01 Mar', stars: 5, comment: 'The complete research suite. Nothing else needed!' }
      ]
    },
    {
      id: 'prod-canva',
      category: 'post',
      name: { en: 'Canva Pro Verified Owner Account', bn: 'Canva Pro Owner Account — ১ বছরের গ্যারান্টি' },
      rating: '5.0',
      review_count: '42',
      sales: '320+',
      types: ['Personal'],
      defaultType: 'Personal',
      plans: [
        { type: 'Personal', duration: '1 Year', price_bdt: 999, price_usd: 10 },
        { type: 'Personal', duration: '2 Year', price_bdt: 1699, price_usd: 17 }
      ],
      icon: 'fa-palette',
      themeGradient: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
      accentColor: '#67e8f9',
      badge: '👑 1-YEAR WARRANTY',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Canva Pro Owner Account</h4>
          <p><b>✔ 1-Year Full Warranty:</b> কোনো ড্রপ হবে না, ১ বছরের নিশ্চিত সার্ভিস।</p>
          <p><b>✔ Verified Owner Account:</b> ব্র্যান্ড কিট, নিজের লোগো এবং আনলিমিটেড প্রিমিয়াম রিসোর্স এক্সেস।</p>
        </div>
      `,
      reviews: [
        { name: 'Nazmul Islam', date: '18 Feb', stars: 5, comment: 'Real private owner account, Brand Kit working fine.' }
      ]
    },
    {
      id: 'prod-laravel',
      category: 'web',
      name: { en: '100+ Ready Laravel E-Commerce Codes', bn: '১০০টি লারাভেল ই-কমার্স সোর্স কোড বান্ডেল' },
      rating: '4.9',
      review_count: '65',
      sales: '510+',
      types: ['Personal'],
      defaultType: 'Personal',
      plans: [
        { type: 'Personal', duration: 'Lifetime Access', price_bdt: 450, price_usd: 4.5 }
      ],
      icon: 'fa-code',
      themeGradient: 'linear-gradient(135deg, #991b1b 0%, #ef4444 100%)',
      accentColor: '#fca5a5',
      badge: '💥 100 SOURCE CODES',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ 100+ Laravel E-Commerce Source Codes</h4>
          <p><b>✔ 100+ Complete Projects:</b> ফ্যাশন, গ্যাজেট, গ্রোসারি ও মাল্টি-ভেন্ডর ই-কমার্স সোর্স কোড।</p>
          <p><b>✔ Full Admin Panel:</b> অর্ডার ম্যানেজমেন্ট, স্টক ট্র্যাকিং ও পেমেন্ট গেটওয়ে সেটআপ।</p>
        </div>
      `,
      reviews: [
        { name: 'Zubair Hossain', date: '24 Feb', stars: 5, comment: 'Instant Google Drive link received. Clean codes.' }
      ]
    },
    {
      id: 'prod-mouza',
      category: 'tools',
      name: { en: 'All BD 250,000+ Mouza Map Collection', bn: 'সারা দেশের ২.৫ লাখ মৌজা ম্যাপ কালেকশন' },
      rating: '4.9',
      review_count: '53',
      sales: '440+',
      types: ['Personal'],
      defaultType: 'Personal',
      plans: [
        { type: 'Personal', duration: 'Lifetime Download', price_bdt: 200, price_usd: 2 }
      ],
      icon: 'fa-map-marked-alt',
      themeGradient: 'linear-gradient(135deg, #854d0e 0%, #eab308 100%)',
      accentColor: '#fde047',
      badge: '💥 ৳200 MEGA DEAL',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ All Bangladesh Mouza Map Archive</h4>
          <p><b>✔ 64 Districts Covered:</b> সারা বাংলাদেশের ২.৫ লক্ষাধিক নির্ভুল মৌজা ম্যাপ।</p>
          <p><b>✔ DWG & PDF:</b> AutoCAD সাপোর্টেড ও প্রিন্ট-রেডি ফাইল।</p>
        </div>
      `,
      reviews: [
        { name: 'Engr. Shahin', date: '10 Feb', stars: 5, comment: 'Accurate scale maps, life saver for land survey.' }
      ]
    },
    {
      id: 'prod-cartoon',
      category: 'video',
      name: { en: 'Cartoon Video YouTube Earning Course', bn: 'কার্টুন ভিডিও ইউটিউব মনিটাইজেশন কোর্স' },
      rating: '4.8',
      review_count: '39',
      sales: '215+',
      types: ['Personal'],
      defaultType: 'Personal',
      plans: [
        { type: 'Personal', duration: 'Full Course', price_bdt: 499, price_usd: 5 }
      ],
      icon: 'fa-play-circle',
      themeGradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
      accentColor: '#94a3b8',
      badge: '🎬 100% MONETIZABLE',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ YouTube Cartoon Video Monetization Course</h4>
          <p><b>✔ Copyright-Free Editing:</b> কোনো স্ট্রাইক বা ক্লেইম ছাড়া গোপাল ভাঁড় কার্টুন এডিটিং সিক্রেট।</p>
          <p><b>✔ Step-by-Step Earning Guide:</b> চ্যানেল গ্রোথ ও AdSense আর্নিং মেথড।</p>
        </div>
      `,
      reviews: [
        { name: 'Riaz Mahmud', date: '03 Feb', stars: 5, comment: 'Got monetized in 45 days following this course.' }
      ]
    },
    {
      id: 'prod-bin',
      category: 'tools',
      name: { en: 'Official 13-Digit Business BIN Service', bn: 'Verified ১৩ ডিজিটের অফিসিয়াল বিজনেস BIN' },
      rating: '4.9',
      review_count: '28',
      sales: '190+',
      types: ['Personal'],
      defaultType: 'Personal',
      plans: [
        { type: 'Personal', duration: 'Official BIN', price_bdt: 100, price_usd: 1 }
      ],
      icon: 'fa-certificate',
      themeGradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
      accentColor: '#6ee7b7',
      badge: '🛡️ 13-DIGIT BIN',
      description: `
        <div style="line-height:1.8;">
          <h4 style="color:#0a8f3c; margin-top:0;">✅ Official Verified Business BIN Number</h4>
          <p><b>✔ Save 15% FB VAT:</b> ফেসবুক বুস্টিংয়ে সরকারি ১৫% অতিরিক্ত ভ্যাট ছাড় সুবিধা।</p>
          <p><b>✔ Meta Verification:</b> অ্যাড একাউন্ট ও বিজনেস ম্যানেজার ভেরিফিকেশনে ব্যবহৃত হয়।</p>
        </div>
      `,
      reviews: [
        { name: 'Shohel Rana', date: '17 Feb', stars: 5, comment: 'Submitted BIN in Meta ad account, 15% VAT waived!' }
      ]
    }
  ];

  // Pricing Packages Data (Updated with $1 = ৳150 Rate & Blue Badge 1-Month/Lifetime Options)
  const pricingPackages = [
    {
      id: 'pkg-1',
      name: { en: 'Starter Boost & Growth', bn: 'Starter Boost & Growth' },
      desc: {
        en: 'Best for new pages & initiating steady sales',
        bn: 'নতুন পেজ ও দ্রুত সেলস শুরু করার জন্য উপযুক্ত'
      },
      price: { en: '৳3,000', bn: '৳৩,০০০' },
      duration: { en: '/ $20 Budget (3 Days)', bn: '/ $২০ বাজেট (৩ দিন)' },
      featured: false,
      features: {
        en: [
          '$20 Official Meta Ad Budget ($1 = ৳150 Rate)',
          '24,000 - 56,000+ Laser Targeted Reach',
          'Demographics, Age & Location Filtering',
          'WhatsApp & Messenger Direct CTA Setup',
          'Detailed Campaign Performance Report'
        ],
        bn: [
          '$২০ অফিসিয়াল এড বাজেট ($১ = ৳১৫০ রেট)',
          '২৪,০০০ - ৫৬,০০০+ লেজার টার্গেটেড রিচ',
          'বয়স, জেন্ডার ও লোকেশন ভিত্তিক অডিয়েন্স',
          'মেসেজ ও হোয়াটসঅ্যাপ বাটন সরাসরি কানেক্ট',
          'ক্যাম্পেইন শেষে পূর্ণ পারফরম্যান্স রিপোর্ট'
        ]
      }
    },
    {
      id: 'pkg-2',
      name: { en: 'Business Pro Boost', bn: 'Business Pro Boost' },
      desc: {
        en: 'Ideal for consistent e-commerce & rapid scaling',
        bn: 'নিয়মিত ই-কমার্স ও দ্রুত সেলস বৃদ্ধির জন্য সেরা'
      },
      price: { en: '৳7,500', bn: '৳৭,৫০০' },
      duration: { en: '/ $50 Budget (7 Days)', bn: '/ $৫০ বাজেট (৭ দিন)' },
      featured: true,
      features: {
        en: [
          '$50 Official Meta Ad Budget ($1 = ৳150 Rate)',
          '65,000 - 150,000+ High-Conversion Reach',
          'High-Intent Interests & Behavioral Filtering',
          'A/B Testing & Daily ROI Ads Optimization',
          'Facebook Pixel & Conversion Tracking Setup',
          '24/7 Dedicated VIP Priority Support'
        ],
        bn: [
          '$৫০ অফিসিয়াল এড বাজেট ($১ = ৳১৫০ রেট)',
          '৬৫,০০০ - ১,৫০,০০০+ হাই-কনভার্শন রিচ',
          'বায়ার ইন্টারেস্ট ও বিহেভিয়ার টার্গেটিং',
          'এ/বি টেস্টিং ও ডেইলি আরওআই অপ্টিমাইজেশন',
          'ফেসবুক পিক্সেল ও কনভার্সন ট্র্যাকিং সেটআপ',
          '২৪/৭ ডেডিকেটেড ভিআইপি সাপোর্ট'
        ]
      }
    },
    {
      id: 'pkg-3',
      name: { en: 'Organic Followers & Likes', bn: 'অর্গানিক ফলোয়ার ও লাইক' },
      desc: {
        en: '100% Non-Drop permanent social growth service',
        bn: '১০০% পার্মানেন্ট ও নন-ড্রপ পেজ গ্রোথ সার্ভিস'
      },
      price: { en: '৳1,500', bn: '৳১,৫০০' },
      duration: { en: '/ Package', bn: '/ প্যাকেজ' },
      featured: false,
      features: {
        en: [
          'Facebook Page Followers & Organic Likes',
          'YouTube Real Subscribers & Views',
          'Instagram & TikTok High-Quality Followers',
          '100% Safe & Permanent Non-Drop Guarantee',
          'Zero Password Required & Fast Delivery'
        ],
        bn: [
          'ফেসবুক পেজ ফলোয়ার ও অর্গানিক লাইক',
          'ইউটিউব রিয়েল সাবস্ক্রাইবার ও ভিডিও ভিউজ',
          'ইনস্টাগ্রাম ও টিকটক কোয়ালিটি ফলোয়ার',
          '১০০% নিরাপদ ও স্থায়ী (Non-Drop Guarantee)',
          'কোনো পাসওয়ার্ড ছাড়াই দ্রুত ডেলিভারি'
        ]
      }
    },
    {
      id: 'pkg-4',
      name: { en: 'Facebook Blue Badge Verification', bn: 'ফেসবুক ব্লু ব্যাজ ভেরিফিকেশন' },
      desc: {
        en: '1-Month Meta Subscription or Lifetime Permanent Tick',
        bn: '১ মাসের মেটা সাবস্ক্রিপশন অথবা আজীবন মেয়াদী ব্লু ব্যাজ'
      },
      price: { en: '৳1,500 / ৳4,500', bn: '৳১,৫০০ / ৳৪,৫০০' },
      duration: { en: '/ 1 Month or Lifetime', bn: '/ ১ মাস বা আজীবন' },
      featured: false,
      features: {
        en: [
          '1 Month Meta Verified: ৳1,500 Only',
          'Lifetime Permanent Blue Tick: ৳4,500 Only',
          'Profile or Business Page Eligibility Audit',
          'Official Meta Verification Handling & Safe Setup',
          'Maximum Trust, Authority & Brand Protection'
        ],
        bn: [
          '১ মাসের জন্য মেটা ভেরিফিকেশন: মাত্র ৳১,৫০০',
          'আজীবন মেয়াদী (Lifetime) পার্মানেন্ট ব্লু ব্যাজ: ৳৪,৫০০',
          'প্রোফাইল বা বিজনেস পেজের ফুল এলিজিবিলিটি চেক',
          'অফিসিয়াল নিরাপদ মেটা প্রসেসিং হ্যান্ডলিং',
          'সর্বোচ্চ গ্রহণযোগ্যতা, সিকিউরিটি ও ব্র্যান্ড প্রটেকশন'
        ]
      }
    }
  ];

  // Production Services Data (Expanded with Portfolio Websites & Custom Laravel Stores)
  const productionServices = [
    {
      icon: 'fa-laptop-code',
      title: {
        en: 'Professional Portfolio Website',
        bn: 'প্রফেশনাল পোর্টফোলিও ওয়েবসাইট তৈরি'
      },
      desc: {
        en: 'Stunning portfolio websites for Freelancers, Developers, Designers, Content Creators, Photographers & Professionals to showcase skills & experience.',
        bn: 'আপনার কাজ, দক্ষতা ও অভিজ্ঞতাকে সবার সামনে তুলে ধরতে আকর্ষণীয় ও আধুনিক প্রফেশনাল পোর্টফোলিও ওয়েবসাইট তৈরি।'
      },
      perks: {
        en: [
          '100% Mobile Responsive & Ultra-Fast Loading',
          'Projects, Skills & Experience Showcase Grid',
          'Contact Form & Direct WhatsApp Integration',
          'SEO Friendly Code & Custom Design Setup'
        ],
        bn: [
          '১০০% মোবাইল রেসপন্সিভ ও সুপার ফাস্ট লোডিং',
          'স্কিলস, প্রজেক্ট ও এক্সপেরিয়েন্স শোকেস লেআউট',
          'কন্টাক্ট ফর্ম ও সরাসরি হোয়াটসঅ্যাপ ইন্টিগ্রেশন',
          'এসইও ফ্রেন্ডলি ও আপনার পছন্দমতো কাস্টম ডিজাইন'
        ]
      }
    },
    {
      icon: 'fa-shopping-cart',
      title: {
        en: 'Custom Laravel E-Commerce Website',
        bn: 'কাস্টম লারাভেল ই-কমার্স ওয়েবসাইট'
      },
      desc: {
        en: 'Tailor-made e-commerce websites and web applications built with Laravel framework for high performance and top security.',
        bn: 'আপনার বিজনেসের রিকোয়ারমেন্ট অনুযায়ী সর্বাধুনিক লারাভেল ফ্রেমওয়ার্কে সুপার ফাস্ট ও ফুল সিকিউর কাস্টম ই-কমার্স ওয়েবসাইট ডেভেলপমেন্ট।'
      },
      perks: {
        en: [
          'bKash, Nagad & Card Payment Gateway Integration',
          'Advanced Admin Panel (Orders, Stock & Reports)',
          'Automated Invoice & SMS Notification System',
          'Full Source Code & 1-Year Free Technical Support'
        ],
        bn: [
          'বিকাশ, নগদ ও ব্যাংক কার্ড পেমেন্ট গেটওয়ে সেটআপ',
          'অ্যাডভান্সড অ্যাডমিন ড্যাশবোর্ড (অর্ডার ও স্টক ট্র্যাকিং)',
          'অটোমেটেড ইনভয়েস ও কাস্টমার এসএমএস সিস্টেম',
          'সম্পূর্ণ সোর্স কোড ও ১ বছরের ফ্রি টেকনিক্যাল সাপোর্ট'
        ]
      }
    },
    {
      icon: 'fa-film',
      title: {
        en: 'Reels, Shorts & Video Ads',
        bn: 'ফেসবুক ও ইনস্টাগ্রাম রিলস/ভিডিও এডস'
      },
      desc: {
        en: 'High-converting video ads, UGC concepts, product showcases, and motion graphics animations designed to stop thumbs.',
        bn: 'পণ্য বা সার্ভিসের জন্য হাই-কনভার্টিং ভিডিও এডস, UGC কনসেপ্ট, প্রোডাক্ট শোকেস এবং মোশন গ্রাফিক্স ভিডিও তৈরি।'
      },
      perks: {
        en: [
          'Engaging Scriptwriting & Visual Hooks',
          'Pro Voiceover & Sound Design',
          '1080p Full HD Delivery'
        ],
        bn: [
          'আকর্ষণীয় হুক ও স্ক্রিপ্ট রাইটিং',
          'প্রফেশনাল ভয়েসওভার ও সাউন্ড ডিজাইন',
          '1080p ফুল এইচডি ডেলিভারি'
        ]
      }
    },
    {
      icon: 'fa-palette',
      title: {
        en: 'Social Media Post & Banner Design',
        bn: 'সোশ্যাল মিডিয়া পোস্ট ও ব্যানার ডিজাইন'
      },
      desc: {
        en: 'Premium brand-tailored posts, carousel graphics, and promotional offer banners crafted for maximum CTR.',
        bn: 'ফেসবুক পেজের জন্য ব্র্যান্ড আইডেন্টিটি অনুযায়ী প্রিমিয়াম পোস্ট, ক্যারোসেল ডিজাইন এবং অফার ব্যানার তৈরি।'
      },
      perks: {
        en: [
          'Modern Typography & Color Harmonies',
          'Persuasive Ad Copywriting',
          'PNG, JPG & Editable Source Files'
        ],
        bn: [
          'মডার্ন টাইপোগ্রাফি ও কালার স্কিম',
          'সেলস-ফোকাসড কনটেন্ট কপিরাইটিং',
          'পিএনজি, জেপিজি ও এডিটেবল সোর্স ফাইল'
        ]
      }
    }
  ];

  // Client Reviews Data
  const clientReviews = [
    {
      avatar: 'RH',
      name: { en: 'Rakibul Hasan', bn: 'রাকিবুল হাসান' },
      role: { en: 'Apparel Brand Founder', bn: 'অনলাইন ক্লোথিং ব্র্যান্ড ওনার' },
      text: {
        en: '"Purchased their 1000+ reels & post bundle for my e-commerce brand. In just 2 weeks, organic reach quadrupled and daily orders shot up!"',
        bn: '"তাদের ১০০০+ রিলস বান্ডেল ও পোস্ট কিট নিয়ে আমার ই-কমার্স পেজে আপলোড শুরু করি। অবিশ্বাস্যভাবে মাত্র ২ সপ্তাহে রিচ ৪ গুণ বেড়েছে এবং ভালো সেলস পাচ্ছি!"'
      }
    },
    {
      avatar: 'TI',
      name: { en: 'Tanvir Islam', bn: 'তানভীর ইসলাম' },
      role: { en: 'Tech Gadgets Store Owner', bn: 'গ্যাজেট শপ উদ্যোক্তা' },
      text: {
        en: '"Their Business Pro boost package generated an incredible return on ad spend. Laser targeted leads and immediate conversions."',
        bn: '"ফেসবুক বুস্টিং নিয়ে আগে অন্য এজেন্সির সাথে বাজে অভিজ্ঞতা ছিল। কিন্তু AI Future Agency-র Business Pro প্যাকেজ নেওয়ার পর সেলস কনভার্সন অনেক হাই পেয়েছি।"'
      }
    },
    {
      avatar: 'SM',
      name: { en: 'Sumaiya Mahmud', bn: 'সুমাইয়া মাহমুদ' },
      role: { en: 'Digital Creator', bn: 'কনটেন্ট ক্রিয়েটর' },
      text: {
        en: '"Super fast delivery and top-notch responsive support. Received Google Drive access within 2 minutes of confirmation. Exceptional quality!"',
        bn: '"খুবই ফাস্ট ডেলিভারি ও চমৎকার রেসপন্স। পেমেন্ট করার ৫ মিনিটের মধ্যেই ড্রাইভ এক্সেস পেয়েছি। ডিজাইনের কোয়ালিটি সত্যিই প্রিমিয়াম।"'
      }
    }
  ];

  // FAQ Data
  const faqList = [
    {
      q: {
        en: 'How do I receive digital products after ordering?',
        bn: 'ডিজিটাল প্রোডাক্ট কেনার পর কীভাবে ডেলিভারি পাব?'
      },
      a: {
        en: 'Immediately upon order confirmation, you will receive a direct Google Drive lifetime access link via WhatsApp or email with instant download & editing capability.',
        bn: 'অর্ডার কনফার্ম ও পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই আপনার হোয়াটসঅ্যাপ বা ইমেইলে গুগল ড্রাইভ লাইফটাইম ডাউনলোডেবল লিঙ্ক পাঠিয়ে দেওয়া হবে। আপনি যেকোন সময় ডাউনলোড বা এডিট করতে পারবেন।'
      }
    },
    {
      q: {
        en: 'What payment methods do you accept?',
        bn: 'পেমেন্ট মেথড কী কী সাপোর্টেড?'
      },
      a: {
        en: 'We accept bKash (Personal/Merchant), Nagad, Rocket, Bank Wire Transfers, and Visa/Mastercard payments with 100% security.',
        bn: 'আমরা বিকাশ (bKash Personal/Merchant), নগদ (Nagad), রকেট (Rocket) এবং যে কোনো ব্যাংক ট্রান্সফার বা ভিসা/মাস্টারকার্ডের মাধ্যমে পেমেন্ট গ্রহণ করি।'
      }
    },
    {
      q: {
        en: 'What is required to run a Facebook Boost campaign?',
        bn: 'ফেসবুক বুস্ট করতে আমার কী কী দিতে হবে?'
      },
      a: {
        en: 'Simply provide your Facebook page link and the post URL you wish to boost. We manage everything via our verified Meta Business Manager. No page password is ever required.',
        bn: 'আপনার ফেসবুক পেজের লিংক এবং যে পোস্টটি বুস্ট করতে চান তার লিংক দিতে হবে। আমরা আমাদের ১০০% ভেরিফাইড আন্তর্জাতিক ক্রেডিট কার্ড ও বিজনেস ম্যানেজার দিয়ে নিরাপদভাবে বুস্ট রান করব। আপনার পেজের কোনো পাসওয়ার্ড প্রয়োজন নেই।'
      }
    },
    {
      q: {
        en: 'Can video and banner designs be customized?',
        bn: 'ভিডিও ও পোস্ট ডিজাইন কাস্টমাইজেশন করা যাবে কি?'
      },
      a: {
        en: 'Yes, all templates are fully editable. Moreover, our creative team can customize your logo, colors, and branding elements for you upon request.',
        bn: 'হ্যাঁ, প্রতিটি টেমপ্লেট সহজে এডিট করা যায়। এছাড়া আপনি যদি আমাদের টিম দিয়ে আপনার ব্র্যান্ডের লোগো ও টেক্সট বসিয়ে কাস্টমাইজ করিয়ে নিতে চান, আমরা তাও করে দিই।'
      }
    }
  ];

  // --- 4. RENDER DYNAMIC SECTIONS ---
  const productsGrid = document.getElementById('productsGrid');
  const pricingCardsGrid = document.getElementById('pricingCardsGrid');
  const servicesGrid = document.getElementById('servicesGrid');
  const reviewsGrid = document.getElementById('reviewsGrid');
  const faqAccordion = document.getElementById('faqAccordion');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentFilter = 'all';

  // Digital product directional animation mapping
  const productAnimClasses = [
    'reveal-3d-top-left',
    'reveal-3d-top',
    'reveal-3d-top-right',
    'reveal-3d-bottom-left',
    'reveal-3d-bottom',
    'reveal-3d-bottom-right'
  ];

  // --- TOOL BADGE SVG GENERATOR ---
  function getToolBadgeSvg(p) {
    const iconMap = {
      'stealth-writer': { bg1: '#022c22', bg2: '#064e3b', glow: '#10b981', symbol: 'SW', sub: 'Stealth Writer' },
      'chatgpt-plus': { bg1: '#064e3b', bg2: '#047857', glow: '#10b981', symbol: 'GPT', sub: 'ChatGPT PLUS' },
      'gamma-ai': { bg1: '#2e1065', bg2: '#581c87', glow: '#a855f7', symbol: 'Γ', sub: 'Gamma AI' },
      'claude-pro': { bg1: '#431407', bg2: '#7c2d12', glow: '#f97316', symbol: 'C', sub: 'Claude Pro' },
      'grammarly': { bg1: '#064e3b', bg2: '#065f46', glow: '#10b981', symbol: 'G', sub: 'Grammarly' },
      'jenni-ai': { bg1: '#082f49', bg2: '#0369a1', glow: '#38bdf8', symbol: 'J', sub: 'Jenni AI' },
      'quillbot': { bg1: '#14532d', bg2: '#15803d', glow: '#22c55e', symbol: 'Q', sub: 'Quillbot' },
      'hix-ai': { bg1: '#1e1b4b', bg2: '#3730a3', glow: '#6366f1', symbol: 'HIX', sub: 'HIX Bypass' },
      'perplexity': { bg1: '#0f172a', bg2: '#1e293b', glow: '#06b6d4', symbol: 'P', sub: 'Perplexity' },
      'capcut-pro': { bg1: '#09090b', bg2: '#18181b', glow: '#06b6d4', symbol: 'CC', sub: 'CapCut Pro' },
      'paperpal': { bg1: '#0c4a6e', bg2: '#0284c7', glow: '#38bdf8', symbol: 'PP', sub: 'Paperpal' },
      'udemy': { bg1: '#4a044e', bg2: '#701a75', glow: '#ec4899', symbol: 'U', sub: 'Udemy' },
      'prod-laravel': { bg1: '#450a0a', bg2: '#991b1b', glow: '#ef4444', symbol: 'PHP', sub: 'Laravel 100+' },
      'prod-mouza': { bg1: '#422006', bg2: '#854d0e', glow: '#eab308', symbol: 'MAP', sub: 'Mouza Maps' },
      'prod-cartoon': { bg1: '#172554', bg2: '#1e40af', glow: '#3b82f6', symbol: 'YT', sub: 'Cartoon Course' },
      'prod-bin': { bg1: '#052e16', bg2: '#14532d', glow: '#22c55e', symbol: 'BIN', sub: 'Govt BIN' },
      'prod-canva-owner': { bg1: '#042f2e', bg2: '#0f766e', glow: '#14b8a6', symbol: 'CAN', sub: 'Canva Owner' }
    };
    const t = iconMap[p.id] || { bg1: '#0f172a', bg2: '#1e293b', glow: '#10b981', symbol: 'AI', sub: (p.name && p.name.en ? p.name.en.substring(0, 16) : 'Premium Tool') };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <radialGradient id="bgGrad_${p.id}" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="${t.bg2}"/>
          <stop offset="100%" stop-color="${t.bg1}"/>
        </radialGradient>
        <filter id="glow_${p.id}" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#bgGrad_${p.id})" rx="24"/>
      <path d="M0 60 H400 M0 140 H400 M0 220 H400 M0 300 H400 M60 0 V400 M140 0 V400 M220 0 V400 M300 0 V400" stroke="rgba(255,255,255,0.04)" stroke-width="1.5"/>
      <rect x="40" y="24" width="320" height="32" rx="16" fill="rgba(0,0,0,0.65)" stroke="${t.glow}" stroke-width="1.2"/>
      <circle cx="60" cy="40" r="5" fill="${t.glow}"/>
      <text x="74" y="45" fill="#f8fafc" font-size="12" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif">Trusted premium service • Available 24/7</text>
      <rect x="120" y="90" width="160" height="160" rx="32" fill="rgba(0,0,0,0.7)" stroke="${t.glow}" stroke-width="2.5" filter="url(#glow_${p.id})"/>
      <text x="200" y="195" fill="#ffffff" font-size="52" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" text-anchor="middle">${t.symbol}</text>
      <text x="200" y="295" fill="#ffffff" font-size="20" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" text-anchor="middle">${t.sub}</text>
      <rect x="135" y="325" width="130" height="26" rx="13" fill="${t.glow}"/>
      <text x="200" y="343" fill="#000000" font-size="12" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" text-anchor="middle">ORDER NOW</text>
      <text x="200" y="380" fill="rgba(255,255,255,0.4)" font-size="10" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" text-anchor="middle">AI Future Agency</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // --- DYNAMIC STOREFRONT PRODUCTS FROM ADMIN PANEL ---
  function getAllProducts() {
    try {
      const stored = localStorage.getItem('afa_admin_products');
      if (stored) {
        const adminProds = JSON.parse(stored);
        if (Array.isArray(adminProds) && adminProds.length > 0) {
          return adminProds.map(ap => {
            const base = products.find(p => p.id === ap.id || (p.name && (p.name.en === ap.name || p.name.bn === ap.name)));
            
            // Normalize duration plans
            let plans = [];
            if (Array.isArray(ap.plans) && ap.plans.length > 0) {
              plans = ap.plans.map(pl => ({
                duration: pl.dur || pl.duration || '1 Month',
                price_bdt: Number(pl.price !== undefined ? pl.price : pl.price_bdt) || Number(ap.price) || 499,
                price_usd: pl.price_usd || Math.round((Number(pl.price !== undefined ? pl.price : pl.price_bdt) || 499) / USD_TO_BDT_RATE)
              }));
            } else if (base && base.plans) {
              plans = base.plans;
            } else {
              plans = [{ duration: '1 Month', price_bdt: Number(ap.price) || 499, price_usd: 5 }];
            }

            const nameObj = (ap.name && typeof ap.name === 'object') 
              ? ap.name 
              : { en: ap.name || 'Product', bn: ap.name || 'Product' };

            return {
              id: ap.id || ('prod-' + Math.random().toString(36).substr(2, 6)),
              category: ap.category || (base ? base.category : 'aitools'),
              name: nameObj,
              rating: ap.rating || (base ? base.rating : '4.9'),
              review_count: ap.review_count || (base ? base.review_count : '30'),
              sales: ap.sales || (base ? base.sales : '150+'),
              types: ap.types || (base ? base.types : ['Shared']),
              defaultType: (ap.types && ap.types[0]) || (base ? base.defaultType : 'Shared'),
              plans: plans,
              icon: ap.icon || (base ? base.icon : 'fa-box'),
              themeGradient: ap.themeGradient || (base ? base.themeGradient : 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'),
              accentColor: ap.accentColor || (base ? base.accentColor : '#00ff87'),
              badge: ap.badge || (base ? base.badge : 'IN STOCK'),
              description: ap.description || (base ? base.description : ''),
              image: ap.image || (base ? base.image : ''),
              link: ap.link || (base ? base.link : 'details.html'),
              reviews: ap.reviews || (base ? base.reviews : [])
            };
          });
        }
      }
    } catch(e) {}
    return products;
  }

  // --- AI FUTURE AGENCY PRODUCT SECTION RENDERER ---
  function renderProducts(filter = currentFilter, searchQuery = '') {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    currentFilter = filter;

    const allStoreProducts = getAllProducts();
    let filtered = filter === 'all' 
      ? allStoreProducts 
      : allStoreProducts.filter(p => p.category === filter);

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const titleEn = (p.name && p.name.en) ? p.name.en.toLowerCase() : '';
        const titleBn = (p.name && p.name.bn) ? p.name.bn.toLowerCase() : '';
        return titleEn.includes(q) || titleBn.includes(q);
      });
    }

    const isBn = currentLang === 'bn';

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #64748b; font-size: 16px;">
          <i class="fas fa-search" style="font-size: 32px; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
          ${isBn ? 'কোনো টুল বা প্রোডাক্ট পাওয়া যায়নি।' : 'No tools or products found matching your criteria.'}
        </div>
      `;
      return;
    }

    filtered.forEach((p, index) => {
      const card = document.createElement('div');
      const animClass = productAnimClasses[index % productAnimClasses.length];
      card.className = `tool-card reveal-init ${animClass}`;
      card.setAttribute('data-stagger', index);
      card.setAttribute('data-id', p.id);

      const title = (p.name && (isBn ? p.name.bn : p.name.en)) || 'Premium Tool';
      const typeLabel = (p.types && p.types.length > 0 ? p.types[0] : 'Shared').toUpperCase();
      const rating = p.rating || '4.9';
      const reviewCount = p.review_count || '25';
      const sales = p.sales || '150+';

      // Default duration & price
      const plans = p.plans && p.plans.length > 0 ? p.plans : [{ duration: '1 Month', price_bdt: 499 }];
      const initialPlan = plans[0];
      const initialPrice = initialPlan.price_bdt;

      const badgeSvg = (p.image && p.image.trim() !== '') ? p.image : getToolBadgeSvg(p);
      const isCustomImg = Boolean(p.image && p.image.trim() !== '');
      const viewDetailsText = isBn ? 'বিস্তারিত দেখুন' : 'View Details';
      const isExternalCustomLink = Boolean(p.link && p.link.trim() !== '' && !p.link.includes('details.html') && p.link !== '#');

      // Generate duration buttons
      const durButtonsHtml = plans.map((plan, pIdx) => {
        const activeClass = pIdx === 0 ? 'active' : '';
        return `<button type="button" class="tool-dur-btn ${activeClass}" data-price="${plan.price_bdt}" data-dur="${plan.duration}">${plan.duration}</button>`;
      }).join('');

      card.innerHTML = `
        <div class="card-glare-effect"></div>
        <div class="tool-img-box">
          <img src="${badgeSvg}" alt="${title}" loading="lazy" style="${isCustomImg ? 'object-fit:cover;width:100%;height:100%;border-radius:14px;' : ''}">
        </div>
        <div class="tool-card-body">
          <h3 class="tool-title" title="${title}">${title}</h3>
          
          <div class="tool-rating-box">
            <span class="stars">★★★★★</span>
            <span class="rating-text">${rating} (${reviewCount}) | ${sales} Sold</span>
          </div>

          <div style="display:flex; justify-content:center;">
            <span class="tool-type-pill ${typeLabel.toLowerCase()}">${typeLabel}</span>
          </div>

          <div class="tool-dur-list">
            ${durButtonsHtml}
          </div>

          <div class="tool-price-box">
            <span class="tool-price-lbl">${isBn ? 'শুরুর মূল্য' : 'STARTING PRICE'}</span>
            <span class="tool-price-amt" id="cardPrice_${p.id}">৳${initialPrice.toLocaleString()}</span>
          </div>

          ${isExternalCustomLink 
            ? `<a href="${p.link}" target="_blank" class="btn-tool-view" style="display:flex;align-items:center;justify-content:center;text-decoration:none;cursor:pointer;">${viewDetailsText} <i class="fas fa-external-link-alt" style="margin-left:6px;font-size:12px;"></i></a>`
            : `<button type="button" class="btn-tool-view" onclick="viewProduct('${p.id}')">${viewDetailsText}</button>`
          }
        </div>
      `;

      // Attach click events on duration pills to update price dynamically
      const durBtns = card.querySelectorAll('.tool-dur-btn');
      const priceAmtEl = card.querySelector(`#cardPrice_${p.id}`);
      durBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          durBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const price = btn.getAttribute('data-price');
          if (priceAmtEl) {
            priceAmtEl.textContent = `৳${parseInt(price, 10).toLocaleString()}`;
          }
        });
      });

      productsGrid.appendChild(card);
    });

    observeElements();
    init3DTilt();
  }

  // Live tool search input handler
  const toolSearchInput = document.getElementById('toolSearchInput');
  if (toolSearchInput) {
    toolSearchInput.addEventListener('input', (e) => {
      renderProducts(currentFilter, e.target.value);
    });
  }

  const pricingAnimClasses = ['reveal-fly-left', 'reveal-scale-up', 'reveal-fly-right'];

  function renderPricing() {
    if (!pricingCardsGrid) return;
    pricingCardsGrid.innerHTML = '';
    const isBn = currentLang === 'bn';

    pricingPackages.forEach((pkg, index) => {
      const card = document.createElement('div');
      const animClass = pricingAnimClasses[index % pricingAnimClasses.length];
      card.className = `pricing-card ${pkg.featured ? 'featured' : ''} reveal-init ${animClass}`;
      card.setAttribute('data-stagger', index);
      
      const name = isBn ? pkg.name.bn : pkg.name.en;
      const desc = isBn ? pkg.desc.bn : pkg.desc.en;
      const price = isBn ? pkg.price.bn : pkg.price.en;
      const duration = isBn ? pkg.duration.bn : pkg.duration.en;
      const features = isBn ? pkg.features.bn : pkg.features.en;
      const selectText = isBn ? 'প্যাকেজটি সিলেক্ট করুন' : 'Select Package';
      const badgeText = isBn ? 'সবচেয়ে জনপ্রিয়' : 'Most Popular';

      card.innerHTML = `
        <div class="card-glare-effect"></div>
        ${pkg.featured ? `<span class="card-top-tag">${badgeText}</span>` : ''}
        <div class="pricing-header">
          <h3 class="package-name">${name}</h3>
          <p class="package-desc">${desc}</p>
          <div class="package-price">${price} <span>${duration}</span></div>
        </div>
        <ul class="package-features">
          ${features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
        </ul>
        <button class="btn ${pkg.featured ? 'btn-primary' : 'btn-outline'}" onclick="openOrderModal('${name}', '${price}', 'Boost Package')">
          ${selectText}
        </button>
      `;
      pricingCardsGrid.appendChild(card);
    });

    observeElements();
    init3DTilt();
  }

  const serviceAnimClasses = ['reveal-fly-left', 'reveal-fly-bottom', 'reveal-fly-right'];

  function renderServices() {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = '';
    const isBn = currentLang === 'bn';

    productionServices.forEach((s, index) => {
      const card = document.createElement('div');
      const animClass = serviceAnimClasses[index % serviceAnimClasses.length];
      card.className = `service-box reveal-init ${animClass}`;
      card.setAttribute('data-stagger', index);
      
      const title = isBn ? s.title.bn : s.title.en;
      const desc = isBn ? s.desc.bn : s.desc.en;
      const perks = isBn ? s.perks.bn : s.perks.en;
      const orderText = isBn ? 'অর্ডার করুন' : 'Order Service';

      card.innerHTML = `
        <div class="card-glare-effect"></div>
        <div class="service-icon">
          <i class="fas ${s.icon}"></i>
        </div>
        <h3 class="service-title">${title}</h3>
        <p class="service-desc">${desc}</p>
        <ul class="service-perks">
          ${perks.map(p => `<li><i class="fas fa-check"></i> ${p}</li>`).join('')}
        </ul>
        <button class="btn btn-outline btn-sm" onclick="openOrderModal('${title}', '${isBn ? 'কাস্টম কোটেশন' : 'Custom Quote'}', 'Production')">
          <i class="fas fa-arrow-right"></i> ${orderText}
        </button>
      `;
      servicesGrid.appendChild(card);
    });

    observeElements();
    init3DTilt();
  }

  const reviewAnimClasses = ['reveal-fly-left', 'reveal-fly-bottom', 'reveal-fly-right'];

  function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = '';
    const isBn = currentLang === 'bn';

    clientReviews.forEach((r, index) => {
      const card = document.createElement('div');
      const animClass = reviewAnimClasses[index % reviewAnimClasses.length];
      card.className = `review-card reveal-init ${animClass}`;
      card.setAttribute('data-stagger', index);
      
      const name = isBn ? r.name.bn : r.name.en;
      const role = isBn ? r.role.bn : r.role.en;
      const text = isBn ? r.text.bn : r.text.en;

      card.innerHTML = `
        <div class="stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="review-text">${text}</p>
        <div class="reviewer">
          <div class="reviewer-avatar">${r.avatar}</div>
          <div class="reviewer-info">
            <h4>${name}</h4>
            <p>${role}</p>
          </div>
        </div>
      `;
      reviewsGrid.appendChild(card);
    });

    observeElements();
  }

  function renderFaq() {
    if (!faqAccordion) return;
    faqAccordion.innerHTML = '';
    const isBn = currentLang === 'bn';

    faqList.forEach((faq, index) => {
      const item = document.createElement('div');
      item.className = `faq-item ${index === 0 ? 'active' : ''} reveal-init reveal-fly-bottom`;
      item.setAttribute('data-stagger', index % 4);
      
      const q = isBn ? faq.q.bn : faq.q.en;
      const a = isBn ? faq.a.bn : faq.a.en;

      item.innerHTML = `
        <div class="faq-question">
          <span>${q}</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>${a}</p>
        </div>
      `;

      item.querySelector('.faq-question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });

      faqAccordion.appendChild(item);
    });

    observeElements();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      
      // Smooth fade-out & re-arrival transition
      const existingCards = productsGrid.querySelectorAll('.product-card, .tool-card');
      existingCards.forEach(card => card.classList.add('anim-filtering'));

      setTimeout(() => {
        renderProducts(filter);
      }, 180);
    });
  });

  // --- 5. SCROLL REVEAL OBSERVER ENGINE ---
  let scrollObserver = null;

  function initScrollObserver() {
    if ('IntersectionObserver' in window) {
      scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -25px 0px'
      });
    }
  }

  function observeElements() {
    if (!scrollObserver) {
      initScrollObserver();
    }
    const unrevealed = document.querySelectorAll('.reveal-init:not(.revealed)');
    unrevealed.forEach(el => {
      const rect = el.getBoundingClientRect();
      // If already in initial viewport, reveal immediately with subtle delay
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTimeout(() => el.classList.add('revealed'), 80);
      } else if (scrollObserver) {
        scrollObserver.observe(el);
      } else {
        el.classList.add('revealed');
      }
    });
  }

  // --- 6. 3D TILT & DYNAMIC GLARE PHYSICS ---
  function init3DTilt() {
    const cards = document.querySelectorAll('.product-card, .tool-card, .pricing-card, .service-box');
    cards.forEach(card => {
      if (card._hasTiltListener) return;
      card._hasTiltListener = true;

      const glare = card.querySelector('.card-glare-effect');

      card.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('revealed')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`;

        if (glare) {
          const xPercent = (x / rect.width) * 100;
          const yPercent = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${xPercent.toFixed(1)}% ${yPercent.toFixed(1)}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        if (glare) {
          glare.style.background = '';
        }
      });
    });
  }

  // --- 7. AUTOMATIC THEME SWITCHER (Cycles every 1 minute) ---
  function setTheme(theme) {
    currentTheme = theme;
    document.body.classList.toggle('theme-gold', theme === 'gold');
    document.body.classList.toggle('theme-cyan', theme === 'cyan');
  }

  // Automatically cycle between Cyber Cyan and Royal Gold every 60 seconds
  setInterval(() => {
    const nextTheme = currentTheme === 'cyan' ? 'gold' : 'cyan';
    setTheme(nextTheme);
  }, 60000);

  // --- 8. LANGUAGE SWITCHER LOGIC ---
  const langEnBtn = document.getElementById('langEnBtn');
  const langBnBtn = document.getElementById('langBnBtn');

  function setLanguage(lang) {
    currentLang = lang;
    document.body.classList.toggle('lang-bn', lang === 'bn');

    // Update active button state
    if (langEnBtn && langBnBtn) {
      langEnBtn.classList.toggle('active', lang === 'en');
      langBnBtn.classList.toggle('active', lang === 'bn');
    }

    // Update static translated elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        el.textContent = i18n[lang][key];
      }
    });

    // Update modal inputs placeholders & labels
    const clientNameInput = document.getElementById('clientName');
    const clientPhoneInput = document.getElementById('clientPhone');
    const clientNotesInput = document.getElementById('clientNotes');
    if (clientNameInput) clientNameInput.placeholder = i18n[lang].modal_ph_name;
    if (clientPhoneInput) clientPhoneInput.placeholder = i18n[lang].modal_ph_phone;
    if (clientNotesInput) clientNotesInput.placeholder = i18n[lang].modal_ph_notes;

    // Re-render all dynamic modules
    renderProducts(currentFilter);
    renderPricing();
    renderServices();
    renderReviews();
    renderFaq();
    updateCalculator();
    observeElements();
  }

  if (langEnBtn) {
    langEnBtn.addEventListener('click', () => setLanguage('en'));
  }
  if (langBnBtn) {
    langBnBtn.addEventListener('click', () => setLanguage('bn'));
  }

  // --- 9. BOOST CALCULATOR ---
  const budgetSlider = document.getElementById('budgetSlider');
  const daysSlider = document.getElementById('daysSlider');
  const budgetVal = document.getElementById('budgetVal');
  const daysVal = document.getElementById('daysVal');
  const reachVal = document.getElementById('reachVal');
  const clicksVal = document.getElementById('clicksVal');
  const costBdtVal = document.getElementById('costBdtVal');
  const goalChips = document.querySelectorAll('.goal-chip');
  let currentGoal = 'sales';

  goalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      goalChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentGoal = chip.getAttribute('data-goal');
      updateCalculator();
    });
  });

  function updateCalculator() {
    if (!budgetSlider || !daysSlider) return;

    const usdBudget = parseInt(budgetSlider.value, 10);
    const days = parseInt(daysSlider.value, 10);
    const totalUsd = usdBudget;
    const totalBdt = Math.round(totalUsd * USD_TO_BDT_RATE);

    const isBn = currentLang === 'bn';
    const dayLabel = isBn ? 'দিন' : 'Days';
    const perDayLabel = isBn ? '/দিন' : '/day';

    if (budgetVal) {
      budgetVal.textContent = `$${usdBudget} (৳${totalBdt.toLocaleString()})`;
    }
    if (daysVal) {
      daysVal.textContent = `${days} ${dayLabel} ($${Math.round(totalUsd / days)}${perDayLabel})`;
    }

    let minReachMultiplier = 1200;
    let maxReachMultiplier = 2800;
    let minClickMultiplier = 35;
    let maxClickMultiplier = 85;

    if (currentGoal === 'leads') {
      minReachMultiplier = 900;
      maxReachMultiplier = 2200;
      minClickMultiplier = 25;
      maxClickMultiplier = 60;
    } else if (currentGoal === 'growth') {
      minReachMultiplier = 1600;
      maxReachMultiplier = 3500;
      minClickMultiplier = 60;
      maxClickMultiplier = 140;
    }

    const minReach = Math.round(totalUsd * minReachMultiplier);
    const maxReach = Math.round(totalUsd * maxReachMultiplier);
    const minClicks = Math.round(totalUsd * minClickMultiplier);
    const maxClicks = Math.round(totalUsd * maxClickMultiplier);

    if (reachVal) reachVal.textContent = `${minReach.toLocaleString()} - ${maxReach.toLocaleString()}+`;
    if (clicksVal) clicksVal.textContent = `${minClicks.toLocaleString()} - ${maxClicks.toLocaleString()}+`;
    if (costBdtVal) costBdtVal.textContent = `৳${totalBdt.toLocaleString()}`;
  }

  if (budgetSlider && daysSlider) {
    budgetSlider.addEventListener('input', updateCalculator);
    daysSlider.addEventListener('input', updateCalculator);
  }

  // --- 10. ORDER MODAL LOGIC ---
  const modal = document.getElementById('orderModal');
  const modalItemInput = document.getElementById('modalItem');
  const modalPriceInput = document.getElementById('modalPrice');
  const clientNameInput = document.getElementById('clientName');
  const clientPhoneInput = document.getElementById('clientPhone');
  const clientNotesInput = document.getElementById('clientNotes');
  const orderForm = document.getElementById('orderForm');

  function showAuthRequiredNotice(itemTitle, itemPrice) {
    let authReqModal = document.getElementById('authRequiredModal');
    if (!authReqModal) {
      authReqModal = document.createElement('div');
      authReqModal.id = 'authRequiredModal';
      authReqModal.style.cssText = 'position:fixed; inset:0; z-index:99999; background:rgba(6,9,15,0.85); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; padding:16px; opacity:0; pointer-events:none; transition:opacity 0.25s ease;';
      authReqModal.innerHTML = `
        <div style="background:#0e131d; border:1px solid rgba(0,210,255,0.3); border-radius:18px; max-width:440px; width:100%; padding:26px 24px; box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 35px rgba(0,210,255,0.18); text-align:center; position:relative;">
          <button type="button" onclick="document.getElementById('authRequiredModal').style.opacity='0'; document.getElementById('authRequiredModal').style.pointerEvents='none';" style="position:absolute; top:14px; right:16px; background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;"><i class="fas fa-times"></i></button>
          
          <div style="width:62px; height:62px; border-radius:50%; background:rgba(0,210,255,0.12); border:1px solid rgba(0,210,255,0.3); display:inline-flex; align-items:center; justify-content:center; color:#00d2ff; font-size:26px; margin-bottom:14px;">
            <i class="fas fa-user-lock"></i>
          </div>
          
          <h3 style="font-size:20px; font-weight:800; color:#ffffff; margin-bottom:8px;">লগইন বা সাইন-আপ আবশ্যক</h3>
          <p style="font-size:13px; color:#94a3b8; line-height:1.6; margin-bottom:22px;">
            পাবলিক ওয়েবসাইট থেকে অর্ডার বা সার্ভিস বুকিং করার জন্য আপনাকে অবশ্যই লগইন অথবা সাইন-আপ করতে হবে। অর্ডারের পর আপনার সব তথ্য এবং ট্রানজেকশন কাস্টমার ড্যাশবোর্ডে সংরক্ষিত থাকবে।
          </p>
          
          <div style="display:flex; flex-direction:column; gap:10px;">
            <a href="login.html?redirect=${encodeURIComponent(window.location.href)}" style="background:linear-gradient(135deg, #00d2ff, #0072ff); color:#ffffff; font-weight:800; padding:12px 18px; border-radius:10px; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:8px; font-size:14px; box-shadow:0 4px 14px rgba(0,210,255,0.35);">
              <i class="fas fa-sign-in-alt"></i> অ্যাকাউন্টে লগইন করুন (Login)
            </a>
            <a href="register.html?redirect=${encodeURIComponent(window.location.href)}" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); color:#ffffff; font-weight:700; padding:11px 18px; border-radius:10px; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:8px; font-size:13.5px;">
              <i class="fas fa-user-plus" style="color:#00d2ff;"></i> নতুন অ্যাকাউন্ট তৈরি করুন (Sign Up)
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(authReqModal);
    }
    authReqModal.style.opacity = '1';
    authReqModal.style.pointerEvents = 'auto';
  }
  window.showAuthRequiredNotice = showAuthRequiredNotice;

  window.openOrderModal = function (itemTitle, itemPrice, serviceType = 'General') {
    const session = localStorage.getItem('aifuture_session');
    if (!session) {
      showAuthRequiredNotice(itemTitle, itemPrice);
      return;
    }
    if (!modal) return;
    if (modalItemInput) modalItemInput.value = `${itemTitle} (${serviceType})`;
    if (modalPriceInput) modalPriceInput.value = itemPrice;

    // Pre-fill user details if logged in
    try {
      const users = JSON.parse(localStorage.getItem('aifuture_users') || '[]');
      const user = users.find(u => u.username === session);
      if (user) {
        if (clientNameInput && !clientNameInput.value && user.name) clientNameInput.value = user.name;
        if (clientPhoneInput && !clientPhoneInput.value && user.phone) clientPhoneInput.value = user.phone;
      }
    } catch(e) {}

    modal.classList.add('active');
  };

  window.closeOrderModal = function () {
    if (!modal) return;
    modal.classList.remove('active');
  };

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeOrderModal();
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const session = localStorage.getItem('aifuture_session');
      if (!session) {
        closeOrderModal();
        showAuthRequiredNotice();
        return;
      }

      const item = modalItemInput ? modalItemInput.value : 'Custom Service';
      const price = modalPriceInput ? modalPriceInput.value : 'Negotiable';
      const name = clientNameInput ? clientNameInput.value.trim() : 'Customer';
      const phone = clientPhoneInput ? clientPhoneInput.value.trim() : 'N/A';
      const notes = clientNotesInput ? clientNotesInput.value.trim() : 'N/A';

      const numAmount = parseInt(String(price).replace(/[^0-9]/g, '')) || 999;
      const orderId = `AFA-${Math.floor(1000 + Math.random() * 9000)}`;
      const trxId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toISOString().split('T')[0];

      const newOrder = {
        id: orderId,
        invoice: String(Math.floor(95100 + Math.random() * 899)),
        customer: name || 'Online Customer',
        username: session,
        phone: phone || 'N/A',
        email: 'N/A',
        product: item,
        amount: numAmount,
        method: 'WhatsApp / Direct',
        trxId: trxId,
        date: orderDate,
        status: 'Pending'
      };

      // 1. Save order to central admin queue
      try {
        const existingOrders = JSON.parse(localStorage.getItem('afa_admin_orders') || '[]');
        existingOrders.unshift(newOrder);
        localStorage.setItem('afa_admin_orders', JSON.stringify(existingOrders));
        localStorage.setItem('afa_latest_order_event', JSON.stringify({ time: Date.now(), order: newOrder }));
      } catch(e) {}

      // 2. Link order & transaction to current logged-in customer account
      try {
        const users = JSON.parse(localStorage.getItem('aifuture_users') || '[]');
        const curUser = users.find(u => u.username === session);
        if (curUser) {
          if (!curUser.orders) curUser.orders = [];
          curUser.orders.unshift(newOrder);

          if (!curUser.transactions) curUser.transactions = [];
          curUser.transactions.unshift({
            id: trxId,
            date: orderDate,
            item: item,
            amount: `৳${numAmount.toLocaleString()}`,
            gateway: 'WhatsApp / Direct',
            status: 'Pending'
          });

          localStorage.setItem('aifuture_users', JSON.stringify(users));
          localStorage.setItem('aifuture_user', JSON.stringify(curUser));
        }
      } catch(e) {}

      // 3. Live Broadcast
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('afa_live_sync');
          bc.postMessage({ type: 'NEW_ORDER_PLACED', order: newOrder, timestamp: Date.now() });
        }
      } catch(err) {}
      localStorage.setItem('afa_order_status_event', JSON.stringify({ timestamp: Date.now(), orderId: newOrder.id, status: 'Pending' }));

      const isBn = currentLang === 'bn';
      const message = isBn
        ? `👋 আসসালামু আলাইকুম! আমি AI Future Agency থেকে অর্ডার/কনসালটেশন নিতে চাচ্ছি:
----------------------------------
📦 সার্ভিস/প্রোডাক্ট: ${item}
💵 মূল্য/বাজেট: ${price}
👤 কাস্টমার নাম: ${name}
📱 ফোন নাম্বার: ${phone}
📝 নোট/পেজ লিংক: ${notes}
----------------------------------
দয়া করে পরবর্তী প্রসেস ও পেমেন্ট ডিটেইলস জানান।`
        : `👋 Hello! I would like to order/consult from AI Future Agency:
----------------------------------
📦 Service / Product: ${item}
💵 Price / Budget: ${price}
👤 Customer Name: ${name}
📱 Phone / WhatsApp: ${phone}
📝 Notes / Page Link: ${notes}
----------------------------------
Please let me know the next steps & payment process.`;

      const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(encodedUrl, '_blank');
      closeOrderModal();
    });
  }

  // --- 11. NAVBAR SCROLL & MOBILE MENU ---
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // =========================================================================
  // --- 12. PRODUCT DETAILS MODAL CONTROLLER (Screenshot 2 / details.php) ---
  // =========================================================================
  const productDetailsModal = document.getElementById('productDetailsModal');
  const closeProductDetailsModalBtn = document.getElementById('closeProductDetailsModalBtn');
  const detailsModalImg = document.getElementById('detailsModalImg');
  const detailsModalTitle = document.getElementById('detailsModalTitle');
  const detailsStockBadge = document.getElementById('detailsStockBadge');
  const detailsTypeSwitch = document.getElementById('detailsTypeSwitch');
  const detailsTypeSharedBtn = document.getElementById('detailsTypeSharedBtn');
  const detailsTypePersonalBtn = document.getElementById('detailsTypePersonalBtn');
  const detailsDurGrid = document.getElementById('detailsDurGrid');
  const detailsTotalPriceVal = document.getElementById('detailsTotalPriceVal');
  const detailsModalBuySmallBtn = document.getElementById('detailsModalBuySmallBtn');
  const detailsModalBuyMainBtn = document.getElementById('detailsModalBuyMainBtn');
  const detailsDescToggleBtn = document.getElementById('detailsDescToggleBtn');
  const detailsDescToggleIcon = document.getElementById('detailsDescToggleIcon');
  const detailsDescBody = document.getElementById('detailsDescBody');
  const detailsRecentReviews = document.getElementById('detailsRecentReviews');
  const starRatingSelect = document.getElementById('starRatingSelect');
  const reviewAuthorName = document.getElementById('reviewAuthorName');
  const reviewCommentText = document.getElementById('reviewCommentText');
  const submitReviewBtn = document.getElementById('submitReviewBtn');

  let currentDetailsProd = null;
  let currentDetailsType = 'Shared';
  let currentDetailsDur = '1 month';
  let currentDetailsPrice = 799;
  let currentReviewRating = 5;

  window.viewProduct = function(prodId) {
    const allStoreProducts = getAllProducts();
    const found = allStoreProducts.find(p => p.id === prodId);
    if (found) {
      const cardImg = (found.image && found.image.trim() !== '') ? found.image : getToolBadgeSvg(found);
      const isBn = currentLang === 'bn';
      const prodTitle = (found.name && (isBn ? found.name.bn : found.name.en)) || (found.name && (found.name.en || found.name.bn)) || 'Premium Tool';
      const activeData = {
        id: found.id,
        name: found.name,
        title: prodTitle,
        price: (found.plans && found.plans[0] && found.plans[0].price_bdt) ? found.plans[0].price_bdt : (found.price || 799),
        image: cardImg,
        badgeSvg: cardImg,
        plans: found.plans || [],
        description: found.description || '',
        category: found.category || 'aitools'
      };
      try {
        sessionStorage.setItem('afa_active_view_product', JSON.stringify(activeData));
      } catch(e) {}

      if (found.link && found.link.trim() !== '' && !found.link.includes('details.html') && found.link !== '#') {
        window.open(found.link, '_blank');
        return;
      }
    }
    window.location.href = `details.html?id=${encodeURIComponent(prodId)}`;
  };

  window.openProductDetailsModal = function(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod || !productDetailsModal) return;

    currentDetailsProd = prod;
    const isBn = currentLang === 'bn';

    // Set Image and Title
    if (detailsModalImg) detailsModalImg.src = getToolBadgeSvg(prod);
    if (detailsModalTitle) detailsModalTitle.textContent = isBn && prod.name.bn ? prod.name.bn : (prod.name.en || 'Tool Plan');

    // Types
    const availableTypes = prod.types || ['Shared'];
    currentDetailsType = availableTypes[0];

    if (detailsTypeSwitch) {
      if (availableTypes.length > 1) {
        detailsTypeSwitch.style.display = 'flex';
        if (detailsTypeSharedBtn) detailsTypeSharedBtn.classList.toggle('active', currentDetailsType.toLowerCase() === 'shared');
        if (detailsTypePersonalBtn) detailsTypePersonalBtn.classList.toggle('active', currentDetailsType.toLowerCase() === 'personal');
      } else {
        detailsTypeSwitch.style.display = 'none';
      }
    }

    renderDetailsDurations(prod, currentDetailsType);

    // Populate Collapsible Description
    if (detailsDescBody) {
      detailsDescBody.innerHTML = prod.description || '<p>Premium tool access with 24/7 dedicated customer support.</p>';
      detailsDescBody.style.display = 'none';
    }
    if (detailsDescToggleIcon) detailsDescToggleIcon.textContent = '+';

    // Populate Reviews
    renderProductReviews(prod);

    // Open Modal
    productDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProductDetailsModal = function() {
    if (!productDetailsModal) return;
    productDetailsModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  function renderDetailsDurations(prod, selectedType) {
    if (!detailsDurGrid) return;
    detailsDurGrid.innerHTML = '';

    const allPlans = prod.plans || [{ duration: '1 Month', price_bdt: 499 }];
    let filteredPlans = allPlans.filter(p => !p.type || p.type.toLowerCase() === selectedType.toLowerCase());
    if (filteredPlans.length === 0) filteredPlans = allPlans;

    filteredPlans.forEach((plan, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `dur-btn-details ${idx === 0 ? 'active' : ''}`;
      btn.textContent = plan.duration;
      btn.setAttribute('data-price', plan.price_bdt);
      btn.setAttribute('data-dur', plan.duration);

      if (idx === 0) {
        currentDetailsDur = plan.duration;
        currentDetailsPrice = plan.price_bdt;
        if (detailsTotalPriceVal) detailsTotalPriceVal.textContent = `৳${plan.price_bdt.toLocaleString()}`;
      }

      btn.addEventListener('click', () => {
        detailsDurGrid.querySelectorAll('.dur-btn-details').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDetailsDur = plan.duration;
        currentDetailsPrice = plan.price_bdt;
        if (detailsTotalPriceVal) detailsTotalPriceVal.textContent = `৳${plan.price_bdt.toLocaleString()}`;
      });

      detailsDurGrid.appendChild(btn);
    });
  }

  function renderProductReviews(prod) {
    if (!detailsRecentReviews) return;
    detailsRecentReviews.innerHTML = '';

    const reviews = prod.reviews || [
      { name: 'Mahfujur Rahman', date: '10 Mar', stars: 5, comment: 'Nice fast and good one' },
      { name: 'Faiz', date: '11 Feb', stars: 5, comment: 'I am very satisfied with their way of approaching clients' },
      { name: 'Ahana', date: '04 Jan', stars: 5, comment: 'Reliable service and quick delivery!' }
    ];

    reviews.forEach(r => {
      const item = document.createElement('div');
      item.className = 'recent-review-item';
      item.innerHTML = `
        <div class="review-item-header">
          <span class="review-item-name">${r.name}</span>
          <span class="review-item-date">${r.date}</span>
        </div>
        <div class="review-item-stars">${'★'.repeat(r.stars || 5)}</div>
        <p class="review-item-comment">${r.comment}</p>
      `;
      detailsRecentReviews.appendChild(item);
    });
  }

  // Type button click listeners
  if (detailsTypeSharedBtn) {
    detailsTypeSharedBtn.addEventListener('click', () => {
      detailsTypeSharedBtn.classList.add('active');
      if (detailsTypePersonalBtn) detailsTypePersonalBtn.classList.remove('active');
      currentDetailsType = 'Shared';
      if (currentDetailsProd) renderDetailsDurations(currentDetailsProd, currentDetailsType);
    });
  }
  if (detailsTypePersonalBtn) {
    detailsTypePersonalBtn.addEventListener('click', () => {
      detailsTypePersonalBtn.classList.add('active');
      if (detailsTypeSharedBtn) detailsTypeSharedBtn.classList.remove('active');
      currentDetailsType = 'Personal';
      if (currentDetailsProd) renderDetailsDurations(currentDetailsProd, currentDetailsType);
    });
  }

  // Description Accordion Toggle
  if (detailsDescToggleBtn) {
    detailsDescToggleBtn.addEventListener('click', () => {
      const isHidden = detailsDescBody.style.display === 'none' || detailsDescBody.style.display === '';
      detailsDescBody.style.display = isHidden ? 'block' : 'none';
      if (detailsDescToggleIcon) detailsDescToggleIcon.textContent = isHidden ? '−' : '+';
    });
  }

  // Review Stars Rating Selector
  if (starRatingSelect) {
    const starItems = starRatingSelect.querySelectorAll('.star-select-item');
    starItems.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'), 10);
        currentReviewRating = rating;
        starItems.forEach(s => {
          const r = parseInt(s.getAttribute('data-rating'), 10);
          s.classList.toggle('active', r <= rating);
        });
      });
    });
  }

  // Submit Review
  if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', () => {
      const name = reviewAuthorName ? reviewAuthorName.value.trim() : '';
      const comment = reviewCommentText ? reviewCommentText.value.trim() : '';
      if (!name || !comment) {
        alert(currentLang === 'bn' ? 'অনুগ্রহ করে আপনার নাম এবং রিভিউ লিখুন।' : 'Please enter your name and review comment.');
        return;
      }
      if (currentDetailsProd) {
        if (!currentDetailsProd.reviews) currentDetailsProd.reviews = [];
        currentDetailsProd.reviews.unshift({
          name: name,
          date: 'Just now',
          stars: currentReviewRating,
          comment: comment
        });
        renderProductReviews(currentDetailsProd);
        if (reviewAuthorName) reviewAuthorName.value = '';
        if (reviewCommentText) reviewCommentText.value = '';
        alert(currentLang === 'bn' ? 'আপনার রিভিউ সফলভাবে যুক্ত হয়েছে!' : 'Thank you! Your review has been submitted.');
      }
    });
  }

  // Modal overlay click to close
  if (productDetailsModal) {
    productDetailsModal.addEventListener('click', (e) => {
      if (e.target === productDetailsModal) closeProductDetailsModal();
    });
  }
  if (closeProductDetailsModalBtn) {
    closeProductDetailsModalBtn.addEventListener('click', closeProductDetailsModal);
  }

  // "Buy Now ⚡" Trigger in Details Modal
  function handleDetailsBuyNow() {
    if (!currentDetailsProd) return;
    closeProductDetailsModal();
    proceedToCheckout(currentDetailsProd, currentDetailsDur, currentDetailsPrice, currentDetailsType);
  }
  if (detailsModalBuySmallBtn) detailsModalBuySmallBtn.addEventListener('click', handleDetailsBuyNow);
  if (detailsModalBuyMainBtn) detailsModalBuyMainBtn.addEventListener('click', handleDetailsBuyNow);


  // =========================================================================
  // --- 13. USER AUTHENTICATION & SESSION ENGINE (Screenshots 3 & 4) ---
  // =========================================================================
  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const authLoginBox = document.getElementById('authLoginBox');
  const authRegisterBox = document.getElementById('authRegisterBox');
  const linkToRegister = document.getElementById('linkToRegister');
  const linkToLogin = document.getElementById('linkToLogin');
  const authLoginForm = document.getElementById('authLoginForm');
  const authRegisterForm = document.getElementById('authRegisterForm');
  const navLoginBtn = document.getElementById('navLoginBtn');

  // Seed default demo user 'nexus_core638' matching Screenshot 5
  const DEMO_USER = {
    username: 'nexus_core638',
    email: 'nexus@aifuture.agency',
    phone: '0163935198',
    password: 'password123',
    visits: 84,
    logins: 29,
    activeTools: [
      {
        id: 'stealth-writer',
        name: 'Stealth Writer Premium Plan (30 Days)',
        plan: '1 month (Shared)',
        price: 799,
        status: 'Active',
        expires: '2026-10-04',
        loginEmail: 'stealth_vip@aifuture.agency',
        loginPin: '992810',
        accessUrl: 'dashboard.html'
      },
      {
        id: 'chatgpt-plus',
        name: 'ChatGPT PLUS (Renewable)',
        plan: '1 Month PLUS',
        price: 499,
        status: 'Active',
        expires: '2026-10-04',
        loginEmail: 'gpt4_plus@aifuture.agency',
        loginPin: '448291',
        accessUrl: 'https://chatgpt.com'
      }
    ],
    transactions: [
      {
        id: 'TXN-882910',
        date: '2026-09-01',
        item: 'Stealth Writer Premium Plan (30 Days)',
        amount: '799.00 BDT',
        status: 'Completed'
      },
      {
        id: 'TXN-712490',
        date: '2026-09-03',
        item: 'ChatGPT PLUS (Renewable)',
        amount: '499.00 BDT',
        status: 'Completed'
      }
    ]
  };

  function getUsers() {
    try {
      const stored = localStorage.getItem('aifuture_users');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    const defaultList = [DEMO_USER];
    localStorage.setItem('aifuture_users', JSON.stringify(defaultList));
    return defaultList;
  }

  function saveUsers(users) {
    localStorage.setItem('aifuture_users', JSON.stringify(users));
  }

  function getCurrentUser() {
    const session = localStorage.getItem('aifuture_session');
    if (!session) return null;
    const users = getUsers();
    return users.find(u => u.username === session) || null;
  }

  function setCurrentSession(username) {
    localStorage.setItem('aifuture_session', username);
    try {
      const users = getUsers();
      const u = users.find(x => x.username === username);
      if (u) {
        u.visits = (u.visits || 0) + 1;
        u.logins = (u.logins || 0) + 1;
        u.lastLogin = 'Just now';
        saveUsers(users);
      }
    } catch(e) {}
    updateNavbarUser();

  // Track website visits for user
  try {
    const curSession = localStorage.getItem('aifuture_session');
    if (curSession && !sessionStorage.getItem('afa_session_visit_counted')) {
      const users = getUsers();
      const u = users.find(x => x.username === curSession);
      if (u) {
        u.visits = (u.visits || 0) + 1;
        sessionStorage.setItem('afa_session_visit_counted', 'true');
        saveUsers(users);
      }
    }
  } catch(e) {}

  }

  function logoutUser() {
    localStorage.removeItem('aifuture_session');
    updateNavbarUser();
    closeDashboardModal();
  }

  function updateNavbarUser() {
    const user = getCurrentUser();
    const isBn = currentLang === 'bn';

    // Desktop & Tablet Navbar Button
    if (navLoginBtn) {
      if (user) {
        navLoginBtn.classList.add('logged-in');
        const uName = user.username || 'Member';
        const displayUName = uName.length > 10 ? (uName.slice(0, 8) + '..') : uName;
        navLoginBtn.innerHTML = `<i class="fas fa-user-circle"></i> <span title="${uName}">${displayUName}</span>`;
        navLoginBtn.title = `Member: ${uName} (Click to open Dashboard)`;
      } else {
        navLoginBtn.classList.remove('logged-in');
        navLoginBtn.innerHTML = `<i class="fas fa-user-plus"></i> <span>${isBn ? 'লগইন / রেজিস্টার' : 'Login / Register'}</span>`;
        navLoginBtn.title = isBn ? 'লগইন অথবা নতুন অ্যাকাউন্ট তৈরি করুন' : 'Login or Create New Account';
      }
    }

    // Mobile Navigation Drawer Auth Items (Guarantees visible Login / Register on phones)
    const mobileAuthGuest = document.getElementById('mobileAuthGuest');
    const mobileAuthUser = document.getElementById('mobileAuthUser');
    const mobileAuthUserName = document.getElementById('mobileAuthUserName');

    if (mobileAuthGuest && mobileAuthUser) {
      if (user) {
        mobileAuthGuest.style.display = 'none';
        mobileAuthUser.style.display = 'flex';
        if (mobileAuthUserName) {
          mobileAuthUserName.textContent = isBn 
            ? `ড্যাশবোর্ড (${user.username || 'মেম্বার'})` 
            : `My Dashboard (${user.username || 'Member'})`;
        }
      } else {
        mobileAuthGuest.style.display = 'grid';
        mobileAuthUser.style.display = 'none';
      }
    }
  }

  window.openAuthModal = function(showRegister = false) {
    if (!authModal) return;
    if (showRegister) {
      if (authLoginBox) authLoginBox.style.display = 'none';
      if (authRegisterBox) authRegisterBox.style.display = 'block';
    } else {
      if (authLoginBox) authLoginBox.style.display = 'block';
      if (authRegisterBox) authRegisterBox.style.display = 'none';
    }
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeAuthModal = function() {
    if (!authModal) return;
    authModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (linkToRegister) {
    linkToRegister.addEventListener('click', () => {
      if (authLoginBox) authLoginBox.style.display = 'none';
      if (authRegisterBox) authRegisterBox.style.display = 'block';
    });
  }

  if (linkToLogin) {
    linkToLogin.addEventListener('click', () => {
      if (authRegisterBox) authRegisterBox.style.display = 'none';
      if (authLoginBox) authLoginBox.style.display = 'block';
    });
  }

  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', closeAuthModal);
  }
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  // Login Form Submission
  if (authLoginForm) {
    authLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginInput = document.getElementById('loginUser').value.trim();
      const passInput = document.getElementById('loginPass').value.trim();

      const users = getUsers();
      const matched = users.find(u => (u.username === loginInput || u.email === loginInput) && u.password === passInput);

      if (matched) {
        setCurrentSession(matched.username);
        closeAuthModal();
        if (pendingCheckoutItem) {
          executePendingCheckout();
        } else {
          openDashboardModal('active-tools');
        }
      } else {
        alert(currentLang === 'bn' ? 'ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।' : 'Invalid username/email or password. (Hint: nexus_core638 / password123)');
      }
    });
  }

  // Register Form Submission
  if (authRegisterForm) {
    authRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('regUser').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const pass = document.getElementById('regPass').value.trim();
      const passConfirm = document.getElementById('regPassConfirm').value.trim();

      if (pass !== passConfirm) {
        alert(currentLang === 'bn' ? 'পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।' : 'Passwords do not match.');
        return;
      }

      const users = getUsers();
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert(currentLang === 'bn' ? 'এই ইউজারনেম ইতিমধ্যে নিবন্ধিত আছে।' : 'This username is already registered. Please choose another.');
        return;
      }

      const newUser = {
        username: username,
        email: email,
        phone: phone,
        password: pass,
        activeTools: [],
        transactions: []
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentSession(newUser.username);
      closeAuthModal();

      if (pendingCheckoutItem) {
        executePendingCheckout();
      } else {
        openDashboardModal('active-tools');
      }
    });
  }

  // Connect Navbar Button to dedicated login and dashboard pages
  if (navLoginBtn) {
    navLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const user = getCurrentUser();
      if (user) {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'login.html';
      }
    });
  }


  // =========================================================================
  // --- 14. USER CONTROL PANEL / DASHBOARD ENGINE (Screenshots 3 & 5) ---
  // =========================================================================
  const dashboardModal = document.getElementById('dashboardModal');
  const closeDashboardBtn = document.getElementById('closeDashboardBtn');
  const dashLogoutBtn = document.getElementById('dashLogoutBtn');
  const dashGreetingText = document.getElementById('dashGreetingText');
  const dashUserAvatarInitial = document.getElementById('dashUserAvatarInitial');
  const dashNavItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const myActiveToolsGrid = document.getElementById('myActiveToolsGrid');
  const dashCatalogGrid = document.getElementById('dashCatalogGrid');
  const dashHistoryTableBody = document.getElementById('dashHistoryTableBody');

  // Invoice Table elements
  const invoiceProdTitle = document.getElementById('invoiceProdTitle');
  const invoiceUnitPrice = document.getElementById('invoiceUnitPrice');
  const invoiceTotalPrice = document.getElementById('invoiceTotalPrice');
  const invoiceSubtotal = document.getElementById('invoiceSubtotal');
  const invoiceFinalTotal = document.getElementById('invoiceFinalTotal');
  const invoiceTermsText = document.getElementById('invoiceTermsText');
  const couponCodeInput = document.getElementById('couponCodeInput');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponAppliedBadge = document.getElementById('couponAppliedBadge');
  const openPaymentModalBtn = document.getElementById('openPaymentModalBtn');

  let currentInvoiceOrder = null;
  let currentInvoiceTotalNumber = 799;
  let isCouponApplied = false;
  let pendingCheckoutItem = null;

  window.openDashboardModal = function(tab = 'active-tools') {
    const user = getCurrentUser();
    if (!user) {
      openAuthModal(false);
      return;
    }

    if (dashGreetingText) dashGreetingText.textContent = `hey, ${user.username}`;
    if (dashUserAvatarInitial) dashUserAvatarInitial.textContent = user.username.charAt(0).toUpperCase();

    // Populate Settings tab fields
    const settingUsername = document.getElementById('settingUsername');
    const settingEmail = document.getElementById('settingEmail');
    const settingPhone = document.getElementById('settingPhone');
    if (settingUsername) settingUsername.value = user.username;
    if (settingEmail) settingEmail.value = user.email || 'user@example.com';
    if (settingPhone) settingPhone.value = user.phone || 'N/A';

    switchDashTab(tab);

    if (dashboardModal) {
      dashboardModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeDashboardModal = function() {
    if (!dashboardModal) return;
    dashboardModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeDashboardBtn) closeDashboardBtn.addEventListener('click', closeDashboardModal);
  if (dashLogoutBtn) dashLogoutBtn.addEventListener('click', logoutUser);

  window.switchDashTab = function(tabName) {
    dashNavItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabName);
    });

    const panels = {
      'active-tools': document.getElementById('tabPanelActiveTools'),
      'subscribe': document.getElementById('tabPanelSubscribe'),
      'checkout': document.getElementById('tabPanelCheckout'),
      'history': document.getElementById('tabPanelHistory'),
      'settings': document.getElementById('tabPanelSettings')
    };

    Object.keys(panels).forEach(key => {
      if (panels[key]) panels[key].style.display = (key === tabName) ? 'block' : 'none';
    });

    if (tabName === 'active-tools') renderUserActiveTools();
    if (tabName === 'subscribe') renderDashboardCatalog();
    if (tabName === 'history') renderUserTransactionHistory();
  };

  dashNavItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchDashTab(tab);
    });
  });

  // Render Active Subscriptions in User Panel
  function renderUserActiveTools() {
    if (!myActiveToolsGrid) return;
    myActiveToolsGrid.innerHTML = '';

    const user = getCurrentUser();
    if (!user) return;

    const tools = user.activeTools || [];
    if (tools.length === 0) {
      myActiveToolsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 48px 20px; background:white; border-radius:16px; border:1px dashed #cbd5e1;">
          <i class="fas fa-box-open" style="font-size: 40px; color: #94a3b8; margin-bottom: 12px; display:block;"></i>
          <h3 style="font-size:16px; font-weight:700; color:#1e293b; margin-bottom:6px;">No Active Tools Yet</h3>
          <p style="font-size:13px; color:#64748b; margin-bottom:16px;">Browse our catalog and activate your favorite AI premium tool instantly.</p>
          <button class="btn-dash-pay" style="padding:8px 20px;" onclick="switchDashTab('subscribe')">
            <i class="fas fa-shopping-bag"></i> Browse Tools
          </button>
        </div>
      `;
      return;
    }

    tools.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'active-tool-card';
      card.innerHTML = `
        <div class="active-tool-header">
          <h4 class="active-tool-name">${tool.name}</h4>
          <span class="active-tool-status">● ${tool.status || 'Active'}</span>
        </div>
        <p class="active-tool-plan">Plan: <strong>${tool.plan}</strong> • Expires: <strong>${tool.expires}</strong></p>
        
        <div class="active-tool-creds">
          <div><i class="fas fa-user-shield"></i> User/Email: <strong>${tool.loginEmail || user.email}</strong></div>
          <div><i class="fas fa-key"></i> Access PIN: <strong>${tool.loginPin || '884920'}</strong></div>
        </div>

        <div class="active-tool-actions">
          <a href="${tool.accessUrl || '#'}" target="_blank" class="btn-dash-pay" style="padding: 8px 16px; font-size:12px; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
            <i class="fas fa-external-link-alt"></i> Access Tool
          </a>
          <button type="button" class="btn-tool-view" style="padding: 8px 14px; font-size:12px; border-radius:8px;" onclick="copyToolCredentials('${tool.loginEmail || user.email}', '${tool.loginPin || '884920'}')">
            <i class="fas fa-copy"></i> Copy Credentials
          </button>
        </div>
      `;
      myActiveToolsGrid.appendChild(card);
    });
  }

  window.copyToolCredentials = function(email, pin) {
    const text = `AI Future Agency Tool Access:\nEmail/User: ${email}\nPIN/Pass: ${pin}`;
    navigator.clipboard.writeText(text).then(() => {
      alert(currentLang === 'bn' ? 'লগইন তথ্য কপি করা হয়েছে!' : 'Credentials copied to clipboard!');
    }).catch(() => {
      alert(`Login Info:\nEmail: ${email}\nPIN: ${pin}`);
    });
  };

  // Render Dashboard Catalog Quick Picker
  function renderDashboardCatalog() {
    if (!dashCatalogGrid) return;
    dashCatalogGrid.innerHTML = '';
    const isBn = currentLang === 'bn';

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      const plans = p.plans || [{ duration: '1 Month', price_bdt: 499 }];
      const plan = plans[0];
      const title = p.name ? (isBn && p.name.bn ? p.name.bn : p.name.en) : 'Tool';

      card.innerHTML = `
        <div class="tool-img-box">
          <img src="${getToolBadgeSvg(p)}" alt="${title}">
        </div>
        <div class="tool-card-body">
          <h3 class="tool-title">${title}</h3>
          <div class="tool-price-box">
            <span class="tool-price-lbl">PRICE</span>
            <span class="tool-price-amt">৳${plan.price_bdt.toLocaleString()}</span>
          </div>
          <button type="button" class="btn-dash-pay" style="width:100%; margin-top:8px; padding:8px;" onclick="proceedToCheckoutById('${p.id}')">
            <i class="fas fa-bolt"></i> Instant Subscribe
          </button>
        </div>
      `;
      dashCatalogGrid.appendChild(card);
    });
  }

  window.proceedToCheckoutById = function(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    const plans = prod.plans || [{ duration: '1 Month', price_bdt: 499 }];
    proceedToCheckout(prod, plans[0].duration, plans[0].price_bdt, prod.types ? prod.types[0] : 'Shared');
  };

  // Proceed to Checkout Controller
  window.proceedToCheckout = function(product, duration, price, type = 'Shared') {
    pendingCheckoutItem = { product, duration, price, type };
    const user = getCurrentUser();
    if (!user) {
      alert(currentLang === 'bn' ? 'অর্ডার সম্পন্ন করতে অনুগ্রহ করে আগে লগইন অথবা সাইন আপ করুন।' : 'Please login or register to complete your order.');
      openAuthModal(false);
      return;
    }
    executePendingCheckout();
  };

  function executePendingCheckout() {
    if (!pendingCheckoutItem) return;
    const { product, duration, price, type } = pendingCheckoutItem;
    const titleText = `${product.name.en || product.name.bn} (${type}) (${duration})💻`;

    currentInvoiceOrder = {
      product: product,
      duration: duration,
      price: price,
      type: type,
      title: titleText
    };
    currentInvoiceTotalNumber = price;
    isCouponApplied = false;

    if (invoiceProdTitle) invoiceProdTitle.textContent = titleText;
    if (invoiceUnitPrice) invoiceUnitPrice.textContent = `${price.toFixed(2)} BDT`;
    if (invoiceTotalPrice) invoiceTotalPrice.textContent = `${price.toFixed(2)} BDT`;
    if (invoiceSubtotal) invoiceSubtotal.textContent = `${price.toFixed(2)} BDT`;
    if (invoiceFinalTotal) invoiceFinalTotal.textContent = `${price.toFixed(2)} BDT`;
    if (invoiceTermsText) invoiceTermsText.textContent = `Subscription Terms: ${price.toFixed(2)} BDT for ${duration}`;
    if (couponAppliedBadge) couponAppliedBadge.style.display = 'none';
    if (couponCodeInput) couponCodeInput.value = '';

    openDashboardModal('checkout');
    pendingCheckoutItem = null;
  }

  // Coupon Code Application
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponCodeInput ? couponCodeInput.value.trim().toUpperCase() : '';
      if (!code) return;

      if (code === 'SPECIAL10' || code === 'AIFUTURE') {
        if (isCouponApplied) {
          alert('Coupon already applied.');
          return;
        }
        isCouponApplied = true;
        const discount = Math.round(currentInvoiceTotalNumber * 0.10);
        const finalPrice = currentInvoiceTotalNumber - discount;
        if (invoiceFinalTotal) invoiceFinalTotal.textContent = `${finalPrice.toFixed(2)} BDT (10% OFF)`;
        if (couponAppliedBadge) couponAppliedBadge.style.display = 'block';
        alert('🎉 10% Discount Coupon Applied Successfully!');
      } else {
        alert('Invalid or expired coupon code. Try: SPECIAL10');
      }
    });
  }

  // Render Transaction History
  function renderUserTransactionHistory() {
    if (!dashHistoryTableBody) return;
    dashHistoryTableBody.innerHTML = '';
    const user = getCurrentUser();
    if (!user) return;

    const txns = user.transactions || [];
    if (txns.length === 0) {
      dashHistoryTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding: 24px; color:#94a3b8;">No transaction history found.</td>
        </tr>
      `;
      return;
    }

    txns.forEach(tx => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:700; color:#0f172a;">${tx.id}</td>
        <td style="color:#64748b;">${tx.date}</td>
        <td>${tx.item}</td>
        <td style="font-weight:700; color:#16a34a;">${tx.amount}</td>
        <td><span style="display:inline-block; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:700; background:#dcfce7; color:#15803d;">${tx.status}</span></td>
      `;
      dashHistoryTableBody.appendChild(tr);
    });
  }


  // =========================================================================
  // --- 15. PAYMENT GATEWAY CONTROLLER (bKash / Nagad / Rocket & Instant Demo) ---
  // =========================================================================
  const paymentGatewayModal = document.getElementById('paymentGatewayModal');
  const closePaymentModalBtn = document.getElementById('closePaymentModalBtn');
  const openPaymentModalBtnTrigger = document.getElementById('openPaymentModalBtn');
  const paySubtotalText = document.getElementById('paySubtotalText');
  const paySenderPhoneInput = document.getElementById('paySenderPhoneInput');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
  const payMethodTabs = document.querySelectorAll('.pay-method-tab, .payment-method-card');

  let selectedPayMethod = 'bkash';

  window.openPaymentGateway = function() {
    if (!paymentGatewayModal) return;
    if (paySubtotalText) {
      paySubtotalText.textContent = (invoiceFinalTotal ? invoiceFinalTotal.textContent : `${currentInvoiceTotalNumber} BDT`);
    }
    const payAmtDisplay = document.getElementById('payAmountDisplay');
    if (payAmtDisplay && invoiceFinalTotal) {
      payAmtDisplay.textContent = invoiceFinalTotal.textContent;
    }
    paymentGatewayModal.classList.add('active');
  };

  window.closePaymentGateway = function() {
    if (!paymentGatewayModal) return;
    paymentGatewayModal.classList.remove('active');
  };

  if (openPaymentModalBtnTrigger) openPaymentModalBtnTrigger.addEventListener('click', openPaymentGateway);
  if (closePaymentModalBtn) closePaymentModalBtn.addEventListener('click', closePaymentGateway);
  if (paymentGatewayModal) {
    paymentGatewayModal.addEventListener('click', (e) => {
      if (e.target === paymentGatewayModal) closePaymentGateway();
    });
  }

  // Interactive Payment Method Selection (bKash, Nagad, Rocket)
  payMethodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payMethodTabs.forEach(t => {
        t.classList.remove('active');
        t.classList.remove('selected');
      });
      tab.classList.add('active');
      tab.classList.add('selected');
      selectedPayMethod = tab.getAttribute('data-method') || 'bkash';
    });
  });

  // Copy Payment Phone Number Helper
  window.copyPaymentNumber = function() {
    const numEl = document.getElementById('payNumberVal');
    const num = numEl ? numEl.innerText.trim() : '0163935198';
    navigator.clipboard.writeText(num).then(() => {
      const copyBtn = document.getElementById('copyPayNumBtn');
      if (copyBtn) {
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      }
    }).catch(() => {
      alert(`Payment Number: ${num}`);
    });
  };

  // Instant Demo Activation Button Handler
  const demoInstantActivateBtn = document.getElementById('demoInstantActivateBtn');
  if (demoInstantActivateBtn) {
    demoInstantActivateBtn.addEventListener('click', () => {
      const demoTrx = 'DEMO-ACT-' + Math.floor(100000 + Math.random() * 900000);
      const trxInput = document.getElementById('paymentTrxIdInput') || document.getElementById('payTrxIdInput');
      if (trxInput) {
        trxInput.value = demoTrx;
        trxInput.style.borderColor = '#00ff87';
        trxInput.style.boxShadow = '0 0 16px rgba(0, 255, 135, 0.4)';
      }
      
      demoInstantActivateBtn.style.opacity = '0.7';
      demoInstantActivateBtn.style.pointerEvents = 'none';
      
      setTimeout(() => {
        demoInstantActivateBtn.style.opacity = '1';
        demoInstantActivateBtn.style.pointerEvents = 'auto';
        if (confirmPaymentBtn) {
          confirmPaymentBtn.click();
        }
      }, 350);
    });
  }

  // Confirm Payment & Unlock Tool in Dashboard
  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener('click', () => {
      let user = getCurrentUser();
      
      // If user is guest, automatically create seamless account so activation proceeds directly
      if (!user) {
        const guestName = 'Customer_' + Math.floor(100 + Math.random() * 900);
        user = {
          name: guestName,
          username: guestName.toLowerCase(),
          email: `${guestName.toLowerCase()}@aifuture.agency`,
          phone: '0163935198',
          password: 'password123',
          activeTools: [],
          transactions: []
        };
        const users = getUsers();
        users.push(user);
        saveUsers(users);
        localStorage.setItem('aifuture_session', user.username);
        updateNavbarUser();
      }

      const trxInput = document.getElementById('paymentTrxIdInput') || document.getElementById('payTrxIdInput');
      const senderPhone = paySenderPhoneInput ? paySenderPhoneInput.value.trim() : '';
      const enteredTrx = trxInput ? trxInput.value.trim() : '';
      const finalTrxId = enteredTrx || `TRX${Date.now().toString().slice(-7)}`;

      // Construct active tool item
      const itemTitle = currentInvoiceOrder ? currentInvoiceOrder.title : 'Stealth Writer Premium Plan (30 Days)';
      const itemPrice = currentInvoiceOrder ? currentInvoiceOrder.price : 799;
      const toolId = currentInvoiceOrder && currentInvoiceOrder.product ? currentInvoiceOrder.product.id : 'stealth-writer';
      
      const newActiveTool = {
        id: toolId,
        name: itemTitle,
        plan: currentInvoiceOrder ? `${currentInvoiceOrder.duration} (${currentInvoiceOrder.type})` : '1 Month (Shared)',
        price: itemPrice,
        status: 'Active',
        expires: '2026-10-24',
        loginEmail: `${user.username}_vip@aifuture.agency`,
        loginPin: Math.floor(100000 + Math.random() * 900000).toString(),
        accessUrl: 'dashboard.html'
      };

      const newTxn = {
        id: finalTrxId,
        date: new Date().toISOString().split('T')[0],
        item: itemTitle,
        amount: `${itemPrice.toFixed(2)} BDT`,
        status: 'Completed'
      };

      // Save to user account in localStorage
      const users = getUsers();
      const uIdx = users.findIndex(u => u.username === user.username);
      if (uIdx !== -1) {
        if (!users[uIdx].activeTools) users[uIdx].activeTools = [];
        if (!users[uIdx].transactions) users[uIdx].transactions = [];
        users[uIdx].activeTools.unshift(newActiveTool);
        users[uIdx].transactions.unshift(newTxn);
        saveUsers(users);
      }

      // Record in central admin orders
      try {
        const existingOrders = JSON.parse(localStorage.getItem('afa_admin_orders') || '[]');
        const newAdminOrder = {
          id: `AFA-${Math.floor(1000 + Math.random() * 9000)}`,
          customer: user.name || user.username || 'Customer',
          phone: senderPhone || user.phone || '01XXXXXXXXX',
          email: user.email || 'customer@gmail.com',
          product: itemTitle,
          amount: itemPrice,
          method: selectedPayMethod ? (selectedPayMethod.charAt(0).toUpperCase() + selectedPayMethod.slice(1)) : 'bKash',
          trxId: finalTrxId,
          date: new Date().toISOString().split('T')[0],
          status: 'Pending'
        };
        existingOrders.unshift(newAdminOrder);
        localStorage.setItem('afa_admin_orders', JSON.stringify(existingOrders));
        localStorage.setItem('afa_latest_order_event', JSON.stringify({ time: Date.now(), order: newAdminOrder }));
        try {
          if (typeof BroadcastChannel !== 'undefined') {
            const bc = new BroadcastChannel('afa_live_sync');
            bc.postMessage({ type: 'NEW_ORDER_PLACED', order: newAdminOrder, timestamp: Date.now() });
          }
        } catch(err) {}
      } catch(e) {}

      closePaymentGateway();
      alert(currentLang === 'bn' 
        ? `🎉 অভিনন্দন! আপনার ট্রানজেকশন সফল হয়েছে।\nট্রানজেকশন আইডি: ${finalTrxId}\nটুলটি আপনার ড্যাশবোর্ডে অ্যাক্টিভ করা হয়েছে।` 
        : `🎉 Activation Successful!\nTransaction ID: ${finalTrxId}\nYour tool has been activated in your Dashboard!`);

      // Switch to active tools tab in dashboard
      switchDashTab('active-tools');
    });
  }

  // --- INITIALIZE AUTH & USER STATE ON LOAD ---
  updateNavbarUser();

  // Dynamic Hero Banner Carousel Engine (Multi-Image Auto-Sliding)
  function initHeroBannerCarousel() {
    const carouselTrack = document.getElementById('heroCarouselTrack');
    const dotsContainer = document.getElementById('heroCarouselDots');
    const prevBtn = document.getElementById('heroCarouselPrev');
    const nextBtn = document.getElementById('heroCarouselNext');
    if (!carouselTrack) return;

    const defaultBanners = [
      {
        id: 'ban-1',
        title: 'Scale Your Sales With Premium Digital Products',
        subtitle: 'Viral Reels Bundles, Canva Pro, AI Tools & Web Systems',
        image: 'hero-showcase.jpg',
        url: '#products',
        status: 'active'
      },
      {
        id: 'ban-2',
        title: 'Viral Reels Analytics & Growth Command Suite',
        subtitle: 'Boost Engagement by +112% with High-Converting Content Packs',
        image: 'hero-banner-2.jpg',
        url: '#products',
        status: 'active'
      },
      {
        id: 'ban-3',
        title: 'Facebook Ads & Meta Precision Boosting Engine',
        subtitle: 'Targeted High ROI Campaigns for Agencies and Online Businesses',
        image: 'hero-banner-3.jpg',
        url: '#boost',
        status: 'active'
      }
    ];

    let banners = [];
    try {
      const stored = localStorage.getItem('afa_banners_list') || localStorage.getItem('afa_hero_banners');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          banners = parsed.filter(b => b.status !== 'inactive');
        }
      }
    } catch(e) {}

    if (banners.length === 0) {
      banners = defaultBanners;
      try {
        localStorage.setItem('afa_banners_list', JSON.stringify(defaultBanners));
        localStorage.setItem('afa_hero_banners', JSON.stringify(defaultBanners));
      } catch(e) {}
    }

    // Render dynamic slides
    carouselTrack.innerHTML = banners.map((b, idx) => `
      <div class="hero-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <a href="${b.url || '#products'}" class="hero-slide-link">
          <img src="${b.image || 'hero-showcase.jpg'}" alt="${b.title || 'Hero Banner'}" class="hero-slide-img">
          <div class="hero-slide-overlay"></div>
          <div class="hero-slide-caption">
            <div class="hero-slide-caption-title">
              <span>${b.title || ''}</span>
              <span class="slide-badge">${idx === 0 ? 'PROMO' : (idx === 1 ? 'HOT' : 'SCALE')}</span>
            </div>
            ${b.subtitle ? `<p class="hero-slide-caption-sub">${b.subtitle}</p>` : ''}
          </div>
        </a>
      </div>
    `).join('');

    // Render dots
    if (dotsContainer) {
      dotsContainer.innerHTML = banners.map((_, idx) => `
        <button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="Slide ${idx + 1}"></button>
      `).join('');
    }

    let currentIndex = 0;
    let autoplayTimer = null;
    const totalSlides = banners.length;

    function showSlide(index) {
      if (totalSlides === 0) return;
      currentIndex = (index + totalSlides) % totalSlides;

      const slides = carouselTrack.querySelectorAll('.hero-slide');
      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentIndex);
      });

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((d, idx) => {
          d.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      if (totalSlides > 1) {
        autoplayTimer = setInterval(nextSlide, 4500);
      }
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        nextSlide();
        startAutoplay();
      };
    }

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        prevSlide();
        startAutoplay();
      };
    }

    if (dotsContainer) {
      dotsContainer.onclick = (e) => {
        const dot = e.target.closest('.carousel-dot');
        if (!dot) return;
        const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
        if (!isNaN(slideIdx)) {
          showSlide(slideIdx);
          startAutoplay();
        }
      };
    }

    const wrapper = document.getElementById('heroBannerCarouselWrap');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoplay);
      wrapper.addEventListener('mouseleave', startAutoplay);
    }

    // Touch / Swipe support
    let touchStartX = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
      startAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  // Initialize Hero Banner Carousel
  initHeroBannerCarousel();

  // Two-Way Real-time Live Sync (Admin Panel <-> Public Website)
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('afa_live_sync');
      bc.onmessage = (ev) => {
        if (!ev || !ev.data) return;
        if (ev.data.type === 'BANNERS_UPDATED') {
          console.log('⚡ [LiveSync] New banners received from Admin Panel! Re-rendering carousel...');
          initHeroBannerCarousel();
        }
        if (ev.data.type === 'PRODUCTS_UPDATED' || ev.data.type === 'AFA_PRODUCTS_CHANGED') {
          console.log('⚡ [LiveSync] Products updated from Admin Panel! Re-rendering products...');
          renderProducts();
        }
        if (ev.data.type === 'SETTINGS_UPDATED') {
          console.log('⚡ [LiveSync] Settings updated from Admin Panel!');
          updateNavbarUser();
        }
      };
    }
  } catch(e) {}

  window.addEventListener('storage', (e) => {
    if (e.key === 'afa_banners_list' || e.key === 'afa_hero_banners' || e.key === 'afa_live_sync_trigger') {
      console.log('⚡ [LiveSync Storage] Banners changed in storage, re-rendering hero carousel...');
      initHeroBannerCarousel();
    }
    if (e.key === 'afa_admin_products' || e.key === 'digital_products_catalog') {
      console.log('⚡ [LiveSync Storage] Products updated, re-rendering catalog...');
      renderProducts();
    }
    if (e.key === 'aifuture_session' || e.key === 'aifuture_users') {
      updateNavbarUser();
    }
  });

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      initHeroBannerCarousel();
    }
  });

  window.addEventListener('focus', () => {
    initHeroBannerCarousel();
  });

  // Initial Load: English default language & Cyber Cyan theme
  initScrollObserver();
  setTheme('cyan');
  setLanguage('en');
  observeElements();
  init3DTilt();
});


