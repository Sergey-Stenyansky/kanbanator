import dayjs, { Dayjs } from "dayjs";

import { DatePicker } from "@mui/x-date-pickers";

import { Typography, Box } from "@mui/material";

import { memo, useCallback, useState } from "react";
import { useUpdateEffect } from "react-use";

import { DateFormat } from "@/helpers/date/format";

import formatDate from "@/helpers/date/format";

export interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  label?: string;
  placeholder?: string;
  allowTo?: Dayjs;
  allowFrom?: Dayjs;
}

export function toDayjsDate(value: string | null) {
  if (!value) return null;
  return dayjs(value);
}

export function isDateInRange(
  value: Dayjs,
  min: Dayjs | null,
  max: Dayjs | null
) {
  let result = true;
  if (min) {
    result = value.isAfter(min) || value.isSame(min, "days");
  }
  if (max) {
    result = result && (value.isBefore(max) || value.isSame(max, "days"));
  }
  return result;
}

export type DateFieldValidationResult = {
  valid: boolean;
  issues?: {
    value?: string;
    range?: string;
  };
};

export function getErrorResult(
  config: Partial<DateFieldValidationResult["issues"]>
): DateFieldValidationResult {
  return {
    valid: false,
    issues: { ...config },
  };
}

export function getSuccessResult(): DateFieldValidationResult {
  return { valid: true };
}

export const minDateDefault = dayjs("1900-01-01");
export const maxDateDefault = dayjs("2099-12-31");

const ErrorLabel = (props: { text?: string | null }) =>
  props.text ? (
    <Typography component="span" mt="4px" color="error">
      {props.text}
    </Typography>
  ) : null;

const DateField = ({
  value,
  title,
  label,
  onChange,
  placeholder,
  allowFrom = minDateDefault,
  allowTo = maxDateDefault,
}: DateFieldProps) => {
  const [innerValue, setInnerValue] = useState(value);
  const [errorState, setErrorState] =
    useState<DateFieldValidationResult | null>(null);

  useUpdateEffect(() => setInnerValue(value), [value]);

  const validateDateValue = useCallback(
    (newValue: Dayjs | null) => {
      if (!newValue) return getSuccessResult();
      const isValid =
        newValue.isValid() && isDateInRange(newValue, allowFrom, allowTo);
      if (!isValid) return getErrorResult({ value: "Invalid date" });
      return getSuccessResult();
    },
    [allowFrom, allowTo]
  );

  const onInnerChange = useCallback(
    (date: Dayjs | null) => {
      const result = validateDateValue(date);
      const formattedDate = formatDate(date, DateFormat.shortDateISO);
      const nextDate = result.valid ? formattedDate : value;
      setInnerValue(formattedDate);
      setErrorState(result);
      onChange(nextDate);
    },
    [value, onChange, validateDateValue]
  );

  return (
    <Box>
      {title && <Typography mb="4px">{title}</Typography>}
      <DatePicker
        label={label}
        value={toDayjsDate(innerValue)}
        format={DateFormat.shortDate}
        minDate={allowFrom}
        maxDate={allowTo}
        onChange={onInnerChange}
        slotProps={{
          textField: {
            placeholder,
            helperText: <ErrorLabel text={errorState?.issues?.value} />,
          },
        }}
      />
    </Box>
  );
};

export default memo(DateField);
