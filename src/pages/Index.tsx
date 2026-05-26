import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const ACCENT = "text-sky-600";
const ACCENT_BG = "bg-sky-600";
const ACCENT_BORDER = "border-sky-200";
const ACCENT_LIGHT = "bg-sky-50";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [heroForm, setHeroForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    return () => Object.values(observers).forEach((o) => o.disconnect());
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
      features: ["Профиль VEKA 58 мм", "Однокамерный стеклопакет", "Фурнитура Maco", "Монтаж включён", "Гарантия 5 лет"],
      cta: "Заказать замер",
    },
    {
      name: "Комфорт",
      price: "от 26 500 ₽",
      unit: "за балкон",
      badge: "Хит продаж",
      features: ["Профиль REHAU 60 мм", "Двухкамерный стеклопакет", "Фурнитура Siegenia", "Монтаж включён", "Откосы в подарок", "Гарантия 10 лет"],
      cta: "Заказать замер",
    },
    {
      name: "Премиум",
      price: "от 38 000 ₽",
      unit: "за балкон",
      badge: null,
      features: ["Профиль REHAU 70 мм", "Энергосберегающий стеклопакет i-стекло", "Фурнитура Roto", "Монтаж и отделка включены", "Утепление парапета", "Гарантия 10 лет"],
      cta: "Заказать замер",
    },
  ];

  const reviews = [
    { name: "Наталья Иванова", addr: "Пр. Просвещения", text: "Заменили старое холодное остекление на тёплое REHAU. Балкон стал использоваться как кабинет — работаю там весь год. Очень довольна!", stars: 5, date: "Февраль 2025" },
    { name: "Андрей Фёдоров", addr: "Ул. Варшавская", text: "Мастера приехали вовремя, сделали всё за 6 часов. Никакого мусора, всё убрали. Теперь тихо и тепло. Цена честная, без накруток.", stars: 5, date: "Март 2025" },
    { name: "Светлана Кириллова", addr: "Комендантский пр.", text: "Сначала боялась, что придётся согласовывать с ТСЖ, но менеджер объяснил — фасад не трогаем. Сделали быстро и аккуратно. Рекомендую!", stars: 5, date: "Январь 2025" },
    { name: "Михаил Орлов", addr: "Ленинский проспект", text: "Брал пакет «Комфорт». Двухкамерный стеклопакет — разница ощутимая. На балконе теперь +18 даже в мороз -15. Хорошая работа!", stars: 5, date: "Декабрь 2024" },
  ];

  const faqs = [
    { q: "Нужно ли согласование с ТСЖ или администрацией?", a: "Нет. Мы заменяем остекление без изменения фасада здания. Конструкция плиты и внешний вид дома остаются прежними — согласований не требуется." },
    { q: "Сколько времени занимает установка?", a: "Один балкон стандартного размера устанавливается за 1 рабочий день. Двухсторонний лоджия — 1–2 дня. После монтажа убираем весь мусор." },
    { q: "Можно ли установить зимой?", a: "Да. Мы работаем круглый год. Монтаж проводится при температуре до -15°C с применением специальных морозостойких герметиков." },
    { q: "Какой профиль лучше выбрать?", a: "Для Санкт-Петербурга рекомендуем REHAU 60 мм с двухкамерным стеклопакетом — оптимальное соотношение цены и теплоизоляции. Наш замерщик подберёт вариант на месте." },
    { q: "Входит ли стоимость монтажа в цену?", a: "Да. Цена включает материалы, доставку, монтаж и вывоз мусора. Никаких скрытых доплат — итоговая сумма фиксируется в договоре." },
    { q: "Как получить бесплатный замер?", a: "Оставьте заявку на сайте или позвоните нам. Замерщик приедет в удобное для вас время — замер бесплатный и ни к чему не обязывает." },
  ];

  const beforeAfterTabs = [
    { label: "Балкон стандарт", before: "Старое холодное остекление", after: "Теплое остекление REHAU" },
    { label: "Лоджия широкая", before: "Разбитые советские рамы", after: "Панорамное теплое остекление" },
    { label: "Угловой балкон", before: "Щели и сквозняки", after: "Герметичная тёплая конструкция" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="font-display font-black text-xl tracking-tight text-sky-600">
            ТеплоБалкон СПб
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="text-slate-500 hover:text-sky-600 transition-colors">Преимущества</a>
            <a href="#pricing" className="text-slate-500 hover:text-sky-600 transition-colors">Цены</a>
            <a href="#reviews" className="text-slate-500 hover:text-sky-600 transition-colors">Отзывы</a>
            <a href="#contact" className="text-slate-500 hover:text-sky-600 transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78121234567" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
              <Icon name="Phone" size={15} />
              +7 (812) 123-45-67
            </a>
            <a href="#contact" className={`px-4 py-2 text-sm font-semibold ${ACCENT_BG} text-white rounded-full hover:bg-sky-700 transition-all shadow-sm`}>
              Замер бесплатно
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-16 px-4 sm:px-6 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/2f162422-2b86-4f16-aabd-6b9e67041a24.jpg"
            alt="Тёплый балкон"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200">
                <Icon name="MapPin" size={13} className="text-sky-600" />
                <span className="text-xs font-semibold text-sky-700 tracking-wide">Санкт-Петербург и область</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 tracking-tight text-slate-900">
                Замена холодного<br />
                <span className="text-sky-600">остекления</span><br />
                на тёплое
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Превратим холодный балкон в тёплую комнату за 1 день. Профили REHAU, монтаж без пыли, фасад без изменений. Гарантия 10 лет.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10 pt-6 border-t border-slate-100">
                <div>
                  <div className="text-2xl font-black text-sky-600 mb-1">5 000+</div>
                  <p className="text-xs text-slate-400 font-medium">Объектов в СПб</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-800 mb-1">10 лет</div>
                  <p className="text-xs text-slate-400 font-medium">Гарантия</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-sky-600 mb-1">1 день</div>
                  <p className="text-xs text-slate-400 font-medium">Монтаж</p>
                </div>
              </div>

              {heroSubmitted ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
                  <Icon name="CheckCircle" size={32} className="text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-slate-800">Заявка принята!</p>
                  <p className="text-sm text-slate-500 mt-1">Перезвоним в течение 15 минут</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setHeroSubmitted(true); }} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={heroForm.name}
                    onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={heroForm.phone}
                    onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm"
                    required
                  />
                  <button type="submit" className={`px-6 py-3 ${ACCENT_BG} text-white font-bold rounded-xl hover:bg-sky-700 transition-all shadow-md text-sm whitespace-nowrap`}>
                    Замер бесплатно
                  </button>
                </form>
              )}
              <p className="text-xs text-slate-400 mt-3">Замер бесплатно и ни к чему не обязывает</p>
            </div>

            {/* Visual card */}
            <div className={`relative transition-all duration-1000 delay-300 ${visibleSections["hero"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl p-7">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm font-semibold text-slate-600">Сравнение</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-500 text-xs font-semibold">До</span>
                    <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-600 text-xs font-semibold">После</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: "Snowflake", label: "Холодный балкон", val: "-5°C зимой", color: "text-blue-400", bg: "bg-blue-50 border-blue-200" },
                    { icon: "Sun", label: "Тёплый балкон", val: "+18°C зимой", color: "text-sky-600", bg: "bg-sky-50 border-sky-200" },
                  ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${item.bg}`}>
                      <Icon name={item.icon} size={26} className={`${item.color} mb-2`} />
                      <div className={`text-xl font-black ${item.color}`}>{item.val}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Теплоизоляция", after: 90 },
                    { label: "Шумозащита", after: 75 },
                    { label: "Комфорт жизни", after: 95 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>{item.label}</span>
                        <span className="text-sky-600 font-bold">{item.after}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-1000"
                          style={{ width: visibleSections["hero"] ? `${item.after}%` : "10%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Icon name="Star" size={18} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">4.9 / 5.0</div>
                  <div className="text-xs text-slate-400">Яндекс.Карты · 200+ отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Replace */}
      <section id="why" className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["why"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Зачем менять?</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 mb-3 text-slate-900">
              Что не так с холодным остеклением
            </h2>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-1000 delay-200 ${visibleSections["why"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Snowflake", title: "Промерзание", desc: "Зимой балкон недоступен. Конденсат и лёд на рамах." },
              { icon: "Wind", title: "Сквозняки", desc: "Старые рамы не держат тепло. Холодный воздух проникает в квартиру, счета растут." },
              { icon: "VolumeX", title: "Нет шумоизоляции", desc: "Одинарное стекло не спасает от шума дороги, соседей и стройки." },
              { icon: "AlertTriangle", title: "Ветшание", desc: "Деревянные рамы гниют, краска шелушится. Ремонт каждые 2–3 года." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-red-100 bg-white hover:border-red-200 transition-all shadow-sm">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-red-400" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Преимущества</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 text-slate-900">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item, i) => (
              <div
                key={i}
                className={`group p-7 border border-slate-100 hover:border-sky-200 rounded-2xl bg-white hover:bg-sky-50/50 transition-all duration-500 shadow-sm hover:shadow-md ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="w-12 h-12 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center mb-5 transition-all">
                  <Icon name={item.icon} size={22} className="text-sky-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Процесс</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 text-slate-900">
              4 шага до тёплого балкона
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className={`grid sm:grid-cols-2 gap-5 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {steps.map((step, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="text-4xl font-black text-sky-100 mb-3 font-display">{step.num}</div>
                  <h3 className="font-bold text-slate-800 text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className={`relative rounded-3xl overflow-hidden transition-all duration-1000 delay-300 ${visibleSections["how"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <img
                src="https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/cbac7e97-8b63-4e5c-abeb-ee595bbe3b25.jpg"
                alt="Профессиональный монтаж"
                className="w-full h-80 object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent rounded-3xl" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-3 bg-white/95 rounded-2xl px-4 py-3 shadow-lg">
                  <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon name="HardHat" size={16} className="text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Опытные мастера</div>
                    <div className="text-xs text-slate-500">Монтаж без пыли и грязи</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Наши работы</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 text-slate-900">
              До и после
            </h2>
          </div>
          <div className={`transition-all duration-1000 delay-200 ${visibleSections["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex gap-3 mb-7 flex-wrap">
              {beforeAfterTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === i ? `${ACCENT_BG} text-white shadow-sm` : "border border-slate-200 text-slate-500 hover:text-sky-600 hover:border-sky-200 bg-white"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative rounded-2xl overflow-hidden border border-red-100 min-h-72 flex flex-col justify-end shadow-sm">
                <img src="https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/d169b98d-636c-46d7-a8c1-c3b116946700.jpg" alt="До" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">ДО</span>
                </div>
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="X" size={15} className="text-red-300" />
                    <span className="text-red-200 text-sm font-medium">{beforeAfterTabs[activeTab].before}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Холод", "Сквозняки", "Шум", "Конденсат"].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-red-500/30 text-red-100 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-sky-100 min-h-72 flex flex-col justify-end shadow-sm">
                <img src="https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/328e09ff-138a-4f8c-a78f-4aebbeddf6a3.jpg" alt="После" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold">ПОСЛЕ</span>
                </div>
                <div className="relative z-10 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Check" size={15} className="text-sky-300" />
                    <span className="text-sky-200 text-sm font-medium">{beforeAfterTabs[activeTab].after}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["Тепло", "Тишина", "Комфорт", "Экономия"].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-sky-500/30 text-sky-100 text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-5 rounded-3xl overflow-hidden relative transition-all duration-1000 delay-400 ${visibleSections["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <img src="https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/1c0b72f9-25a7-4542-8c17-03fa4e50ce2e.jpg" alt="Панорамное остекление" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/30 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div>
                  <div className="text-2xl font-black text-white mb-2">Панорамное остекление</div>
                  <p className="text-white/80 text-sm max-w-xs">Широкие лоджии — наш конёк. Максимум света при полной герметичности.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Цены</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 mb-3 text-slate-900">
              Прозрачные тарифы
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Цена фиксируется в договоре. Никаких доплат после замера.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                  pkg.badge
                    ? "border-sky-300 bg-white shadow-xl shadow-sky-100 scale-105"
                    : "border-slate-200 bg-white hover:border-sky-200 shadow-sm hover:shadow-md"
                } ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-sky-600 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-md">
                    {pkg.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-800 mb-1">{pkg.name}</h3>
                <div className="text-3xl font-black text-sky-600 mb-1">{pkg.price}</div>
                <div className="text-sm text-slate-400 mb-6">{pkg.unit} · с монтажом</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                      <Icon name="Check" size={15} className="text-sky-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl font-semibold text-center text-sm transition-all ${
                    pkg.badge
                      ? `${ACCENT_BG} text-white hover:bg-sky-700 shadow-md`
                      : "border border-sky-200 text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
          <div className={`mt-10 p-6 rounded-2xl border border-sky-100 bg-sky-50 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-400 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="Calculator" size={22} className="text-sky-600" />
              </div>
              <div>
                <div className="font-bold text-slate-800">Нужен точный расчёт?</div>
                <div className="text-sm text-slate-500">Замерщик приедет бесплатно и посчитает всё по размерам вашего балкона</div>
              </div>
            </div>
            <a href="#contact" className={`px-6 py-3 ${ACCENT_BG} text-white font-bold rounded-xl hover:bg-sky-700 transition-all shadow-md text-sm whitespace-nowrap`}>
              Вызвать замерщика
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 text-slate-900">
              Что говорят клиенты
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={16} className="text-amber-400" />)}
              </div>
              <span className="text-slate-400 text-sm">4.9 из 5 · Яндекс.Карты</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border border-slate-100 bg-white hover:border-sky-100 hover:shadow-md transition-all duration-500 shadow-sm ${visibleSections["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.stars)].map((_, j) => <Icon key={j} name="Star" size={13} className="text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sm font-bold text-sky-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{review.name}</div>
                    <div className="text-xs text-slate-400">{review.addr} · {review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-1000 ${visibleSections["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 text-slate-900">
              Частые вопросы
            </h2>
          </div>
          <div className={`space-y-3 transition-all duration-1000 delay-200 ${visibleSections["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-sky-200 transition-all shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-sky-50/50 transition-all"
                >
                  <span className="font-semibold text-slate-800 text-sm leading-relaxed">{faq.q}</span>
                  <Icon name="ChevronDown" size={17} className={`text-sky-500 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-1000 ${visibleSections["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Связаться</span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mt-3 mb-5 text-slate-900">
                Закажите бесплатный замер
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Замерщик приедет в удобное для вас время. Рассчитает стоимость прямо на месте. Никаких обязательств.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (812) 123-45-67" },
                  { icon: "Clock", label: "Время работы", val: "Пн–Вс: 9:00 – 21:00" },
                  { icon: "MapPin", label: "Регион", val: "Санкт-Петербург и Ленобласть" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={17} className="text-sky-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">{item.label}</div>
                      <div className="text-sm font-semibold text-slate-800">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[
                  { icon: "MessageCircle", label: "WhatsApp" },
                  { icon: "Send", label: "Telegram" },
                ].map((item, i) => (
                  <a key={i} href="#" className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-500 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-all">
                    <Icon name={item.icon} size={15} className="text-sky-500" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${visibleSections["contact"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {submitted ? (
                <div className="p-10 bg-green-50 border border-green-200 rounded-3xl text-center">
                  <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Заявка принята!</h3>
                  <p className="text-slate-500">Перезвоним в течение 15 минут и договоримся о времени замера.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-5">Оставить заявку на замер</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      placeholder="Иван"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Комментарий (необязательно)</label>
                    <textarea
                      placeholder="Тип балкона, этаж, пожелания..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className={`w-full py-4 ${ACCENT_BG} text-white font-bold rounded-xl hover:bg-sky-700 transition-all shadow-md text-sm`}>
                    Заказать бесплатный замер
                  </button>
                  <p className="text-xs text-slate-400 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display font-black text-lg text-sky-600">ТеплоБалкон СПб</div>
          <div className="text-sm text-slate-400 text-center">© 2025 ТеплоБалкон СПб · Замена холодного остекления в Санкт-Петербурге</div>
          <a href="tel:+78121234567" className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
            +7 (812) 123-45-67
          </a>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <a href="#contact" className={`flex items-center gap-2 px-6 py-3.5 ${ACCENT_BG} text-white font-bold rounded-full shadow-xl text-sm`}>
          <Icon name="Phone" size={15} />
          Бесплатный замер
        </a>
      </div>
    </div>
  );
};

export default Index;
