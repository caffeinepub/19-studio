import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Appointment,
  BookingRequest,
  BookingResult,
  Service,
  StylistId,
  StylistPublic,
  TimeSlot,
} from "../types/booking";

export function useServices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStylists() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StylistPublic[]>({
    queryKey: ["stylists"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStylists();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAvailableSlots(date: string, stylistId: StylistId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TimeSlot[]>({
    queryKey: ["availableSlots", date, stylistId?.toString()],
    queryFn: async () => {
      if (!actor || !stylistId || !date) return [];
      return actor.getAvailableSlots(date, stylistId);
    },
    enabled: !!actor && !isFetching && !!date && !!stylistId,
  });
}

export function useAllAppointments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Appointment[]>({
    queryKey: ["allAppointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAppointmentByReference(referenceNumber: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Appointment | null>({
    queryKey: ["appointment", referenceNumber],
    queryFn: async () => {
      if (!actor || !referenceNumber) return null;
      return actor.getAppointmentByReference(referenceNumber);
    },
    enabled: !!actor && !isFetching && !!referenceNumber,
  });
}

export function useBookAppointment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<BookingResult, Error, BookingRequest>({
    mutationFn: async (request) => {
      if (!actor) throw new Error("Actor not available");
      return actor.bookAppointment(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
    },
  });
}

export function useCancelAppointment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (referenceNumber) => {
      if (!actor) throw new Error("Actor not available");
      return actor.cancelAppointment(referenceNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAppointments"] });
    },
  });
}

export function useCompleteAppointment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (appointmentId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.completeAppointment(appointmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAppointments"] });
    },
  });
}

export function useUpdateStylistAvailability() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { stylistId: bigint; available: boolean }>(
    {
      mutationFn: async ({ stylistId, available }) => {
        if (!actor) throw new Error("Actor not available");
        return actor.updateStylistAvailability(stylistId, available);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["stylists"] });
      },
    },
  );
}
