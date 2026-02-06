"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, ArrowDownLeft, X } from "lucide-react";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-primary">
                BeamPay
              </Link>
              <span className="text-sm text-gray-500">Design System</span>
            </div>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Design System</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              A comprehensive guide to the visual language, components, and patterns used throughout BeamPay.
              Inspired by <a href="https://localpay.asia/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">localpay.asia</a> — a clean, trust-forward fintech aesthetic.
            </p>
          </div>

          <Separator />

          {/* Colors */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Color Palette</h2>
            <p className="text-gray-600 mb-6">
              Our color scheme uses a white/light-gray base with blue/teal as the primary accent, creating a clean and trustworthy feel.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-primary rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Primary</p>
                <p className="text-xs text-gray-500">Blue/Teal accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-white rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Background</p>
                <p className="text-xs text-gray-500">White</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-gray-50 rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Surface</p>
                <p className="text-xs text-gray-500">Light Gray</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 bg-gray-900 rounded-lg border shadow-sm"></div>
                <p className="font-medium text-sm">Text</p>
                <p className="text-xs text-gray-500">Dark</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Typography */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Typography</h2>
            <p className="text-gray-600 mb-6">
              Clean, modern sans-serif with hierarchy through size and weight — not color clutter.
            </p>
            <div className="space-y-4 bg-white p-6 rounded-lg border">
              <div>
                <h1 className="text-4xl font-bold">Heading 1 - Bold, 36px</h1>
                <p className="text-sm text-gray-500 mt-1">Used for page titles</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Heading 2 - Bold, 30px</h2>
                <p className="text-sm text-gray-500 mt-1">Used for section headings</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Heading 3 - Semibold, 24px</h3>
                <p className="text-sm text-gray-500 mt-1">Used for card titles</p>
              </div>
              <div>
                <p className="text-base">Body Text - Regular, 16px</p>
                <p className="text-sm text-gray-500 mt-1">Default paragraph text</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Small Text - Regular, 14px</p>
                <p className="text-xs text-gray-500 mt-1">Used for descriptions and metadata</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Buttons */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Buttons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Actions</CardTitle>
                  <CardDescription>Main call-to-action buttons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">Default Button</Button>
                  <Button className="w-full" disabled>Disabled Button</Button>
                  <Button className="w-full" size="sm">Small Button</Button>
                  <Button className="w-full" size="lg">Large Button</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Secondary Actions</CardTitle>
                  <CardDescription>Alternative button styles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">Outline</Button>
                  <Button variant="secondary" className="w-full">Secondary</Button>
                  <Button variant="ghost" className="w-full">Ghost</Button>
                  <Button variant="destructive" className="w-full">Destructive</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Form Elements */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Form Elements</h2>
            <Card>
              <CardHeader>
                <CardTitle>Input Fields</CardTitle>
                <CardDescription>Text inputs with labels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="example-1">Default Input</Label>
                  <Input id="example-1" placeholder="Enter text..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example-2">Email Input</Label>
                  <Input id="example-2" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example-3">Number Input</Label>
                  <Input id="example-3" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example-4">Disabled Input</Label>
                  <Input id="example-4" disabled placeholder="Cannot edit" />
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Badges */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Badges</h2>
            <Card>
              <CardHeader>
                <CardTitle>Status Indicators</CardTitle>
                <CardDescription>Used for transaction status, card labels, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Success</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Info</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Cards */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Cards</h2>
            <p className="text-gray-600 mb-6">
              Cards are the primary container component, featuring rounded corners and subtle shadows.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>A simple card with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Cards provide generous whitespace and clear separation between different sections of content.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Gradient Card</CardTitle>
                  <CardDescription className="text-white/80">Used for the balance display</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$1,234.56</div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Icons */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Icons</h2>
            <Card>
              <CardHeader>
                <CardTitle>Lucide Icons</CardTitle>
                <CardDescription>Consistent icon set used throughout the app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <ArrowDownLeft className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center">Top Up</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center">Send</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <X className="h-5 w-5" />
                    </div>
                    <p className="text-xs text-center">Delete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Spacing */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Spacing</h2>
            <Card>
              <CardHeader>
                <CardTitle>Layout Spacing</CardTitle>
                <CardDescription>Generous whitespace for a clean, uncluttered feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Between sections: 24px (space-y-6)</p>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Between elements: 16px (space-y-4)</p>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Between small items: 8px (space-y-2)</p>
                  <div className="h-2 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Card padding: 24px (p-6)</p>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Design Principles */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Design Principles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Minimal & Clean</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Generous whitespace between elements</p>
                  <p>• Rounded corners on cards and buttons</p>
                  <p>• Subtle shadows for depth</p>
                  <p>• No visual clutter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Trust-Forward</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Blue/teal accent colors for trust</p>
                  <p>• Clear, readable typography</p>
                  <p>• Professional but friendly tone</p>
                  <p>• Consistent interaction patterns</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsive</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Single column on mobile</p>
                  <p>• Multi-column on desktop</p>
                  <p>• Touch-friendly targets (min 44px)</p>
                  <p>• Scales gracefully</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accessible</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• High contrast text</p>
                  <p>• Keyboard navigation support</p>
                  <p>• Screen reader friendly</p>
                  <p>• Clear focus states</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
