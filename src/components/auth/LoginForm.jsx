import { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../UI/FormField";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to your auth API
    console.log("Login attempt:", formData);
  };

  return (
    <div className="glass-panel p-8 md:p-12 rounded-2xl shadow-2xl space-y-10 border border-white/5">
      <div className="text-center space-y-4">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
          Welcome <span className="text-gradient italic">Back</span>
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Step behind the veil and rejoin the masquerade.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <FormField
            label="Username"
            name="email"
            type="email"
            placeholder="Enter your username"
            value={formData.email}
            onChange={handleChange}
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            labelAction={
              <a href="#" className="font-label-sm text-label-sm text-primary hover:underline underline-offset-4">
                Forgot Password?
              </a>
            }
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-primary-container text-on-primary-container h-14 rounded-full font-label-sm text-label-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(248,55,224,0.3)]"
          >
            Continue Journey
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              arrow_forward
            </span>
          </button>
        </div>
      </form>

      <p className="text-center font-body-md text-body-md text-on-surface-variant pt-2">
        New to the circle?{" "}
        <Link to="/register" className="text-primary font-semibold hover:underline underline-offset-4 ml-1 transition-all">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
