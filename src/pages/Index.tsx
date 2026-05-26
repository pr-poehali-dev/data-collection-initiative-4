import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMGS = {
  heroWarm: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/2f162422-2b86-4f16-aabd-6b9e67041a24.jpg",
  heroCold: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/d169b98d-636c-46d7-a8c1-c3b116946700.jpg",
  afterBalcony: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/328e09ff-138a-4f8c-a78f-4aebbeddf6a3.jpg",
  install: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/cbac7e97-8b63-4e5c-abeb-ee595bbe3b25.jpg",
  panoramic: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/1c0b72f9-25a7-4542-8c17-03fa4e50ce2e.jpg",
  installNew: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/3da64e47-b101-457f-84d0-2a82087de142.jpg",
  livingRoom: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/b709a400-a052-4dd5-b72c-373a7af5222f.jpg",
  family: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/40705338-c834-4904-a3fe-67619454982b.jpg",
  profile: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/194ca082-5017-4590-a2a6-02ba21e907b1.jpg",
  building: "https://cdn.poehali.dev/projects/1d4972ac-1dfe-4bfc-9e7b-ebb9b43ea419/files/23c355b6-b3e9-4632-823e-132beff60aaf.jpg",
};

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      h: Math.floor((diff / 1000 / 3600) % 24),
      m: Math.floor((diff / 1000 / 60) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  });
  return time;
}

