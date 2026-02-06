import { useState, useEffect } from "react";
import { events, Event } from "@/config/events";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { AlertTriangle, Calendar, MapPin } from "lucide-react";

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

  const filteredEvents = activeCategory === "all" 
    ? events 
    : events.filter(e => e.category === activeCategory);

  const handleToggle = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      onChange(selectedEvents.filter(id => id !== eventId));
    } else if (selectedEvents.length < maxEvents) {
      onChange([...selectedEvents, eventId]);
    }
  };

  const isMaxReached = selectedEvents.length >= maxEvents;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-white font-semibold text-sm">
          Select Events <span className="text-gray-400 font-normal">(max {maxEvents})</span>
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          selectedEvents.length === 0 
            ? 'bg-red-500/20 text-red-400' 
            : selectedEvents.length >= maxEvents 
              ? 'bg-amber-500/20 text-amber-400' 
              : 'bg-green-500/20 text-green-400'
        }`}>
          {selectedEvents.length}/{maxEvents} selected
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: "all", label: "All Events" },
          { key: "technical", label: "Technical" },
          { key: "non-technical", label: "Non-Technical" }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveCategory(tab.key as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === tab.key
                ? 'bg-primary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredEvents.map((event) => {
          const isSelected = selectedEvents.includes(event.id);
          const isDisabled = !isSelected && isMaxReached;
          const isPreRegistration = event.isPreRegistration;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary/20 border-primary/50'
                  : isDisabled
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
              onClick={() => !isDisabled && handleToggle(event.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isSelected}
                  disabled={isDisabled}
                  className="mt-0.5"
                  onCheckedChange={() => !isDisabled && handleToggle(event.id)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-medium text-sm truncate">
                      {event.title}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      event.category === 'technical' 
                        ? 'bg-uiverse-sky/20 text-uiverse-sky' 
                        : 'bg-uiverse-purple/20 text-uiverse-purple'
                    }`}>
                      {event.category === 'technical' ? 'Tech' : 'Non-Tech'}
                    </span>
                    {event.hasCashPrize && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-uiverse-green/20 text-uiverse-green">
                        💰 Prize
                      </span>
                    )}
                    {isPreRegistration && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                        Pre-Reg
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.venue}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Warning for max reached */}
      {isMaxReached && (
        <p className="text-amber-400 text-xs flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Maximum {maxEvents} events reached. Deselect one to choose another.
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-xs">{error}</p>
      )}

      {/* Selected Events Summary */}
      {selectedEvents.length > 0 && (
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-2">Selected Events:</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedEvents.map(id => {
              const event = events.find(e => e.id === id);
              return event ? (
                <span
                  key={id}
                  className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                >
                  {event.title}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSelector;
