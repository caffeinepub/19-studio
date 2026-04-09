import Common "common";

module {
  public type Service = {
    id : Common.ServiceId;
    name : Text;
    description : Text;
    durationMinutes : Nat;
    price : Nat; // price in smallest currency unit (e.g. cents)
  };

  public type Stylist = {
    id : Common.StylistId;
    name : Text;
    bio : Text;
    var available : Bool;
  };

  // Shared (API-boundary) version of Stylist — no var fields
  public type StylistPublic = {
    id : Common.StylistId;
    name : Text;
    bio : Text;
    available : Bool;
  };

  public type TimeSlot = {
    date : Text;        // ISO date: "YYYY-MM-DD"
    startTime : Text;   // "HH:MM"
    endTime : Text;     // "HH:MM"
    stylistId : Common.StylistId;
    isBooked : Bool;
  };

  public type Appointment = {
    id : Common.AppointmentId;
    serviceId : Common.ServiceId;
    stylistId : Common.StylistId;
    clientName : Text;
    clientEmail : Text;
    clientPhone : Text;
    date : Text;        // ISO date: "YYYY-MM-DD"
    startTime : Text;   // "HH:MM"
    status : Common.AppointmentStatus;
    referenceNumber : Text;
    createdAt : Common.Timestamp;
  };

  public type BookingRequest = {
    serviceId : Common.ServiceId;
    stylistId : Common.StylistId;
    clientName : Text;
    clientEmail : Text;
    clientPhone : Text;
    date : Text;
    startTime : Text;
  };

  public type BookingResult = {
    #ok : Appointment;
    #err : Text;
  };
};
