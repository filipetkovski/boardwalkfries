/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Waves, 
  MapPin, 
  Clock, 
  Phone, 
  Utensils, 
  Star, 
  History, 
  Coffee, 
  CupSoda, 
  ChevronRight,
  ShieldCheck,
  Heart,
  Droplets,
  Menu as MenuIcon,
  X,
  ArrowRight
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const COLORS = {
  mustard: '#FACC15',
  deepBlue: '#005DAA',
  classicRed: '#DC2626',
  sand: '#FDFCF0'
};

const FULL_MENU = {
  breakfast: {
    title: "Breakfast Menu",
    note: "Served daily starting at 8:00 AM",
    items: [
      { name: "Egg Sandwich", price: "$8.95", description: "Served on Bagel or Muffin. Includes yellow cheese." },
      { name: "Egg & Sausage Sandwich", price: "$9.95", description: "Served on Bagel or Muffin. Includes yellow cheese." },
      { name: "Egg & American Bacon Sandwich", price: "$9.95", description: "Served on Bagel or Muffin. Includes yellow cheese." },
      { name: "Cream Cheese Bagel/Muffin", price: "$5.45", description: "Freshly toasted bagel or muffin with cream cheese." },
      { name: "Breakfast Burrito Bowl", price: "$15.95", description: "Egg, Potatoes, Peppers, and choice of Bacon or Sausage. Optional Sour Cream and Salsa." },
      { name: "Breakfast Combo with Drink", price: "$15.95", description: "Includes: Sandwich, Fries, and Drink (Juice, Coffee, or Water)" },
      { name: "Breakfast Combo (No Drink)", price: "$14.95", description: "Includes: Sandwich and Fries" }
    ]
  },
  fries: {
    title: "The Famous Boardwalk Fries",
    items: [
      { name: "Small Cup", price: "$7.50", description: "Fresh-cut daily from premium potatoes." },
      { name: "Large Cup", price: "$9.50", description: "Our most popular size for the boardwalk stroll." },
      { name: "Bucket of Fries", price: "$19.50", description: "Perfect for sharing with the whole family." },
      { name: "\"The Works\" Upgrade", price: "+$3.50", description: "Adds melted cheddar cheese and crispy hardwood bacon bits." }
    ]
  },
  proteins: {
    title: "Entrees & Proteins",
    items: [
      { name: "Chicken Fingers (3 Piece)", price: "$10.50", description: "Tender, juicy, and breaded to perfection." },
      { name: "Single Chicken Finger", price: "$3.50", description: "Perfect for a small snack." },
      { name: "Single Hot Dog", price: "$6.95", description: "1/4lb Hebrew National all-beef hot dog." },
      { name: "Hot Dog w/ Peppers & Onions", price: "$7.95", description: "The Boardwalk Way!" }
    ]
  },
  combos: {
    title: "Combo Meals",
    note: "Includes Fries and a Drink (Soda, Water, or Lemonade)",
    items: [
      { name: "Chicken Finger Combo (3 pc)", price: "$16.95", description: "The best value on the boardwalk." },
      { name: "Single Hot Dog Combo", price: "$14.95", description: "Classic beach lunch." },
      { name: "Double Hot Dog Combo", price: "$18.95", description: "For the hungry beach-goer." }
    ]
  },
  addons: {
    title: "Menu Add-ons",
    items: [
      { name: "Cheese Sauce", price: "$2.00" },
      { name: "Bacon Topping", price: "$2.00" },
      { name: "Peppers & Onions", price: "$1.00" }
    ]
  }
};

const BEVERAGES = [
  { name: "32 oz. Souvenir Mug", price: "$8.95", icon: <Star className="w-5 h-5" />, note: "Includes 50-cent refills for life." },
  { name: "Fresh Lemonade", price: "S / L", icon: <Waves className="w-5 h-5" /> },
  { name: "Fountain Soda", price: "S / L", icon: <CupSoda className="w-5 h-5" /> },
  { name: "Coffee & Hot Tea", price: "$2.00", icon: <Coffee className="w-5 h-5" />, note: "Early Bird Special" },
  { name: "Hot Chocolate & Juice", price: "$2.50+", icon: <Droplets className="w-5 h-5" /> }
];

