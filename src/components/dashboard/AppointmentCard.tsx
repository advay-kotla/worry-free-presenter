import { motion } from "framer-motion";
import { Calendar, Clock, Video, Phone, MapPin, MoreVertical, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppointmentCardProps {
  appointment: {
    id: string;
    appointment_date: string;
    appointment_time: string;
    therapist: string | null;
    session_type: string;
    status: string;
    notes: string | null;
  };
  isPast?: boolean;
}

const therapistImages: Record<string, string> = {
  "Dr. Sarah Mitchell": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "Dr. James Wilson": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "Dr. Emily Chen": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  "Dr. Michael Brown": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  "Dr. Lisa Anderson": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
};

const getSessionIcon = (type: string) => {
  if (type.toLowerCase().includes("video")) return Video;
  if (type.toLowerCase().includes("phone")) return Phone;
  return MapPin;
};

const getStatusStyles = (status: string, isPast: boolean) => {
  if (isPast) return "bg-muted text-muted-foreground";
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "pending":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const AppointmentCard = ({ appointment, isPast = false }: AppointmentCardProps) => {
  const SessionIcon = getSessionIcon(appointment.session_type);
  const therapistImage = appointment.therapist ? therapistImages[appointment.therapist] : undefined;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${
        isPast ? "opacity-75" : ""
      }`}
    >
      {/* Top Accent Bar */}
      <div
        className={`h-1 w-full ${
          isPast 
            ? "bg-muted" 
            : "bg-gradient-to-r from-primary via-primary to-accent"
        }`}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-background shadow-md">
              <AvatarImage src={therapistImage} alt={appointment.therapist || "Therapist"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {appointment.therapist?.split(" ")[1]?.[0] || "T"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground line-clamp-1">
                {appointment.therapist || "Therapist TBD"}
              </h4>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <SessionIcon className="w-3.5 h-3.5" />
                <span className="capitalize">{appointment.session_type.split("-").join(" ")}</span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              {!isPast && <DropdownMenuItem>Reschedule</DropdownMenuItem>}
              {!isPast && <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 mb-4 p-3 bg-secondary/50 rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">
              {format(new Date(appointment.appointment_date), "MMM d, yyyy")}
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">{appointment.appointment_time}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          <Badge
            variant="secondary"
            className={`capitalize ${getStatusStyles(appointment.status, isPast)}`}
          >
            {isPast ? (
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Completed
              </span>
            ) : (
              appointment.status
            )}
          </Badge>
        </div>

        {/* Notes Preview */}
        {appointment.notes && (
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 line-clamp-2 mb-4">
            {appointment.notes}
          </p>
        )}

        {/* Actions */}
        {!isPast && (
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="flex-1 rounded-xl">
              Reschedule
            </Button>
            <Button size="sm" className="flex-1 rounded-xl gap-2">
              <Video className="w-4 h-4" />
              Join
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
