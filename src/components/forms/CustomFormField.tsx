"use client";

import { FormFieldTypes } from "../forms/PatientForm";
import { FieldValues } from "@/schemas/formSchema";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Control, ControllerRenderProps } from "react-hook-form";

import { Input } from "../ui/input";
import Image from "next/image";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface Props {
  control: Control<FieldValues>;
  fieldType: FormFieldTypes;
  name: keyof FieldValues;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: keyof FieldValues) => React.ReactNode;
}

const CustomFormField = (props: Props) => {
  const {
    control,
    fieldType,
    name,
    label,
    // iconAlt,
    // iconSrc,
    // placeholder,
    // children,
    // disabled,
    // dateFormat,
    // renderSkeleton,
    // showTimeSelect,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <CustomFormField.Input field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

CustomFormField.Input = function CustomFormFieldInput({
  field,
  props,
}: {
  field: ControllerRenderProps<FieldValues>;
  props: Props;
}) {
  const { iconSrc, fieldType, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2 select-none aspect-square"
              draggable="false"
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            country={"us"}
            placeholder={placeholder}
            inputClass="input-phone-input"
            value={field.value || undefined}
            onChange={field.onChange}
          />
        </FormControl>
      );
    default:
      break;
  }
};

export default CustomFormField;
