import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    degree: "",
    branch: "",
    gradYear: "",
    goal: "",
    role: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Registration Complete 🎉 Roadmap Generated!");
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        <h2>Create Student Profile</h2>
        <p className="auth-subtitle">Step {step} of 3</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* STEP 1: BASIC */}
          {step === 1 && (
            <>
              <input name="name" placeholder="Full Name" onChange={handleChange} />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            </>
          )}

          {/* STEP 2: ACADEMIC */}
          {step === 2 && (
            <>
              <input name="college" placeholder="College / University" onChange={handleChange} />
              <input name="degree" placeholder="Degree (B.Tech, MCA, etc.)" onChange={handleChange} />
              <input name="branch" placeholder="Branch (CSE, IT, etc.)" onChange={handleChange} />
              <input name="gradYear" placeholder="Graduation Year" onChange={handleChange} />
            </>
          )}

          {/* STEP 3: CAREER */}
          {step === 3 && (
            <>
              <select name="goal" onChange={handleChange}>
                <option value="">Primary Goal</option>
                <option>Job</option>
                <option>Internship</option>
                <option>Higher Studies</option>
              </select>

              <select name="role" onChange={handleChange}>
                <option value="">Preferred Role</option>
                <option>Software Developer</option>
                <option>Web Developer</option>
                <option>Data Analyst</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
              </select>
            </>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="step-buttons">
            {step > 1 && (
              <button type="button" className="btn btn-ghost" onClick={prevStep}>
                Back
              </button>
            )}

            {step < 3 && (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            )}

            {step === 3 && (
              <button type="submit" className="btn btn-primary">
                Finish & Generate Roadmap
              </button>
            )}
          </div>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
