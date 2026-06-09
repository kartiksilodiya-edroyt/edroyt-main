'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-edroyt-dark">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-green/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Lorem Ipsum <span className="gradient-text">Dolor Sit Amet</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-edroyt-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass rounded-2xl p-7 md:p-9 border border-white/5">
                <h2 className="text-2xl font-bold text-white mb-2">Lorem Ipsum Dolor</h2>
                <p className="text-gray-500 text-sm mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                      <Input placeholder="Lorem" className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                      <Input placeholder="Ipsum" className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Work Email</label>
                    <Input type="email" placeholder="lorem@company.com" className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Company</label>
                    <Input placeholder="Lorem Ipsum Corp" className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Service Needed</label>
                    <select className="w-full h-11 px-4 bg-edroyt-dark/80 border border-white/10 rounded-md text-white focus:border-edroyt-green focus:outline-none text-sm">
                      <option value="">Select a service…</option>
                      <option>Custom Software Development</option>
                      <option>Web Development</option>
                      <option>Mobile Development</option>
                      <option>AI & Automation</option>
                      <option>Cloud & DevOps</option>
                      <option>UI/UX Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Budget Range</label>
                    <select className="w-full h-11 px-4 bg-edroyt-dark/80 border border-white/10 rounded-md text-white focus:border-edroyt-green focus:outline-none text-sm">
                      <option value="">Select budget range…</option>
                      <option>$25,000 – $50,000</option>
                      <option>$50,000 – $100,000</option>
                      <option>$100,000 – $250,000</option>
                      <option>$250,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Details</label>
                    <Textarea
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit…"
                      rows={5}
                      className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-edroyt-green hover:bg-edroyt-green-secondary text-white h-12 text-sm font-semibold shadow-lg shadow-edroyt-green/20">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
              {/* Contact details */}
              <div className="glass rounded-2xl p-7 border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Lorem Ipsum Dolor</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email Us', value: 'hello@edroyt.com', href: 'mailto:hello@edroyt.com' },
                    { icon: Phone, label: 'Call Us', value: '+1 (415) 555-1234', href: 'tel:+14155551234' },
                    { icon: MapPin, label: 'Visit Us', value: '123 Lorem Street, Suite 400\nSan Francisco, CA 94102', href: null },
                    { icon: Clock, label: 'Business Hours', value: 'Monday – Friday\n9:00 AM – 6:00 PM PST', href: null },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-edroyt-green/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-edroyt-green-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-gray-300 hover:text-edroyt-green-accent text-sm transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-300 text-sm whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="glass rounded-2xl p-7 border border-white/5">
                <h2 className="text-xl font-bold text-white mb-5">Lorem Ipsum Dolor Sit</h2>
                <div className="space-y-3.5">
                  {[
                    { num: '01', title: 'Lorem Ipsum', desc: 'Consectetur adipiscing elit' },
                    { num: '02', title: 'Dolor Sit Amet', desc: 'Aenean commodo ligula' },
                    { num: '03', title: 'Consectetur', desc: 'Donec quam felis ultricies' },
                    { num: '04', title: 'Adipiscing Elit', desc: 'Nulla consequat massa quis' },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3.5">
                      <span className="text-xs font-mono text-edroyt-green/60 w-6 pt-0.5">{item.num}</span>
                      <div>
                        <span className="text-white text-sm font-semibold">{item.title}</span>
                        <span className="text-gray-600 text-xs mx-2">—</span>
                        <span className="text-gray-500 text-xs">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offices */}
              <div className="glass rounded-2xl p-7 border border-white/5">
                <h2 className="text-xl font-bold text-white mb-4">Global Offices</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { city: 'San Francisco', type: 'HQ' },
                    { city: 'New York', type: 'Office' },
                    { city: 'London', type: 'Office' },
                    { city: 'Singapore', type: 'Office' },
                  ].map((o) => (
                    <div key={o.city} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                      <span className="text-gray-400 text-sm">{o.city}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-edroyt-green/10 text-edroyt-green-accent font-semibold">{o.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
