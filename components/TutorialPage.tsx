import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';

interface TutorialPageProps {
  onBack: () => void;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ onBack }) => {
  const configUrl = "https://s33.picofile.com/d/8485586518/b12de498-a6bd-409b-97eb-e3a819600e0e/SAM_VPN_Config_V5.ovpn";

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
        <ChevronLeftIcon />
        <span>بازگشت به صفحه اصلی</span>
      </button>

      <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 space-y-8">
        <h2 className="text-4xl font-extrabold text-white text-center">آموزش اتصال به سرویس</h2>
        
        <div className="space-y-6 text-slate-300 leading-loose text-lg max-w-3xl mx-auto">
            <p>برای استفاده از سرویس آنتی سم پینگ، لطفاً مراحل زیر را با دقت دنبال کنید:</p>

            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 text-slate-900 font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">1</div>
                    <div>
                        <h3 className="font-bold text-white mb-1">دانلود فایل کانفیگ</h3>
                        <p>ابتدا فایل کانفیگ OpenVPN را از لینک زیر دانلود کنید. این فایل حاوی تنظیمات اولیه برای اتصال به سرورهای ما است.</p>
                        <a 
                            href={configUrl}
                            download
                            className="mt-4 inline-flex items-center gap-3 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                        >
                            <ArrowDownTrayIcon />
                            <span>دانلود فایل کانفیگ (SAM_VPN_Config_V5.ovpn)</span>
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 text-slate-900 font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">2</div>
                    <div>
                        <h3 className="font-bold text-white mb-1">نصب OpenVPN Connect</h3>
                        <p>نرم‌افزار <a href="https://openvpn.net/client-connect-vpn-for-windows/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">OpenVPN Connect</a> را متناسب با سیستم عامل خود (Windows, macOS, Android, or iOS) از وب‌سایت رسمی OpenVPN دانلود و نصب کنید.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 text-slate-900 font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">3</div>
                     <div>
                        <h3 className="font-bold text-white mb-1">وارد کردن فایل کانفیگ</h3>
                        <p>نرم‌افزار OpenVPN Connect را باز کرده و فایل کانفیگی که دانلود کرده‌اید را در آن Import کنید. معمولاً می‌توانید فایل را کشیده و در برنامه رها کنید یا از گزینه "Import Profile" استفاده نمایید.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 text-slate-900 font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">4</div>
                    <div>
                        <h3 className="font-bold text-white mb-1">ورود اطلاعات کاربری</h3>
                        <p>پس از وارد کردن پروفایل، از شما نام کاربری (Username) و رمز عبور (Password) خواسته می‌شود. این همان اطلاعاتی است که پس از خرید سرویس دریافت کرده‌اید.</p>
                    </div>
                </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 text-slate-900 font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mt-1">5</div>
                    <div>
                        <h3 className="font-bold text-white mb-1">اتصال و لذت بردن از بازی</h3>
                        <p>روی دکمه اتصال کلیک کنید. پس از چند لحظه، شما به بهینه‌ترین سرور ما متصل خواهید شد و می‌توانید از کاهش پینگ لذت ببرید!</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-slate-700 pt-8 mt-8 flex flex-col md:flex-row items-center justify-center text-center gap-6 bg-slate-900/50 p-6 rounded-lg">
            <ChatBubbleLeftRightIcon />
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">نیاز به راهنمایی بیشتر دارید؟</h3>
                <p className="text-slate-400">اگر در هر یک از مراحل بالا با سوال یا مشکلی مواجه شدید، می‌توانید از پشتیبانی هوش مصنوعی ما کمک بگیرید. دستیار هوشمند ما ۲۴ ساعته آماده پاسخگویی است.</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TutorialPage;
