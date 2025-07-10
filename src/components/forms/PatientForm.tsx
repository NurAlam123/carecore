"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import CustomFormField from "../forms/CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import { FormFieldTypes, PatientFormDefaultValues } from "@/constants";
import { UserFieldValues, UserFormSchema } from "@/schemas/UserFormSchema";

const PatientForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFieldValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: PatientFormDefaultValues,
  });

  async function onSubmit(userData: UserFieldValues) {
    setIsLoading(true);

    try {
      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="name"
          placeholder="Fullname"
          label="Fullname"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="email"
          placeholder="Email"
          label="Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.PHONE_INPUT}
          name="phone"
          placeholder="Phone"
          label="Phone number"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
