"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../forms/CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  FormFieldTypes,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import {
  RegisterFieldValues,
  RegisterFormSchema,
} from "@/schemas/RegisterFormSchema";
import { registerPatient } from "@/lib/actions/patient.action";

interface Props {
  user: User;
}

const RegisterForm = ({ user }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFieldValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: RegisterFieldValues) => {
    setIsLoading(true);

    let formData;
    if (
      values.identification_document &&
      values.identification_document?.length > 0
    ) {
      const blobFile = new Blob([values.identification_document[0]], {
        type: values.identification_document[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identification_document[0].name);
    }

    try {
      const patient = {
        user_id: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birth_date: new Date(values.birth_date),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergency_contact_name: values.emergency_contact_name,
        emergency_contact_number: values.emergency_contact_number,
        primary_physician: values.primary_physician,
        insurance_provider: values.insurance_provider,
        insurance_policy_number: values.insurance_policy_number,
        allergies: values.allergies,
        current_medication: values.current_medication,
        family_medical_history: values.family_medical_history,
        past_medical_history: values.past_medical_history,
        identification_type: values.identification_type,
        identification_number: values.identification_number,
        identification_document: values.identification_document
          ? formData
          : undefined,
        privacy_consent: values.privacy_consent,
        treatment_consent: values.treatment_consent,
        disclosure_consent: values.disclosure_consent,
      } satisfies RegisterUserParams;

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <RegisterForm.SectionTitle title="Personal Information" />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldTypes.INPUT}
          name="name"
          placeholder="Full Name"
          label="Fullname"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <RadioGroup className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.DATE_PICKER}
            name="birth_date"
            label="Date of Birth"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group cursor-pointer">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </RadioGroup>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="address"
            label="Address"
            placeholder="14th Street, New York"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="occupation"
            placeholder="Software Engineer"
            label="Occupation"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="emergency_contact_name"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.PHONE_INPUT}
            name="emergency_contact_number"
            placeholder="Software Engineer"
            label="Emergency Contact Number"
          />
        </div>

        <section className="space-y-6">
          <RegisterForm.SectionTitle title="Medical Information" />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="primary_physician"
            placeholder="Select a physician"
            label="Primary Physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    alt="Doctor"
                    width={32}
                    height={32}
                    draggable="false"
                    className="rounded-full border border-dark-500 aspect-square select-none"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="insurance_provider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="insurance_policy_number"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="current_medication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="family_medical_history"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="past_medical_history"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <RegisterForm.SectionTitle title="Identification and Verification" />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="identification_type"
            placeholder="Select an identification type"
            label="Identification Type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="identification_number"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldTypes.SKELETON}
            control={form.control}
            name="identification_document"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value as File[]}
                  onChangeAction={field.onChange}
                />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <RegisterForm.SectionTitle title="Consent and Privacy" />

          <CustomFormField
            fieldType={FormFieldTypes.CHECKBOX}
            control={form.control}
            name="treatment_consent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldTypes.CHECKBOX}
            control={form.control}
            name="disclosure_consent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldTypes.CHECKBOX}
            control={form.control}
            name="privacy_consent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

RegisterForm.SectionTitle = function FormSectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-6 space-y-1">
      <h2 className="sub-header">{title}</h2>
    </div>
  );
};

export default RegisterForm;
