import type { backendInterface } from "../backend";
import { AppointmentStatus } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

export const mockBackend: backendInterface = {
  bookAppointment: async (request) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      startTime: request.startTime,
      status: AppointmentStatus.confirmed,
      referenceNumber: "19S-2026-001",
      clientName: request.clientName,
      date: request.date,
      stylistId: request.stylistId,
      createdAt: BigInt(Date.now()),
      clientEmail: request.clientEmail,
      clientPhone: request.clientPhone,
      serviceId: request.serviceId,
    },
  }),

  cancelAppointment: async () => true,

  claimAdmin: async () => true,

  completeAppointment: async () => true,

  getAdmin: async () => ({ toText: () => "aaaaa-aa" } as unknown as Principal),

  getAllAppointments: async () => [
    {
      id: BigInt(1),
      startTime: "10:00",
      status: AppointmentStatus.confirmed,
      referenceNumber: "19S-2026-001",
      clientName: "Sophia Müller",
      date: "2026-04-12",
      stylistId: BigInt(1),
      createdAt: BigInt(Date.now()),
      clientEmail: "sophia@example.com",
      clientPhone: "+49 170 1234567",
      serviceId: BigInt(2),
    },
    {
      id: BigInt(2),
      startTime: "12:30",
      status: AppointmentStatus.pending,
      referenceNumber: "19S-2026-002",
      clientName: "Lena Kovač",
      date: "2026-04-13",
      stylistId: BigInt(2),
      createdAt: BigInt(Date.now()),
      clientEmail: "lena@example.com",
      clientPhone: "+49 171 9876543",
      serviceId: BigInt(2),
    },
    {
      id: BigInt(3),
      startTime: "14:00",
      status: AppointmentStatus.completed,
      referenceNumber: "19S-2026-003",
      clientName: "Amara Diallo",
      date: "2026-04-10",
      stylistId: BigInt(1),
      createdAt: BigInt(Date.now()),
      clientEmail: "amara@example.com",
      clientPhone: "+49 172 5554433",
      serviceId: BigInt(2),
    },
    {
      id: BigInt(4),
      startTime: "09:00",
      status: AppointmentStatus.cancelled,
      referenceNumber: "19S-2026-004",
      clientName: "Mia Tanaka",
      date: "2026-04-09",
      stylistId: BigInt(2),
      createdAt: BigInt(Date.now()),
      clientEmail: "mia@example.com",
      clientPhone: "+49 173 7778899",
      serviceId: BigInt(2),
    },
  ],

  getAppointmentByReference: async (ref) => ({
    id: BigInt(1),
    startTime: "10:00",
    status: AppointmentStatus.confirmed,
    referenceNumber: ref,
    clientName: "Sophia Müller",
    date: "2026-04-12",
    stylistId: BigInt(1),
    createdAt: BigInt(Date.now()),
    clientEmail: "sophia@example.com",
    clientPhone: "+49 170 1234567",
      serviceId: BigInt(2),
  }),

  getAvailableSlots: async (date, stylistId) => [
    { startTime: "09:00", endTime: "09:45", date, stylistId, isBooked: false },
    { startTime: "10:00", endTime: "10:45", date, stylistId, isBooked: false },
    { startTime: "11:00", endTime: "11:45", date, stylistId, isBooked: true },
    { startTime: "13:00", endTime: "13:45", date, stylistId, isBooked: false },
    { startTime: "14:00", endTime: "14:45", date, stylistId, isBooked: false },
    { startTime: "15:30", endTime: "16:15", date, stylistId, isBooked: false },
  ],

  getServices: async () => [
    {
      id: BigInt(1),
      name: "Haircut",
      description: "Classic haircut tailored to your style.",
      durationMinutes: BigInt(45),
      price: BigInt(500),
    },
    {
      id: BigInt(2),
      name: "Beard",
      description: "Professional beard trim and shaping — clean lines, sharp edges, and a refined finish.",
      durationMinutes: BigInt(30),
      price: BigInt(150),
    },
  ],

  getStylists: async () => [
    {
      id: BigInt(1),
      name: "Ines Hartmann",
      bio: "10 years of precision cutting and color work in Berlin and Paris. Specialist in fine European hair.",
      available: true,
    },
    {
      id: BigInt(2),
      name: "Marco Reyes",
      bio: "Expert in balayage and lived-in color techniques. Trained at Vidal Sassoon Academy, London.",
      available: true,
    },
  ],

  updateServicePricing: async () => true,

  updateStylistAvailability: async () => true,
};
