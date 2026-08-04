
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, User, ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import MapComponent from "@/components/ui/map-component"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Campus Location",
      content: "St Pius Rd, opp. St Pius Colony, Mulund West, Mumbai, Maharashtra 400080",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "Visit our beautiful campus",
      cmsKey: "contact:info_0"
    },
    {
      icon: Phone,
      title: "Contact Number",
      content: "+91 (22) 2561-XXXX",
      color: "from-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
      description: "Available 8 AM - 4 PM",
      cmsKey: "contact:info_1"
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "admissions@stpiusmulund.com",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      description: "Quick response guaranteed",
      cmsKey: "contact:info_2"
    },
  ]

  const workingHours = [
    { day: "Monday - Friday", time: "8:00 AM - 4:00 PM", icon: "📚", cmsKey: "contact:hours_0" },
    { day: "Saturday", time: "9:00 AM - 2:00 PM", icon: "📝", cmsKey: "contact:hours_1" },
    { day: "Sunday", time: "Closed", icon: "🏖️", cmsKey: "contact:hours_2" },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-24 bg-white overflow-hidden"
      data-cms-page="contact"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 text-blue-600 font-bold uppercase tracking-widest text-sm mb-6">
            <MessageSquare size={14} />
<span data-cms="contact-section:title">Get Connected</span>
            <Sparkles size={12} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-cms="contact:subtitle">
            Let's Start Your Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" data-cms="contact:description">
            Have questions about admissions, facilities, or programs? Our team is here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative flex-1 flex flex-col"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${info.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                  <div className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 flex-1 flex flex-col justify-center">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${info.gradient} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1" data-cms={`${info.cmsKey}:title`}>{info.title}</h3>
                        <p className="text-gray-900 font-semibold text-base sm:text-lg mb-2 break-words" data-cms={`${info.cmsKey}:content`}>{info.content}</p>
                        <p className="text-sm text-gray-500" data-cms={`${info.cmsKey}:description`}>{info.description}</p>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-full"
          >
            {/* Form Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" data-cms="contact:form_title">Send Us a Message</h3>
                    <p className="text-blue-100" data-cms="contact:form_subtitle">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white mb-6">
                        <CheckCircle size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Thank you for reaching out. Our admissions team will contact you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="group">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                            <div className="flex items-center gap-2">
                              <User size={14} />
                              <span data-cms="contact:label_name">Full Name</span>
                            </div>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onFocus={() => setActiveField("name")}
                              onBlur={() => setActiveField(null)}
                              required
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                              placeholder="Enter your full name"
                            />
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 transition-transform duration-300 ${activeField === "name" ? "scale-x-100" : ""}`}></div>
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                            <div className="flex items-center gap-2">
                              <Mail size={14} />
                              <span data-cms="contact:label_email">Email Address</span>
                            </div>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onFocus={() => setActiveField("email")}
                              onBlur={() => setActiveField(null)}
                              required
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                              placeholder="your@email.com"
                            />
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 transition-transform duration-300 ${activeField === "email" ? "scale-x-100" : ""}`}></div>
                          </div>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="group">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span data-cms="contact:label_phone">Phone Number</span>
                          </div>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setActiveField("phone")}
                            onBlur={() => setActiveField(null)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                            placeholder="+91 XXXXXXXXXX"
                          />
                          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300 ${activeField === "phone" ? "scale-x-100" : ""}`}></div>
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="group">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                          <div className="flex items-center gap-2">
                            <MessageSquare size={14} />
                            <span data-cms="contact:label_message">Your Message</span>
                          </div>
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setActiveField("message")}
                            onBlur={() => setActiveField(null)}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 resize-none"
                            placeholder="Tell us about your inquiry..."
                          />
                          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 transition-transform duration-300 ${activeField === "message" ? "scale-x-100" : ""}`}></div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                      >
                        {/* Button Background Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                        {/* Button Content */}
                        <span className="relative z-10 text-lg">
                          {submitted ? "Message Sent!" : "Send Message"}
                        </span>
                        <Send className={`w-5 h-5 relative z-10 transform transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />

                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      </motion.button>

                      {/* Privacy Notice */}
                      <p className="text-center text-sm text-gray-500 pt-4">
                        By submitting, you agree to our{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                          Privacy Policy
                        </a>
                        . We respect your privacy and never share your information.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map/Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-cms="contact:visit_title">Visit Our Campus</h3>
                <p className="text-lg text-gray-600 leading-relaxed" data-cms="contact:visit_description">
                  Experience our state-of-the-art facilities firsthand. Our campus is designed to foster creativity, innovation, and holistic development for all students.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mt-1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1" data-cms="contact:location_title">Location</h4>
                    <p className="text-gray-600" data-cms="contact:location_address">
                      St Pius Rd, opp. St Pius Colony,<br />
                      Mulund West, Mumbai, Maharashtra 400080
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mt-1">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1" data-cms="contact:visiting_hours_title">Visiting Hours</h4>
                    <p className="text-gray-600" data-cms="contact:visiting_hours_text">
                      Monday to Friday: 9:00 AM - 3:00 PM<br />
                      Saturday: 9:00 AM - 12:00 PM (By appointment)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-white rounded-[2rem] p-3 md:p-5 border border-gray-100 shadow-2xl relative z-10">
                <div className="w-full h-[280px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl relative border border-gray-100">
                  <MapComponent
                    position={[19.1666893, 72.9472618]}
                    googleMapsUrl="https://www.google.com/maps/place/St.+Pius+X+High+School,+Mulund/@19.1666893,72.9472618,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b8f5e593f299:0xc96059fd45df2518!8m2!3d19.1666893!4d72.9472618!16s%2Fm%2F010fb5x7!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIxNy4wIKXMDSoASAFQAw%3D%3D"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -50px); }
          66% { transform: translate(-20px, 20px); }
        }
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}