import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Search,
  BookOpen,
  MessageSquare,
  Mail,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  Shield,
  Zap,
} from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Help</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Find answers, documentation, and support for Voxudio.
        </p>
      </div>

      {/* Search help */}
      <Card className="bg-card border-white/8">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="search-help"
              placeholder="Search help articles, FAQs, and documentation..."
              className="h-10 pl-9 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-card border-white/8 transition-colors hover:border-white/20">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
              <BookOpen className="h-5 w-5 text-violet-400" />
            </div>
            <CardTitle className="font-heading mt-3 text-base">
              Documentation
            </CardTitle>
            <CardDescription className="text-xs">
              Comprehensive guides and API documentation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              id="view-docs-btn"
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              View Docs
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/8 transition-colors hover:border-white/20">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
            </div>
            <CardTitle className="font-heading mt-3 text-base">
              Community
            </CardTitle>
            <CardDescription className="text-xs">
              Join discussions and get help from other users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              id="join-community-btn"
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Join Community
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/8 transition-colors hover:border-white/20">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle className="font-heading mt-3 text-base">
              Contact Support
            </CardTitle>
            <CardDescription className="text-xs">
              Get direct help from our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              id="contact-support-btn"
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Contact Us
              <ChevronRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Frequently Asked Questions */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <HelpCircle className="h-4 w-4 text-violet-400" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-xs">
            Common questions and quick answers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              question: 'How do I start a new recording?',
              answer:
                'Navigate to the Record page in the dashboard. Configure your audio and video devices, then click "Start Recording" to begin capturing.',
            },
            {
              question: 'What file formats are supported for transcription?',
              answer:
                'We support MP3, WAV, M4A, MP4, WebM, and MOV files. For best results, use high-quality audio recordings.',
            },
            {
              question: 'How accurate is the transcription?',
              answer:
                'Our AI-powered transcription achieves 95%+ accuracy for clear audio. Accuracy may vary based on audio quality, background noise, and speaker clarity.',
            },
            {
              question: 'Can I collaborate with others on projects?',
              answer:
                'Yes! You can invite team members to your projects, assign roles, and collaborate on transcriptions in real-time.',
            },
            {
              question: 'Is my data secure and private?',
              answer:
                'Absolutely. We use end-to-end encryption for all recordings and transcriptions. Your data is never shared with third parties.',
            },
          ].map((faq, index) => (
            <div key={index}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{faq.question}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {faq.answer}
                </p>
              </div>
              {index < 4 && <Separator className="mt-4 opacity-30" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Getting started guides */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-violet-400" />
            Getting Started Guides
          </CardTitle>
          <CardDescription className="text-xs">
            Step-by-step tutorials to help you get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                icon: <Zap className="h-4 w-4" />,
                title: 'Quick Start Guide',
                description: 'Get up and running in 5 minutes',
                time: '5 min read',
              },
              {
                icon: <BookOpen className="h-4 w-4" />,
                title: 'Recording Best Practices',
                description: 'Tips for high-quality audio capture',
                time: '8 min read',
              },
              {
                icon: <Shield className="h-4 w-4" />,
                title: 'Security & Privacy',
                description: 'Understanding how we protect your data',
                time: '6 min read',
              },
            ].map((guide, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-4 py-3 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-violet-500/10 text-violet-400">
                    {guide.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{guide.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {guide.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-xs">
                    {guide.time}
                  </span>
                  <Button
                    id={`guide-${index}-btn`}
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 shrink-0 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support contact info */}
      <Alert className="border-violet-500/20 bg-violet-500/5">
        <Mail className="h-4 w-4 text-violet-400" />
        <AlertDescription className="text-xs">
          Still need help? Contact our support team at{' '}
          <a
            href="mailto:support@voxudio.com"
            className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
          >
            support@voxudio.com
          </a>{' '}
          or reach out through our community Discord server.
        </AlertDescription>
      </Alert>
    </div>
  );
}