const Index = () => {
  const [vis, setVis] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [heroForm, setHeroForm] = useState({ name: "", phone: "" });
  const [sent, setSent] = useState(false);
  const [heroSent, setHeroSent] = useState(false);
  const [tab, setTab] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [profileTab, setProfileTab] = useState(0);
  const [calcSize, setCalcSize] = useState("standard");
  const [calcProfile, setCalcProfile] = useState("comfort");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timerTarget = useRef(new Date(Date.now() + 3 * 3600 * 1000 + 47 * 60 * 1000));
  const countdown = useCountdown(timerTarget.current);

  useEffect(() => {
    const ids = ["hero","promo","why","features","profiles","how","gallery","trust","reviews","faq","contact"];
    const obs: Record<string, IntersectionObserver> = {};
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      obs[id] = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVis((p) => ({ ...p, [id]: true })); obs[id].unobserve(el); }
      }, { threshold: 0.08 });
      obs[id].observe(el);
    });
    return () => Object.values(obs).forEach((o) => o.disconnect());
  }, []);

  const prices: Record<string, Record<string, number>> = {
    standard: { economy: 16900, comfort: 24500, premium: 36000 },
    large:    { economy: 21900, comfort: 31500, premium: 46000 },
    loggia:   { economy: 27900, comfort: 39500, premium: 58000 },
  };
  const calcPrice = prices[calcSize][calcProfile];

  const profiles = [
    { name: "REHAU", badge: "Популярный", mm: "60 мм", cam: "3 камеры", db: "32 дБ", years: "50 лет", price: "от 24 500 ₽" },
    { name: "VEKA", badge: null, mm: "58 мм", cam: "3 камеры", db: "30 дБ", years: "40 лет", price: "от 19 900 ₽" },
    { name: "KBE", badge: null, mm: "60 мм", cam: "3 камеры", db: "31 дБ", years: "45 лет", price: "от 22 500 ₽" },
    { name: "Deceuninck", badge: "Премиум", mm: "70 мм", cam: "5 камер", db: "38 дБ", years: "60 лет", price: "от 37 000 ₽" },
  ];

  const features = [
    { icon: "Thermometer", title: "Тепло круглый год", desc: "Температура на балконе повышается на 15–20°C. Балкон превращается в полноценную комнату." },
    { icon: "Volume2", title: "Тишина в квартире", desc: "Снижение уличного шума на 32–38 дБ. Двойной стеклопакет защищает от шума дороги и соседей." },
    { icon: "Zap", title: "Экономия до 40%", desc: "Снижение потерь тепла на 70%. Счета за отопление уменьшаются на 25–40% уже в первый сезон." },
    { icon: "Shield", title: "Гарантия 10 лет", desc: "Официальная гарантия на конструкцию и монтажные работы. Договор с прописанными обязательствами." },
    { icon: "Clock", title: "Монтаж за 1 день", desc: "Устанавливаем без пыли, грязи и остановки жизни в квартире. Убираем за собой." },
    { icon: "Home", title: "Фасад без изменений", desc: "Меняем остекление без демонтажа плиты. Внешний вид дома — без согласований с ТСЖ." },
  ];

  const steps = [
    { num: "01", title: "Бесплатный замер", desc: "Замерщик приезжает в удобное время. Замер бесплатно, без обязательств." },
    { num: "02", title: "Расчёт и договор", desc: "Готовим точный расчёт за 30 минут. Фиксируем стоимость в договоре — без скрытых доплат." },
    { num: "03", title: "Производство", desc: "Изготавливаем окна на заводе под ваши размеры за 3–5 рабочих дней." },
    { num: "04", title: "Монтаж и сдача", desc: "Устанавливаем за 1 день, регулируем фурнитуру, убираем за собой и сдаём работу." },
  ];

  const reviews = [
    { name: "Наталья И.", addr: "Пр. Просвещения", text: "Заменили старое холодное остекление на тёплое REHAU. Балкон стал кабинетом — работаю там весь год. Очень довольна!", stars: 5, date: "Февраль 2025" },
    { name: "Андрей Ф.", addr: "Ул. Варшавская", text: "Мастера сделали всё за 6 часов. Никакого мусора. Теперь тихо и тепло. Цена честная, без накруток.", stars: 5, date: "Март 2025" },
    { name: "Светлана К.", addr: "Комендантский пр.", text: "Боялась согласований с ТСЖ, но менеджер объяснил — фасад не трогаем. Сделали быстро и аккуратно!", stars: 5, date: "Январь 2025" },
    { name: "Михаил О.", addr: "Ленинский пр.", text: "Брал пакет «Комфорт». Двухкамерный стеклопакет — разница ощутимая. Балкон теперь +18 при -15 на улице.", stars: 5, date: "Декабрь 2024" },
    { name: "Ирина С.", addr: "Невский пр.", text: "Делали всю лоджию 6 метров. Успели за один день! Качество отличное, цена соответствует. Рекомендую!", stars: 5, date: "Апрель 2025" },
    { name: "Дмитрий В.", addr: "Пр. Ветеранов", text: "Установили Deceuninck Премиум. Шум с дороги исчез полностью. Стоит каждой копейки. Спасибо команде!", stars: 5, date: "Май 2025" },
  ];

  const faqs = [
    { q: "Нужно ли согласование с ТСЖ или администрацией?", a: "Нет. Мы заменяем остекление без изменения фасада здания. Конструкция плиты и внешний вид дома остаются прежними — согласований не требуется." },
    { q: "Сколько времени занимает установка?", a: "Один балкон стандартного размера устанавливается за 1 рабочий день. Двухсторонняя лоджия — 1–2 дня. После монтажа убираем весь мусор." },
    { q: "Можно ли установить зимой?", a: "Да. Мы работаем круглый год. Монтаж проводится при температуре до -15°C с применением специальных морозостойких герметиков." },
    { q: "Какой профиль лучше выбрать?", a: "Для Санкт-Петербурга рекомендуем REHAU 60 мм с двухкамерным стеклопакетом — оптимальное соотношение цены и теплоизоляции. Наш замерщик подберёт вариант на месте." },
    { q: "Входит ли стоимость монтажа в цену?", a: "Да. Цена включает материалы, доставку, монтаж и вывоз мусора. Никаких скрытых доплат — итоговая сумма фиксируется в договоре." },
    { q: "Как рассчитывается экономия на отоплении?", a: "В среднем после замены на тёплое остекление потери тепла через балкон снижаются на 60–70%. По СПб — это экономия 5 000–15 000 ₽ в год в зависимости от площади и тарифа." },
  ];

  const fmt = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden pb-16 sm:pb-0">

      {/* TOP OFFER BANNER */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-xs sm:text-sm font-semibold leading-tight">
          <span className="flex items-center gap-1.5">
            <Icon name="Flame" size={13} />
            <span className="hidden xs:inline">Акция мая: </span>скидка 35% на REHAU
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-orange-200 text-xs">⏱</span>
            <span className="font-mono font-black bg-white/25 rounded px-2 py-0.5 text-xs tabular-nums">
              {fmt(countdown.h)}:{fmt(countdown.m)}:{fmt(countdown.s)}
            </span>
          </span>
          <a href="#contact" className="bg-white text-orange-500 font-bold px-3 py-1 rounded-full text-xs hover:bg-orange-50 transition-all whitespace-nowrap">
            Успеть →
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 w-full bg-white/97 backdrop-blur-xl border-b border-slate-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center shrink-0">
              <Icon name="Building2" size={15} className="text-white" />
            </div>
            <span className="font-display font-black text-base sm:text-lg text-slate-900">ТеплоБалкон <span className="text-sky-600">СПб</span></span>
          </div>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            {[["#features","Преимущества"],["#profiles","Профили"],["#gallery","Работы"],["#reviews","Отзывы"],["#contact","Контакты"]].map(([h,l]) => (
              <a key={h} href={h} className="text-slate-500 hover:text-sky-600 transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+78121234567" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-slate-800 hover:text-sky-600 transition-colors">
              <Icon name="Phone" size={13} className="text-sky-600" />
              +7 (812) 123-45-67
            </a>
            <a href="#contact" className="hidden sm:block px-4 py-2 text-sm font-bold bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all shadow-sm">
              Замер бесплатно
            </a>
            {/* Mobile: call + menu */}
            <a href="tel:+78121234567" className="sm:hidden flex items-center justify-center w-9 h-9 bg-sky-50 rounded-full text-sky-600">
              <Icon name="Phone" size={17} />
            </a>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={18} />
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-3 space-y-1">
            {[["#features","Преимущества"],["#profiles","Профили"],["#gallery","Работы"],["#reviews","Отзывы"],["#contact","Контакты"]].map(([h,l]) => (
              <a key={h} href={h} onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-all">{l}</a>
            ))}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}
              className="block mt-2 py-3 px-4 bg-sky-600 text-white font-bold rounded-xl text-sm text-center hover:bg-sky-700 transition-all">
              Замер бесплатно
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[auto] lg:min-h-[88vh]">
          <div className="relative flex items-center px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-sky-50 via-white to-white">
            <div className={`relative z-10 max-w-xl transition-all duration-1000 ${vis["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                <Icon name="Tag" size={13} className="text-orange-500" />
                <span className="text-xs font-bold text-orange-600">Скидка 35% действует до конца мая</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-display font-black leading-tight mb-5 text-slate-900 tracking-tight">
                Замена<br />
                <span className="text-sky-600">холодного</span><br />
                остекления<br />
                <span className="text-sky-600">на тёплое</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-7 max-w-md">
                Профессиональная замена в Санкт-Петербурге. Профили REHAU, VEKA, KBE. Монтаж за 1 день. Гарантия 10 лет.
              </p>
              <div className="flex flex-wrap gap-5 mb-8 pb-7 border-b border-slate-100">
                {[
                  { val: "5 000+", label: "объектов в СПб", icon: "Building" },
                  { val: "10 лет", label: "гарантия", icon: "ShieldCheck" },
                  { val: "1 день", label: "монтаж", icon: "Clock" },
                  { val: "4.9★", label: "Яндекс", icon: "Star" },
                ].map((s) => (
                  <div key={s.val} className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={s.icon} size={15} className="text-sky-600" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-sm leading-tight">{s.val}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {heroSent ? (
                <div className="p-5 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-4">
                  <Icon name="CheckCircle" size={32} className="text-green-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Заявка принята!</p>
                    <p className="text-sm text-slate-500">Перезвоним в течение 15 минут</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setHeroSent(true); }} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" placeholder="Имя" value={heroForm.name} onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })} required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm bg-white" />
                    <input type="tel" placeholder="Телефон" value={heroForm.phone} onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })} required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm bg-white" />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-all shadow-md text-sm">
                    Заказать бесплатный замер → Скидка 35%
                  </button>
                  <p className="text-xs text-slate-400 text-center">Замер бесплатно · Без обязательств · Звоним за 15 минут</p>
                </form>
              )}
            </div>
          </div>
          {/* Mobile hero image */}
          <div className="lg:hidden relative h-52 sm:h-64 overflow-hidden">
            <img src={IMGS.livingRoom} alt="Тёплый балкон" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white/95 rounded-xl px-3 py-2 shadow">
              <div className="text-xs font-bold text-slate-800">После замены</div>
              <div className="text-xs text-sky-600 font-semibold">Балкон — полноценная комната</div>
            </div>
          </div>
          {/* Photo collage desktop */}
          <div className="hidden lg:grid grid-rows-2 grid-cols-2 gap-2 p-2 bg-slate-100 min-h-[88vh]">
            <div className="relative col-span-2 rounded-2xl overflow-hidden">
              <img src={IMGS.livingRoom} alt="Тёплый балкон" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl px-4 py-2.5 shadow-lg">
                <div className="text-sm font-bold text-slate-800">После замены остекления</div>
                <div className="text-xs text-sky-600 font-semibold">Балкон — полноценная комната</div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img src={IMGS.heroCold} alt="До" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">ДО</div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img src={IMGS.heroWarm} alt="После" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-sky-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">ПОСЛЕ</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO STRIP */}
      <section id="promo" className="bg-sky-600 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
          {[
            { icon: "Percent", text: "Скидка 35%", mobileHide: false },
            { icon: "Ruler", text: "Замер бесплатно", mobileHide: false },
            { icon: "CreditCard", text: "Рассрочка 0%", mobileHide: false },
            { icon: "Truck", text: "Бесплатная доставка", mobileHide: true },
            { icon: "ShieldCheck", text: "Гарантия 10 лет", mobileHide: true },
          ].map((item) => (
            <div key={item.text} className={`flex items-center gap-1.5 text-white shrink-0 ${item.mobileHide ? "hidden sm:flex" : "flex"}`}>
              <Icon name={item.icon} size={14} className="text-sky-200" />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${vis["why"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Проблема</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 mb-3 text-slate-900">Почему холодное остекление — это дорого</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Каждую зиму холодный балкон обходится вам дороже, чем кажется</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "Snowflake", title: "Промерзание", desc: "Зимой балкон недоступен. Конденсат и лёд на рамах разрушают стены и откосы." },
                { icon: "TrendingUp", title: "Переплата за тепло", desc: "До 30% тепла уходит через холодный балкон. Это ~12 000 ₽ переплаты в год." },
                { icon: "VolumeX", title: "Шум и стресс", desc: "Одинарное стекло не спасает от шума. Нарушение сна снижает качество жизни." },
                { icon: "AlertTriangle", title: "Гниение конструкций", desc: "Деревянные рамы гниют, краска шелушится. Ремонт каждые 2–3 года — это расходы." },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl border border-red-100 bg-white shadow-sm transition-all duration-700 ${vis["why"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
                    <Icon name={item.icon} size={18} className="text-red-400" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1.5 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-700 delay-300 ${vis["why"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <img src={IMGS.building} alt="Дом с балконами" className="w-full h-72 lg:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3">
                <div className="bg-white/95 rounded-xl p-3 shadow-md">
                  <div className="text-xl font-black text-red-500 mb-0.5">−30%</div>
                  <div className="text-xs text-slate-600 font-medium">тепла теряется через холодный балкон</div>
                </div>
                <div className="bg-sky-600 rounded-xl p-3 shadow-md">
                  <div className="text-xl font-black text-white mb-0.5">+18°C</div>
                  <div className="text-xs text-sky-100 font-medium">на балконе после замены зимой</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${vis["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Почему мы</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 text-slate-900">6 причин выбрать нас</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((item, i) => (
              <div key={i} className={`group p-6 border border-slate-100 hover:border-sky-200 rounded-2xl bg-white hover:bg-sky-50/40 transition-all shadow-sm hover:shadow-md ${vis["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 70}ms`, transition: "all 0.6s" }}>
                <div className="w-11 h-11 bg-sky-50 group-hover:bg-sky-100 rounded-xl flex items-center justify-center mb-4 transition-all">
                  <Icon name={item.icon} size={20} className="text-sky-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={`mt-8 relative rounded-3xl overflow-hidden transition-all duration-700 delay-500 ${vis["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <img src={IMGS.family} alt="Семья на тёплом балконе" className="w-full h-56 sm:h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div className="max-w-md">
                <div className="text-2xl sm:text-3xl font-black text-white mb-2">Балкон — ваша новая любимая комната</div>
                <p className="text-white/75 text-sm sm:text-base">Тёплое остекление превращает заброшенный балкон в место для жизни: кабинет, спальня, детская.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILES */}
      <section id="profiles" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${vis["profiles"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Системы</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 mb-3 text-slate-900">Выберите профиль</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Все профили — оригинальные, с сертификатами производителя.</p>
          </div>
          <div className="flex gap-3 flex-wrap mb-8">
            {profiles.map((p, i) => (
              <button key={i} onClick={() => setProfileTab(i)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${profileTab === i ? "bg-sky-600 text-white shadow-sm" : "border border-slate-200 text-slate-500 hover:text-sky-600 hover:border-sky-200 bg-white"}`}>
                {p.name}{p.badge ? " ★" : ""}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm">
              {(() => {
                const p = profiles[profileTab];
                return (
                  <>
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl font-black text-slate-900">{p.name}</h3>
                          {p.badge && <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.badge === "Премиум" ? "bg-amber-100 text-amber-700" : "bg-sky-100 text-sky-700"}`}>{p.badge}</span>}
                        </div>
                        <div className="text-2xl font-black text-sky-600">{p.price}</div>
                        <div className="text-sm text-slate-400">за балкон, с монтажом</div>
                      </div>
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                        <img src={IMGS.profile} alt="Профиль" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { label: "Толщина профиля", val: p.mm },
                        { label: "Конструкция", val: p.cam },
                        { label: "Шумоизоляция", val: p.db },
                        { label: "Срок службы", val: p.years },
                      ].map((item) => (
                        <div key={item.label} className="p-3 bg-slate-50 rounded-xl">
                          <div className="text-xs text-slate-400 mb-0.5">{item.label}</div>
                          <div className="font-bold text-slate-800 text-sm">{item.val}</div>
                        </div>
                      ))}
                    </div>
                    <a href="#contact" className="block w-full py-3 bg-sky-600 text-white font-bold rounded-xl text-center text-sm hover:bg-sky-700 transition-all">
                      Заказать {p.name} — {p.price}
                    </a>
                  </>
                );
              })()}
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-80 md:h-full min-h-72">
              <img src={IMGS.installNew} alt="Монтаж профиля" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/97 rounded-2xl p-4 shadow-lg flex items-center gap-3">
                  <Icon name="Award" size={20} className="text-sky-600 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Оригинальные профили</div>
                    <div className="text-xs text-slate-500">Прямые поставки от производителя · Сертификаты прилагаются</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-16 px-4 sm:px-6 bg-sky-600">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">Рассчитайте стоимость прямо сейчас</h2>
            <p className="text-sky-200 text-sm">Предварительный расчёт — точная цена после бесплатного замера</p>
          </div>
          <div className="bg-white rounded-3xl p-7 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-7 mb-7">
              <div>
                <div className="text-sm font-bold text-slate-700 mb-3">Размер балкона</div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
                  {[
                    { val: "standard", label: "Стандарт", sub: "до 5 м²" },
                    { val: "large", label: "Большой", sub: "5–8 м²" },
                    { val: "loggia", label: "Лоджия", sub: "8–12 м²" },
                  ].map((opt) => (
                    <button key={opt.val} onClick={() => setCalcSize(opt.val)}
                      className={`flex sm:block items-center sm:text-center gap-3 px-4 sm:px-3 py-3 rounded-xl border-2 transition-all ${calcSize === opt.val ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-sky-200"}`}>
                      <div className="text-sm font-bold text-slate-800">{opt.label}</div>
                      <div className="text-xs text-slate-400">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700 mb-3">Класс профиля</div>
                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
                  {[
                    { val: "economy", label: "Эконом", sub: "VEKA" },
                    { val: "comfort", label: "Комфорт", sub: "REHAU" },
                    { val: "premium", label: "Премиум", sub: "Deceuninck" },
                  ].map((opt) => (
                    <button key={opt.val} onClick={() => setCalcProfile(opt.val)}
                      className={`flex sm:block items-center sm:text-center gap-3 px-4 sm:px-3 py-3 rounded-xl border-2 transition-all ${calcProfile === opt.val ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-sky-200"}`}>
                      <div className="text-sm font-bold text-slate-800">{opt.label}</div>
                      <div className="text-xs text-slate-400">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 bg-sky-50 rounded-2xl border border-sky-100">
              <div>
                <div className="text-sm text-slate-500 mb-1">Предварительная стоимость</div>
                <div className="text-4xl font-black text-sky-600">от {calcPrice.toLocaleString("ru")} ₽</div>
                <div className="text-xs text-slate-400 mt-1">Монтаж, материалы, вывоз мусора — включено</div>
              </div>
              <a href="#contact" className="px-8 py-4 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-all shadow-md text-sm whitespace-nowrap">
                Уточнить цену → бесплатно
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${vis["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Процесс</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 text-slate-900">4 шага до тёплого балкона</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className={`flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-sky-200 hover:shadow-md transition-all ${vis["how"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: `${i * 100}ms`, transition: "all 0.6s" }}>
                  <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <span className="text-white font-black text-sm">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-700 delay-300 ${vis["how"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              <img src={IMGS.install} alt="Монтаж" className="w-full h-80 lg:h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/97 rounded-2xl px-5 py-4 shadow-lg flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name="HardHat" size={17} className="text-sky-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Сертифицированные мастера</div>
                    <div className="text-xs text-slate-500">Допуск СРО · Стаж от 5 лет · Страховка ответственности</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${vis["gallery"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Портфолио</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 text-slate-900">Наши работы</h2>
          </div>
          <div className="flex gap-3 mb-6 flex-wrap">
            {["Стандартный балкон", "Широкая лоджия", "Угловой балкон"].map((t, i) => (
              <button key={i} onClick={() => setTab(i)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tab === i ? "bg-sky-600 text-white shadow-sm" : "border border-slate-200 text-slate-500 hover:text-sky-600 bg-white"}`}>{t}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="relative rounded-2xl overflow-hidden h-72 shadow-md">
              <img src={IMGS.heroCold} alt="До" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">ДО</div>
              <div className="absolute bottom-4 left-4">
                <div className="flex gap-2 flex-wrap">
                  {["Холод", "Сквозняки", "Конденсат"].map((t) => <span key={t} className="px-2.5 py-1 rounded-lg bg-red-500/40 backdrop-blur-sm text-white text-xs font-medium">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-72 shadow-md">
              <img src={IMGS.afterBalcony} alt="После" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-black px-3 py-1 rounded-full">ПОСЛЕ</div>
              <div className="absolute bottom-4 left-4">
                <div className="flex gap-2 flex-wrap">
                  {["Тепло", "Тишина", "Комфорт"].map((t) => <span key={t} className="px-2.5 py-1 rounded-lg bg-sky-500/40 backdrop-blur-sm text-white text-xs font-medium">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative rounded-2xl overflow-hidden h-44 sm:col-span-2 shadow-md">
              <img src={IMGS.panoramic} alt="Панорамное остекление" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <div className="text-white font-black text-base">Панорамное остекление</div>
                  <div className="text-white/70 text-xs">Максимум света и вида</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-44 shadow-md">
              <img src={IMGS.heroWarm} alt="Уютный балкон" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <div className="text-white font-bold text-sm">REHAU Premium</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="py-10 sm:py-16 px-4 sm:px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${vis["trust"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Надёжность</span>
            <h2 className="text-2xl font-display font-black tracking-tight mt-2 text-slate-900">Документы и сертификаты</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "FileCheck", title: "Лицензия СРО", sub: "№ СРО-С-084-12122009", col: "sky" },
              { icon: "Award", title: "ГОСТ 30674-99", sub: "Соответствие стандарту", col: "green" },
              { icon: "ShieldCheck", title: "Гарантия 10 лет", sub: "Гарантийный талон на руки", col: "sky" },
              { icon: "Star", title: "4.9 на Яндексе", sub: "Более 200 отзывов", col: "amber" },
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-2xl border border-slate-100 bg-slate-50 flex gap-4 items-start transition-all duration-700 ${vis["trust"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.col === "amber" ? "bg-amber-50" : item.col === "green" ? "bg-green-50" : "bg-sky-50"}`}>
                  <Icon name={item.icon} size={19} className={item.col === "amber" ? "text-amber-500" : item.col === "green" ? "text-green-500" : "text-sky-600"} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${vis["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Отзывы</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 text-slate-900">Что говорят клиенты</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={16} className="text-amber-400" />)}</div>
              <span className="text-slate-500 text-sm font-medium">4.9 из 5 · Яндекс.Карты · 200+ отзывов</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className={`p-6 bg-white rounded-2xl border border-slate-100 hover:border-sky-100 shadow-sm hover:shadow-md transition-all ${vis["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: `${i * 70}ms`, transition: "all 0.6s" }}>
                <div className="flex gap-0.5 mb-3">{[...Array(r.stars)].map((_, j) => <Icon key={j} name="Star" size={13} className="text-amber-400" />)}</div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sm font-black text-sky-700">{r.name[0]}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.addr} · {r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${vis["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">FAQ</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 text-slate-900">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className={`border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-sky-200 transition-all shadow-sm ${vis["faq"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 60}ms`, transition: "all 0.6s" }}>
                <button onClick={() => setFaq(faq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-sky-50/50 transition-all">
                  <span className="font-semibold text-slate-800 text-sm leading-relaxed">{item.q}</span>
                  <Icon name="ChevronDown" size={16} className={`text-sky-500 shrink-0 transition-transform duration-300 ${faq === i ? "rotate-180" : ""}`} />
                </button>
                {faq === i && <div className="px-6 pb-5 pt-3 text-sm text-slate-500 leading-relaxed border-t border-slate-100">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 p-5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-5 text-white">
            <div className="flex items-center gap-3 shrink-0">
              <Icon name="Flame" size={28} />
              <div>
                <div className="font-black text-lg">Акция мая: скидка 35%</div>
                <div className="text-sm text-orange-100">Осталось {fmt(countdown.h)}:{fmt(countdown.m)}:{fmt(countdown.s)}</div>
              </div>
            </div>
            <div className="hidden sm:block flex-1 h-px bg-white/20" />
            <div className="text-center sm:text-right">
              <div className="text-sm text-orange-100 mb-1">Оставьте заявку прямо сейчас</div>
              <div className="font-bold">и зафиксируйте скидочную цену</div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className={`transition-all duration-700 ${vis["contact"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">Контакты</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight mt-2 mb-5 text-slate-900">Закажите бесплатный замер</h2>
              <p className="text-slate-500 mb-8 leading-relaxed text-sm">Замерщик приедет в удобное время. Рассчитает стоимость на месте. Никаких обязательств.</p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (812) 123-45-67" },
                  { icon: "Clock", label: "Время работы", val: "Пн–Вс: 9:00 – 21:00" },
                  { icon: "MapPin", label: "Регион", val: "Санкт-Петербург и Ленобласть" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={16} className="text-sky-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">{item.label}</div>
                      <div className="text-sm font-bold text-slate-800">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[{ icon: "MessageCircle", label: "WhatsApp" }, { icon: "Send", label: "Telegram" }].map((item, i) => (
                  <a key={i} href="#" className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-500 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-all">
                    <Icon name={item.icon} size={14} className="text-sky-500" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${vis["contact"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
              {sent ? (
                <div className="p-10 bg-green-50 border border-green-200 rounded-3xl text-center">
                  <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Заявка принята!</h3>
                  <p className="text-slate-500 text-sm">Перезвоним в течение 15 минут и зафиксируем скидку 35%.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
                  <h3 className="text-xl font-black text-slate-800 mb-1">Заявка на замер</h3>
                  <p className="text-xs text-orange-500 font-semibold mb-4">🔥 Скидка 35% зафиксируется после отправки</p>
                  {[
                    { label: "Ваше имя *", key: "name", type: "text", ph: "Иван" },
                    { label: "Телефон *", key: "phone", type: "tel", ph: "+7 (___) ___-__-__" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required value={form[f.key as "name" | "phone"]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Комментарий</label>
                    <textarea placeholder="Тип балкона, этаж, пожелания..." value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 text-sm resize-none" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-sky-600 text-white font-black rounded-xl hover:bg-sky-700 transition-all shadow-md text-sm">
                    Заказать замер и получить скидку 35% →
                  </button>
                  <p className="text-xs text-slate-400 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-display font-black text-lg text-white">ТеплоБалкон <span className="text-sky-400">СПб</span></div>
          <div className="text-sm text-slate-400 text-center">© 2025 ТеплоБалкон СПб · Замена холодного остекления в Санкт-Петербурге</div>
          <a href="tel:+78121234567" className="text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors">+7 (812) 123-45-67</a>
        </div>
      </footer>

      {/* MOBILE CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <a href="#contact" className="flex items-center gap-2 px-6 py-3.5 bg-sky-600 text-white font-bold rounded-full shadow-xl text-sm">
          <Icon name="Phone" size={14} />
          Замер бесплатно · Скидка 35%
        </a>
      </div>
    </div>
  );
};

export default Index;