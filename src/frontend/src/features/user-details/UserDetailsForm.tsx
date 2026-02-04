import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface TouchedFields {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
}

export default function UserDetailsForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          return 'First name is required';
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          return 'Last name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field if it has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    // Clear success message when user starts editing again
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const fieldName = name as keyof FormData;
    
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    const error = validateField(fieldName, formData[fieldName]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
    });

    // Validate all fields
    const newErrors = validateForm();
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Simulate submission
    setIsSubmitting(true);
    
    // Log the form data
    console.log('Form submitted with data:', formData);

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
      setTouched({
        firstName: false,
        lastName: false,
        email: false,
      });
      setErrors({});
      setIsSubmitted(false);
    }, 3000);
  };

  const hasError = (field: keyof FormData): boolean => {
    return touched[field] && !!errors[field];
  };

  return (
    <div className="space-y-6">
      {isSubmitted && (
        <Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-950/50 dark:text-green-100">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertDescription className="ml-2">
            Form submitted successfully! Your information has been received.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError('firstName')}
            aria-describedby={hasError('firstName') ? 'firstName-error' : undefined}
            className={hasError('firstName') ? 'border-destructive focus-visible:ring-destructive' : ''}
            placeholder="Enter your first name"
          />
          {hasError('firstName') && (
            <p id="firstName-error" className="text-sm font-medium text-destructive">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError('lastName')}
            aria-describedby={hasError('lastName') ? 'lastName-error' : undefined}
            className={hasError('lastName') ? 'border-destructive focus-visible:ring-destructive' : ''}
            placeholder="Enter your last name"
          />
          {hasError('lastName') && (
            <p id="lastName-error" className="text-sm font-medium text-destructive">
              {errors.lastName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={hasError('email')}
            aria-describedby={hasError('email') ? 'email-error' : undefined}
            className={hasError('email') ? 'border-destructive focus-visible:ring-destructive' : ''}
            placeholder="your.email@example.com"
          />
          {hasError('email') && (
            <p id="email-error" className="text-sm font-medium text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