const HIGHLIGHT_ITEMS = [
  {
    name: "Boardwalk Fresh-Cut Fries",
    price: "$7.50 / $9.50 / $19.50",
    description: "Our world-famous fries, hand-cut daily and cooked in 100% peanut oil for the ultimate boardwalk crunch.",
    tag: "Legendary",
    image: "/bucket.png"
  },
  {
    name: "Chicken Finger Combo",
    price: "$16.95",
    description: "3 tender white meat chicken fingers served with our jumbo fries and a refreshment.",
    tag: "Best Seller",
    image: "/4chicken.png"
  },
  {
    name: "Boardwalk Hot Dog",
    price: "$6.95",
    description: "1/4lb Hebrew National all-beef hot dog. Try it 'The Boardwalk Way' with sautéed peppers and onions.",
    tag: "Classic",
    image: "/hotdog.png"
  },
  {
    name: "32oz Souvenir Mug",
    price: "$8.95",
    description: "Join the most exclusive club in Bethany: $0.50 refills for the rest of your life.",
    tag: "VIP Club",
    image: "/mug.png"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (isMenuModalOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuModalOpen, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="font-sans text-deepblue selection:bg-mustard/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-2 flex justify-between items-center transition-all duration-300 bg-white shadow-md ${isScrolled ? 'py-1' : 'py-2'}`}>
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
            <img src="/icon.png" alt="Boardwalk Fries Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter uppercase whitespace-nowrap transition-colors text-deepblue">
            Boardwalk <span className="text-mustard group-hover:text-classicred transition-colors">Fries</span>
          </span>
        </a>
        
        <div className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-widest">
          <a href="#our-story" className="transition-colors text-deepblue hover:text-mustard">Our Story</a>
          <a href="#menu" className="transition-colors uppercase text-deepblue hover:text-mustard">Menu</a>
          <a href="#the-mug" className="transition-colors text-deepblue hover:text-mustard">The Mug</a>
          <a href="#find-us" className="transition-colors text-deepblue hover:text-mustard">Find Us</a>
          <a 
            href="#the-mug"
            className="bg-mustard text-deepblue px-6 py-2 rounded-full font-black uppercase text-sm shadow-[4px_4px_0px_#DC2626] hover:scale-105 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Join VIP Club
          </a>
        </div>

        <button 
          className="lg:hidden p-3 rounded-xl transition-all text-deepblue" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10">
                  <img src="/icon.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-display font-black text-xl uppercase tracking-tighter">
                  Boardwalk <span className="text-mustard">Fries</span>
                </span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 bg-deepblue text-white rounded-full flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { name: 'Our Story', href: '#our-story' },
                { name: 'Full Menu', action: () => setIsMenuModalOpen(true) },
                { name: 'The Mug', href: '#the-mug' },
                { name: 'Find Us', href: '#find-us' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  {item.href ? (
                    <a 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-display font-black uppercase italic tracking-tighter text-deepblue flex items-center justify-between group"
                    >
                      {item.name}
                      <ArrowRight className="text-mustard opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </a>
                  ) : (
                    <button 
                      onClick={() => { item.action?.(); setIsMenuOpen(false); }} 
                      className="text-4xl font-display font-black uppercase italic tracking-tighter text-deepblue flex items-center justify-between w-full text-left group"
                    >
                      {item.name}
                      <ArrowRight className="text-mustard opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
            >
              <a 
                href="#the-mug" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-classicred text-white py-5 rounded-2xl text-center font-black uppercase tracking-widest shadow-xl"
              >
                Join VIP Club
              </a>
              <div className="flex justify-center gap-6 mt-8 text-deepblue/40 font-bold text-xs uppercase tracking-widest">
                <span>Bethany Beach, DE</span>
                <span>•</span>
                <span>Since 1997</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuModalOpen(false)}
            className="absolute inset-0 bg-deepblue/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] md:max-h-[90vh]"
          >
            <div className="p-6 md:p-8 border-b border-deepblue/5 flex justify-between items-center bg-sand">
              <div>
                <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter text-deepblue">Our Full Menu</h2>
                <p className="text-sm font-bold uppercase tracking-widest text-classicred">Original Bethany Beach Recipes</p>
              </div>
              <button 
                onClick={() => setIsMenuModalOpen(false)}
                className="w-12 h-12 bg-deepblue text-white rounded-full flex items-center justify-center hover:bg-classicred transition-all shadow-lg active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 md:space-y-12 bg-white">
              {Object.entries(FULL_MENU).map(([key, section]) => (
                <div key={key} className="space-y-6">
                  <div className="border-l-4 border-classicred pl-4">
                    <h3 className="text-2xl font-display font-black uppercase italic text-deepblue tracking-tighter">{section.title}</h3>
                    {'note' in section && section.note && <p className="text-xs font-bold text-classicred uppercase tracking-widest">{section.note}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start gap-4 group">
                        <div className="flex-1">
                          <h4 className="font-black uppercase tracking-tight text-deepblue group-hover:text-classicred transition-colors">{item.name}</h4>
                          {item.description && <p className="text-[10px] font-bold text-deepblue/60 leading-tight uppercase mt-1">{item.description}</p>}
                        </div>
                        <div className="font-black text-classicred whitespace-nowrap">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Beverages */}
              <div className="bg-deepblue rounded-[2.5rem] p-10 text-white">
                <h3 className="text-3xl font-display font-black uppercase italic text-mustard mb-8 tracking-tighter">Beverages & Souvenirs</h3>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                  {BEVERAGES.map((bev, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-xl text-mustard">
                          {bev.icon}
                        </div>
                        <div>
                          <div className="font-black uppercase tracking-tight">{bev.name}</div>
                          {bev.note && <div className="text-[10px] text-mustard font-black uppercase tracking-widest leading-none mt-1">{bev.note}</div>}
                        </div>
                      </div>
                      <div className="font-black text-white/50">{bev.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-deepblue text-white flex justify-center italic font-bold">
              <p className="text-sm opacity-60">Customizations available upon request. All prices subject to coastal taxes.</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-deepblue">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/bethany.jpg" 
            className="w-full h-full object-cover md:object-center object-left opacity-60 scale-110"
            alt="Bethany Beach Boardwalk"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deepblue via-deepblue/20 to-deepblue/40" />
          {/* Vibrant Decorative Elements */}
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-classicred/30 rounded-full blur-3xl -z-0"></div>
          <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-mustard/20 rounded-full blur-3xl -z-0"></div>
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-8 pt-24 md:pt-0 px-4"
        >
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-extrabold text-white leading-[0.85] md:leading-[0.8] tracking-tighter uppercase italic mx-auto"
          >
            The <span className="text-mustard">Original</span> <br />
            <span className="relative inline-block">
              Boardwalk
            </span>
            <br />
            <span className="text-mustard">Fries</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 max-w-xl mx-auto text-lg md:text-xl font-medium tracking-tight"
          >
            The Very First Boardwalk Fries that is actually located on the Boardwalk! 
            Fresh-cut, hand-salted, and cooked in 100% peanut oil.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <button 
              onClick={() => setIsMenuModalOpen(true)}
              className="bg-classicred text-white py-4 px-10 rounded-full font-bold uppercase shadow-2xl hover:bg-white hover:text-classicred transition-all flex items-center justify-center gap-2 group"
            >
              See the Menu <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#find-us"
              className="glass text-white py-4 px-10 rounded-full font-bold uppercase hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center"
            >
              Our Location
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] text-[#FDFCF0] fill-current">
            <path d="M0,0 C480,120 960,120 1440,0 V120 H0 Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats / Badges */}
      <section className="py-20 px-6 bg-sand">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Droplets className="text-classicred" />, value: "100%", label: "Peanut Oil" },
            { icon: <ShieldCheck className="text-mustard" />, value: "100%", label: "Health Rating" },
            { icon: <Utensils className="text-classicred" />, value: "1,000+", label: "Cups Daily" },
            { icon: <Heart className="text-mustard" />, value: "Refills", label: "For Life" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-2 p-6 rounded-3xl bg-white border border-deepblue/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-display font-extrabold text-deepblue uppercase italic tracking-tighter">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-deepblue/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 md:py-32 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative space-y-8"
          >
            <div className="inline-block bg-mustard/10 text-mustard px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
              A Bethany Beach Legend
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold text-deepblue leading-tight uppercase italic tracking-tighter">
              Authentic Tradition <br />
              <span className="text-classicred">Since 1997</span>
            </h2>
            <div className="space-y-6 text-lg text-deepblue/80 font-medium max-w-xl">
              <p>
                In 1997, we opened our doors with a simple mission: to serve the finest fries on the Delaware coast. 
                What started as a single fryer has grown into a boardwalk landmark, serving between 250 to 1,000 cups 
                of our legendary fries every single day.
              </p>
              <p className="font-serif italic text-2xl text-deepblue">
                "We don't just make fries—we make memories. Every cup is a taste of the summer beach vacation you never want to end."
              </p>
              <p>
                As the very first Boardwalk Fries actually located on the Boardwalk, we take our heritage seriously. 
                That's why we've maintained a 100% health department rating for 14 straight years and only use 
                100% pure peanut oil for all our cooking.
              </p>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-mustard shadow-sm overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Founder" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold uppercase">
                <span className="text-classicred block">Family Owned</span>
                <span className="opacity-60 font-medium">3 Generations of Service</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1541214113241-21578d2d9b62?q=80&w=1000&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Boardwalk atmosphere"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepblue/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-sm font-bold uppercase tracking-widest opacity-80">Bethany Beach</div>
                <div className="text-3xl font-display font-extrabold uppercase italic">Garfield Pkwy</div>
              </div>
            </motion.div>
            
            {/* 90s Pixel Grid Accent */}
            <div className="absolute -top-10 -left-10 w-40 h-40 pixel-grid text-mustard/20 z-0" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-classicred/5 rounded-full blur-3xl z-0" />
          </motion.div>
        </div>
      </section>

      {/* Menu Highlight Section */}
      <section id="menu" className="py-20 md:py-24 bg-deepblue relative text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20 space-y-6 md:space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-[6rem] font-display font-extrabold uppercase italic tracking-tighter leading-none mb-4">
              Fresh From <span className="text-mustard">The Fryer</span>
            </h2>
            <p className="text-white/60 text-lg uppercase tracking-widest font-bold">Hand-cut. Hand-salted. Every Single Time.</p>
            <div className="pt-4">
              <button 
                onClick={() => setIsMenuModalOpen(true)}
                className="bg-mustard text-deepblue py-4 px-12 rounded-full font-black uppercase italic shadow-2xl hover:bg-classicred hover:text-white transition-all scale-110 active:scale-95"
              >
                Open Full Menu
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIGHLIGHT_ITEMS.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="overflow-hidden rounded-3xl aspect-[4/5] w-full mb-8 relative shadow-lg group-hover:shadow-2xl transition-all">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-classicred text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg border border-white/20">{item.tag}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-2xl font-display font-extrabold uppercase italic mb-3 tracking-tighter text-white group-hover:text-mustard transition-colors leading-none">{item.name}</h3>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed font-medium line-clamp-3">{item.description}</p>
                  <div className="mt-auto inline-block bg-white/10 px-6 py-2 rounded-full border border-white/10 text-mustard font-display font-black text-xl group-hover:bg-mustard group-hover:text-deepblue transition-all">
                    {item.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Beverage & Extra Section */}
          <div className="mt-24 grid lg:grid-cols-3 gap-12 items-center bg-white/10 p-12 rounded-[3rem] border border-white/20 backdrop-blur-md">
            <div className="space-y-6">
              <h4 className="text-3xl font-display font-black uppercase italic text-mustard drop-shadow-sm">Refresh Yourself</h4>
              <p className="text-white/90 font-medium">From our legendary squeezed lemonade to our early morning coffee specials, we keep you fueled from sunrise to beach party.</p>
              <div className="space-y-4">
                {BEVERAGES.map((bev, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-default border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg group-hover:bg-mustard group-hover:text-deepblue transition-all">
                        {bev.icon}
                      </div>
                      <div>
                        <div className="font-black uppercase tracking-tight text-white">{bev.name}</div>
                        {bev.note && <div className="text-[10px] text-mustard font-black uppercase tracking-widest">{bev.note}</div>}
                      </div>
                    </div>
                    <div className="font-black text-white/70">{bev.price}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              <div className="bg-mustard rounded-[2rem] p-8 text-deepblue shadow-2xl transform rotate-1 border-4 border-deepblue/10">
                <div className="flex justify-between items-start mb-6">
                  <Droplets className="w-10 h-10" />
                  <span className="bg-deepblue text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">Pro Tip</span>
                </div>
                <h5 className="text-2xl font-display font-black uppercase italic mb-4 tracking-tighter text-deepblue">Gluten-Free? No Problem!</h5>
                <p className="font-black leading-snug opacity-90">Because we only use 100% pure peanut oil and focus on hand-cut potatoes, we offer one of the few truly high-quality gluten-free treats on the boardwalk.</p>
              </div>
              
              <div className="bg-classicred rounded-[2rem] p-8 text-white shadow-2xl transform -rotate-1 border-4 border-white/10">
                <div className="flex justify-between items-start mb-6">
                  <Star className="w-10 h-10 text-mustard" />
                  <span className="bg-white text-classicred text-[10px] font-black uppercase px-3 py-1 rounded-full">Famous</span>
                </div>
                <h5 className="text-2xl font-display font-black uppercase italic mb-4 tracking-tighter">100% Health Rating</h5>
                <p className="font-black leading-snug">We take pride in our kitchen. For 14 years straight, we have held a perfect 100% score from the health department. Quality you can trust.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mug Program (VIP Section) */}
      <section id="the-mug" className="py-20 md:py-32 px-6 relative bg-sand overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10 md:space-y-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-40 h-40 md:w-48 md:h-48 bg-mustard rounded-full flex items-center justify-center relative shadow-2xl"
          >
            <CupSoda className="w-24 h-24 text-deepblue" />
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-4 border-2 border-dashed border-mustard rounded-full" 
            />
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-extrabold uppercase italic tracking-tighter text-classicred">
              Refills For <br />
              <span className="text-deepblue underline decoration-mustard underline-offset-8 transition-all hover:decoration-classicred cursor-default">Life</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-deepblue/80">
              Purchase our 32 oz. souvenir mug and get <span className="text-classicred">50-cent refills</span> forever. No expiring dates. No catches. Just beach tradition.
            </p>
            <div className="pt-8 space-y-6 w-full max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Email or Phone Number" 
                  className="w-full px-6 py-4 rounded-full bg-white border-2 border-deepblue/10 focus:border-classicred outline-none font-bold text-center transition-all shadow-sm"
                />
                <button className="bg-deepblue text-white py-5 px-16 rounded-full font-extrabold uppercase text-xl shadow-2xl hover:bg-classicred hover:scale-105 transition-all active:scale-95">
                  Join the VIP Club
                </button>
              </div>
              <div className="p-4 bg-white/50 rounded-2xl border border-deepblue/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-deepblue/60 leading-relaxed text-center">
                  You are submitting your information to Boardwalk Fries. By providing your phone number, you are requesting to receive marketing text messages. Message and data rates may apply.
                </p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-50">Authorized for use at 97 Garfield Parkway Only</p>
            </div>
          </div>
        </motion.div>

        {/* Floating Beach Icons Overlay */}
        <div className="absolute bottom-20 right-10 opacity-10 animate-pulse">
          <History className="w-24 h-24" />
        </div>
      </section>

      {/* Visit Us Section */}
      <section id="find-us" className="py-20 md:py-32 px-6 border-t border-deepblue/10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-display font-extrabold uppercase italic tracking-tighter leading-none">
                On the <span className="text-mustard">Boardwalk</span> <br />
                Since Day One
              </h2>
              <p className="text-xl font-medium text-deepblue/70">
                You can't miss us. We're right where the action is, smelling of fresh sea salt and golden fries.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-deepblue text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] opacity-60 mb-1">Our Address</h4>
                  <p className="font-bold text-lg leading-tight">
                    97 Garfield Parkway <br />
                    Bethany Beach, DE 19930
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-classicred text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] opacity-60 mb-1">Seasonal Hours</h4>
                  <p className="font-bold text-lg leading-tight">
                    Daily 8AM – 10PM <br />
                    <span className="text-sm opacity-80">(Easter to Labor Day)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-mustard text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] opacity-60 mb-1">Call Ahead</h4>
                  <p className="font-bold text-lg leading-tight">
                    (302) 470-1924
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-deepblue text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                   <Droplets size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] opacity-60 mb-1">The Original</h4>
                  <p className="font-bold text-lg leading-tight">
                    Established 1997
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            href="https://www.google.com/maps/search/?api=1&query=Boardwalk+Fries+Bethany+Beach+97+Garfield+Parkway+Bethany+Beach+DE+19930"
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] lg:h-auto border-8 border-white group block"
          >
            <img 
              src="/boardwalk.jpeg" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Bethany Beach"
            />
            <div className="absolute inset-0 bg-deepblue/20 group-hover:bg-deepblue/10 transition-colors" />
            
            <div className="absolute top-8 right-8 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
              <div className="bg-mustard text-deepblue px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center gap-2 border-2 border-white/20">
                <MapPin size={12} className="animate-bounce" /> Click to view map
              </div>
            </div>

            <div className="absolute bottom-8 right-8 left-8 p-6 glass rounded-2xl text-white translate-y-0 group-hover:-translate-y-2 transition-transform">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] mb-1">See you soon</div>
                  <div className="text-2xl font-display font-extrabold uppercase italic tracking-tighter">Boardwalk Landmark</div>
                </div>
                <MapPin className="text-mustard" size={32} />
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deepblue text-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4 text-left min-w-[200px]">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                <img src="/icon.png" alt="Boardwalk Fries Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tighter uppercase whitespace-nowrap transition-colors">
                Boardwalk <span className="text-mustard group-hover:text-classicred transition-colors">Fries</span>
              </span>
            </a>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
              Bethany Beach's Original <br /> Landmark since 1997.
            </p>
          </div>
 
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-8 text-xs uppercase tracking-widest font-black">
            <div className="space-y-4">
              <h5 className="text-mustard opacity-50 text-[10px]">Explore</h5>
              <div className="flex flex-col gap-3">
                <a href="#our-story" className="hover:text-mustard transition-colors">Story</a>
                <a href="#menu" className="hover:text-mustard transition-colors">Menu</a>
                <a href="#the-mug" className="hover:text-mustard transition-colors">VIP</a>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-mustard opacity-50 text-[10px]">Legal</h5>
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:text-mustard transition-colors">Privacy</a>
                <a href="#" className="hover:text-mustard transition-colors">Terms</a>
              </div>
            </div>
            <div className="space-y-4 col-span-2">
              <h5 className="text-mustard opacity-50 text-[10px]">Location</h5>
              <div className="flex flex-col gap-2 font-bold text-white tracking-tight normal-case text-base">
                <p>97 Garfield Parkway</p>
                <p>Bethany Beach, DE 19930</p>
                <p className="text-mustard">(302) 470-1924</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center border-t border-white/5 mt-10 gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            © 1997—2026 Boardwalk Fries Bethany Beach.
          </p>
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
              <Heart size={12} className="text-classicred" /> Made for the Boardwalk
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
