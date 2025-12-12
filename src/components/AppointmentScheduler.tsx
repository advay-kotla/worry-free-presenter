import { Calendar, Clock, Video, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const sessionTypes = [
    { id: "individual", name: "Individual Counseling", duration: "50 min", icon: Video },
    { id: "group", name: "Group Support Session", duration: "90 min", icon: Shield },
  ];

  return (
    <section className="py-20 gradient-calm" id="schedule">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-trust/20 text-trust rounded-full text-sm font-medium mb-4">
            Take The First Step
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Schedule a Counseling Session
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with licensed mental health professionals from the comfort of your home. 
            All sessions are confidential and secure.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-elevated p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Session Type Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Choose Session Type
              </h3>
              <div className="space-y-3">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <type.icon className={`w-5 h-5 ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                      <div>
                        <p className="font-medium text-foreground">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Select Date
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
              />

              <h3 className="font-semibold text-foreground mt-6 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Select Time
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Your privacy is protected. All sessions are HIPAA compliant.</span>
              </div>
              <Button variant="hero" size="lg" disabled={!selectedDate || !selectedTime || !selectedType}>
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentScheduler;
