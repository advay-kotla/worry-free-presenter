import { motion } from "framer-motion";
import { Calendar, Clock, User, Video, Phone, MapPin, MoreVertical, CheckCircle } from "lucide-react";
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

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-500/10 text-green-600 border-green-200";
    case "pending":
      return "bg-amber-500/10 text-amber-600 border-amber-200";
    case "completed":
      return "bg-primary/10 text-primary border-primary/20";
    case "cancelled":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const AppointmentCard = ({ appointment, isPast = false }: AppointmentCardProps) => {
  const SessionIcon = getSessionIcon(appointment.session_type);
  const therapistImage = appointment.therapist ? therapistImages[appointment.therapist] : undefined;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-elevated transition-all duration-300 ${
        isPast ? "opacity-80" : ""
      }`}
    >
      {/* Status Indicator Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          isPast ? "bg-muted" : "bg-gradient-to-r from-primary to-accent"
        }`}
      />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={therapistImage} alt={appointment.therapist || "Therapist"} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {appointment.therapist?.[4] || "T"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground line-clamp-1">
              {appointment.therapist || "Therapist TBD"}
            </h4>
            <p className="text-sm text-muted-foreground capitalize">
              {appointment.session_type}
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {!isPast && <DropdownMenuItem>Reschedule</DropdownMenuItem>}
            {!isPast && <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(appointment.appointment_date), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{appointment.appointment_time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
            <SessionIcon className="w-4 h-4 text-primary" />
            <span className="capitalize">{appointment.session_type.split("-").join(" ")}</span>
          </div>
          <Badge
            variant="outline"
            className={`capitalize ${getStatusStyles(isPast ? "completed" : appointment.status)}`}
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

        {appointment.notes && (
          <p className="text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3 line-clamp-2">
            {appointment.notes}
          </p>
        )}
      </div>

      {!isPast && (
        <div className="mt-4 pt-4 border-t border-border flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Reschedule
          </Button>
          <Button size="sm" className="flex-1">
            <Video className="w-4 h-4 mr-2" />
            Join Session
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;
