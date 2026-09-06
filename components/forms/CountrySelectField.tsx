'use client';

import React, { useMemo, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import countryList from 'react-select-country-list';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Controller } from 'react-hook-form';
import { ChevronsUpDown } from 'lucide-react';

const getFlagEmoji = (countryCode: string) =>
    countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const CountrySelectField = ({ name, label, control, error, required = false }: CountrySelectProps) => {
    const [open, setOpen] = useState(false);

    const options = useMemo(() => countryList().getData(), []);

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => {
                    const selectedCountry = options.find((option) => option.value === field.value);

                    return (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    id={name}
                                    type="button"
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    aria-invalid={!!error}
                                    className="country-select-trigger"
                                >
                                    {selectedCountry ? (
                                        <div className="flex items-center gap-2 text-gray-100">
                                            <span>{getFlagEmoji(selectedCountry.value)}</span>
                                            <span>{selectedCountry.label}</span>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground">Select country</span>
                                    )}

                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent
                                align="start"
                                className="w-(--radix-popover-trigger-width) overflow-hidden rounded-lg border border-gray-600 bg-gray-800 p-0"
                            >
                                <Command className="country-select-command">
                                    <CommandInput placeholder="Search country..." className="country-select-input" />

                                    <CommandList className="country-select-list">
                                        <CommandEmpty className="country-select-empty">No country found.</CommandEmpty>

                                        <CommandGroup className="country-select-group">
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.label}
                                                    data-checked={field.value === option.value}
                                                    onSelect={() => {
                                                        field.onChange(option.value);
                                                        setOpen(false);
                                                    }}
                                                    className="country-select-item"
                                                >
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <span className="shrink-0 leading-none">
                                                            {getFlagEmoji(option.value)}
                                                        </span>
                                                        <span>{option.label}</span>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                }}
            />

            {error && <p className="text-sm text-destructive">{error.message}</p>}
        </div>
    );
};
export default CountrySelectField;
