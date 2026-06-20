import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  FileText, 
  Image, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  ExternalLink
} from "lucide-react"

interface EvidenceViewerProps {
  projectId: string
  projectName: string
  location: {
    lat: number
    lng: number
    address?: string
  }
  photos: Array<{
    id: string
    url: string
    caption?: string
    timestamp?: string
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
  }>
  onApprove: (comment?: string) => void
  onReject: (comment: string) => void
  onRequestMoreInfo: (comment: string) => void
  status: "pending" | "under_review" | "approved" | "rejected"
  className?: string
}

export function EvidenceViewer({
  projectId,
  projectName,
  location,
  photos,
  documents,
  onApprove,
  onReject,
  onRequestMoreInfo,
  status,
  className,
}: EvidenceViewerProps) {
  const [activeTab, setActiveTab] = React.useState<"photos" | "documents" | "location">("photos")
  const [comment, setComment] = React.useState("")
  const [showRejectForm, setShowRejectForm] = React.useState(false)
  const [showRequestForm, setShowRequestForm] = React.useState(false)

  const handleApprove = () => {
    onApprove(comment || undefined)
    setComment("")
  }

  const handleReject = () => {
    if (comment.trim()) {
      onReject(comment)
      setComment("")
      setShowRejectForm(false)
    }
  }

  const handleRequestMoreInfo = () => {
    if (comment.trim()) {
      onRequestMoreInfo(comment)
      setComment("")
      setShowRequestForm(false)
    }
  }

  return (
    <div className={cn("bg-white border border-ink-300 rounded-lg overflow-hidden", className)}>
      <div className="p-4 border-b border-ink-300">
        <h3 className="text-lg font-semibold text-ink-900">{projectName}</h3>
        <p className="text-sm text-ink-500">Project ID: {projectId}</p>
      </div>

      <div className="flex border-b border-ink-300">
        <button
          onClick={() => setActiveTab("photos")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium transition-colors",
            activeTab === "photos"
              ? "text-brand-500 border-b-2 border-brand-500"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <Image className="w-4 h-4 inline-block mr-1" />
          Photos ({photos.length})
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium transition-colors",
            activeTab === "documents"
              ? "text-brand-500 border-b-2 border-brand-500"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <FileText className="w-4 h-4 inline-block mr-1" />
          Documents ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab("location")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium transition-colors",
            activeTab === "location"
              ? "text-brand-500 border-b-2 border-brand-500"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <MapPin className="w-4 h-4 inline-block mr-1" />
          Location
        </button>
      </div>

      <div className="p-4">
        {activeTab === "photos" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.caption || "Evidence photo"}
                  className="w-full h-32 object-cover rounded-lg border border-ink-300"
                />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-lg">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-2">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-ink-100 rounded-lg hover:bg-ink-100/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-ink-500" />
                  <div>
                    <p className="text-sm font-medium text-ink-900">{doc.name}</p>
                    <p className="text-xs text-ink-500">{doc.type}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-ink-500" />
              </a>
            ))}
          </div>
        )}

        {activeTab === "location" && (
          <div className="space-y-4">
            <div className="bg-ink-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-brand-500" />
                <span className="text-sm font-medium text-ink-900">GPS Coordinates</span>
              </div>
              <p className="text-sm text-ink-700">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
              {location.address && (
                <p className="text-sm text-ink-500 mt-1">{location.address}</p>
              )}
            </div>
            <div className="h-48 bg-ink-100 rounded-lg flex items-center justify-center">
              <span className="text-ink-500 text-sm">Map placeholder</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-ink-300 bg-ink-100/50">
        <div className="space-y-3">
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment (required for reject/request)..."
              className="w-full px-3 py-2 bg-white border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 resize-none"
              rows={3}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {status !== "approved" && (
              <Button
                onClick={handleApprove}
                className="bg-up hover:bg-up/90 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
            )}
            
            {status !== "rejected" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowRejectForm(true)}
                  className="border-down text-down hover:bg-down-bg"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRequestForm(true)}
                  className="border-info text-info hover:bg-info-bg"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Request Info
                </Button>
              </>
            )}
          </div>

          {showRejectForm && (
            <div className="p-3 bg-down-bg rounded-lg">
              <p className="text-sm font-medium text-down mb-2">Reject with comment:</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleReject}
                  disabled={!comment.trim()}
                  className="bg-down hover:bg-down/90 text-white"
                >
                  Confirm Reject
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowRejectForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {showRequestForm && (
            <div className="p-3 bg-info-bg rounded-lg">
              <p className="text-sm font-medium text-info mb-2">Request more information:</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleRequestMoreInfo}
                  disabled={!comment.trim()}
                  className="bg-info hover:bg-info/90 text-white"
                >
                  Send Request
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowRequestForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}