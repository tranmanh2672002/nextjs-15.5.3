'use client'

import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui'

export type ComboboxOption = {
  value: string
  label: string
}

type SelectCustomProps = {
  options: ComboboxOption[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  notFoundText?: string
  className?: string
  isLoading?: boolean
  error?: boolean
  disabled?: boolean
  popoverClassName?: string
  allOptionValue?: string
  mode?: 'single' | 'multiple'
  clearable?: boolean
}

export function SelectCustom({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  notFoundText = 'No option found.',
  className,
  error = false,
  disabled = false,
  popoverClassName,
  allOptionValue,
  mode = 'single',
  clearable = true,
}: SelectCustomProps) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = React.useMemo(() => {
    if (mode === 'single') {
      return options?.find((option) => option.value === value)?.label || ''
    }

    if (mode === 'multiple' && Array.isArray(value) && value.length > 0) {
      const optionsMap = new Map(options?.map((opt) => [opt.value, opt.label]))

      const selectedLabels = value.map((val) => optionsMap.get(val)).filter(Boolean)

      if (selectedLabels.length > 0) {
        return selectedLabels.join(', ')
      }
    }

    return placeholder
  }, [value, options, mode, placeholder])

  const handleSelect = React.useCallback(
    (optionValue: string) => {
      if (mode === 'multiple') {
        const currentValues = Array.isArray(value) ? [...value] : []

        if (allOptionValue && optionValue === allOptionValue) {
          if (currentValues.includes(allOptionValue)) {
            onChange([])
          } else {
            onChange([allOptionValue])
          }
          return
        }

        const newValues = currentValues.filter((v) => v !== allOptionValue)
        const itemIndex = newValues.indexOf(optionValue)

        if (itemIndex > -1) {
          newValues.splice(itemIndex, 1)
        } else {
          newValues.push(optionValue)
        }
        onChange(newValues)
      } else {
        const newValue = optionValue === value ? (clearable ? '' : value) : optionValue
        onChange(newValue)
        setOpen(false)
      }
    },
    [mode, value, onChange, allOptionValue, clearable],
  )

  const isSelected = React.useCallback(
    (optionValue: string) => {
      if (mode === 'multiple' && Array.isArray(value)) {
        if (value.includes(allOptionValue || '')) return true
        return value.includes(optionValue)
      }
      return value === optionValue
    },
    [mode, value, allOptionValue],
  )

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={error}
          disabled={disabled}
          className={cn(
            'data-[state=open]:border-primary-400 w-full justify-between',
            !value || (Array.isArray(value) && value.length === 0) ? 'text-muted-foreground' : '',
            className,
          )}
        >
          {selectedLabel ? (
            <span className="min-w-0 flex-1 truncate text-left">{selectedLabel}</span>
          ) : (
            <span className="min-w-0 flex-1 truncate text-left text-gray-500">{placeholder}</span>
          )}
          <ChevronDown
            className={cn('ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-300', {
              'rotate-180': open,
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[var(--radix-popover-trigger-width)] p-0', popoverClassName)}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.value}`}
                  onSelect={() => handleSelect(option.value)}
                  className={cn('flex cursor-pointer items-center', {
                    '!bg-primary-25': value === option.value,
                  })}
                >
                  <span className="flex-1 break-words">{option.label}</span>
                  <Check
                    className={cn(
                      'text-primary-400 ml-auto h-4 w-4',
                      isSelected(option.value) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
