import { useState } from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const genderOptions = ["Man", "Woman", "Non-binary"];
const ageOptions = ["18-25", "26-35", "36-45", "46+"];
const activities = ["Outdoor & Fitness", "Arts & Creativity", "Gaming & Tech", "Dining & Nightlife"];
const drinking = ["Frequently out", "Casual & Social", "Non-drinker & Homebody"];
const career = ["Highly ambitious & career-focused", "Work to live & prioritize personal life"];
const yesNoQuestions = [
  "On a Friday evening, do you typically prefer staying in with a movie over going out to a lively social venue?",
  "Do you prefer having your weekends planned out ahead of time rather than leaving things completely open to spontaneous ideas?",
  "When you attend social gatherings, do you find large groups energizing rather than draining?",
  "In relationships, do you tend to speak your mind immediately rather than processing your thoughts quietly first?",
];

function ChoiceButton({ children, selected, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded border px-5 py-3 font-label-sm text-label-sm transition-all ${
        selected
          ? "border-primary bg-primary/15 text-primary shadow-[0_0_18px_rgba(255,172,233,0.18)]"
          : "border-outline/80 bg-surface-container-low text-on-background hover:border-primary hover:text-primary"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function TextField({ label, type = "text", placeholder }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="font-label-sm text-label-sm uppercase text-primary/90">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-14 rounded border border-outline-variant bg-surface-container-low px-5 font-body-md text-body-md text-on-background outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary"
      />
    </label>
  );
}

function StepTabs({ step, setStep }) {
  const steps = [
    ["identity", "1", "Identity"],
    ["questions", "2", "Questionnaire"],
  ];

  return (
    <div className="grid grid-cols-2 border-b border-white/10">
      {steps.map(([id, number, label]) => {
        const active = step === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setStep(id)}
            className={`relative flex min-h-24 items-center justify-center gap-3 font-label-sm text-label-sm uppercase transition-colors ${
              active ? "text-primary" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {active && <span className="absolute left-0 top-0 h-1 w-full bg-primary" />}
            <span
              className={`grid size-10 place-items-center rounded-full ${
                active ? "bg-primary text-on-primary shadow-[0_0_24px_rgba(255,172,233,0.45)]" : "bg-surface-container text-on-surface-variant"
              }`}
            >
              {number}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function RegistrationPage() {
  const [step, setStep] = useState("identity");
  const [answers, setAnswers] = useState({});

  const selectAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main className="relative overflow-hidden px-margin-mobile pb-28 pt-32 md:px-margin-desktop">
        <div className="absolute inset-x-0 top-16 h-[620px] bg-[radial-gradient(circle_at_center,rgba(248,55,224,0.13),transparent_58%)]" />
        <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Begin Your Journey</span>
          <h1 className="mt-5 font-display-lg text-[44px] leading-tight text-on-background md:text-display-lg">
            Create Your <span className="text-gradient italic">Mystery</span>
          </h1>
          <p className="mt-5 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Your journey toward a meaningful connection begins behind the veil of anonymity.
          </p>
        </section>

        <section className="relative mx-auto mt-16 w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-surface/70 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <StepTabs step={step} setStep={setStep} />

          {step === "identity" ? (
            <div className="p-8 md:p-16">
              <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
                <div className="text-left">
                  <h2 className="font-headline-md text-headline-md text-on-background">Essential Origins</h2>
                  <p className="mt-8 max-w-sm font-body-md text-body-md text-on-surface-variant">
                    Before we ask your identity, we must know the truth of it. These details are used for verification purposes only.
                  </p>
                </div>

                <div className="grid gap-6">
                  <TextField label="First Name" placeholder="Your name" />
                  <TextField label="Last Name" placeholder="Your surname" />
                  <TextField label="Username" placeholder="Choose a username" />
                  <TextField label="Email Address" type="email" placeholder="email@luxury.com" />
                  <TextField label="Password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="mt-14 flex justify-end border-t border-white/10 pt-10">
                <button
                  type="button"
                  onClick={() => setStep("questions")}
                  className="inline-flex min-h-14 items-center gap-5 rounded-full bg-primary-container px-10 font-label-sm text-label-sm uppercase text-on-primary-container shadow-[0_0_24px_rgba(248,55,224,0.35)] transition-all hover:opacity-90"
                >
                  Continue Journey
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-10 p-8 md:p-16">
              <div className="text-center">
                <h2 className="font-display-lg text-[40px] leading-tight text-primary md:text-display-lg">The Veil of Identity</h2>
                <p className="mx-auto mt-4 max-w-2xl font-body-md text-body-md text-on-surface-variant">
                  Step 2: Define your chemistry. Anonymity is preserved until a mutual spark is ignited.
                </p>
              </div>

              <section className="border-l-4 border-secondary rounded-r-lg border-y border-r border-white/10 bg-surface-container-lowest p-7 text-left">
                <h3 className="font-headline-md text-headline-md text-secondary">Discovery Parameters</h3>
                <div className="mt-7 space-y-6">
                  <div>
                    <p className="mb-3 font-label-sm text-label-sm uppercase text-on-surface-variant">Looking For</p>
                    <div className="flex flex-wrap gap-4">
                      {genderOptions.map((option) => (
                        <ChoiceButton key={option} selected={answers.gender === option} onClick={() => selectAnswer("gender", option)}>
                          {option}
                        </ChoiceButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 font-label-sm text-label-sm uppercase text-on-surface-variant">Preferred Age Range</p>
                    <div className="flex flex-wrap gap-4">
                      {ageOptions.map((option) => (
                        <ChoiceButton key={option} selected={answers.age === option} onClick={() => selectAnswer("age", option)}>
                          {option}
                        </ChoiceButton>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-3 block font-label-sm text-label-sm uppercase text-on-surface-variant">Primary Language</span>
                    <select
                      className="h-14 w-full rounded border border-outline-variant bg-surface-container-low px-4 font-body-md text-body-md text-on-background outline-none focus:border-primary"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Language...</option>
                      <option>English</option>
                      <option>Sinhala</option>
                      <option>Tamil</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="border-l-4 border-primary rounded-r-lg border-y border-r border-white/10 bg-surface-container-lowest p-7 text-left">
                <h3 className="font-headline-md text-headline-md text-primary">Lifestyle Alignment</h3>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {yesNoQuestions.map((question, index) => (
                    <div key={question} className="rounded border border-white/10 bg-surface-container-low p-5">
                      <p className="min-h-20 font-body-md text-body-md font-semibold text-on-background">{question}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {["Yes", "No"].map((option) => (
                          <ChoiceButton key={option} selected={answers[`q${index}`] === option} onClick={() => selectAnswer(`q${index}`, option)}>
                            {option}
                          </ChoiceButton>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border-l-4 border-primary rounded-r-lg border-y border-r border-white/10 bg-surface-container-lowest p-7 text-left">
                <h3 className="font-headline-md text-headline-md text-primary">Core Essence</h3>
                <div className="mt-7 space-y-8">
                  <div>
                    <p className="mb-4 font-body-md text-body-md font-semibold text-on-background">Select the activity that best describes your ideal free time:</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {activities.map((option) => (
                        <ChoiceButton key={option} selected={answers.activity === option} onClick={() => selectAnswer("activity", option)} className="w-full">
                          {option}
                        </ChoiceButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 font-body-md text-body-md font-semibold text-on-background">What is your primary relationship with drinking/nightlife?</p>
                    <div className="grid gap-4">
                      {drinking.map((option) => (
                        <ChoiceButton key={option} selected={answers.drinking === option} onClick={() => selectAnswer("drinking", option)} className="w-full text-left">
                          {option}
                        </ChoiceButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 font-body-md text-body-md font-semibold text-on-background">Which philosophy aligns closest with your professional career?</p>
                    <div className="grid gap-4">
                      {career.map((option) => (
                        <ChoiceButton key={option} selected={answers.career === option} onClick={() => selectAnswer("career", option)} className="w-full text-left">
                          {option}
                        </ChoiceButton>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col-reverse items-center justify-between gap-5 pt-4 md:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("identity")}
                  className="font-label-sm text-label-sm uppercase text-on-surface-variant transition-colors hover:text-primary"
                >
                  Back to Details
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-14 items-center gap-5 rounded-full bg-primary-container px-10 font-label-sm text-label-sm uppercase text-on-primary-container shadow-[0_0_24px_rgba(248,55,224,0.35)] transition-all hover:opacity-90"
                >
                  Complete Registration
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
