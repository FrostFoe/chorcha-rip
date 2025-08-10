
import { ArrowUpRight, FilePlus2, MessageSquarePlus, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const actions = [
  {
    icon: FilePlus2,
    label: 'Create New Document',
    description: 'Start with a blank page or a template.',
  },
  {
    icon: UserPlus,
    label: 'Invite Team Member',
    description: 'Add a new member to your project.',
  },
  {
    icon: MessageSquarePlus,
    label: 'New Feedback',
    description: 'Provide feedback on a recent project.',
  },
]

export default function QuickActions() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started on your next task.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-muted p-3 rounded-md">
                <action.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{action.label}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <Button variant="ghost" size="icon">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
