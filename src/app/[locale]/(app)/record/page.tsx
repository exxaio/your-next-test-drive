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
  Mic,
  MicOff,
  Settings,
  RotateCcw,
  FileAudio,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function RecordPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Record
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Record audio and video for transcription and analysis.
        </p>
      </div>

      {/* Recording controls */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Mic className="h-4 w-4 text-violet-400" />
            Recording Controls
          </CardTitle>
          <CardDescription className="text-xs">
            Configure your recording settings and start capturing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Device selection */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="audio-device" className="text-xs font-medium">
                Audio Input
              </Label>
              <Select defaultValue="default">
                <SelectTrigger id="audio-device" className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Microphone</SelectItem>
                  <SelectItem value="external">External Mic</SelectItem>
                  <SelectItem value="headset">Headset Microphone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="video-device" className="text-xs font-medium">
                Video Input
              </Label>
              <Select defaultValue="default">
                <SelectTrigger id="video-device" className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Camera</SelectItem>
                  <SelectItem value="hd">HD Webcam</SelectItem>
                  <SelectItem value="external">External Camera</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recording settings */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="audio-quality" className="text-xs font-medium">
                Audio Quality
              </Label>
              <Select defaultValue="high">
                <SelectTrigger id="audio-quality" className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="lossless">Lossless</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="video-quality" className="text-xs font-medium">
                Video Quality
              </Label>
              <Select defaultValue="1080p">
                <SelectTrigger id="video-quality" className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="4k">4K</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="output-format" className="text-xs font-medium">
                Output Format
              </Label>
              <Select defaultValue="mp4">
                <SelectTrigger id="output-format" className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4</SelectItem>
                  <SelectItem value="webm">WebM</SelectItem>
                  <SelectItem value="mov">MOV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="opacity-30" />

          {/* Recording name */}
          <div className="space-y-1.5">
            <Label htmlFor="recording-name" className="text-xs font-medium">
              Recording Name
            </Label>
            <Input
              id="recording-name"
              placeholder="My Recording"
              className="h-9 text-sm"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                id="record-btn"
                className="bg-red-600 text-sm text-white hover:bg-red-500"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
              <Button
                id="stop-btn"
                variant="outline"
                size="sm"
                className="text-xs"
                disabled
              >
                <MicOff className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </div>
            <Button
              id="recording-settings-btn"
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <Settings className="mr-2 h-4 w-4" />
              Advanced Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent recordings */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <FileAudio className="h-4 w-4 text-violet-400" />
            Recent Recordings
          </CardTitle>
          <CardDescription className="text-xs">
            Your latest recordings and their processing status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 'recording-1',
                name: 'Team Standup - Sept 5',
                duration: '15:32',
                date: '2 hours ago',
                status: 'completed',
                size: '24.5 MB',
              },
              {
                id: 'recording-2',
                name: 'Client Call - Project Alpha',
                duration: '42:18',
                date: 'Yesterday',
                status: 'processing',
                size: '68.2 MB',
              },
              {
                id: 'recording-3',
                name: 'Product Demo',
                duration: '8:45',
                date: '2 days ago',
                status: 'completed',
                size: '14.1 MB',
              },
            ].map((recording) => (
              <div
                key={recording.id}
                className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10">
                    <FileAudio className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{recording.name}</p>
                    <div className="text-muted-foreground flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recording.duration}
                      </span>
                      <span>{recording.date}</span>
                      <span>{recording.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {recording.status === 'completed' ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-amber-400">
                      <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                      <span>Processing</span>
                    </div>
                  )}
                  <Button
                    id={`${recording.id}-view`}
                    variant="outline"
                    size="sm"
                    className="ml-2 shrink-0 text-xs"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
