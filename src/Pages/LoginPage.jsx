import Navbar from "../components/layout/Navbar";
import LoginForm from "../components/auth/LoginForm";

const portraitImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBrHV9fp9OErpfcHDPyA4e6iU9YkNb6j1W73swYLi4dWD-rZ7DHgxCyg3u1kph6_Hbj9_tZTHAfTCjaVFdr_82zvDcMbDCsQCmWEFfcv_X59FZTEH5FzQM7p_gC51Z9YTG-MWEq5VhD97dDuEq85v91XOYuH4P89greqt_SJtkTAb9Z5zGZLKHNg0ZUTomlYtRaLbrqnkYbr-qGsT33v6Y3f9exnNGwRhZtX09IB21k3sfEFX_tOwC8zShmRNTUTjYFqtCKA3sLp7Y";

export default function LoginPage() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest via-background to-surface-container-lowest opacity-90" />
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-tertiary-container/5 blur-[100px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop">
        <div className="w-full max-w-[480px] reveal-anim">
          <LoginForm />

          <div className="mt-12 text-center space-y-6">
            <p className="font-label-sm text-label-sm text-on-surface-variant/30 tracking-[0.2em] uppercase">
              Anonymity is the ultimate luxury.
            </p>
            <div className="flex justify-center gap-8">
              <a href="#" className="font-label-sm text-label-sm text-on-surface-variant/50 hover:text-primary transition-colors uppercase tracking-widest">
                Privacy Policy
              </a>
              <a href="#" className="font-label-sm text-label-sm text-on-surface-variant/50 hover:text-primary transition-colors uppercase tracking-widest">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden lg:block fixed right-0 top-0 h-full w-[40vw] pointer-events-none opacity-30 select-none">
        <div className="h-full w-full bg-cover bg-center mix-blend-lighten grayscale" style={{ backgroundImage: `url('${portraitImg}')` }} />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/60 to-background" />
      </div>
    </div>
  );
}