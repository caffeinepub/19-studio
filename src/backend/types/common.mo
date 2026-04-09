module {
  public type Timestamp = Int;
  public type ServiceId = Nat;
  public type StylistId = Nat;
  public type AppointmentId = Nat;

  public type AppointmentStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };
};
