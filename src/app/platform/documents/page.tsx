"use client";

import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePlatform } from "@/lib/platform-context";
import {
  FileText,
  Search,
  Upload,
  Download,
  Trash2,
  X,
  ShieldCheck,
  Image,
  FileSpreadsheet,
  Archive,
  File,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const DOC_TYPES = [
  { value: "certificate", label: "Certificate" },
  { value: "epr_doc", label: "EPR Document" },
  { value: "contract", label: "Contract" },
  { value: "photo", label: "Photo" },
  { value: "report", label: "Report" },
  { value: "other", label: "Other" },
] as const;

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return <Image className="w-5 h-5 text-blue-500" />;
  if (mimeType.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType.includes("xlsx"))
    return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
  if (mimeType.includes("zip") || mimeType.includes("archive"))
    return <Archive className="w-5 h-5 text-purple-500" />;
  return <File className="w-5 h-5 text-ink-500" />;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function PlatformDocuments() {
  const { userId, projects, hasConvexUser } = usePlatform();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convex queries
  const documents = useQuery(
    api.documents.getByUser,
    hasConvexUser && userId ? { userId: userId as any } : "skip"
  );

  // Convex mutations
  const uploadDoc = useMutation(api.documents.upload);
  const removeDoc = useMutation(api.documents.remove);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "other" as const,
    projectId: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filteredDocs = (documents || []).filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || d.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadForm((prev) => ({
        ...prev,
        name: prev.name || file.name,
      }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !userId) return;

    setUploading(true);
    try {
      // Create a data URL for the file (in production, use Convex file storage or S3)
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      await uploadDoc({
        userId: userId as any,
        projectId: uploadForm.projectId
          ? (uploadForm.projectId as any)
          : undefined,
        name: uploadForm.name || selectedFile.name,
        type: uploadForm.type,
        fileUrl: dataUrl,
        fileSize: selectedFile.size,
        mimeType: selectedFile.type || "application/octet-stream",
        description: uploadForm.description || undefined,
      });

      setUploadSuccess(true);
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
        setSelectedFile(null);
        setUploadForm({ name: "", type: "other", projectId: "", description: "" });
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      await removeDoc({ documentId: docId as any });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-brand-500 font-bold uppercase tracking-widest font-mono">
              Documents
            </span>
            <ShieldCheck className="w-4 h-4 text-brand-500" />
          </div>
          <h1 className="text-2xl font-bold text-ink-900">Documents Locker</h1>
          <p className="text-sm text-ink-500 mt-1">
            Upload and manage certificates, EPR docs, contracts, and evidence files
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-ink-300 rounded-lg text-sm font-medium focus:outline-none"
        >
          <option value="all">All Types</option>
          {DOC_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white border border-ink-300 rounded-lg p-12 text-center">
          <FileText className="w-12 h-12 text-ink-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-ink-900">
            No documents found
          </p>
          <p className="text-xs text-ink-500 mt-1">
            Upload your first document to get started
          </p>
        </div>
      ) : (
        <div className="bg-white border border-ink-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-300 bg-ink-100">
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wider px-4 py-3">
                  Document
                </th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                  Size
                </th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">
                  Date
                </th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wider px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-b border-ink-300 last:border-0 hover:bg-ink-100/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.mimeType)}
                      <div>
                        <p className="text-sm font-medium text-ink-900">
                          {doc.name}
                        </p>
                        {doc.description && (
                          <p className="text-xs text-ink-500 truncate max-w-xs">
                            {doc.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-ink-100 text-ink-700 capitalize">
                      {doc.type.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-ink-500 tabular">
                      {formatFileSize(doc.fileSize)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-ink-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={doc.fileUrl}
                        download={doc.name}
                        className="p-1.5 text-ink-500 hover:text-brand-500 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="p-1.5 text-ink-500 hover:text-down transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm"
            onClick={() => !uploading && setShowUploadModal(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-ink-300 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-ink-300">
              <h3 className="text-lg font-semibold text-ink-900">
                Upload Document
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-ink-500 hover:text-ink-700"
                disabled={uploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {uploadSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-up mx-auto mb-3" />
                  <p className="text-lg font-semibold text-ink-900">
                    Document Uploaded
                  </p>
                  <p className="text-sm text-ink-500 mt-1">
                    Your file has been saved successfully
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUpload} className="space-y-4">
                  {/* File Drop Zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      selectedFile
                        ? "border-brand-500 bg-brand-50"
                        : "border-ink-300 hover:border-brand-500"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip,.mp4,.csv"
                    />
                    {selectedFile ? (
                      <div>
                        {getFileIcon(selectedFile.type)}
                        <p className="text-sm font-medium text-ink-900 mt-2">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-ink-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-ink-300 mx-auto mb-2" />
                        <p className="text-sm text-ink-500">
                          Click to select a file
                        </p>
                        <p className="text-xs text-ink-500 mt-1">
                          PDF, DOC, XLS, Images, ZIP up to 50MB
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                      Document Name
                    </label>
                    <input
                      type="text"
                      value={uploadForm.name}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, name: e.target.value })
                      }
                      placeholder="Enter document name"
                      className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                        Document Type
                      </label>
                      <select
                        value={uploadForm.type}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none"
                      >
                        {DOC_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                        Link to Project
                      </label>
                      <select
                        value={uploadForm.projectId}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            projectId: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none"
                      >
                        <option value="">None</option>
                        {projects.map((p: any) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
                      Description (Optional)
                    </label>
                    <textarea
                      value={uploadForm.description}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                      placeholder="Brief description of this document"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      disabled={uploading}
                      className="flex-1 px-4 py-2.5 bg-ink-100 text-ink-700 rounded-lg text-sm font-medium hover:bg-ink-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedFile || uploading}
                      className="flex-1 px-4 py-2.5 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}