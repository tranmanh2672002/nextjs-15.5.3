import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import type { DateRange, Matcher } from 'react-day-picker'

import { cn } from '@/lib/utils'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '../ui'

type Props = {
  value?: string | DateRange
  onChange?: (value?: string | DateRange) => void
  placeholder?: string
  disabled?: Matcher | Matcher[] | undefined
  inputClassName?: string
  mode?: 'single' | 'range'
  disabledDate?: (date: Date) => boolean
  maxDate?: Date
  minDate?: Date
}

export const DatePicker = ({
  onChange,
  value,
  placeholder,
  disabled,
  inputClassName,
  mode = 'single',
  disabledDate,
  maxDate,
  minDate,
}: Props) => {
  const [open, setOpen] = React.useState(false)

  const locale = ja

  const formatDateRange = (date: DateRange) => {
    return date
      ? (date.from
          ? format(date.from as Date, 'yyyy/MM/dd', {
              locale,
            })
          : '') +
          ' - ' +
          (date.to
            ? format(date.to as Date, 'yyyy/MM/dd', {
                locale,
              })
            : '')
      : placeholder
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'border-neutral-04 bg-neutral-01 text-neutral-08 hover:bg-neutral-01 flex h-[44px] w-full justify-between rounded-md px-3 text-left font-normal duration-75',
            inputClassName,
            !value && 'text-gray-01',
            {
              'cursor-not-allowed': disabled,
              'border-state-info': open,
            },
          )}
        >
          {mode === 'single' && (
            <span
              className={cn('', {
                'text-neutral-05': !value,
              })}
            >
              {value ? format(value as string, 'yyyy/MM/dd', { locale }) : placeholder}
            </span>
          )}
          <br />
          {mode === 'range' && (
            <span
              className={cn('', {
                'text-border-01': value,
              })}
            >
              {formatDateRange(value as DateRange)}
            </span>
          )}
          <CalendarIcon className="text-neutral-10 size-5" />
        </Button>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent className="bg-neutral-01 w-auto border-none p-5">
          {mode === 'range' ? (
            <Calendar
              locale={locale}
              disabled={disabledDate}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={new Date().getFullYear() + 10}
              mode="range"
              numberOfMonths={2}
              selected={
                value
                  ? {
                      from: (value as DateRange).from as Date,
                      to: (value as DateRange).to as Date,
                    }
                  : undefined
              }
              onSelect={(e) => {
                onChange?.(e)
              }}
            />
          ) : (
            <Calendar
              locale={locale}
              disabled={{ before: minDate, after: maxDate } as Matcher}
              defaultMonth={value ? new Date(value as string) : new Date()}
              captionLayout="dropdown"
              fromYear={1900}
              toYear={new Date().getFullYear() + 10}
              mode="single"
              selected={value ? new Date(value as string) : undefined}
              onSelect={(e) => {
                if (e) {
                  onChange?.(e?.toISOString())
                }
              }}
              className="!rounded-xl"
            />
          )}
        </PopoverContent>
      )}
    </Popover>
  )
}
