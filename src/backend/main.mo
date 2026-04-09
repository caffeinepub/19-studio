import List "mo:core/List";
import Principal "mo:core/Principal";
import Types "types/booking";
import BookingLib "lib/booking";
import BookingMixin "mixins/booking-api";

actor {
  // ── Persistent state ─────────────────────────────────────────────────────────

  let services : List.List<Types.Service> = List.empty();
  let stylists : List.List<Types.Stylist> = List.empty();
  let appointments : List.List<Types.Appointment> = List.empty();
  let nextAppointmentId : [var Nat] = [var 1];

  // Admin principal — anonymous() until a real admin logs in and calls setAdmin
  var adminPrincipal : Principal = Principal.anonymous();

  // ── Seed default data (runs once on first deploy) ────────────────────────────

  do {
    BookingLib.seedDefaultServices(services);
    BookingLib.seedDefaultStylists(stylists);
  };

  // ── Admin bootstrap ──────────────────────────────────────────────────────────

  // Allows the deployer to claim admin on first call (only works while admin is anonymous)
  public shared ({ caller }) func claimAdmin() : async Bool {
    if (adminPrincipal.isAnonymous()) {
      adminPrincipal := caller;
      true;
    } else {
      false;
    };
  };

  public query func getAdmin() : async Principal {
    adminPrincipal;
  };

  // ── Mixin composition ────────────────────────────────────────────────────────

  include BookingMixin(services, stylists, appointments, nextAppointmentId, adminPrincipal);
};
