#  ImagingIQ - AI-Powered Medical Diagnostics Platform

> **"Bridging the gap between Artificial Intelligence and Clinical Workflow."**

ImagingIQ is a high-fidelity, **Next.js 14** application designed to solve the "Black Box" problem in medical AI. It simulates a professional radiologist's workstation, featuring **Explainable AI (XAI)** visualizations, HIPAA-compliant workflow simulations, and an environment-aware interface designed to reduce physician burnout.

---

##  Live Demo & Repository
- **Repo:** (https://github.com/Snehit1823/Imaging-IQ.git)

---

##  Key Features

###  Intelligent Diagnostic Workflow
- **Visual Grounding (Heatmaps):** Moves beyond text diagnosis by overlaying AI attention maps on X-rays, fostering clinician trust.
- **Simulated Neural Inference:** Realistic state-machine simulation of AI processing time with visual feedback loops.

###  Secure & Professional Architecture
- **Supabase Authentication:** Robust email/password login flow with session persistence and route protection.
- **HIPAA-Compliant UI Patterns:** "Privacy-First" design with auto-blurring patient data and secure session timeouts.
- **Role-Based Access:** Distinct states for "Guest" vs. "Verified Radiologist."

###  Environment-Aware UX
- **Dark/Light Mode:** Context-aware theming using `next-themes`. Dark mode is optimized for low-light radiology reading rooms to prevent eye strain.
- **Bento Grid Dashboard:** High-density data visualization layout for reducing cognitive load.
- **Micro-Interactions:** Staggered entrance animations and a custom cursor follower for enhanced visual affordance.

---

##  Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | Server-side rendering, routing, and app architecture. |
| **Language** | **TypeScript** | Strict type safety for patient data and user sessions. |
| **Styling** | **Tailwind CSS** | Utility-first styling with dynamic dark mode classes. |
| **Backend** | **Supabase** | Authentication, User Management, and Database. |
| **Animation** | **Framer Motion** | Complex UI transitions, scanning effects, and layout shifts. |
| **Icons** | **Lucide React** | Lightweight, medical-grade SVG iconography. |

---

##  Getting Started (Run it Locally)

Follow these steps to set up the project on your local machine.

### Prerequisites
- Node.js 18+ installed.
- A free [Supabase](https://supabase.com/) account.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/imaging-iq.git](https://github.com/your-username/imaging-iq.git)
cd imaging-iq

**2. Install Dependencies**
Bash
npm install
# or
yarn install

**3. Configure Environment Variables**
Create a .env.local file in the root directory and add your Supabase credentials:

Code snippet
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
**4. Run the Development Server**
Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

**How to Use the App (User Flow)**

**Step 1: Sign Up**
Navigate to the Sign Up page.

Enter your email and a secure password.

Important: Check your actual email inbox for a "Confirm Your Signup" link from Supabase.

Click the link to verify your account.

**Step 2: Login**
Return to the app and enter your credentials.

You will be redirected to the Dashboard via a protected route guard.

**Step 3: Run a Diagnosis**
On the Dashboard, click the large "Begin AI Analysis" zone.

Watch the AI simulation scan the "patient" data.

Review the results in the modal, including the confidence score and heatmap.

**Step 4: Explore Settings**
Click the Moon/Sun icon in the navbar to toggle between Radiology Mode (Dark) and Admin Mode (Light).
