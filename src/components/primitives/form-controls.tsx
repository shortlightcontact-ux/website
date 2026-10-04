"use client";

import { Calendar, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { RefObject } from "react";

const labelClass = "eyebrow mb-2 block text-taupe";

const triggerClass =
  "flex w-full items-center justify-between gap-4 rounded-none border-b bg-transparent py-3 text-left text-base text-charcoal outline-none transition-colors [border-color:color-mix(in_srgb,currentColor_22%,transparent)] focus:[border-color:currentColor]";

const popoverClass =
  "absolute left-0 top-full z-30 mt-1 border bg-ivory shadow-xl [border-color:color-mix(in_srgb,currentColor_14%,transparent)]";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function useOutsideClose(
  open: boolean,
  ref: RefObject<HTMLDivElement | null>,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, ref, close]);
}

type SelectFieldProps = {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
};

export function SelectField({ name, label, options, defaultValue }: SelectFieldProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(() =>
    Math.max(0, options.indexOf(defaultValue ?? options[0])),
  );
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useOutsideClose(open, ref, () => setOpen(false));

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const commit = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={value} />
      <span id={`${id}-label`} className={labelClass}>
        {label}
      </span>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        className={triggerClass}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          } else if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        <span id={`${id}-value`}>{value}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-taupe transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          className={`${popoverClass} max-h-64 w-full overflow-auto py-1 outline-none`}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setHighlight((current) => Math.min(options.length - 1, current + 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setHighlight((current) => Math.max(0, current - 1));
            } else if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              commit(options[highlight]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => commit(option)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    index === highlight ? "bg-charcoal/[0.07]" : ""
                  } ${selected ? "text-charcoal" : "text-charcoal/75"}`}
                >
                  {option}
                  {selected ? (
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-olive" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

type DateFieldProps = {
  name: string;
  label: string;
};

export function DateField({ name, label }: DateFieldProps) {
  const id = useId();
  const [selected, setSelected] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const ref = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useOutsideClose(open, ref, () => setOpen(false));

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const today = new Date();

  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const value = selected
    ? `${selected.getFullYear()}-${pad(selected.getMonth() + 1)}-${pad(selected.getDate())}`
    : "";

  const display = selected
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(selected)
    : "";

  const isSelected = (day: number) =>
    Boolean(
      selected &&
        selected.getFullYear() === year &&
        selected.getMonth() === month &&
        selected.getDate() === day,
    );

  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={value} />
      <span id={`${id}-label`} className={labelClass}>
        {label}
      </span>
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        className={triggerClass}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <span id={`${id}-value`} className={selected ? "" : "text-charcoal/35"}>
          {selected ? display : "Select a date"}
        </span>
        <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 text-taupe" />
      </button>

      {open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label="Choose a date"
          tabIndex={-1}
          className={`${popoverClass} w-[min(19rem,calc(100vw-2.5rem))] p-4 outline-none`}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center text-taupe transition-colors hover:text-charcoal"
              onClick={() => setView(new Date(year, month - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="font-serif text-lg">
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center text-taupe transition-colors hover:text-charcoal"
              onClick={() => setView(new Date(year, month + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.625rem] tracking-[0.14em] text-taupe uppercase">
            {WEEKDAYS.map((weekday, index) => (
              <span key={`${weekday}-${index}`} className="py-1">
                {weekday}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((day, index) => {
              if (day === null) {
                return <span key={`empty-${index}`} aria-hidden="true" />;
              }
              const selectedDay = isSelected(day);
              const todayDay = isToday(day);
              const formatted = new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(year, month, day));

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  aria-label={formatted}
                  aria-pressed={selectedDay}
                  onClick={() => {
                    setSelected(new Date(year, month, day));
                    setOpen(false);
                  }}
                  className={`flex h-9 w-full items-center justify-center text-sm transition-colors ${
                    selectedDay
                      ? "bg-ink text-ivory"
                      : todayDay
                        ? "border [border-color:color-mix(in_srgb,currentColor_35%,transparent)]"
                        : "hover:bg-charcoal/[0.07]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
