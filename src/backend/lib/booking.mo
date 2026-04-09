import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/booking";

module {
  // ── Helpers ──────────────────────────────────────────────────────────────────

  // Parse "HH:MM" → total minutes from midnight
  func timeToMinutes(t : Text) : Nat {
    let parts = t.split(#char ':');
    var hours : Nat = 0;
    var mins : Nat = 0;
    var idx = 0;
    for (part in parts) {
      if (idx == 0) {
        hours := switch (Nat.fromText(part)) { case (?n) n; case null 0 };
      } else if (idx == 1) {
        mins := switch (Nat.fromText(part)) { case (?n) n; case null 0 };
      };
      idx += 1;
    };
    hours * 60 + mins;
  };

  // Format minutes-from-midnight → "HH:MM"
  func minutesToTime(totalMins : Nat) : Text {
    let h = totalMins / 60;
    let m = totalMins % 60;
    let hStr = if (h < 10) "0" # h.toText() else h.toText();
    let mStr = if (m < 10) "0" # m.toText() else m.toText();
    hStr # ":" # mStr;
  };

  // Check whether two time intervals overlap: [aStart, aEnd) ∩ [bStart, bEnd)
  func intervalsOverlap(aStart : Nat, aEnd : Nat, bStart : Nat, bEnd : Nat) : Bool {
    aStart < bEnd and bStart < aEnd;
  };

  // ── Public API ────────────────────────────────────────────────────────────────

  public func getServices(services : List.List<Types.Service>) : [Types.Service] {
    services.toArray();
  };

  public func getStylists(stylists : List.List<Types.Stylist>) : [Types.StylistPublic] {
    stylists.map<Types.Stylist, Types.StylistPublic>(
      func(s) { { id = s.id; name = s.name; bio = s.bio; available = s.available } }
    ).toArray();
  };

  public func getAvailableSlots(
    appointments : List.List<Types.Appointment>,
    stylists : List.List<Types.Stylist>,
    services : List.List<Types.Service>,
    date : Text,
    stylistId : Common.StylistId,
  ) : [Types.TimeSlot] {
    // Verify stylist exists and is available
    let stylistOpt = stylists.find(func(s : Types.Stylist) : Bool { s.id == stylistId });
    switch (stylistOpt) {
      case null { return [] };
      case (?stylist) {
        if (not stylist.available) { return [] };
      };
    };

    // Collect existing appointments for this stylist on this date
    let dayAppts = appointments.filter(
      func(a : Types.Appointment) : Bool {
        a.stylistId == stylistId and a.date == date and
        a.status != #cancelled
      }
    );

    // 9:00 AM to 6:00 PM, 30-min increments
    let startOfDay : Nat = 9 * 60;   // 540
    let endOfDay : Nat = 18 * 60;    // 1080
    let slotDuration : Nat = 30;

    let slots = List.empty<Types.TimeSlot>();
    var current = startOfDay;
    while (current + slotDuration <= endOfDay) {
      let slotEnd = current + slotDuration;
      let startStr = minutesToTime(current);
      let endStr = minutesToTime(slotEnd);

      // Check if any existing appointment overlaps this slot
      // We need the service duration for the appointment to determine its end time
      let isBooked = dayAppts.any(func(a : Types.Appointment) : Bool {
        let aStart = timeToMinutes(a.startTime);
        // Find service duration for this appointment
        let svcOpt = services.find(func(s : Types.Service) : Bool { s.id == a.serviceId });
        let duration = switch (svcOpt) { case (?svc) svc.durationMinutes; case null 30 };
        let aEnd = aStart + duration;
        intervalsOverlap(aStart, aEnd, current, slotEnd);
      });

      slots.add({
        date = date;
        startTime = startStr;
        endTime = endStr;
        stylistId = stylistId;
        isBooked = isBooked;
      });
      current += slotDuration;
    };
    slots.toArray();
  };

  public func getAllAppointments(appointments : List.List<Types.Appointment>) : [Types.Appointment] {
    appointments.toArray();
  };

  public func getAppointmentByReference(
    appointments : List.List<Types.Appointment>,
    referenceNumber : Text,
  ) : ?Types.Appointment {
    appointments.find(func(a : Types.Appointment) : Bool { a.referenceNumber == referenceNumber });
  };

  public func bookAppointment(
    appointments : List.List<Types.Appointment>,
    services : List.List<Types.Service>,
    stylists : List.List<Types.Stylist>,
    nextId : Nat,
    request : Types.BookingRequest,
  ) : (Types.BookingResult, Nat) {
    // Validate service exists
    let serviceOpt = services.find(func(s : Types.Service) : Bool { s.id == request.serviceId });
    let service = switch (serviceOpt) {
      case null { return (#err("Service not found"), nextId) };
      case (?s) s;
    };

    // Validate stylist exists and is available
    let stylistOpt = stylists.find(func(s : Types.Stylist) : Bool { s.id == request.stylistId });
    switch (stylistOpt) {
      case null { return (#err("Stylist not found"), nextId) };
      case (?st) {
        if (not st.available) { return (#err("Stylist is not available"), nextId) };
      };
    };

    // Validate no overlap with existing non-cancelled appointments for this stylist on this date
    let requestStart = timeToMinutes(request.startTime);
    let requestEnd = requestStart + service.durationMinutes;

    let hasConflict = appointments.any(func(a : Types.Appointment) : Bool {
      if (a.stylistId != request.stylistId) { return false };
      if (a.date != request.date) { return false };
      if (a.status == #cancelled) { return false };
      let aStart = timeToMinutes(a.startTime);
      let svcOpt = services.find(func(s : Types.Service) : Bool { s.id == a.serviceId });
      let duration = switch (svcOpt) { case (?svc) svc.durationMinutes; case null 30 };
      let aEnd = aStart + duration;
      intervalsOverlap(aStart, aEnd, requestStart, requestEnd);
    });

    if (hasConflict) {
      return (#err("Time slot is already booked"), nextId);
    };

    let now = Time.now();
    let refNum = generateReferenceNumber(nextId, now);
    let appointment : Types.Appointment = {
      id = nextId;
      serviceId = request.serviceId;
      stylistId = request.stylistId;
      clientName = request.clientName;
      clientEmail = request.clientEmail;
      clientPhone = request.clientPhone;
      date = request.date;
      startTime = request.startTime;
      status = #confirmed;
      referenceNumber = refNum;
      createdAt = now;
    };
    appointments.add(appointment);
    (#ok(appointment), nextId + 1);
  };

  public func cancelAppointment(
    appointments : List.List<Types.Appointment>,
    referenceNumber : Text,
  ) : Bool {
    var found = false;
    appointments.mapInPlace(func(a : Types.Appointment) : Types.Appointment {
      if (a.referenceNumber == referenceNumber and a.status != #cancelled) {
        found := true;
        { a with status = #cancelled };
      } else {
        a;
      };
    });
    found;
  };

  public func completeAppointment(
    appointments : List.List<Types.Appointment>,
    appointmentId : Common.AppointmentId,
  ) : Bool {
    var found = false;
    appointments.mapInPlace(func(a : Types.Appointment) : Types.Appointment {
      if (a.id == appointmentId and a.status == #confirmed) {
        found := true;
        { a with status = #completed };
      } else {
        a;
      };
    });
    found;
  };

  public func updateServicePricing(
    services : List.List<Types.Service>,
    serviceId : Common.ServiceId,
    newPrice : Nat,
  ) : Bool {
    var found = false;
    services.mapInPlace(func(s : Types.Service) : Types.Service {
      if (s.id == serviceId) {
        found := true;
        { s with price = newPrice };
      } else {
        s;
      };
    });
    found;
  };

  public func updateStylistAvailability(
    stylists : List.List<Types.Stylist>,
    stylistId : Common.StylistId,
    available : Bool,
  ) : Bool {
    var found = false;
    stylists.forEach(func(s : Types.Stylist) {
      if (s.id == stylistId) {
        found := true;
        s.available := available;
      };
    });
    found;
  };

  public func generateReferenceNumber(appointmentId : Nat, timestamp : Time.Time) : Text {
    // Use last 6 digits of timestamp (nanoseconds) combined with appointment id
    let tsAbs : Nat = if (timestamp < 0) 0 else timestamp.toNat();
    let tsPart = tsAbs % 1000000;
    "19S-" # appointmentId.toText() # "-" # tsPart.toText();
  };

  // ── Seed helpers (called once at init) ───────────────────────────────────────

  public func seedDefaultServices(services : List.List<Types.Service>) {
    services.add({ id = 1; name = "Haircut"; description = "Classic haircut tailored to your style."; durationMinutes = 45; price = 500 });
    services.add({ id = 2; name = "Beard"; description = "Professional beard trim and shaping"; durationMinutes = 30; price = 150 });
  };

  public func seedDefaultStylists(stylists : List.List<Types.Stylist>) {
    stylists.add({ id = 1; name = "Alex"; bio = "10 years of experience specializing in modern cuts and color techniques."; var available = true });
    stylists.add({ id = 2; name = "Sam"; bio = "Expert in balayage, highlights, and creative color transformations."; var available = true });
    stylists.add({ id = 3; name = "Jordan"; bio = "Passionate about precision cuts and helping clients find their perfect look."; var available = true });
  };
};
