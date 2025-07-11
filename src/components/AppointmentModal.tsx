"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "@/types/appwrite";
import AppointmentForm from "./forms/AppointmentForm";

export const AppointmentModal = ({
  patientID,
  userID,
  appointment,
  appointmentStatusType,
}: {
  appointmentStatusType: "schedule" | "cancel";
  patientID: string;
  userID: string;
  appointment?: Appointment;
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${appointmentStatusType === "schedule" && "text-green-500"}`}
        >
          {appointmentStatusType}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            {appointmentStatusType} Appointment
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to {appointmentStatusType}{" "}
            appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userID={userID}
          patientID={patientID}
          appointmentStatusType={appointmentStatusType}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
