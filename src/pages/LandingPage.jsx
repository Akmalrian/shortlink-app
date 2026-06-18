import { Link } from 'react-router-dom'
import Logo from '../component/atoms/Logo'
import Button from '../component/atoms/Button'

function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo size="lg" />
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
          <a href="#features" className="hover:text-gray-900 transition-colors text-blue-500">Features</a>
          <a href="#how" className="hover:text-gray-900 transition-colors">How it works</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-semibold text-blue-600 hover:text-gray-900 transition-colors">
            Log In
          </Link>
          <Link to="/register">
            <Button size="md">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
        <img src={icon} alt={icon} />
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

// Pastikan menambahkan Tailwind CSS yang diperlukan untuk gradasi dan layout
function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      {/* HERO SECTION - Diperbarui agar lebih mirip */}
      <section className="pt-20 pb-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Shorten URLs. <span className="text-blue-600">Share Easily.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Create short, memorable links for your team communications. 
          Transform long, cumbersome URLs into powerful digital assets that drive engagement.
        </p>

        {/* Input Bar ala Gambar */}
        <div className="max-w-xl mx-auto flex gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <input 
            type="text" 
            placeholder="https://very-long-architectural-url.com/asset-id-89238-x1" 
            className="flex-1 px-4 py-2 text-sm outline-none"
          />
          <button className="bg-blue-700 text-white px-6 py-2 rounded font-medium hover:bg-blue-800">
            Shorten
          </button>
        </div>
      </section>

      {/* ARCHITECTURAL FEATURES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Architectural Features</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Built for Enterprise Precision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="/EasyCreate.svg" title="Easy Create" desc="Instantly generate high-performance short links with a single click or through our surgical API endpoints." />
            <FeatureCard icon="/CustomSlugs.svg" title="Custom Slugs" desc="Maintain brand authority with readable, custom link endings that resonate with your digital audience." />
            <FeatureCard icon="/TeamReady.svg" title="Team Ready" desc="Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards." />
          </div>
        </div>
      </section>

      {/* DATA DRIVEN INSIGHTS SECTION - Sesuai gambar */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <img src="/Landing.png" alt="Analytics" className="rounded-2xl shadow-2xl" />
          </div>
          <div className="flex-1 bg-white">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Data Driven Insights</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Observe your link architecture in real-time.</h2>
            <p className="text-gray-500 mb-8">Every click is a data point. Our dashboard provides surgical precision into where your traffic originates, who is engaging, and how your team communications are performing across the globe.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium"><img src="/Checklist.svg" alt="" /> Geographic Distribution Maps</li>
              <li className="flex items-center gap-3 font-medium"><img src="/Checklist.svg" alt="" /> Device & Browser Breakdown</li>
              <li className="flex items-center gap-3 font-medium"><img src="/Checklist.svg" alt="" /> UTM Parameter Tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-sm text-gray-500">
          <p>© 2024 ShortLink. The Digital Architect.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span><span>Terms of Service</span><span>API Documentation</span><span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage