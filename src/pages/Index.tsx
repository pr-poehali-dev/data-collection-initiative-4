import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [heroForm, setHeroForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const sectionIds = ["hero", "why", "features", "how", "gallery", "pricing", "reviews", "faq", "contact"];
    const observers: Record<string, IntersectionObserver> = {};

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.1 }
      );
      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((o) => o.disconnect());
    };
  }, []);

  const features = [
    { icon: "Thermometer", title: "Тепло круглый год", desc: "Температура на балконе повышается на 15–20°C. Балкон превращается в полноценную комнату." },
    { icon: "Volume2", title: "Тишина в квартире", desc: "Снижение уличного шума на 32–38 дБ. Двойной стеклопакет защищает от шума дороги и соседей." },
    { icon: "Zap", title: "Экономия на отоплении", desc: "Снижение потерь тепла на 70%. Счета за отопление уменьшаются на 25–40% уже в первый сезон." },
    { icon: "Shield", title: "Гарантия 10 лет", desc: "Официальная гарантия на конструкцию и монтажные работы. Договор с прописанными обязательствами." },
    { icon: "Clock", title: "Монтаж за 1 день", desc: "Устанавливаем без пыли, грязи и остановки жизни в квартире. Убираем за собой." },
    { icon: "Home", title: "Фасад без изменений", desc: "Меняем остекление без демонтажа плиты. Внешний вид дома остаётся прежним — без согласований с ТСЖ." },
  ];

  const steps = [
    { num: "01", title: "Бесплатный замер", desc: "Замерщик приезжает в удобное время. Замер бесплатно, без обязательств." },
    { num: "02", title: "Расчёт и договор", desc: "Готовим точный расчёт за 30 минут. Фиксируем стоимость в договоре — без скрытых доплат." },
    { num: "03", title: "Производство", desc: "Изготавливаем окна на заводе под ваши размеры за 3–5 рабочих дней." },
    { num: "04", title: "Монтаж и сдача", desc: "Устанавливаем за 1 день, регулируем фурнитуру, убираем за собой и сдаём работу." },
  ];

  const packages = [
    {
      name: "Стандарт",
      price: "от 18 900 ₽",
      unit: "за балкон",
      badge: null,
      features: [
        "Профиль VEKA 58 мм",
        "Однокамерный стеклопакет",
        "Фурнитура Maco",
        "Монтаж включён",
        "Гарантия 5 лет",
      ],
      cta: "Заказать замер",
    },
    {
      name: "Комфорт",
      price: "от 26 500 ₽",
      unit: "за балкон",
      badge: "Хит продаж",
      features: [
        "Профиль REHAU 60 мм",
        "Двухкамерный стеклопакет",
        "Фурнитура Siegenia",
        "Монтаж включён",
        "Откосы в подарок",
        "Гарантия 10 лет",
      ],
      cta: "Заказать замер",
    },
    {
      name: "Премиум",
      price: "от 38 000 ₽",
      unit: "за балкон",
      badge: null,
      features: [
        "Профиль REHAU 70 мм",
        "Энергосберегающий стеклопакет i-стекло",
        "Фурнитура Roto",
        "Монтаж и отделка включены",
        "Утепление парапета",
        "Гарантия 10 лет",
      ],
      cta: "Заказать замер",
    },
  ];

  const reviews = [
    {
      name: "Наталья Иванова",
      addr: "Пр. Просвещения",
      text: "Заменили старое холодное остекление на тёплое REHAU. Балкон стал использоваться как кабинет — работаю там весь год. Очень довольна!",
      stars: 5,
      date: "Февраль 2025",
    },
    {
      name: "Андрей Фёдоров",
      addr: "Ул. Варшавская",
      text: "Мастера приехали вовремя, сделали всё за 6 часов. Никакого мусора, всё убрали. Теперь тихо и тепло. Цена честная, без накруток.",
      stars: 5,
      date: "Март 2025",
    },
    {
      name: "Светлана Кириллова",
      addr: "Комендантский пр.",
      text: "Сначала боялась, что придётся согласовывать с ТСЖ, но менеджер объяснил — фасад не трогаем. Сделали быстро и аккуратно. Рекомендую!",
      stars: 5,
      date: "Январь 2025",
    },
    {
      name: "Михаил Орлов",
      addr: "Ленинский проспект",
      text: "Брал пакет «Комфорт». Двухкамерный стеклопакет — разница ощутимая. На балконе теперь +18 даже в мороз -15. Хорошая работа!",
      stars: 5,
      date: "Декабрь 2024",
    },
  ];

  const faqs = [
    {
      q: "Нужно ли согласование с ТСЖ или администрацией?",
      a: "Нет. Мы заменяем остекление без изменения фасада здания. Конструкция плиты и внешний вид дома остаются прежними — согласований не требуется.",
    },
    {
      q: "Сколько времени занимает установка?",
      a: "Один балкон стандартного размера устанавливается за 1 рабочий день. Двухсторонний лоджия — 1–2 дня. После монтажа убираем весь мусор.",
    },
    {
      q: "Можно ли установить зимой?",
      a: "Да. Мы работаем круглый год. Монтаж проводится при температуре до -15°C с применением специальных морозостойких герметиков.",
    },
    {
      q: "Какой профиль лучше выбрать?",
      a: "Для Санкт-Петербурга рекомендуем REHAU 60 мм с двухкамерным стеклопакетом — оптимальное соотношение цены и теплоизоляции. Наш замерщик подберёт вариант на месте.",
    },
    {
      q: "Входит ли стоимость монтажа в цену?",
      a: "Да. Цена включает материалы, доставку, монтаж и вывоз мусора. Никаких скрытых доплат — итоговая сумма фиксируется в договоре.",
    },
    {
      q: "Как получить бесплатный замер?",
      a: "Оставьте заявку на сайте или позвоните нам. Замерщик приедет в удобное для вас время — замер бесплатный и ни к чему не обязывает.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSubmitted(true);
  };

  const beforeAfterTabs = [
    { label: "Балкон стандарт", before: "Старое холодное остекление", after: "Теплое остекление REHAU" },
    { label: "Лоджия широкая", before: "Разбитые советские рамы", after: "Панорамное теплое остекление" },
    { label: "Угловой балкон", before: "Щели и сквозняки", after: "Герметичная тёплая конструкция" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/90 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
            ТеплоБалкон СПб
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">Преимущества</a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">Цены</a>
            <a href="#reviews" className="text-muted-foreground hover:text-white transition-colors">Отзывы</a>
            <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78121234567" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
              <Icon name="Phone" size={16} />
              +7 (812) 123-45-67
            </a>
            <a href="#contact" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all">
              Замер бесплатно
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-28 pb-20 px-4 sm:px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
                <Icon name="MapPin" size={14} className="text-accent" />
                <span className="text-xs font-medium text-accent tracking-wider">Санкт-Петербург и область</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Замена холодного
                </span>
                <br />
                <span className="text-accent">остекления</span>
                <br />
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  на тёплое
                </span>
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                Превратим холодный балкон в тёплую комнату за 1 день. Профили REHAU, монтаж без пыли, фасад без изменений. Гарантия 10 лет.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-black text-accent mb-1">5 000+</div>
                  <p className="text-xs text-white/50">Объектов в СПб</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-white mb-1">10 лет</div>
                  <p className="text-xs text-white/50">Гарантия</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-accent mb-1">1 день</div>
                  <p className="text-xs text-white/50">Монтаж</p>
                </div>
              </div>

              {/* Hero form */}
              {heroSubmitted ? (
                <div className="p-6 bg-accent/10 border border-accent/30 rounded-2xl text-center">
                  <Icon name="CheckCircle" size={32} className="text-accent mx-auto mb-3" />
                  <p className="font-semibold text-white">Заявка принята!</p>
                  <p className="text-sm text-white/60 mt-1">Перезвоним в течение 15 минут</p>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={heroForm.name}
                    onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/60 text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={heroForm.phone}
                    onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent/60 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-black font-bold rounded-xl hover:shadow-xl hover:shadow-accent/40 transition-all text-sm whitespace-nowrap"
                  >
                    Замер бесплатно
                  </button>
                </form>
              )}
              <p className="text-xs text-white/40 mt-3">Замер бесплатно и ни к чему не обязывает</p>
            </div>

            {/* Visual block */}
            <div className={`relative transition-all duration-1000 delay-300 ${visibleSections["hero"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="relative rounded-3xl overflow-hidden border border-accent/20 bg-card/50 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-medium text-white/60">Сравнение</span>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs">До</span>
                      <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs">После</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: "Snowflake", label: "Холодный балкон", val: "-5°C зимой", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
                      { icon: "Sun", label: "Тёплый балкон", val: "+18°C зимой", color: "text-accent", bg: "bg-accent/10 border-accent/30" },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-2xl border ${item.bg}`}>
                        <Icon name={item.icon} size={28} className={`${item.color} mb-2`} />
                        <div className={`text-xl font-black ${item.color}`}>{item.val}</div>
                        <div className="text-xs text-white/50 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Теплоизоляция", before: 10, after: 90 },
                      { label: "Шумозащита", before: 20, after: 75 },
                      { label: "Комфорт жизни", before: 15, after: 95 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                          <span>{item.label}</span>
                          <span className="text-accent font-semibold">{item.after}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-1000"
                            style={{ width: visibleSections["hero"] ? `${item.after}%` : `${item.before}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 px-4 py-3 bg-card border border-accent/30 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Icon name="Star" size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">4.9 / 5.0</div>
                  <div className="text-xs text-white/50">Яндекс.Карты · 200+ отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Replace Section */}
      <section id="why" className="py-20 px-4 sm:px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["why"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Зачем менять?</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                Что не так с холодным остеклением
              </span>
            </h2>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-1000 delay-200 ${visibleSections["why"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Snowflake", title: "Промерзание", desc: "Зимой балкон недоступен. Трубы, если есть — замерзают. Конденсат и лёд на рамах." },
              { icon: "Wind", title: "Сквозняки", desc: "Старые рамы не держат тепло. Холодный воздух проникает в квартиру, счета растут." },
              { icon: "VolumeX", title: "Нет шумоизоляции", desc: "Одинарное стекло не спасает от шума дороги, соседей и стройки." },
              { icon: "AlertTriangle", title: "Ветшание", desc: "Деревянные рамы гниют, краска шелушится. Ремонт каждые 2–3 года." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-all">
                <Icon name={item.icon} size={28} className="text-red-400 mb-3" />
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Преимущества</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                Почему выбирают нас
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item, i) => (
              <div
                key={i}
                className={`group p-7 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 bg-accent/10 group-hover:bg-accent/20 rounded-xl flex items-center justify-center mb-5 transition-all">
                  <Icon name={item.icon} size={22} className="text-accent" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 sm:px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                4 шага до тёплого балкона
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative p-7 rounded-2xl border border-accent/10 bg-card/50 transition-all duration-700 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl font-black text-accent/20 mb-4 font-display">{step.num}</div>
                <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center z-10">
                    <Icon name="ChevronRight" size={12} className="text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Before-After */}
      <section id="gallery" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Наши работы</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                До и после
              </span>
            </h2>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${visibleSections["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Tabs */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {beforeAfterTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === i ? "bg-accent text-black" : "border border-accent/30 text-white/60 hover:text-white"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-red-500/30 bg-red-500/5 p-8 min-h-48 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-red-500/80 text-white text-xs font-bold">ДО</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="X" size={16} className="text-red-400" />
                    <span className="text-red-300 text-sm font-medium">{beforeAfterTabs[activeTab].before}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Холод", "Сквозняки", "Шум", "Конденсат"].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-accent/30 bg-accent/5 p-8 min-h-48 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-black text-xs font-bold">ПОСЛЕ</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    <span className="text-accent text-sm font-medium">{beforeAfterTabs[activeTab].after}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Тепло", "Тишина", "Комфорт", "Экономия"].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-accent/20 text-accent text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Цены</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                Прозрачные тарифы
              </span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">Цена фиксируется в договоре. Никаких доплат после замера.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all duration-700 ${
                  pkg.badge
                    ? "border-accent/50 bg-gradient-to-b from-accent/10 to-card/80 shadow-2xl shadow-accent/20 scale-105"
                    : "border-accent/10 bg-card/50 hover:border-accent/30"
                } ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-accent to-accent/80 text-black text-xs font-bold rounded-full whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                <div className="text-3xl font-black text-accent mb-1">{pkg.price}</div>
                <div className="text-sm text-white/40 mb-6">{pkg.unit} · с монтажом</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-white/75">
                      <Icon name="Check" size={16} className="text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl font-semibold text-center text-sm transition-all ${
                    pkg.badge
                      ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/40"
                      : "border border-accent/30 text-accent hover:bg-accent/10"
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>

          <div className={`mt-10 p-6 rounded-2xl border border-accent/20 bg-accent/5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-400 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="Calculator" size={22} className="text-accent" />
              </div>
              <div>
                <div className="font-bold text-white">Нужен точный расчёт?</div>
                <div className="text-sm text-white/60">Замерщик приедет бесплатно и посчитает всё по размерам вашего балкона</div>
              </div>
            </div>
            <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-accent/40 transition-all text-sm whitespace-nowrap">
              Вызвать замерщика
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                Что говорят клиенты
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={18} className="text-accent fill-accent" />
                ))}
              </div>
              <span className="text-white/60 text-sm">4.9 из 5 · Яндекс.Карты</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border border-accent/10 bg-card/50 hover:border-accent/30 hover:bg-card/80 transition-all duration-700 ${visibleSections["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.stars)].map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{review.name}</div>
                    <div className="text-xs text-white/40">{review.addr} · {review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                Частые вопросы
              </span>
            </h2>
          </div>
          <div className={`space-y-3 transition-all duration-1000 delay-200 ${visibleSections["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="border border-accent/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-card/50 transition-all"
                >
                  <span className="font-semibold text-white text-sm leading-relaxed">{faq.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`text-accent shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-white/65 leading-relaxed border-t border-accent/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-1000 ${visibleSections["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Связаться</span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mt-4 mb-6">
                <span className="bg-gradient-to-r from-white to-accent/40 bg-clip-text text-transparent">
                  Закажите бесплатный замер
                </span>
              </h2>
              <p className="text-white/65 mb-8 leading-relaxed">
                Замерщик приедет в удобное для вас время. Рассчитает стоимость прямо на месте. Никаких обязательств.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (812) 123-45-67" },
                  { icon: "Clock", label: "Время работы", val: "Пн–Вс: 9:00 – 21:00" },
                  { icon: "MapPin", label: "Регион", val: "Санкт-Петербург и Ленобласть" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={18} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">{item.label}</div>
                      <div className="text-sm font-semibold text-white">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[
                  { icon: "MessageCircle", label: "WhatsApp" },
                  { icon: "Send", label: "Telegram" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 px-4 py-2.5 border border-accent/30 rounded-xl text-sm text-white/70 hover:text-white hover:border-accent/60 hover:bg-accent/10 transition-all"
                  >
                    <Icon name={item.icon} size={16} className="text-accent" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${visibleSections["contact"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {submitted ? (
                <div className="p-10 bg-accent/10 border border-accent/30 rounded-3xl text-center">
                  <Icon name="CheckCircle" size={48} className="text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
                  <p className="text-white/60">Перезвоним в течение 15 минут и договоримся о времени замера.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 bg-card/60 border border-accent/10 rounded-3xl space-y-4">
                  <h3 className="text-xl font-bold text-white mb-6">Оставить заявку на замер</h3>
                  <div>
                    <label className="block text-xs text-white/50 mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      placeholder="Иван"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-2">Комментарий (необязательно)</label>
                    <textarea
                      placeholder="Тип балкона, этаж, пожелания..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-accent to-accent/80 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-accent/40 transition-all text-sm"
                  >
                    Заказать бесплатный замер
                  </button>
                  <p className="text-xs text-white/30 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display font-black text-lg bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
            ТеплоБалкон СПб
          </div>
          <div className="text-sm text-white/30 text-center">
            © 2025 ТеплоБалкон СПб · Замена холодного остекления в Санкт-Петербурге
          </div>
          <a href="tel:+78121234567" className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
            +7 (812) 123-45-67
          </a>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <a
          href="#contact"
          className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent to-accent/80 text-black font-bold rounded-full shadow-2xl shadow-accent/50 text-sm"
        >
          <Icon name="Phone" size={16} />
          Бесплатный замер
        </a>
      </div>
    </div>
  );
};

export default Index;