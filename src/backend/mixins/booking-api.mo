import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/booking";
import BookingLib "../lib/booking";

mixin (
  services : List.List<Types.Service>,
  stylists : List.List<Types.Stylist>,
  appointments : List.List<Types.Appointment>,
  nextAppointmentId : [var Nat],
  adminPrincipal : Principal,
) {
  // ── Query functions ──────────────────────────────────────────────────────────

  public query func getServices() : async [Types.Service] {
    BookingLib.getServices(services);
  };

  public query func getStylists() : async [Types.StylistPublic] {
    BookingLib.getStylists(stylists);
  };

  public query func getAvailableSlots(date : Text, stylistId : Common.StylistId) : async [Types.TimeSlot] {
    BookingLib.getAvailableSlots(appointments, stylists, services, date, stylistId);
  };

  public query func getAppointmentByReference(referenceNumber : Text) : async ?Types.Appointment {
    BookingLib.getAppointmentByReference(appointments, referenceNumber);
  };

  public shared query ({ caller }) func getAllAppointments() : async [Types.Appointment] {
    if (not Principal.equal(caller, adminPrincipal)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    BookingLib.getAllAppointments(appointments);
  };

  // ── Update functions ─────────────────────────────────────────────────────────

  public shared func bookAppointment(request : Types.BookingRequest) : async Types.BookingResult {
    let (result, newId) = BookingLib.bookAppointment(appointments, services, stylists, nextAppointmentId[0], request);
    nextAppointmentId[0] := newId;
    result;
  };

  public shared func cancelAppointment(referenceNumber : Text) : async Bool {
    BookingLib.cancelAppointment(appointments, referenceNumber);
  };

  public shared ({ caller }) func completeAppointment(appointmentId : Common.AppointmentId) : async Bool {
    if (not Principal.equal(caller, adminPrincipal)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    BookingLib.completeAppointment(appointments, appointmentId);
  };

  public shared ({ caller }) func updateServicePricing(serviceId : Common.ServiceId, newPrice : Nat) : async Bool {
    if (not Principal.equal(caller, adminPrincipal)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    BookingLib.updateServicePricing(services, serviceId, newPrice);
  };

  public shared ({ caller }) func updateStylistAvailability(stylistId : Common.StylistId, available : Bool) : async Bool {
    if (not Principal.equal(caller, adminPrincipal)) {
      Runtime.trap("Unauthorized: admin access required");
    };
    BookingLib.updateStylistAvailability(stylists, stylistId, available);
  };
};
