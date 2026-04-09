import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export type Timestamp = bigint;
export interface TimeSlot {
    startTime: string;
    endTime: string;
    date: string;
    stylistId: StylistId;
    isBooked: boolean;
}
export interface StylistPublic {
    id: StylistId;
    bio: string;
    name: string;
    available: boolean;
}
export interface BookingRequest {
    startTime: string;
    clientName: string;
    date: string;
    stylistId: StylistId;
    clientEmail: string;
    clientPhone: string;
    serviceId: ServiceId;
}
export interface Service {
    id: ServiceId;
    name: string;
    description: string;
    durationMinutes: bigint;
    price: bigint;
}
export type BookingResult = {
    __kind__: "ok";
    ok: Appointment;
} | {
    __kind__: "err";
    err: string;
};
export type AppointmentId = bigint;
export interface Appointment {
    id: AppointmentId;
    startTime: string;
    status: AppointmentStatus;
    referenceNumber: string;
    clientName: string;
    date: string;
    stylistId: StylistId;
    createdAt: Timestamp;
    clientEmail: string;
    clientPhone: string;
    serviceId: ServiceId;
}
export type StylistId = bigint;
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export interface backendInterface {
    bookAppointment(request: BookingRequest): Promise<BookingResult>;
    cancelAppointment(referenceNumber: string): Promise<boolean>;
    claimAdmin(): Promise<boolean>;
    completeAppointment(appointmentId: AppointmentId): Promise<boolean>;
    getAdmin(): Promise<Principal>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAppointmentByReference(referenceNumber: string): Promise<Appointment | null>;
    getAvailableSlots(date: string, stylistId: StylistId): Promise<Array<TimeSlot>>;
    getServices(): Promise<Array<Service>>;
    getStylists(): Promise<Array<StylistPublic>>;
    updateServicePricing(serviceId: ServiceId, newPrice: bigint): Promise<boolean>;
    updateStylistAvailability(stylistId: StylistId, available: boolean): Promise<boolean>;
}
