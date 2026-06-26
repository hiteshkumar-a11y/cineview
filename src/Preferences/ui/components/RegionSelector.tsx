import {
    SUPPORTED_REGIONS,
  } from "../../core/constants/preferencesConstants";
  
  interface RegionSelectorProps {
    selectedRegion: string;
    onChange: (code: string) => void;
  }
  
  function RegionSelector({
    selectedRegion,
    onChange,
  }: RegionSelectorProps) {
    return (
      <select
        value={selectedRegion}
        onChange={(e) => onChange(e.target.value)}
      >
        {SUPPORTED_REGIONS.map((region) => (
          <option key={region.code} value={region.code}>
            {region.label}
          </option>
        ))}
      </select>
    );
  }
  
  export default RegionSelector;