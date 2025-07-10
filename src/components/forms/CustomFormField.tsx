import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "../ui/input";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FormFieldTypes } from "@/constants";

interface Props<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  fieldType: FormFieldTypes;
  name: keyof TFieldValues;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: ControllerRenderProps<TFieldValues>,
  ) => React.ReactNode;
}

const CustomFormField = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name as Path<TFieldValues>}
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

CustomFormField.Input = function CustomFormFieldInput<
  TFieldValues extends FieldValues,
>({
  field,
  props,
}: {
  field: ControllerRenderProps<TFieldValues>;
  props: Props<TFieldValues>;
}) {
  const {
    iconSrc,
    fieldType,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;

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
    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="Calender"
            width={24}
            height={24}
            className="ml-2 select-none aspect-square"
            draggable="false"
          />
          <FormControl>
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time: "
              wrapperClassName="date-picker ml-2"
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldTypes.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldTypes.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldTypes.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name as string}
              checked={field.value as CheckedState}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name as string} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    default:
      return null;
  }
};

export default CustomFormField;
