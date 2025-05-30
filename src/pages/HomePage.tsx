import { ArrowRight, BarChart3, MessageSquare, Gift, FileText, Leaf, Users, Building } from 'lucide-react';

const FacilityLandingPage = () => {
  const navItems = [
    { label: 'Report', icon: FileText, color: 'from-red-500 to-pink-500' },
    { label: 'Request', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { label: 'Feedback', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
    { label: 'Rewards', icon: Gift, color: 'from-purple-500 to-violet-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 lg:py-20">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <Building className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Facility Services Portal</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Welcome to Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Smart Workspace
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of facility management with our integrated platform designed to enhance your workspace experience.
            </p>
          </div>

          {/* Quick Navigation Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 max-w-4xl mx-auto">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm">Access now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Engagement Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-4 py-2 border border-green-500/30">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">User Engagement</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Empowering Your Facility Experience
              </h2>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                Our platform transforms how you interact with facility services, creating seamless connections between users and management. From instant reporting to reward recognition, we've built an ecosystem that values your participation and enhances your daily workspace experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Real-time issue reporting and tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Streamlined service requests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Recognition and rewards program</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">94%</div>
                    <div className="text-sm text-gray-300">User Satisfaction</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">2.3k</div>
                    <div className="text-sm text-gray-300">Active Users</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">48h</div>
                    <div className="text-sm text-gray-300">Avg Response</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-2">99.2%</div>
                    <div className="text-sm text-gray-300">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Quote */}
          <div className="relative">
            <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-green-500/20 text-center">
              <div className="absolute top-4 left-4 text-6xl text-green-400/20 font-serif">"</div>
              <div className="absolute bottom-4 right-4 text-6xl text-green-400/20 font-serif rotate-180">"</div>
              
              <div className="inline-flex items-center space-x-2 mb-6">
                <Leaf className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-medium">Sustainability Vision</span>
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-light text-white mb-6 leading-relaxed max-w-4xl mx-auto">
                The greatest threat to our planet is the belief that someone else will save it. 
                <span className="block mt-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-medium">
                  Together, we build sustainable workspaces for tomorrow.
                </span>
              </blockquote>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-500/25">
                  Learn More
                </button>
                <button className="border border-green-500/50 text-green-400 px-8 py-3 rounded-full font-medium hover:bg-green-500/10 transition-colors duration-300">
                  View Impact Report
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FacilityLandingPage;