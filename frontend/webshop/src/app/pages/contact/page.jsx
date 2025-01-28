"use client";

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(field => field === true)) {
      const queryString = new URLSearchParams(formData).toString();
      window.location.href = `/pages/contact?${queryString}`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <section>
          <header className="text-center">
            <h2 className="text-3xl font-semibold text-[#db4a2b]">Get In Touch</h2>
            <p className="mt-4 text-gray-600">
              We’d love to hear from you. Please fill out all fields, and we’ll get back to you soon!
            </p>
          </header>
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name{errors.name && <span className="text-red-500"> *</span>}
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email{errors.email && <span className="text-red-500"> *</span>}
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject{errors.subject && <span className="text-red-500"> *</span>}
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message{errors.message && <span className="text-red-500"> *</span>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  className={`w-full p-3 border rounded-lg resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                />
                <p className="text-sm text-gray-500 text-right">
                  {formData.message.length}/1000 characters
                </p>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 border-2 border-[#db4a2b] text-[#db4a2b] bg-white rounded-lg transition-colors duration-300 hover:bg-[#db4a2b] hover:text-white"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}