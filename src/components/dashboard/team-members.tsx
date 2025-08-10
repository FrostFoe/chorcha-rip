
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

const members = [
  { name: 'Sofia Davis', role: 'Lead Designer', avatar: 'https://placehold.co/100x100/A7F3D0/000000.png', fallback: 'SD', hint: 'woman portrait' },
  { name: 'Jackson Lee', role: 'Project Manager', avatar: 'https://placehold.co/100x100/BAE6FD/000000.png', fallback: 'JL', hint: 'man glasses'},
  { name: 'Olivia Martinez', role: 'Frontend Developer', avatar: 'https://placehold.co/100x100/FBCFE8/000000.png', fallback: 'OM', hint: 'woman smiling'},
  { name: 'William Rodriguez', role: 'Backend Developer', avatar: 'https://placehold.co/100x100/DDD6FE/000000.png', fallback: 'WR', hint: 'man smiling' },
  { name: 'Isabella Chen', role: 'UX Researcher', avatar: 'https://placehold.co/100x100/FEF08A/000000.png', fallback: 'IC', hint: 'woman glasses' },
]

export default function TeamMembers() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Meet the people working on your projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.name} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={member.avatar} data-ai-hint={member.hint} />
                <AvatarFallback>{member.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
