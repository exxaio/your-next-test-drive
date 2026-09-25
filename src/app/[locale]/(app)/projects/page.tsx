import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FolderOpen,
  Plus,
  Search,
  Clock,
  Users,
  MoreHorizontal,
} from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your transcription projects and collaborations.
          </p>
        </div>
        <Button
          id="create-project-btn"
          className="bg-violet-600 text-sm text-white hover:bg-violet-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and filters */}
      <Card className="bg-card border-white/8">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="search-projects"
                placeholder="Search projects..."
                className="h-9 pl-9 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="filter-status" className="text-xs font-medium">
                  Status
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger
                    id="filter-status"
                    className="h-9 w-32 text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sort-by" className="text-xs font-medium">
                  Sort by
                </Label>
                <Select defaultValue="recent">
                  <SelectTrigger id="sort-by" className="h-9 w-32 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            id: 'project-1',
            name: 'Product Launch Videos',
            description: 'Training videos for the new product launch campaign',
            recordings: 12,
            collaborators: 3,
            lastUpdated: '2 hours ago',
            status: 'active',
          },
          {
            id: 'project-2',
            name: 'Customer Interviews',
            description: 'Q4 customer feedback and interview transcripts',
            recordings: 8,
            collaborators: 2,
            lastUpdated: '1 day ago',
            status: 'active',
          },
          {
            id: 'project-3',
            name: 'Team Meetings',
            description: 'Weekly team standup and planning meeting recordings',
            recordings: 24,
            collaborators: 5,
            lastUpdated: '3 days ago',
            status: 'active',
          },
          {
            id: 'project-4',
            name: 'Webinar Archive',
            description: 'Monthly webinar recordings and presentations',
            recordings: 6,
            collaborators: 1,
            lastUpdated: '1 week ago',
            status: 'archived',
          },
        ].map((project) => (
          <Card
            key={project.id}
            className="bg-card border-white/8 transition-colors hover:border-white/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="font-heading text-base">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 text-xs">
                    {project.description}
                  </CardDescription>
                </div>
                <Button
                  id={`${project.id}-menu`}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 shrink-0 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <FolderOpen className="h-3.5 w-3.5" />
                  <span>{project.recordings} recordings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  <span>{project.collaborators}</span>
                </div>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>Updated {project.lastUpdated}</span>
              </div>
              <Separator className="opacity-30" />
              <Button
                id={`${project.id}-view`}
                variant="outline"
                size="sm"
                className="w-full text-xs"
              >
                View Project
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state fallback */}
      <Card className="bg-card border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FolderOpen className="text-muted-foreground/50 h-12 w-12" />
          <h3 className="mt-4 text-sm font-medium">No projects yet</h3>
          <p className="text-muted-foreground mt-1 text-xs">
            Create your first project to get started with transcriptions.
          </p>
          <Button
            id="create-first-project-btn"
            variant="outline"
            size="sm"
            className="mt-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
