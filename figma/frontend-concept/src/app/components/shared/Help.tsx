import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { HelpCircle, Search, Book, MessageCircle, Mail, Phone, ExternalLink, FileText, Video, Download } from 'lucide-react';
import { useState } from 'react';

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Getting Started',
      icon: Book,
      questions: [
        {
          q: 'How do I submit my Learning Agreement?',
          a: 'Navigate to My Submissions in the institutional section. Click "New Submission", select "Learning Agreement" from the document type dropdown, fill in the required information, attach your document, and click "Submit". Your coordinator will be notified automatically.',
        },
        {
          q: 'How do I sign documents digitally?',
          a: 'Go to the Signatures section. You\'ll see all documents requiring your signature. Click on a document, review it carefully, and click "Sign Document". Your digital signature will be applied with a timestamp.',
        },
        {
          q: 'How can I track my mobility deadlines?',
          a: 'Visit the Deadlines section from the sidebar. You\'ll see all upcoming deadlines with color-coded priority indicators. Red indicates overdue, yellow for due soon, and blue for upcoming.',
        },
      ],
    },
    {
      category: 'Documents & Procedures',
      icon: FileText,
      questions: [
        {
          q: 'What documents do I need to submit?',
          a: 'Visit the Official Procedures section to see a complete list of required and optional documents for your mobility. Each procedure has detailed information about requirements and deadlines.',
        },
        {
          q: 'How long does document review take?',
          a: 'Most documents are reviewed within 3-5 business days. Urgent documents (marked with high priority) are typically reviewed within 24-48 hours. You\'ll receive a notification when your document status changes.',
        },
        {
          q: 'Can I edit a submitted document?',
          a: 'Once submitted, you cannot directly edit a document. If changes are needed, you can submit a revised version or contact your coordinator to reject the current submission so you can resubmit.',
        },
      ],
    },
    {
      category: 'Social Features',
      icon: MessageCircle,
      questions: [
        {
          q: 'How do I connect with other students?',
          a: 'Switch to the Community section using the toggle at the top. Use the Discover page to browse student profiles, filter by destination or interests, and send connection requests.',
        },
        {
          q: 'How can I join social events?',
          a: 'Visit the Events section in the Community area. Browse upcoming events, filter by category, and click "Join Event" to register. You\'ll receive reminders before the event starts.',
        },
        {
          q: 'Can I create my own event?',
          a: 'Yes! Go to the Events section and click "Create Event". Fill in the details, set the date and location, and publish. Other students will be able to see and join your event.',
        },
      ],
    },
    {
      category: 'Exceptions & Issues',
      icon: HelpCircle,
      questions: [
        {
          q: 'How do I request an exception?',
          a: 'Go to Exception Requests and click "New Request". Select the appropriate category, describe your situation clearly, and attach any supporting documents. Your coordinator will review and respond within 5-7 business days.',
        },
        {
          q: 'What should I do if I miss a deadline?',
          a: 'Submit an Exception Request immediately with the category "Late Document Submission". Explain the circumstances and provide any supporting evidence. Contact your coordinator directly for urgent situations.',
        },
        {
          q: 'My document was rejected. What now?',
          a: 'Check the rejection reason provided by your coordinator. Make the necessary corrections and resubmit the document. If you need clarification, send a message to your coordinator through the platform.',
        },
      ],
    },
  ];

  const resources = [
    {
      title: 'ErasmusMate User Guide',
      description: 'Comprehensive guide covering all features and workflows',
      type: 'PDF',
      icon: Download,
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      type: 'Video',
      icon: Video,
    },
    {
      title: 'Erasmus+ Official Guidelines',
      description: 'Official EU guidelines for mobility participants',
      type: 'External',
      icon: ExternalLink,
    },
  ];

  const filteredFaqs = selectedCategory
    ? faqs.filter(f => f.category === selectedCategory)
    : faqs;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Help & Support</h1>
        <p className="text-slate-600">Find answers to common questions or contact support</p>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </Card>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card hoverable className="text-center">
          <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg text-slate-900 mb-2">Live Chat</h3>
          <p className="text-sm text-slate-600 mb-4">Get instant help from our support team</p>
          <Button variant="primary" size="sm">Start Chat</Button>
        </Card>
        <Card hoverable className="text-center">
          <Mail className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg text-slate-900 mb-2">Email Support</h3>
          <p className="text-sm text-slate-600 mb-4">support@erasmusmate.eu</p>
          <Button variant="outline" size="sm">Send Email</Button>
        </Card>
        <Card hoverable className="text-center">
          <Phone className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg text-slate-900 mb-2">Phone Support</h3>
          <p className="text-sm text-slate-600 mb-4">Mon-Fri, 9AM-6PM CET</p>
          <Button variant="outline" size="sm">+34 900 123 456</Button>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All Topics
        </Button>
        {faqs.map((category) => (
          <Button
            key={category.category}
            variant={selectedCategory === category.category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.category)}
          >
            {category.category}
          </Button>
        ))}
      </div>

      {/* FAQ Sections */}
      <div className="space-y-6">
        {filteredFaqs.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl text-slate-900">{category.category}</h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <div key={idx} className="border-l-4 border-l-blue-500 pl-4 py-2">
                    <h3 className="text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-xl text-slate-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <Card key={idx} hoverable>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">{resource.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{resource.description}</p>
                    <Button variant="outline" size="sm">
                      {resource.type === 'PDF' ? 'Download' :
                       resource.type === 'Video' ? 'Watch' : 'Open'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Still Need Help */}
      <Card className="bg-blue-50 border-blue-200 text-center">
        <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-lg text-slate-900 mb-2">Still need help?</h3>
        <p className="text-sm text-slate-700 mb-4">
          Our support team is here to assist you with any questions or issues
        </p>
        <Button variant="primary">Contact Support</Button>
      </Card>
    </div>
  );
}
