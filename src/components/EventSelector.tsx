import { useState } from "react";
import { events } from "@/config/events";
import { AlertTriangle, Calendar, MapPin, Check } from "lucide-react";

interface EventSelectorProps {
  selectedEvents: string[];
  onChange: (events: string[]) => void;
  maxEvents?: number;
  error?: string;
}

const EventSelector = ({
  selectedEvents,
  onChange,
  maxEvents = 4,
  error
}: EventSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<"all" | "technical" | "non-technical">("all");

  const getEventTimeState = (time: string) => {
    if (time.includes("10:00 AM")) return "morning";
    if (time.includes("2:00 PM")) return "afternoon";
    return "other";
  };

  const filteredEvents = events.filter(e =>
    activeCategory === "all" ? true : e.category === activeCategory
  );

  const morningEvents = filteredEvents.filter(e => getEventTimeState(e.time) === "morning");
  const afternoonEvents = filteredEvents.filter(e => getEventTimeState(e.time) === "afternoon");

  const hasTimeConflict = (event: typeof events[0]) => {
    const eventTime = getEventTimeState(event.time);
    return selectedEvents.some(id => {
      const selectedEvent = events.find(e => e.id === id);
      return selectedEvent && getEventTimeState(selectedEvent.time) === eventTime && selectedEvent.id !== event.id;
    });
  };

  const handleToggle = (eventId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (selectedEvents.includes(eventId)) {
      onChange(selectedEvents.filter(id => id !== eventId));
    } else if (selectedEvents.length < maxEvents) {
      onChange([...selectedEvents, eventId]);
    }
  };

  const isMaxReached = selectedEvents.length >= maxEvents;

  const EventCard = ({ event }: { event: typeof events[0] }) => {
    const isSelected = selectedEvents.includes(event.id);
    const isDisabled = !isSelected && (isMaxReached || event.isRegistrationClosed);
    const isConflict = !isSelected && hasTimeConflict(event);
    const isPreRegistration = event.isPreRegistration;

    return (
      <div
        className={`group relative p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col gap-2 ${isSelected
          ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]'
          : isDisabled
            ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
          }`}
        onClick={(e) => !isDisabled && handleToggle(event.id, e)}
      >
        {/* Header Section with Checkbox */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-sm sm:text-base leading-tight mb-1 ${isSelected ? 'text-white' : 'text-gray-200'}`}>
              {event.title}
            </h4>

            {/* Badges - Compact on mobile */}
            <div className="flex gap-1.5 flex-wrap">
              <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-medium border ${event.category === 'technical'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                : 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'
                }`}>
                {event.category === 'technical' ? 'Tech' : 'Non-Tech'}
              </span>

              {event.hasCashPrize && (
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="text-[10px]">⚡</span> Prize
                </span>
              )}

              {isPreRegistration && (
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Pre-Reg
                </span>
              )}

              {event.isRegistrationClosed && (
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                  Closed
                </span>
              )}
            </div>
          </div>


          {/* Explicit Checkbox Selection UI */}
          <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
            ? 'bg-primary border-primary scale-100'
            : 'border-white/30 bg-transparent group-hover:border-white/50'
            }`}>
            {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[3.5]" />}
          </div>
        </div>

        {/* Description - Hidden on very small screens or clamped tightly */}
        <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-2 sm:line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Footer Info */}
        <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500 bg-black/20 p-2 rounded-lg mt-auto w-full">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {event.time.split('–')[0].trim()}
          </span>
          <div className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            {event.venue}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm sticky top-0 z-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              Select Events
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${isMaxReached ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-white/5 text-gray-400 border-white/10'
                }`}>
                {selectedEvents.length}/{maxEvents}
              </span>
            </h3>
            {isMaxReached && (
              <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Limit reached
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => {
                const allVisibleIds = filteredEvents.filter(e => !e.isRegistrationClosed).map(e => e.id);
                const isAllSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selectedEvents.includes(id));

                if (isAllSelected) {
                  onChange(selectedEvents.filter(id => !allVisibleIds.includes(id)));
                } else {
                  const newSelection = Array.from(new Set([...selectedEvents, ...allVisibleIds])).slice(0, maxEvents);
                  onChange(newSelection);
                }
              }}
              className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap"
            >
              {filteredEvents.filter(e => !e.isRegistrationClosed).length > 0 &&
                filteredEvents.filter(e => !e.isRegistrationClosed).every(e => selectedEvents.includes(e.id))
                ? "Deselect All"
                : "Select All"}
            </button>

            <div className="flex p-1 bg-black/40 rounded-lg border border-white/5 overflow-x-auto custom-scrollbar">
              {[
                { key: "all", label: "All" },
                { key: "technical", label: "Tech" },
                { key: "non-technical", label: "Non-Tech" }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${activeCategory === tab.key
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Vertical Layout */}
      <div className="flex flex-col gap-8">

        {/* Morning Session */}
        {morningEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                <span className="text-xl">☀️</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Morning Session</h3>
                <p className="text-sm text-gray-400">Starts at 10:00 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {morningEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Afternoon Session */}
        {afternoonEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                <span className="text-xl">🌤️</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Afternoon Session</h3>
                <p className="text-sm text-gray-400">Starts at 02:00 PM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {afternoonEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-in fade-in slide-in-from-bottom-2">
          <AlertTriangle className="w-4 h-4" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default EventSelector;
