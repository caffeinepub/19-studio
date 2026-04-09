import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-QeIUxsOk.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, c as LayoutGroupContext, L as Layout, m as motion } from "./Layout-DiR8Atpn.js";
import { c as createLucideIcon, u as useServices, a as useStylists, d as useBookAppointment, b as Button, B as Badge, e as useAvailableSlots } from "./useBooking-BHG-NJm_.js";
import { C as Check } from "./check-C4l4-kYs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const BOOKING_STEPS = [
  "service",
  "stylist",
  "datetime",
  "details",
  "confirm"
];
const STEP_LABELS = {
  service: "Service",
  stylist: "Stylist",
  datetime: "Date & Time",
  details: "Your Details",
  confirm: "Confirm"
};
function StepIndicator({ currentStep }) {
  const currentIndex = BOOKING_STEPS.indexOf(currentStep);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ol",
    {
      className: "flex items-center justify-center gap-0 mb-10",
      "aria-label": "Booking steps",
      children: BOOKING_STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isActive = i === currentIndex;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: [
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                  isCompleted ? "bg-accent text-accent-foreground" : isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"
                ].join(" "),
                children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i + 1 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: [
                  "text-[10px] font-medium tracking-wide uppercase hidden sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground"
                ].join(" "),
                children: STEP_LABELS[step]
              }
            )
          ] }),
          i < BOOKING_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: [
                "w-12 sm:w-20 h-px mx-1 mb-4 transition-all duration-300",
                i < currentIndex ? "bg-accent" : "bg-border"
              ].join(" ")
            }
          )
        ] }, step);
      })
    }
  );
}
function ServiceStep({
  onSelect,
  selected
}) {
  const { data: services, isLoading } = useServices();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(StepSkeleton, { count: 4 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StepContainer,
    {
      title: "Choose a Service",
      subtitle: "Select the treatment that's right for you",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: (services ?? []).map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.06 },
          onClick: () => onSelect(service),
          "data-ocid": "service-card",
          className: [
            "text-left p-5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selected === service.id ? "border-accent bg-accent/5 shadow-md" : "border-border bg-card hover:border-accent/50 hover:shadow-sm"
          ].join(" "),
          "aria-pressed": selected === service.id,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-snug font-display", children: service.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2", children: service.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-2", children: [
                Number(service.durationMinutes),
                " min"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent font-bold text-lg font-display", children: [
                "₹",
                Number(service.price)
              ] }),
              selected === service.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "accent", className: "text-[10px] mt-1", children: "Selected" })
            ] })
          ] })
        },
        service.id.toString()
      )) })
    }
  );
}
function StylistStep({
  onSelect,
  selected
}) {
  const { data: stylists, isLoading } = useStylists();
  const available = reactExports.useMemo(
    () => (stylists ?? []).filter((s) => s.available),
    [stylists]
  );
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(StepSkeleton, { count: 3 });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    StepContainer,
    {
      title: "Choose Your Stylist",
      subtitle: "All our stylists are highly skilled professionals",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: available.map((stylist, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.06 },
            onClick: () => onSelect(stylist),
            "data-ocid": "stylist-card",
            className: [
              "text-left p-5 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected === stylist.id ? "border-accent bg-accent/5 shadow-md" : "border-border bg-card hover:border-accent/50 hover:shadow-sm"
            ].join(" "),
            "aria-pressed": selected === stylist.id,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-foreground", children: stylist.name.charAt(0) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm font-display", children: stylist.name }),
                  selected === stylist.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-accent shrink-0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5 leading-relaxed line-clamp-2", children: stylist.bio })
              ] })
            ] })
          },
          stylist.id.toString()
        )) }),
        available.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "No stylists are currently available. Please check back later." })
      ]
    }
  );
}
function DateTimeStep({
  stylistId,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime
}) {
  const { data: slots, isLoading } = useAvailableSlots(selectedDate, stylistId);
  const next30Days = reactExports.useMemo(() => {
    const days = [];
    const today = /* @__PURE__ */ new Date();
    for (let i = 1; i <= 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      days.push({
        iso,
        display: d.toLocaleDateString("en-ZA", {
          weekday: "short",
          day: "numeric",
          month: "short"
        }),
        dayLabel: d.toLocaleDateString("en-ZA", { weekday: "short" }),
        dayNum: d.getDate(),
        monthAbbr: d.toLocaleDateString("en-ZA", { month: "short" })
      });
    }
    return days;
  }, []);
  const morningSlots = reactExports.useMemo(
    () => (slots ?? []).filter(
      (s) => Number.parseInt(s.startTime.split(":")[0]) < 12
    ),
    [slots]
  );
  const afternoonSlots = reactExports.useMemo(
    () => (slots ?? []).filter(
      (s) => Number.parseInt(s.startTime.split(":")[0]) >= 12
    ),
    [slots]
  );
  const formatTime = (t) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    StepContainer,
    {
      title: "Pick a Date & Time",
      subtitle: "Choose from available slots below",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-1 px-1 pb-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 min-w-max", children: next30Days.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onSelectDate(day.iso);
              onSelectTime("");
            },
            "data-ocid": "calendar-day",
            className: [
              "flex flex-col items-center justify-center w-14 py-2.5 rounded-xl border text-center transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selectedDate === day.iso ? "bg-accent text-accent-foreground border-accent shadow-md" : "bg-card border-border hover:border-accent/50 text-foreground"
            ].join(" "),
            "aria-pressed": selectedDate === day.iso,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wide opacity-70", children: day.dayLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold font-display leading-none my-0.5", children: day.dayNum }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-70", children: day.monthAbbr })
            ]
          },
          day.iso
        )) }) }),
        !selectedDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-8", children: "Please select a date to see available times" }),
        selectedDate && isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 rounded-lg bg-muted animate-pulse" }, k)) }),
        selectedDate && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          morningSlots.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TimeGroup,
            {
              label: "Morning",
              slots: morningSlots,
              selected: selectedTime,
              onSelect: onSelectTime,
              formatTime
            }
          ),
          afternoonSlots.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TimeGroup,
            {
              label: "Afternoon",
              slots: afternoonSlots,
              selected: selectedTime,
              onSelect: onSelectTime,
              formatTime
            }
          ),
          (slots == null ? void 0 : slots.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center py-8", children: "No available slots for this date. Try another day." })
        ] })
      ]
    }
  );
}
function TimeGroup({
  label,
  slots,
  selected,
  onSelect,
  formatTime
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: slots.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onSelect(slot.startTime),
        "data-ocid": "time-slot",
        disabled: slot.isBooked,
        className: [
          "h-10 rounded-lg text-xs font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          slot.isBooked ? "bg-muted/50 text-muted-foreground/40 border-border cursor-not-allowed line-through" : selected === slot.startTime ? "bg-accent text-accent-foreground border-accent shadow-sm" : "bg-card border-border hover:border-accent/50 text-foreground"
        ].join(" "),
        children: formatTime(slot.startTime)
      },
      slot.startTime
    )) })
  ] });
}
function DetailsStep({
  formData,
  onChange,
  errors
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StepContainer,
    {
      title: "Your Details",
      subtitle: "We'll use these to send your booking confirmation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Full Name",
            id: "clientName",
            value: formData.clientName,
            onChange: (v) => onChange("clientName", v),
            placeholder: "Jane Smith",
            error: errors.clientName,
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Email Address",
            id: "clientEmail",
            type: "email",
            value: formData.clientEmail,
            onChange: (v) => onChange("clientEmail", v),
            placeholder: "jane@example.com",
            error: errors.clientEmail,
            required: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Field,
          {
            label: "Phone Number",
            id: "clientPhone",
            type: "tel",
            value: formData.clientPhone,
            onChange: (v) => onChange("clientPhone", v),
            placeholder: "+27 82 123 4567",
            error: errors.clientPhone,
            required: true
          }
        )
      ] })
    }
  );
}
function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id, className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent ml-0.5", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        "data-ocid": `input-${id}`,
        "aria-invalid": !!error,
        "aria-describedby": error ? `${id}-error` : void 0,
        className: [
          "w-full h-10 rounded-lg border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
          error ? "border-destructive focus:ring-destructive/40" : "border-input hover:border-muted-foreground/40"
        ].join(" ")
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: `${id}-error`, className: "text-destructive text-xs", children: error })
  ] });
}
function ConfirmStep({
  formData,
  service,
  stylist,
  isLoading,
  onConfirm,
  error
}) {
  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
  };
  const rows = [
    { label: "Service", value: (service == null ? void 0 : service.name) ?? "—" },
    {
      label: "Duration",
      value: service ? `${Number(service.durationMinutes)} min` : "—"
    },
    { label: "Price", value: service ? `₹${Number(service.price)}` : "—" },
    { label: "Stylist", value: (stylist == null ? void 0 : stylist.name) ?? "—" },
    { label: "Date", value: formData.date || "—" },
    { label: "Time", value: formatTime(formData.startTime) },
    { label: "Name", value: formData.clientName || "—" },
    { label: "Email", value: formData.clientEmail || "—" },
    { label: "Phone", value: formData.clientPhone || "—" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StepContainer,
    {
      title: "Review Your Booking",
      subtitle: "Please confirm all details are correct before proceeding",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-hidden mb-6", children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: [
              "flex items-center justify-between px-4 py-3 gap-4",
              i < rows.length - 1 ? "border-b border-border" : ""
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0", children: row.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: [
                    "text-sm text-foreground font-medium text-right min-w-0 truncate",
                    row.label === "Price" ? "text-accent font-bold" : ""
                  ].join(" "),
                  children: row.value
                }
              )
            ]
          },
          row.label
        )) }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm px-4 py-3 mb-4", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "hero",
            size: "lg",
            className: "w-full",
            onClick: onConfirm,
            disabled: isLoading,
            "data-ocid": "confirm-booking-btn",
            children: isLoading ? "Confirming…" : "Confirm Booking"
          }
        )
      ] })
    }
  );
}
function StepContainer({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.25, ease: "easeInOut" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-display text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
        ] }),
        children
      ]
    },
    title
  );
}
function StepSkeleton({ count }) {
  const keys = ["a", "b", "c", "d", "e", "f"].slice(0, count);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-xl bg-muted animate-pulse" }, k)) });
}
function BookPage() {
  const navigate = useNavigate();
  const { data: services } = useServices();
  const { data: stylists } = useStylists();
  const bookMutation = useBookAppointment();
  const [step, setStep] = reactExports.useState("service");
  const [formData, setFormData] = reactExports.useState({
    serviceId: null,
    stylistId: null,
    date: "",
    startTime: "",
    clientName: "",
    clientEmail: "",
    clientPhone: ""
  });
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const [bookingError, setBookingError] = reactExports.useState(null);
  const currentIndex = BOOKING_STEPS.indexOf(step);
  const selectedService = services == null ? void 0 : services.find((s) => s.id === formData.serviceId);
  const selectedStylist = stylists == null ? void 0 : stylists.find((s) => s.id === formData.stylistId);
  const handleField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: void 0 }));
  };
  const validateDetails = () => {
    const errors = {};
    if (!formData.clientName.trim()) errors.clientName = "Name is required";
    if (!formData.clientEmail.trim()) {
      errors.clientEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      errors.clientEmail = "Please enter a valid email address";
    }
    if (!formData.clientPhone.trim())
      errors.clientPhone = "Phone number is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const canAdvance = () => {
    if (step === "service") return formData.serviceId !== null;
    if (step === "stylist") return formData.stylistId !== null;
    if (step === "datetime") return !!formData.date && !!formData.startTime;
    if (step === "details") return true;
    return false;
  };
  const handleNext = () => {
    if (step === "details" && !validateDetails()) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < BOOKING_STEPS.length) {
      setStep(BOOKING_STEPS[nextIndex]);
    }
  };
  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) setStep(BOOKING_STEPS[prevIndex]);
  };
  const handleConfirm = async () => {
    if (!formData.serviceId || !formData.stylistId || !formData.date || !formData.startTime)
      return;
    setBookingError(null);
    const request = {
      serviceId: formData.serviceId,
      stylistId: formData.stylistId,
      date: formData.date,
      startTime: formData.startTime,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone
    };
    const result = await bookMutation.mutateAsync(request);
    if (result.__kind__ === "ok") {
      navigate({
        to: "/book/confirm",
        search: { ref: result.ok.referenceNumber }
      });
    } else {
      setBookingError(result.err ?? "Booking failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-6 py-8 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold font-display text-foreground mb-1", children: "Book an Appointment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Complete the steps below to reserve your visit at 19 Studio" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-6 py-10 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { currentStep: step }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        step === "service" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ServiceStep,
          {
            onSelect: (s) => {
              setFormData((p) => ({ ...p, serviceId: s.id }));
            },
            selected: formData.serviceId
          },
          "service"
        ),
        step === "stylist" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StylistStep,
          {
            onSelect: (s) => setFormData((p) => ({ ...p, stylistId: s.id })),
            selected: formData.stylistId
          },
          "stylist"
        ),
        step === "datetime" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DateTimeStep,
          {
            stylistId: formData.stylistId,
            selectedDate: formData.date,
            selectedTime: formData.startTime,
            onSelectDate: (d) => setFormData((p) => ({ ...p, date: d })),
            onSelectTime: (t) => setFormData((p) => ({ ...p, startTime: t }))
          },
          "datetime"
        ),
        step === "details" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailsStep,
          {
            formData,
            onChange: handleField,
            errors: fieldErrors
          },
          "details"
        ),
        step === "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfirmStep,
          {
            formData,
            service: selectedService,
            stylist: selectedStylist,
            isLoading: bookMutation.isPending,
            onConfirm: handleConfirm,
            error: bookingError
          },
          "confirm"
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-8 pt-6 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: currentIndex > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            onClick: handleBack,
            "data-ocid": "booking-back-btn",
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
              "Back"
            ]
          }
        ) }),
        step !== "confirm" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "accent",
            onClick: handleNext,
            disabled: !canAdvance(),
            "data-ocid": "booking-next-btn",
            size: "lg",
            children: "Continue"
          }
        )
      ] })
    ] })
  ] });
}
export {
  BookPage as default
};
