import React, { useState } from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { SignalIcon } from './icons/SignalIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { ZapIcon } from './icons/ZapIcon';
import { PlusIcon } from './icons/PlusIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';


interface HomePageProps {
  onJoin: () => void;
  onOpenAiChat: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-slate-800/50 rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 h-full">
        <div className="mb-4 text-cyan-400">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{children}</p>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onJoin, onOpenAiChat }) => {
  const [isSupportMenuOpen, setSupportMenuOpen] = useState(false);

  const handleTechSupportClick = () => {
    alert('برای دریافت پشتیبانی فنی، لطفاً به دیسکورد ما مراجعه کنید. (لینک در فوتر قرار داده شود)');
    setSupportMenuOpen(false);
  };
  
  const handleAiChatClick = () => {
    onOpenAiChat();
    setSupportMenuOpen(false);
  };

  return (
    <div className="space-y-28">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-20 relative overflow-hidden">
        <div 
            className="absolute inset-0 top-0 h-full bg-slate-900 -z-10" 
            style={{
                backgroundImage: 'radial-gradient(circle at top, rgba(10, 5, 40, 0.8), transparent 60%), radial-gradient(circle at bottom left, rgba(8, 145, 178, 0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.2), transparent 40%)',
            }}
        ></div>
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">
          پینگ پایین، پیروزی قطعی
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-8">
          با سرویس آنتی سم پینگ، لگ و پکت لاست را برای همیشه فراموش کنید و از یک تجربه بازی روان و بدون وقفه لذت ببرید.
        </p>
        <button
          onClick={onJoin}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          پیوستن به ما
        </button>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white">امکانات سرویس ما</h2>
            <p className="text-slate-400 mt-2">چرا آنتی سم پینگ بهترین انتخاب برای شماست؟</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<SignalIcon />} title="کاهش پکت لاست">
              سرویس ما می تواند پکت لاست شما را تا حد زیادی کاهش دهد و اتصالی پایدار برایتان فراهم کند.
            </FeatureCard>
            <FeatureCard icon={<ZapIcon />} title="پینگ ثابت">
              با مسیریابی هوشمند، پینگ شما را ثابت نگه می‌داریم تا در لحظات حساس بازی غافلگیر نشوید.
            </FeatureCard>
            <FeatureCard icon={<GlobeAltIcon />} title="سرورهای جهانی">
              ما با داشتن بیش از 5 سرور در تمام دنیا، در هر بازی و هر سروری بهترین پینگ را برای شما تضمین می‌کنیم.
            </FeatureCard>
            <FeatureCard icon={<ShieldCheckIcon />} title="رفع تحریم‌ها">
              بدون نیاز به هیچ نرم افزار جانبی، تحریم‌های بازی‌های آنلاین را برای همیشه دور بزنید.
            </FeatureCard>
        </div>
      </section>

      {/* Coverage Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white">پوشش گسترده</h2>
            <p className="text-slate-400 mt-2">از بازی‌های محبوب تا اپلیکیشن‌های روزمره</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-3">پشتیبانی از بازی‌های آنلاین</h3>
                <p className="text-slate-400 leading-relaxed">
                   ما از بسیاری از بازی‌ها که سرورهای آن‌ها در آسیا و اروپا قرار دارد، پشتیبانی می‌کنیم تا بهترین اتصال را برای شما فراهم آوریم.
                </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-3">اپلیکیشن‌های کاربردی</h3>
                <p className="text-slate-400 leading-relaxed">
                   علاوه بر بازی، سرویس ما برای بهبود ارتباط در برنامه‌هایی مانند دیسکورد و اسپاتیفای نیز بهینه شده است.
                </p>
            </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="text-center max-w-3xl mx-auto bg-slate-800/30 py-12 px-6 rounded-2xl relative overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-3xl -z-10"></div>
        <h2 className="text-4xl font-extrabold text-white mb-4">داستان ما</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-slate-300 text-lg leading-relaxed">
            تیم ما، یک تیم کوچک با هدفی بزرگ است: اینکه اندکی تجربه شما از بازی‌ها را بهتر کند. ما از سال ۱۴۰۰ فعالیت خود را در تلگرام آغاز کردیم و از آن زمان، تمام تلاش خود را برای ارائه سرویسی پایدار و با کیفیت به کار گرفته‌ایم. اعتماد شما بزرگترین سرمایه ماست.
        </p>
      </section>

      {/* Support FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
         <div 
            className={`transition-all duration-300 ease-in-out flex flex-col items-center gap-3 ${
                isSupportMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
            <button onClick={handleAiChatClick} className="bg-slate-700 w-40 h-12 rounded-lg flex items-center justify-center gap-2 text-white hover:bg-slate-600 transition-colors shadow-lg">
                <ChatBubbleLeftRightIcon />
                <span>چت با AI</span>
            </button>
             <button onClick={handleTechSupportClick} className="bg-slate-700 w-40 h-12 rounded-lg flex items-center justify-center gap-2 text-white hover:bg-slate-600 transition-colors shadow-lg">
                <WrenchScrewdriverIcon />
                <span>پشتیبانی فنی</span>
            </button>
        </div>
        <button
          onClick={() => setSupportMenuOpen(!isSupportMenuOpen)}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:opacity-90 transform transition-transform duration-300 hover:scale-110"
          aria-label="Open support menu"
          aria-expanded={isSupportMenuOpen}
        >
          <div className={`transition-transform duration-300 ease-in-out ${isSupportMenuOpen ? 'rotate-45' : ''}`}>
            <PlusIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
