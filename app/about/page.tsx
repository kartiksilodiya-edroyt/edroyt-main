'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Calendar, Users, Building, MapPin } from 'lucide-react';

const coreValues = [
  { title: 'Excellence', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { title: 'Innovation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { title: 'Integrity', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { title: 'Collaboration', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
];

const timeline = [
  { year: '2018', title: 'Lorem Ipsum Founded', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { year: '2019', title: 'Lorem Ipsum Client', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { year: '2020', title: 'Lorem Ipsum Launched', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { year: '2021', title: 'Lorem Ipsum Expansion', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { year: '2022', title: 'Lorem Ipsum Milestone', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
  { year: '2024', title: 'Lorem Ipsum Growth', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.' },
];

const team = [
  { name: 'Alexander Lorem', role: 'Founder & CEO', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Emily Ipsum', role: 'Chief Technology Officer', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Marcus Dolor', role: 'Head of Design', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Sarah Amet', role: 'VP of Engineering', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', image: 'https://images.pexels.com/photos/7749095/pexels-photo-7749095.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'James Consect', role: 'Head of Cloud & DevOps', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Lisa Adipisc', role: 'Director of AI/ML', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-edroyt-dark">

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-green/8 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-edroyt-green/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Lorem Ipsum Dolor <span className="gradient-text">Sit Amet</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-edroyt-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Lorem Ipsum Dolor Sit Amet</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed text-[15px]">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
                <p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: 'Founded', value: '2018' },
                { icon: Users, label: 'Team Size', value: '150+' },
                { icon: Building, label: 'Projects', value: '500+' },
                { icon: MapPin, label: 'Offices', value: '4 Global' },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-6 text-center card-glow">
                  <stat.icon className="w-7 h-7 text-edroyt-green-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-edroyt-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: 'Our Mission', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' },
              { icon: Eye, title: 'Our Vision', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8 card-glow border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-edroyt-green/20 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-edroyt-green-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-edroyt-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">Core Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Lorem Ipsum Dolor Sit Amet</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-glow border border-white/5">
                <h3 className="text-xl font-bold gradient-text mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-edroyt-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lorem Ipsum Dolor</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 card-glow border border-white/5 group hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img src={member.image} alt={member.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-edroyt-green/20 group-hover:ring-edroyt-green/40 transition-all" />
                  <div>
                    <h3 className="text-base font-semibold text-white">{member.name}</h3>
                    <p className="text-edroyt-green text-xs font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-edroyt-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Lorem Ipsum Dolor</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-edroyt-green/50 via-edroyt-green to-edroyt-green/50 md:-translate-x-px" />
            <div className="space-y-10">
              {timeline.map((event, index) => (
                <motion.div key={event.year} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                  className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ml-14 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                    <div className="glass rounded-xl p-5 card-glow border border-white/5 inline-block text-left md:max-w-xs">
                      <div className="text-edroyt-green font-mono text-sm font-bold mb-1">{event.year}</div>
                      <h3 className="text-base font-semibold text-white mb-1.5">{event.title}</h3>
                      <p className="text-gray-500 text-sm">{event.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-edroyt-green rounded-full -translate-x-1/2 mt-5 shadow-lg shadow-edroyt-green/40 ring-4 ring-edroyt-green/10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
