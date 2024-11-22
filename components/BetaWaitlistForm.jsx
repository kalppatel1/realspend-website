import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BetaWaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit it
      setSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-white mb-2">Join our Beta Waitlist</h2>
        <p className="text-lg text-gray-300">Secure your spot and get early access to RealSpend</p>
      </div>

      {submitted && (
        <Alert className="mb-6 bg-green-800 text-white border-green-700">
          <CheckCircle2 className="h-5 w-5" />
          <AlertDescription>
            Thanks for joining! We'll be in touch soon.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full p-4 bg-transparent border-2 rounded-lg text-white placeholder-gray-400
              ${errors.name ? 'border-red-500' : 'border-gray-600'} 
              focus:border-green-500 focus:outline-none transition-colors`}
          />
          {errors.name && (
            <div className="flex items-center mt-2 text-red-500">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm">{errors.name}</span>
            </div>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
            className={`w-full p-4 bg-transparent border-2 rounded-lg text-white placeholder-gray-400
              ${errors.email ? 'border-red-500' : 'border-gray-600'}
              focus:border-green-500 focus:outline-none transition-colors`}
          />
          {errors.email && (
            <div className="flex items-center mt-2 text-red-500">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-sm">{errors.email}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg 
            transition-colors duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BetaWaitlistForm;