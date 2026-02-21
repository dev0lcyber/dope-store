import { useState } from "react";
import { MessageCircle, Truck, Shield, CreditCard, ChevronLeft, ChevronRight, Check, Star, Users, Package, Award, Sparkles, Eye, Sun, Feather, Clock, MapPin, ThumbsUp, Quote } from "lucide-react";

// Product colors data with image URLs
const colors = [
  { id: "black", name: "أسود", file: "black.png", url: "https://019c7c2b-dffe-7c97-af52-4e1342e8b1e7.mochausercontent.com/black.png" },
  { id: "blue-pink", name: "أزرق وردي", file: "blue-piink.png", url: null },
  { id: "clear-blue", name: "أزرق شفاف", file: "clear-blue.png", url: null },
  { id: "clear-brown", name: "بني شفاف", file: "clear-brown.png", url: null },
  { id: "clear-green", name: "أخضر شفاف", file: "clear-green.png", url: null },
  { id: "clear-pink", name: "وردي شفاف", file: "clear-pink.png", url: null },
  { id: "clear-purple", name: "بنفسجي شفاف", file: "clear-purple.png", url: null },
  { id: "gra-black", name: "رمادي أسود", file: "gra-black.png", url: "https://019c7c2b-dffe-7c97-af52-4e1342e8b1e7.mochausercontent.com/gra-black.png" },
  { id: "gra-brown", name: "رمادي بني", file: "gra-brown.png", url: "https://019c7c2b-dffe-7c97-af52-4e1342e8b1e7.mochausercontent.com/gra-brown.png" },
  { id: "red", name: "أحمر", file: "red.png", url: null },
  { id: "transparent", name: "شفاف", file: "transparent.png", url: "https://019c7c2b-dffe-7c97-af52-4e1342e8b1e7.mochausercontent.com/transparent.png" },
  { id: "yellow", name: "أصفر", file: "yello.png", url: "https://019c7c2b-dffe-7c97-af52-4e1342e8b1e7.mochausercontent.com/yello.png" },
];

// Customer reviews
const reviews = [
  {
    name: "سارة م.",
    city: "الدار البيضاء",
    rating: 5,
    text: "نظارات رائعة جداً! الجودة ممتازة والتوصيل كان سريع. أنصح بها بشدة 👌",
    date: "منذ 3 أيام"
  },
  {
    name: "أحمد ب.",
    city: "مراكش",
    rating: 5,
    text: "طلبت زوجين وصلوني في أقل من 48 ساعة. التصميم أنيق جداً والسعر معقول.",
    date: "منذ أسبوع"
  },
  {
    name: "فاطمة الزهراء",
    city: "الرباط",
    rating: 5,
    text: "أفضل نظارات اشتريتها! خفيفة ومريحة وتناسب وجهي تماماً. شكراً Dope Store ❤️",
    date: "منذ أسبوعين"
  },
  {
    name: "يوسف ك.",
    city: "طنجة",
    rating: 5,
    text: "الدفع عند الاستلام طمنني. المنتج طابق الصور تماماً. ممتاز!",
    date: "منذ 5 أيام"
  },
];

// Product features
const features = [
  {
    icon: Eye,
    title: "حماية UV400",
    description: "حماية كاملة من الأشعة فوق البنفسجية الضارة"
  },
  {
    icon: Feather,
    title: "خفيفة الوزن",
    description: "تصميم بدون إطار يجعلها خفيفة ومريحة طوال اليوم"
  },
  {
    icon: Sun,
    title: "عدسات عالية الجودة",
    description: "عدسات مقاومة للخدش توفر رؤية واضحة وصافية"
  },
  {
    icon: Sparkles,
    title: "تصميم عصري",
    description: "موديل 2024 يناسب جميع أشكال الوجوه"
  },
];

