"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Star,
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface Review {
  id: string;
  patient_id: string | null;
  dentist_id: string | null;
  reviewer_name: string;
  reviewer_email: string | null;
  rating: number;
  title: string | null;
  content: string;
  source: string;
  is_featured: boolean;
  is_approved: boolean;
  is_visible: boolean;
  created_at: string;
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dentists, setDentists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_email: "",
    dentist_id: "",
    rating: "5",
    title: "",
    content: "",
    source: "website",
    is_featured: false,
    is_approved: false,
    is_visible: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reviewsRes, dentistsRes] = await Promise.all([
        fetch("/api/reviews"),
        fetch("/api/dentists"),
      ]);

      if (reviewsRes.ok) {
        const data = await reviewsRes.json();
        setReviews(data.data || []);
      }
      if (dentistsRes.ok) {
        const data = await dentistsRes.json();
        setDentists(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.reviewer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title?.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "approved") return matchesSearch && review.is_approved;
    if (statusFilter === "pending") return matchesSearch && !review.is_approved;
    if (statusFilter === "featured") return matchesSearch && review.is_featured;
    return matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEditing
        ? `/api/reviews/${selectedReview?.id}`
        : "/api/reviews";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: parseInt(formData.rating),
          dentist_id: formData.dentist_id || null,
        }),
      });

      if (response.ok) {
        fetchData();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save review:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`/api/reviews/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  const handleToggle = async (id: string, field: string, value: boolean) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      reviewer_name: "",
      reviewer_email: "",
      dentist_id: "",
      rating: "5",
      title: "",
      content: "",
      source: "website",
      is_featured: false,
      is_approved: false,
      is_visible: true,
    });
    setSelectedReview(null);
    setIsEditing(false);
  };

  const openEditDialog = (review: Review) => {
    setSelectedReview(review);
    setFormData({
      reviewer_name: review.reviewer_name,
      reviewer_email: review.reviewer_email || "",
      dentist_id: review.dentist_id || "",
      rating: review.rating.toString(),
      title: review.title || "",
      content: review.content,
      source: review.source,
      is_featured: review.is_featured,
      is_approved: review.is_approved,
      is_visible: review.is_visible,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-[#0A2342]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-[#0A2342]" />
                <h1 className="text-xl font-semibold text-[#0A2342]">
                  Reviews Management
                </h1>
              </div>
            </div>
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-[#0A2342]">
                  <Plus className="h-4 w-4" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? "Edit Review" : "Add New Review"}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditing
                      ? "Update review information"
                      : "Add a new patient review"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Reviewer Name</Label>
                    <Input
                      value={formData.reviewer_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reviewer_name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Reviewer Email</Label>
                    <Input
                      type="email"
                      value={formData.reviewer_email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reviewer_email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Dentist (Optional)</Label>
                    <Select
                      value={formData.dentist_id}
                      onValueChange={(v) =>
                        setFormData({ ...formData, dentist_id: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select dentist" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {dentists.map((dentist) => (
                          <SelectItem key={dentist.id} value={dentist.id}>
                            {dentist.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Select
                      value={formData.rating}
                      onValueChange={(v) =>
                        setFormData({ ...formData, rating: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <SelectItem key={r} value={r.toString()}>
                            {r} Stars
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Review Content</Label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.is_approved}
                        onCheckedChange={(v) =>
                          setFormData({ ...formData, is_approved: v })
                        }
                      />
                      <Label>Approved</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.is_featured}
                        onCheckedChange={(v) =>
                          setFormData({ ...formData, is_featured: v })
                        }
                      />
                      <Label>Featured</Label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#0A2342]">
                    {isEditing ? "Update Review" : "Add Review"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageRating}
                  </p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.filter((r) => r.is_approved).length}
                  </p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Star className="h-6 w-6 text-purple-600 fill-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.filter((r) => r.is_featured).length}
                  </p>
                  <p className="text-sm text-gray-600">Featured</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending Approval</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No reviews found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">
                        {review.reviewer_name}
                      </TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {review.content}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={review.is_approved}
                          onCheckedChange={(v) =>
                            handleToggle(review.id, "is_approved", v)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={review.is_featured}
                          onCheckedChange={(v) =>
                            handleToggle(review.id, "is_featured", v)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(review.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(review)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
