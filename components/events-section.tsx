'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function EventsSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <section id="events" className="py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">Events</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">AI Workshop</h3>
                <p className="text-sm text-muted-foreground">
                  Join us for an interactive workshop on machine learning basics.
                </p>
                <p className="text-sm">Date: January 25, 2025</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Guest Speaker Series</h3>
                <p className="text-sm text-muted-foreground">
                  Industry expert discussing latest AI trends.
                </p>
                <p className="text-sm">Date: February 1, 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
