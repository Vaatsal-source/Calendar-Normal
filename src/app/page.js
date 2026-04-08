"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import HERO_IMAGES from "./images";
const CosmicBackground = dynamic(() => import("./CosmicBackground"), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [notesMap, setNotesMap] = useState({});
  const [customHolidays, setCustomHolidays] = useState({});
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidayInput, setHolidayInput] = useState("");
  const [selectedDayForHoliday, setSelectedDayForHoliday] = useState(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const storedHolidays = localStorage.getItem("calendar-custom-holidays");
    if (storedHolidays) setCustomHolidays(JSON.parse(storedHolidays));
    
    const storedNotes = localStorage.getItem("calendar-notes");
    if (storedNotes) setNotesMap(JSON.parse(storedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-custom-holidays", JSON.stringify(customHolidays));
  }, [customHolidays]);

  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notesMap));
  }, [notesMap]);

  const handleDateClick = (day) => {
    if (startDate === day && !endDate) { setStartDate(null); return; }
    if (startDate === day && endDate) { setStartDate(null); setEndDate(null); return; }
    if (endDate === day) { setEndDate(null); return; }
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day < startDate) {
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  };

  const openHolidayModal = (day) => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    setSelectedDayForHoliday(day);
    setHolidayInput(customHolidays[key] || "");
    setIsModalOpen(true);
  };

  const saveHoliday = () => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDayForHoliday}`;
    setCustomHolidays((prev) => {
      const next = { ...prev };
      if (holidayInput.trim()) {
        next[key] = holidayInput;
      } else {
        delete next[key];
      }
      return next;
    });
    setIsModalOpen(false);
  };

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    return day > startDate && day < endDate;
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const changeMonth = (offset) => {
    setDirection(offset);
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setStartDate(null);
    setEndDate(null);
  };

  const getKey = () => {
    if (!startDate || !endDate) return null;
    return `${currentDate.getFullYear()}-${currentDate.getMonth()}-${startDate}-${endDate}`;
  };

  useEffect(() => {
    const key = getKey();
    if (key && notesMap[key]) setNote(notesMap[key]);
    else setNote("");
  }, [startDate, endDate]);

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const hasNote = (day) => Object.keys(notesMap).some((key) => key.includes(`-${day}-`));

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] } }),
  };

  return (
    <div className="relative min-h-screen bg-black text-white p-4 overflow-hidden">
      {mounted && <CosmicBackground monthIndex={currentDate.getMonth()} />}

      <div
        className="pointer-events-none fixed w-40 h-40 rounded-full bg-blue-500/20 blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ left: cursor.x, top: cursor.y }}
      />

      <motion.div
        onHoverStart={() => setCardHovered(true)}
        onHoverEnd={() => setCardHovered(false)}
        animate={{
          backgroundColor: cardHovered ? "rgba(5, 2, 10, 0.72)" : "rgba(5, 2, 10, 0.10)",
          backdropFilter: cardHovered ? "blur(20px)" : "blur(4px)",
          WebkitBackdropFilter: cardHovered ? "blur(20px)" : "blur(4px)",
        }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="relative pt-22 py-7 max-w-7xl mx-auto border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        style={{ zIndex: 2, boxShadow: "0 0 60px rgba(180,40,0,0.12), 0 0 120px rgba(80,0,120,0.08)" }}
      >
        <div className="flex flex-col md:flex-row">
          <motion.div
            className="md:w-1/3 h-64 md:h-auto relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              key={currentDate.getMonth()}
              src={HERO_IMAGES[currentDate.getMonth()]}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
              <h3 className="text-white text-xl font-semibold tracking-tight">Plan Your Month</h3>
            </div>
          </motion.div>

          <div className="md:w-2/3 p-6 space-y-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => changeMonth(-1)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              >←</motion.button>

              <div className="relative h-9 flex items-center justify-center min-w-50">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.h2
                    key={currentDate.toISOString()}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute text-2xl font-bold tracking-tight text-white"
                    style={{ textShadow: "0 0 20px rgba(255,120,0,0.6)" }}
                  >
                    {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => changeMonth(1)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              >→</motion.button>
            </div>

            <div className="grid grid-cols-7 text-white/40 uppercase tracking-widest text-[10px]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center py-1">{d}</div>
              ))}
            </div>

            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-7 gap-1.5"
              >
                {daysArray.map((day, index) => {
                  if (!day) return <div key={`e-${index}`} />;

                  const isStart = day === startDate;
                  const isEnd = day === endDate;
                  const inRange = isInRange(day);
                  const holidayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
                  const holidayName = customHolidays[holidayKey];

                  let cellClass = "h-11 flex items-center justify-center cursor-pointer text-sm font-medium relative overflow-hidden select-none ";
                  if (isStart && isEnd) cellClass += "text-white rounded-xl";
                  else if (isStart) cellClass += "text-white rounded-l-full";
                  else if (isEnd) cellClass += "text-white rounded-r-full";
                  else if (inRange) cellClass += "rounded-none";
                  else cellClass += "bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10";

                  if (isToday(day) && !isStart && !isEnd) cellClass += " ring-1 ring-orange-500/60";

                  const accentStyle = isStart || isEnd
                    ? { background: "linear-gradient(135deg, #cc4400, #8800cc)", boxShadow: "0 0 18px rgba(200,60,0,0.5)" }
                    : inRange ? { background: "rgba(180,40,0,0.15)" } : {};

                  return (
                    <motion.div
                      key={`d-${index}`}
                      onClick={() => handleDateClick(day)}
                      onDoubleClick={() => openHolidayModal(day)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.88 }}
                      className={cellClass}
                      style={accentStyle}
                      title={holidayName || "Double-click to mark as Holiday"}
                    >
                      <motion.span
                        initial={{ scale: 0, opacity: 0.5 }}
                        whileTap={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "rgba(255,100,0,0.15)" }}
                      />
                      <span className="relative z-10">{day}</span>
                      
                      {holidayName && (
                        <span className="absolute top-1 right-1 w-1 h-1 rounded-full" style={{ background: "#8800cc", boxShadow: "0 0 4px #8800cc" }} />
                      )}

                      {hasNote(day) && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#ff6600", boxShadow: "0 0 6px #ff6600" }} />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 p-4"
          style={{ background: "rgba(10, 3, 18, 0.3)" }}
        >
          <p className="text-xs text-white/40 mb-2 uppercase tracking-widest">Pen Your Thoughts</p>
          <motion.textarea
            whileHover={{ y: -4, scale: 1.01 }}
            whileFocus={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            value={note}
            onChange={(e) => {
              const value = e.target.value;
              setNote(value);
              const key = getKey();
              if (key) setNotesMap((prev) => ({ ...prev, [key]: value }));
            }}
            placeholder="Write something meaningful..."
            className="w-full h-24 p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition"
          />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#0a0312]/80 border border-white/20 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-xl font-bold text-white mb-1">Set Holiday</h2>
              <p className="text-sm text-white/50 mb-6 uppercase tracking-widest">Day {selectedDayForHoliday}</p>
              
              <input
                autoFocus
                type="text"
                value={holidayInput}
                onChange={(e) => setHolidayInput(e.target.value)}
                placeholder="Name of the special day..."
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition mb-6"
                onKeyDown={(e) => e.key === "Enter" && saveHoliday()}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveHoliday}
                  className="flex-1 py-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:brightness-110 text-white transition font-bold shadow-lg shadow-purple-500/20"
                >
                  Save Day
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}