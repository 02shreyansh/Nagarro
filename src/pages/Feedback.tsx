import React, { useState } from 'react';
import { Star, Send, User, MessageCircle, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';

// Zod schema for feedback validation
const feedbackSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  category: z.string().min(1, 'Please select a feedback category'),
  comment: z.string().min(10, 'Please provide at least 10 characters of feedback'),
  isAnonymous: z.boolean(),
  email: z.string().email('Please enter a valid email').optional().or(z.literal(''))
});

type FeedbackData = z.infer<typeof feedbackSchema>;

// Emoji rating data
const emojiRatings = [
  { value: 1, emoji: '😞', label: 'Very Dissatisfied', color: 'text-red-500' },
  { value: 2, emoji: '😕', label: 'Dissatisfied', color: 'text-orange-500' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
  { value: 4, emoji: '😊', label: 'Satisfied', color: 'text-blue-500' },
  { value: 5, emoji: '😍', label: 'Very Satisfied', color: 'text-green-500' }
];

const feedbackCategories = [
  'Product Quality',
  'Customer Service',
  'Website Experience',
  'Delivery & Shipping',
  'Pricing',
  'General Feedback'
];

// shadcn-style components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, className = '', variant = 'default', size = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  className?: string; 
  variant?: 'default' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    ghost: 'hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 py-1 text-xs',
    lg: 'h-12 px-6 py-3 text-base'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Textarea = ({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) => (
  <textarea
    className={`flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none ${className}`}
    {...props}
  />
);

const Label = ({ children, className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

const Switch = ({ checked, onCheckedChange, className = '' }: { 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) => (
  <button
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    } ${className}`}
    onClick={() => onCheckedChange(!checked)}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// RadioGroup component for categories
const RadioGroup = ({ value, onValueChange, children, className = '' }: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`space-y-2 ${className}`}>
    {children}
  </div>
);

const RadioGroupItem = ({ value, checked, onCheckedChange, children }: {
  value: string;
  checked: boolean;
  onCheckedChange: (value: string) => void;
  children: React.ReactNode;
}) => (
  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={() => onCheckedChange(value)}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
    />
    <span className="text-sm text-gray-700">{children}</span>
  </label>
);

// Popover component for emoji ratings
const Popover = ({ children, content, isOpen, onOpenChange }: {
  children: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <div className="relative">
    <div onClick={() => onOpenChange(!isOpen)}>
      {children}
    </div>
    {isOpen && (
      <>
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => onOpenChange(false)}
        />
        <div className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-in fade-in slide-in-from-top-2">
          {content}
        </div>
      </>
    )}
  </div>
);

// Toast hook
const useToast = () => {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: 'success' | 'error' }>>([]);

  const toast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  return { toast, toasts };
};

export default function FeedbackForm() {
  const [formData, setFormData] = useState<Partial<FeedbackData>>({
    rating: 0,
    category: '',
    comment: '',
    isAnonymous: false,
    email: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRatingPopover, setShowRatingPopover] = useState(false);
  const { toast, toasts } = useToast();

  const handleInputChange = (field: keyof FeedbackData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    try {
      const dataToValidate = {
        ...formData,
        email: formData.isAnonymous ? '' : formData.email
      };
      
      if (!formData.isAnonymous && !formData.email) {
        setErrors({ email: 'Email is required when not submitting anonymously' });
        return false;
      }
      
      feedbackSchema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FeedbackData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FeedbackData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      toast('Thank you for your feedback!', 'success');
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      rating: 0,
      category: '',
      comment: '',
      isAnonymous: false,
      email: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const selectedRating = emojiRatings.find(r => r.value === formData.rating);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-in slide-in-from-right ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {toast.message}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 transform transition-all duration-700 animate-in fade-in slide-in-from-top">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
          <p className="text-gray-600 text-lg">Help us improve by sharing your experience</p>
        </div>

        {!isSubmitted ? (
          <Card className="transform transition-all duration-700 animate-in fade-in slide-in-from-bottom hover:shadow-lg">
            <CardContent>
              <div className="space-y-8">
                {/* Rating Section */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-base">
                    <Star size={20} className="text-yellow-500" />
                    How would you rate your experience? *
                  </Label>
                  
                  <Popover
                    isOpen={showRatingPopover}
                    onOpenChange={setShowRatingPopover}
                    content={
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 text-center">Rate Your Experience</h3>
                        <div className="grid grid-cols-5 gap-2">
                          {emojiRatings.map((rating) => (
                            <button
                              key={rating.value}
                              onClick={() => {
                                handleInputChange('rating', rating.value);
                                setShowRatingPopover(false);
                              }}
                              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                            >
                              <span className="text-3xl mb-1 transform group-hover:scale-110 transition-transform duration-200">
                                {rating.emoji}
                              </span>
                              <span className="text-xs text-gray-600 text-center leading-tight">
                                {rating.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    }
                  >
                    <div className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
                      formData.rating ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    } ${errors.rating ? 'border-red-500 bg-red-50' : ''}`}>
                      {formData.rating ? (
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-4xl">{selectedRating?.emoji}</span>
                          <div className="text-center">
                            <div className={`font-semibold ${selectedRating?.color}`}>
                              {selectedRating?.label}
                            </div>
                            <div className="text-sm text-gray-500">Click to change</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-2">
                          <Star size={24} className="mx-auto mb-2 text-gray-400" />
                          Click to rate your experience
                        </div>
                      )}
                    </div>
                  </Popover>
                  {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                </div>

                {/* Category Selection */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-base">
                    <MessageCircle size={20} className="text-blue-500" />
                    What's your feedback about? *
                  </Label>
                  
                  <RadioGroup
                    value={formData.category || ''}
                    onValueChange={(value) => handleInputChange('category', value)}
                    className={`border rounded-lg p-2 ${errors.category ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    {feedbackCategories.map((category) => (
                      <RadioGroupItem
                        key={category}
                        value={category}
                        checked={formData.category === category}
                        onCheckedChange={(value) => handleInputChange('category', value)}
                      >
                        {category}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                  {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                {/* Comment Section */}
                <div className="space-y-4">
                  <Label htmlFor="comment" className="text-base">
                    Tell us more about your experience *
                  </Label>
                  <Textarea
                    id="comment"
                    value={formData.comment || ''}
                    onChange={(e) => handleInputChange('comment', e.target.value)}
                    placeholder="Share your thoughts, suggestions, or concerns. Your feedback helps us improve our service..."
                    className={`min-h-[120px] ${errors.comment ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{(formData.comment || '').length} characters</span>
                    <span>Minimum 10 characters required</span>
                  </div>
                  {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
                </div>

                {/* Anonymity Toggle */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-purple-500" />
                      <div>
                        <Label className="text-base">Submit anonymously</Label>
                        <p className="text-sm text-gray-500 mt-1">
                          We won't collect your personal information
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.isAnonymous || false}
                      onCheckedChange={(checked) => {
                        handleInputChange('isAnonymous', checked);
                        if (checked) {
                          handleInputChange('email', '');
                        }
                      }}
                    />
                  </div>

                  {/* Email field (only when not anonymous) */}
                  {!formData.isAnonymous && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-left duration-300">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <User size={16} />
                        Email Address *
                      </Label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      <p className="text-xs text-gray-500">
                        We'll use this to follow up on your feedback if needed
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    size="lg"
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting Feedback...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Success Card */
          <Card className="transform transition-all duration-700 animate-in fade-in slide-in-from-bottom">
            <CardContent className="text-center py-12">
              <div className="animate-bounce mb-6">
                <CheckCircle size={64} className="mx-auto text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You for Your Feedback!
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your feedback has been received and will help us improve our service. 
                {!formData.isAnonymous && ' We\'ll reach out if we need any clarification.'}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl">{selectedRating?.emoji}</span>
                  <span className={`font-semibold ${selectedRating?.color}`}>
                    {selectedRating?.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Category: {formData.category}
                </p>
                {formData.isAnonymous && (
                  <p className="text-xs text-purple-600 mt-2 flex items-center justify-center gap-1">
                    <Shield size={12} />
                    Submitted anonymously
                  </p>
                )}
              </div>
              
              <Button onClick={resetForm} variant="secondary" size="lg">
                Submit Another Feedback
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}