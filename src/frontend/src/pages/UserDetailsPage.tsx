import UserDetailsForm from '../features/user-details/UserDetailsForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              User Details
            </h1>
            <p className="text-lg text-muted-foreground">
              Please fill in your information below
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Personal Information</CardTitle>
              <CardDescription>
                All fields marked with an asterisk (*) are required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserDetailsForm />
            </CardContent>
          </Card>

          <footer className="mt-12 text-center text-sm text-muted-foreground">
            © 2026. Built with{' '}
            <span className="inline-block text-destructive">♥</span> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
