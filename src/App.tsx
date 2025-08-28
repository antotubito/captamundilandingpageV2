import React, { useState } from 'react';
import { Mail, ArrowRight, Zap, Target, Rocket, CheckCircle, Users, MapPin, Handshake, Network, Store, Home, Coffee } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Google Apps Script Web App URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxk4rnDoCgbalMZF0oLRUEJPKTqaz1ynRrANudt9pbplxOe4-Oe5J_IMYCMdQC_fWmg/exec';
    const payload = {
      email: email,
      timestamp: new Date().toISOString(),
      source: 'Captamundi Landing Page'
    };
    
    console.log('Submitting email:', email);
    
    try {
      // First, test if the script is accessible with a GET request
      console.log('Testing script accessibility...');
      const testResponse = await fetch(scriptUrl, {
        method: 'GET',
        mode: 'no-cors'
      });
      console.log('GET test response:', testResponse);
      
      // Now try the actual POST request
      console.log('Sending POST request...');
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('POST response:', response);
      console.log('Response status:', response.status);
      console.log('Response type:', response.type);
      
      // With no-cors mode, we can't read the response, but if we get here, the request was sent
      if (response.type === 'opaque') {
        console.log('Request sent successfully (opaque response due to no-cors)');
        setIsSubmitted(true);
        setEmail('');
      } else {
        const responseText = await response.text();
        console.log('Response text:', responseText);
        setIsSubmitted(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      // Try alternative approach with form submission
      console.log('Trying alternative form submission method...');
      try {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = scriptUrl;
        form.target = '_blank';
        
        const emailInput = document.createElement('input');
        emailInput.type = 'hidden';
        emailInput.name = 'email';
        emailInput.value = email;
        form.appendChild(emailInput);
        
        const timestampInput = document.createElement('input');
        timestampInput.type = 'hidden';
        timestampInput.name = 'timestamp';
        timestampInput.value = new Date().toISOString();
        form.appendChild(timestampInput);
        
        const sourceInput = document.createElement('input');
        sourceInput.type = 'hidden';
        sourceInput.name = 'source';
        sourceInput.value = 'Captamundi Landing Page';
        form.appendChild(sourceInput);
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        setIsSubmitted(true);
        setEmail('');
        console.log('Alternative form submission completed');
      } catch (formError) {
        console.error('Form submission also failed:', formError);
        alert('Houve um erro ao enviar o email. Tente novamente ou entre em contato diretamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  const scrollToWaitlist = () => {
    const waitlistSection = document.querySelector('form');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 py-6">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Logo placeholder - replace with your actual logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Captamundi
              </span>
            </div>
            <a 
              href="mailto:hello@captamundi.com" 
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 hidden sm:block"
            >
              hello@captamundi.com
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-4 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your business
                <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                  connection catalyst
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Strategy + connections = magic. We don't just consult, we connect you with the right people, 
                places, and opportunities to make things happen. 🚀
              </p>
            </div>

            {/* Email Signup Form */}
            <div className="max-w-md mx-auto mb-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@company.com"
                      className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      required
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Getting you in...</span>
                      </>
                    ) : (
                      <>
                        <span>Join the fun</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">You're in! 🎉</h3>
                  <p className="text-gray-600 mb-6">
                    Welcome to the Captamundi crew. We'll be in touch soon with some seriously good stuff.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-purple-600 hover:text-purple-700 underline underline-offset-4"
                  >
                    Add another email
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500">
              No spam, ever. Just occasional updates and insights that might actually be useful.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="px-4 py-16 bg-white/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                We're your business matchmakers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Think of us as your personal network on steroids. We connect dots, open doors, 
                and introduce you to exactly the right people at exactly the right time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pop-up & Retail Spaces</h3>
                <p className="text-gray-600">
                  Launching a new brand? We'll connect you with the perfect pop-up locations, 
                  from trendy neighborhoods to high-traffic malls.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Real Estate</h3>
                <p className="text-gray-600">
                  Need a reliable real estate agent who actually gets it? We know the good ones 
                  in every major city - no pushy sales, just results.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Partners</h3>
                <p className="text-gray-600">
                  Looking for co-founders, investors, or business partners? We'll introduce you 
                  to people who share your vision and energy.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Connections</h3>
                <p className="text-gray-600">
                  New to a city? We'll connect you with the local business scene, from networking 
                  events to the best coffee shops for client meetings.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Insiders</h3>
                <p className="text-gray-600">
                  Need to get in front of the right people in your industry? We know who's who 
                  and how to make those crucial introductions happen.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-600">
                  From lawyers to accountants to marketing agencies - we'll connect you with 
                  professionals who actually care about your success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How we roll</h2>
              <p className="text-lg text-gray-600">
                Three simple principles that make all the difference
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Focused</h3>
                <p className="text-gray-600">
                  We move quickly and get to the point. No fluff, no filler - just connections that count.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Network-Powered</h3>
                <p className="text-gray-600">
                  Our network is our superpower. Years of building relationships means we know exactly who you need to meet.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Relationship-First</h3>
                <p className="text-gray-600">
                  Business is about people. We focus on building genuine relationships that last way beyond any single project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Process Section */}
        <section className="px-4 py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Here's how it works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Tell us what you need</h3>
                  <p className="text-gray-600 text-sm">
                    Pop-up space? Real estate agent? Business partner? We listen and understand exactly what you're looking for.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">We work our magic</h3>
                  <p className="text-gray-600 text-sm">
                    We tap into our network, make calls, send messages, and identify the perfect matches for your specific needs.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Make it happen</h3>
                  <p className="text-gray-600 text-sm">
                    We facilitate the introduction, help with initial conversations, and make sure everyone's aligned for success.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              <strong>The best part?</strong> Most of our connections turn into long-term relationships. 
              We're not just making introductions - we\'re building your extended business family.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/20 shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Ready to expand your universe?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you need a killer location for your brand launch, a trustworthy real estate agent, 
                or connections that could change your business forever - let's make it happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToWaitlist}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Let's connect
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-700">Captamundi</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 Captamundi. Connecting dots and opening doors since today.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;