import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';

// Zod schema for form validation
const serviceRequestSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    service: z.string().min(1, 'Please select a service'),
    location: z.string().min(5, 'Please enter a detailed location'),
    date: z.string().min(1, 'Please select a date'),
    time: z.string().min(1, 'Please select a preferred time'),
    notes: z.string().optional()
});

type ServiceRequest = z.infer<typeof serviceRequestSchema>;

// shadcn-style components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
        {...props}
    />
);

const Select = ({ children, className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string }) => (
    <select
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
        {...props}
    >
        {children}
    </select>
);

const Textarea = ({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) => (
    <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
        {...props}
    />
);

const Button = ({ children, className = '', variant = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    variant?: 'default' | 'secondary';
}) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} h-10 px-4 py-2 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const Label = ({ children, className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) => (
    <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
        {children}
    </label>
);

const Alert = ({ children, className = '', variant = 'default' }: {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'success' | 'error';
}) => {
    const variants = {
        default: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800'
    };

    return (
        <div className={`rounded-lg border p-4 ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

// Toast hook simulation
const useToast = () => {
    const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: 'success' | 'error' }>>([]);

    const toast = (message: string, type: 'success' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return { toast, toasts };
};

export default function ServiceRequestForm() {
    const [formData, setFormData] = useState<Partial<ServiceRequest>>({
        name: '',
        email: '',
        phone: '',
        service: '',
        location: '',
        date: '',
        time: '',
        notes: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ServiceRequest, string>>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState<ServiceRequest | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast, toasts } = useToast();

    const services = [
        'House Cleaning',
        'Plumbing',
        'Electrical Work',
        'HVAC Maintenance',
        'Appliance Repair',
        'Gardening/Landscaping',
        'Painting',
        'Carpentry',
        'General Maintenance'
    ];

    const timeSlots = [
        '8:00 AM - 10:00 AM',
        '10:00 AM - 12:00 PM',
        '12:00 PM - 2:00 PM',
        '2:00 PM - 4:00 PM',
        '4:00 PM - 6:00 PM',
        '6:00 PM - 8:00 PM'
    ];

    const handleInputChange = (field: keyof ServiceRequest, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        try {
            serviceRequestSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof ServiceRequest, string>> = {};
                error.errors.forEach(err => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof ServiceRequest] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast('Please fix the errors in the form', 'error');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setSubmittedData(formData as ServiceRequest);
            setIsSubmitted(true);
            setIsLoading(false);
            toast('Service request submitted successfully!', 'success');
        }, 1500);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            location: '',
            date: '',
            time: '',
            notes: ''
        });
        setErrors({});
        setIsSubmitted(false);
        setSubmittedData(null);
    };

    // Get tomorrow's date as minimum selectable date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
            {/* Toast notifications */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`p-3 rounded-lg shadow-lg transform transition-all duration-300 animate-in slide-in-from-right ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {toast.message}
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 transform transition-all duration-700 animate-in fade-in slide-in-from-top">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Service Request</h1>
                    <p className="text-gray-600 text-lg">Book professional services at your convenience</p>
                </div>

                {!isSubmitted ? (
                    <Card className="transform transition-all duration-700 animate-in fade-in slide-in-from-bottom hover:shadow-lg">
                        <CardContent>
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2">
                                            <User size={16} />
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={formData.name || ''}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Enter your full name"
                                            className={errors.name ? 'border-red-500 focus:ring-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail size={16} />
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email || ''}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="Enter your email"
                                            className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="flex items-center gap-2">
                                            <Phone size={16} />
                                            Phone Number *
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone || ''}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            placeholder="Enter your phone number"
                                            className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="service">Service Type *</Label>
                                        <Select
                                            id="service"
                                            value={formData.service || ''}
                                            onChange={(e) => handleInputChange('service', e.target.value)}
                                            className={errors.service ? 'border-red-500 focus:ring-red-500' : ''}
                                        >
                                            <option value="">Select a service</option>
                                            {services.map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </Select>
                                        {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        Service Location *
                                    </Label>
                                    <Input
                                        id="location"
                                        value={formData.location || ''}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        placeholder="Enter detailed address (street, city, zip code)"
                                        className={errors.location ? 'border-red-500 focus:ring-red-500' : ''}
                                    />
                                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                                </div>

                                {/* Date and Time */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="date" className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            Preferred Date *
                                        </Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            min={minDate}
                                            value={formData.date || ''}
                                            onChange={(e) => handleInputChange('date', e.target.value)}
                                            className={errors.date ? 'border-red-500 focus:ring-red-500' : ''}
                                        />
                                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="time" className="flex items-center gap-2">
                                            <Clock size={16} />
                                            Preferred Time *
                                        </Label>
                                        <Select
                                            id="time"
                                            value={formData.time || ''}
                                            onChange={(e) => handleInputChange('time', e.target.value)}
                                            className={errors.time ? 'border-red-500 focus:ring-red-500' : ''}
                                        >
                                            <option value="">Select time slot</option>
                                            {timeSlots.map(slot => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </Select>
                                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes || ''}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                        placeholder="Any specific requirements or additional information..."
                                        rows={3}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full sm:w-auto px-8 py-3 text-base"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Service Request'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    /* Success Status Card */
                    <div className="space-y-6 transform transition-all duration-700 animate-in fade-in slide-in-from-bottom">
                        <Alert variant="success" className="animate-pulse">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={24} className="text-green-600" />
                                <div>
                                    <h3 className="font-semibold text-lg">Request Submitted Successfully!</h3>
                                    <p>We'll contact you soon to confirm your service appointment.</p>
                                </div>
                            </div>
                        </Alert>

                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Service Request Details</h2>
                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Pending Review
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="font-medium text-gray-600">Name:</span>
                                            <p className="text-gray-900">{submittedData?.name}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Email:</span>
                                            <p className="text-gray-900">{submittedData?.email}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Phone:</span>
                                            <p className="text-gray-900">{submittedData?.phone}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Service:</span>
                                            <p className="text-gray-900 font-semibold">{submittedData?.service}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <span className="font-medium text-gray-600">Location:</span>
                                            <p className="text-gray-900">{submittedData?.location}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Date:</span>
                                            <p className="text-gray-900">{submittedData?.date}</p>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Time:</span>
                                            <p className="text-gray-900">{submittedData?.time}</p>
                                        </div>
                                        {submittedData?.notes && (
                                            <div>
                                                <span className="font-medium text-gray-600">Notes:</span>
                                                <p className="text-gray-900">{submittedData.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                                    <Button onClick={resetForm} variant="secondary" className="flex-1 sm:flex-none">
                                        Submit Another Request
                                    </Button>
                                    <div className="text-sm text-gray-600 flex items-center">
                                        <span>📧 Confirmation email sent to {submittedData?.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}