import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Camera, FileText, Zap, Wrench, Thermometer, Droplets, Shield, Wifi } from 'lucide-react';

// Zod-like validation (simplified for this environment)
const validateForm = (data: FormData) => {
  const errors: Record<string, string> = {};
  
  if (!data.issueType) errors.issueType = 'Please select an issue type';
  if (!data.location) errors.location = 'Please select a location';
  if (!data.priority) errors.priority = 'Please select a priority level';
  if (!data.description.trim()) errors.description = 'Description is required';
  if (data.description.length < 10) errors.description = 'Description must be at least 10 characters';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

interface FormData {
  issueType: string;
  location: string;
  priority: string;
  description: string;
  files: File[];
}

const IssueReportForm = () => {
  const [formData, setFormData] = useState<FormData>({
    issueType: '',
    location: '',
    priority: '',
    description: '',
    files: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const issueTypes = [
    { value: 'electrical', label: 'Electrical Issues', icon: Zap, color: 'text-yellow-500' },
    { value: 'plumbing', label: 'Plumbing Problems', icon: Droplets, color: 'text-blue-500' },
    { value: 'hvac', label: 'HVAC/Climate Control', icon: Thermometer, color: 'text-red-500' },
    { value: 'maintenance', label: 'General Maintenance', icon: Wrench, color: 'text-gray-500' },
    { value: 'security', label: 'Security Concerns', icon: Shield, color: 'text-green-500' },
    { value: 'technology', label: 'IT/Technology', icon: Wifi, color: 'text-purple-500' },
    { value: 'other', label: 'Other', icon: FileText, color: 'text-gray-400' }
  ];

  const locations = [
    'Building A - Floor 1', 'Building A - Floor 2', 'Building A - Floor 3',
    'Building B - Floor 1', 'Building B - Floor 2', 'Building B - Floor 3',
    'Parking Garage', 'Reception Area', 'Conference Rooms', 'Cafeteria',
    'Restrooms', 'Outdoor Areas', 'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600 bg-green-50 border-green-200' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { value: 'high', label: 'High Priority', color: 'text-red-600 bg-red-50 border-red-200' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-800 bg-red-100 border-red-300' }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // 5MB limit
    });
    
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles].slice(0, 5) // Max 5 files
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleSubmit = async () => {
    
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowToast(true);
    
    // Reset form
    setFormData({
      issueType: '',
      location: '',
      priority: '',
      description: '',
      files: []
    });
    
    // Hide toast after 5 seconds
    setTimeout(() => setShowToast(false), 5000);
  };

  const selectedIssueType = issueTypes.find(type => type.value === formData.issueType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Issue Reporting</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Report an Issue</h1>
          <p className="text-gray-600">Help us maintain a better workspace for everyone</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Issue Type */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Issue Type *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {issueTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('issueType', type.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:scale-105 ${
                    formData.issueType === type.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <type.icon className={`w-5 h-5 ${type.color}`} />
                    <span className="font-medium text-sm">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {errors.issueType && <p className="text-red-500 text-sm">{errors.issueType}</p>}
          </div>

          {/* Location and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Location *</label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-200"
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Priority Level *</label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-200"
              >
                <option value="">Select priority</option>
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
              {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Photos (Optional)</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drop photos here or click to upload</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB each (max 5 files)</p>
              </label>
            </div>

            {/* File Preview */}
            {formData.files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {formData.files.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={5}
              placeholder="Please describe the issue in detail..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors duration-200 resize-none"
            />
            <div className="flex justify-between items-center">
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <p className="text-sm text-gray-500 ml-auto">{formData.description.length}/500</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Report...</span>
              </div>
            ) : (
              'Submit Issue Report'
            )}
          </button>
        </div>

        {/* Success Summary */}
        {selectedIssueType && formData.location && formData.priority && (
          <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Report Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <selectedIssueType.icon className={`w-4 h-4 ${selectedIssueType.color}`} />
                <span>{selectedIssueType.label}</span>
              </div>
              <p>Location: {formData.location}</p>
              <p>Priority: {priorities.find(p => p.value === formData.priority)?.label}</p>
              {formData.files.length > 0 && <p>Attachments: {formData.files.length} file(s)</p>}
            </div>
          </div>
        )}
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-in z-50">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-semibold">Issue Reported Successfully!</p>
            <p className="text-sm opacity-90">We'll get back to you within 24 hours.</p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default IssueReportForm;