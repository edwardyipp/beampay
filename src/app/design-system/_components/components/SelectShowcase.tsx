import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "../shared/SectionWrapper";
import { DemoCard } from "../shared/DemoCard";
import { Separator } from "@/components/ui/separator";

const currencies = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "SGD", label: "SGD — Singapore Dollar" },
  { value: "AUD", label: "AUD — Australian Dollar" },
  { value: "JPY", label: "JPY — Japanese Yen" },
];

export function SelectShowcase() {
  return (
    <SectionWrapper
      id="select"
      title="Select"
      description="Dropdown selector. Two trigger sizes: default (h-9) and sm (h-8). Auto-width trigger by default (w-fit)."
    >
      {/* Trigger sizes */}
      <DemoCard label="Trigger Sizes">
        <div className="flex flex-wrap items-end gap-6">
          <div className="space-y-2">
            <Label>Default (h-9)</Label>
            <Select defaultValue="USD">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Small (h-8)</Label>
            <Select defaultValue="EUR">
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Full width</Label>
            <Select defaultValue="GBP">
              <SelectTrigger className="w-full min-w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DemoCard>

      <Separator />

      {/* Grouped options */}
      <DemoCard label="With Groups and Separator">
        <div className="space-y-2 max-w-xs">
          <Label>Preferred Currency</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a currency..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Major Currencies</SelectLabel>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="EUR">EUR — Euro</SelectItem>
                <SelectItem value="GBP">GBP — British Pound</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia Pacific</SelectLabel>
                <SelectItem value="SGD">SGD — Singapore Dollar</SelectItem>
                <SelectItem value="AUD">AUD — Australian Dollar</SelectItem>
                <SelectItem value="JPY">JPY — Japanese Yen</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DemoCard>
    </SectionWrapper>
  );
}