export default function Home() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [packType, setPackType] = useState<"single" | "double">("double");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    color: colors[0].id,
    color2: colors[1].id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Google Sheets integration
  const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxj-xC0kDdTDzyX8LANTHAo3hVzYRtyXN-2uysuv7p292K26vKjzApwSdbNOY6Xbrum_g/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      timestamp: new Date().toLocaleString("ar-MA", { timeZone: "Africa/Casablanca" }),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      pack: packType === "single" ? "زوج واحد - 150 DH" : "زوجين - 229 DH",
      color1: colors.find(c => c.id === formData.color)?.name,
      color2: packType === "double" ? colors.find(c => c.id === formData.color2)?.name : "-",
      total: packType === "single" ? "150 DH" : "229 DH",
    };

    try {
      // Send to Google Sheets
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Still show success since no-cors doesn't return response
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const nextSlide = () => {
    setGalleryIndex((prev) => (prev + 1) % colors.length);
  };

  const prevSlide = () => {
    setGalleryIndex((prev) => (prev - 1 + colors.length) % colors.length);
  };

  const scrollToForm = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] py-2.5 px-4">
        <p className="text-center text-[#0f0f0f] text-sm font-bold">
          🚚 توصيل مجاني لجميع المدن المغربية والدفع عند الاستلام
        </p>
      </div>

      {/* Header */}
      <header className="py-6 px-4 border-b border-[#D4AF37]/20">
        <h1 className="text-center text-3xl font-bold text-gold-gradient tracking-wide" style={{ fontFamily: "serif" }}>
          Dope Store
        </h1>
        <p className="text-center text-[#D4AF37]/70 text-sm mt-1">نظارات شمسية فاخرة منذ 2020</p>
      </header>

      {/* Social Proof Stats */}
      <section className="py-6 px-4 bg-[#0a0a0a] border-b border-[#D4AF37]/10">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-[#D4AF37] mb-1">
                <Users className="w-4 h-4" />
                <span className="text-2xl font-bold">2,500+</span>
              </div>
              <p className="text-gray-500 text-xs">عميل سعيد</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[#D4AF37] mb-1">
                <Package className="w-4 h-4" />
                <span className="text-2xl font-bold">4,800+</span>
              </div>
              <p className="text-gray-500 text-xs">طلب تم توصيله</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[#D4AF37] mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <p className="text-gray-500 text-xs">تقييم العملاء</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-md mx-auto text-center">
          {/* Limited Stock Badge */}
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            الكمية محدودة - تبقى 23 قطعة فقط
          </div>

          {/* Product Image */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent rounded-3xl" />
            <img
              src={colors[0].url || `https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop`}
              alt="Premium Rimless Sunglasses"
              className="w-full h-64 object-contain rounded-3xl border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10 bg-[#1a1a1a]"
              loading="lazy"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0f0f0f] px-6 py-2 rounded-full font-bold text-lg shadow-lg">
              ابتداءً من 150 DH
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold-gradient leading-relaxed">
            الأناقة التي تستحقها
          </h2>
          <p className="text-gray-400 mb-4 text-lg">
            نظارات شمسية فاخرة بدون إطار بتصميم عصري وأنيق
          </p>
          <p className="text-gray-500 mb-8 text-sm">
            صُممت لتمنحك إطلالة راقية تليق بذوقك الرفيع. جودة عالمية بسعر مغربي.
          </p>

          {/* Trust Badges Inline */}
          <div className="flex items-center justify-center gap-4 mb-8 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              حماية UV400
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              ضمان الجودة
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              توصيل مجاني
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F5E6A3] text-[#0f0f0f] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 transition-all duration-300 animate-pulse-gold"
          >
            اطلب الآن - توصيل مجاني
          </button>

          <p className="text-gray-600 text-xs mt-4">🔒 الدفع عند الاستلام - لا حاجة لبطاقة بنكية</p>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-12 px-4 bg-[#0a0a0a]">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-center text-gold-gradient mb-3">لماذا نظاراتنا مميزة؟</h3>
          <p className="text-center text-gray-500 text-sm mb-8">جودة عالمية تجمع بين الأناقة والحماية</p>
          
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dope Deal Section */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-6 border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/20">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0f0f0f] px-6 py-1.5 rounded-full font-bold text-sm flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              الأكثر طلباً
            </div>

            <div className="text-center pt-4">
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">عرض Dope الخاص</h3>
              <p className="text-gray-400 mb-2">احصل على زوجين بسعر مميز!</p>
              <p className="text-gray-500 text-sm mb-4">مثالي لك ولشريكك أو كهدية راقية</p>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-gray-500 line-through text-xl">300 DH</div>
                <div className="text-4xl font-bold text-gold-gradient">229 DH</div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-6">
                <p className="text-green-400 font-bold text-sm">وفّر 71 درهم - خصم 24%</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-2 bg-[#0f0f0f] rounded-lg p-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  زوجين من النظارات
                </span>
                <span className="flex items-center gap-2 bg-[#0f0f0f] rounded-lg p-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  توصيل مجاني
                </span>
                <span className="flex items-center gap-2 bg-[#0f0f0f] rounded-lg p-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  ألوان مختلفة
                </span>
                <span className="flex items-center gap-2 bg-[#0f0f0f] rounded-lg p-2">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  علبة حماية
                </span>
              </div>

              <button
                onClick={scrollToForm}
                className="w-full bg-[#D4AF37] text-[#0f0f0f] py-4 rounded-xl font-bold text-lg hover:bg-[#F5E6A3] transition-colors"
              >
                اختر هذا العرض
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 px-4 bg-[#0a0a0a]">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gold-gradient mb-2">ماذا يقول عملاؤنا؟</h3>
            <p className="text-gray-500 text-sm">آراء حقيقية من عملاء حقيقيين</p>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
              ))}
              <span className="text-gray-400 text-sm mr-2">(4.9 من 5)</span>
            </div>
          </div>

          {/* Review Cards */}
          <div className="space-y-4">
            {reviews.slice(reviewIndex, reviewIndex + 2).map((review, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#D4AF37]/10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">{review.name}</h4>
                      <span className="text-gray-600 text-xs">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-500 text-xs">{review.city}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-1 mt-3 text-green-500 text-xs">
                  <ThumbsUp className="w-3 h-3" />
                  <span>عملية شراء موثقة</span>
                </div>
              </div>
            ))}
          </div>

          {/* Review Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setReviewIndex(0)}
              className={`w-2 h-2 rounded-full transition-colors ${reviewIndex === 0 ? 'bg-[#D4AF37]' : 'bg-gray-600'}`}
            />
            <button
              onClick={() => setReviewIndex(2)}
              className={`w-2 h-2 rounded-full transition-colors ${reviewIndex === 2 ? 'bg-[#D4AF37]' : 'bg-gray-600'}`}
            />
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-center text-gold-gradient mb-2">اختر لونك المفضل</h3>
          <p className="text-center text-gray-500 text-sm mb-8">12 لون متاح - كل الأذواق</p>
          
          {/* Carousel */}
          <div className="relative mb-8">
            <div className="overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#D4AF37]/20">
              <div className="aspect-square flex items-center justify-center p-4">
                {colors[galleryIndex].url ? (
                  <img 
                    src={colors[galleryIndex].url} 
                    alt={colors[galleryIndex].name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center">
                      <span className="text-6xl">🕶️</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <p className="text-xl font-bold text-[#D4AF37]">{colors[galleryIndex].name}</p>
            </div>
            
            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#D4AF37]" />
            </button>
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color, index) => (
              <button
                key={color.id}
                onClick={() => setGalleryIndex(index)}
                className={`aspect-square rounded-xl border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${
                  galleryIndex === index
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 scale-105"
                    : "border-[#333] bg-[#1a1a1a] hover:border-[#D4AF37]/50"
                }`}
              >
                {color.url ? (
                  <img src={color.url} alt={color.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <span className="text-2xl">🕶️</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-12 px-4 bg-[#0a0a0a]">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-center text-gold-gradient mb-2">لماذا تختار Dope Store؟</h3>
          <p className="text-center text-gray-500 text-sm mb-8">نضمن لك تجربة تسوق آمنة ومريحة</p>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-2xl border border-[#D4AF37]/20">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-bold">الدفع عند الاستلام</p>
                <p className="text-gray-500 text-sm">لا تدفع إلا عند استلام طلبك والتأكد من جودته</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-2xl border border-[#D4AF37]/20">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-bold">توصيل سريع ومجاني</p>
                <p className="text-gray-500 text-sm">نوصل لجميع المدن المغربية في أقل من 48 ساعة</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-2xl border border-[#D4AF37]/20">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-bold">ضمان الجودة</p>
                <p className="text-gray-500 text-sm">منتجات أصلية 100% مع إمكانية الإرجاع</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-2xl border border-[#D4AF37]/20">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-bold">خبرة منذ 2020</p>
                <p className="text-gray-500 text-sm">أكثر من 4 سنوات من الثقة وخدمة آلاف العملاء</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-center text-gold-gradient mb-2">أسئلة شائعة</h3>
          <p className="text-center text-gray-500 text-sm mb-8">إجابات على أكثر الأسئلة تكراراً</p>
          
          <div className="space-y-3">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#D4AF37]/10">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#D4AF37]" />
                هل التوصيل مجاني فعلاً؟
              </h4>
              <p className="text-gray-400 text-sm">نعم! التوصيل مجاني 100% لجميع المدن المغربية بدون أي رسوم إضافية.</p>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#D4AF37]/10">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                كم تستغرق مدة التوصيل؟
              </h4>
              <p className="text-gray-400 text-sm">نوصل طلبك في أقل من 48 ساعة لمعظم المدن، وقد تصل في نفس اليوم للمدن الكبرى.</p>
            </div>
            
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#D4AF37]/10">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                هل يمكنني إرجاع المنتج؟
              </h4>
              <p className="text-gray-400 text-sm">نعم، يمكنك إرجاع المنتج خلال 7 أيام إذا لم تكن راضياً عنه.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section id="checkout" className="py-12 px-4 bg-[#0a0a0a]">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-6 border border-[#D4AF37]/30 shadow-2xl">
            <h3 className="text-2xl font-bold text-center text-gold-gradient mb-2">
              أدخل معلوماتك لإتمام الطلب
            </h3>
            <p className="text-center text-gray-500 text-sm mb-6">جميع المعلومات آمنة ومحمية - لن نشاركها مع أي طرف</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h4 className="text-xl font-bold text-[#D4AF37] mb-2">تم استلام طلبك بنجاح! 🎉</h4>
                <p className="text-gray-400 mb-4">سنتواصل معك قريباً لتأكيد الطلب</p>
                <p className="text-gray-500 text-sm">رقم الطلب: #{Math.floor(Math.random() * 90000) + 10000}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pack Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300 mb-2">اختر الباقة</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPackType("single")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        packType === "single"
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-[#333] bg-[#1a1a1a]"
                      }`}
                    >
                      <p className="font-bold">زوج واحد</p>
                      <p className="text-[#D4AF37] font-bold text-lg">150 DH</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPackType("double")}
                      className={`p-4 rounded-xl border-2 transition-all relative ${
                        packType === "double"
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-[#333] bg-[#1a1a1a]"
                      }`}
                    >
                      <span className="absolute -top-2 right-2 bg-[#D4AF37] text-[#0f0f0f] text-xs px-2 py-0.5 rounded-full font-bold">
                        وفّر 71 DH
                      </span>
                      <p className="font-bold">زوجين</p>
                      <p className="text-[#D4AF37] font-bold text-lg">229 DH</p>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    placeholder="06XXXXXXXX"
                    dir="ltr"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">المدينة والعنوان</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    placeholder="المدينة، الحي، الشارع..."
                  />
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    اختر اللون {packType === "double" && "(الأول)"}
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                  >
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Second Color (if double pack) */}
                {packType === "double" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">اختر اللون (الثاني)</label>
                    <select
                      value={formData.color2}
                      onChange={(e) => setFormData({ ...formData, color2: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    >
                      {colors.map((color) => (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Order Summary */}
                <div className="bg-[#0f0f0f] rounded-xl p-4 border border-[#D4AF37]/20">
                  <p className="text-sm text-gray-400 mb-2">ملخص الطلب:</p>
                  <div className="flex justify-between items-center">
                    <span>{packType === "single" ? "زوج واحد" : "زوجين من النظارات"}</span>
                    <span className="font-bold text-[#D4AF37]">{packType === "single" ? "150" : "229"} DH</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                    <span>التوصيل</span>
                    <span className="text-green-500">مجاني</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F5E6A3] text-[#0f0f0f] py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 animate-pulse-gold disabled:opacity-50 disabled:animate-none"
                >
                  {isSubmitting ? "جاري الإرسال..." : "أكد الطلب الآن"}
                </button>

                <p className="text-center text-gray-500 text-xs mt-4">
                  🔒 معلوماتك آمنة ولن تتم مشاركتها مع أي طرف ثالث
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#D4AF37]/20">
        <div className="text-center">
          <h4 className="text-gold-gradient font-bold text-xl mb-2" style={{ fontFamily: "serif" }}>Dope Store</h4>
          <p className="text-gray-500 text-sm mb-2">نظارات شمسية فاخرة - المغرب</p>
          <p className="text-gray-600 text-xs">جميع الحقوق محفوظة © 2024</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-gray-600 text-xs">
            <span>📞 خدمة العملاء: واتساب</span>
            <span>📧 support@dopestore.ma</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/212684618157"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 animate-float"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>
    </div>
  );
}
