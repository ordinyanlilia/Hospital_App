import { useTranslate } from "../../../../../../context/TranslationProvider";
import "./FilterBar.css";
import { Input, Select } from "antd";
import { transliterate as tr } from "transliteration";

const { Search } = Input;

interface FilterBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
}) => {
  const { translate } = useTranslate();
  const handleSearchChange = (value: string) => {
    const normalized = tr(value).toLowerCase();
    setSearchValue(normalized);
  };
  return (
    <div className="filter-bar-container">
      <div className="filter-bar-contnet">
        <div className="input-search-patient">
          <Search
            placeholder={translate("searchPatientName")}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            onSearch={(value) => handleSearchChange(value)}
            allowClear
          />
        </div>
        <div className="select-search">
          <Select
            value={statusFilter}
            style={{ width: 200 }}
            placeholder={translate("all")}
            onChange={(value) => setStatusFilter(value)}
            options={[
              { value: "All", label: "All" },
              { value: "visited", label: "Visited" },
              { value: "scheduled", label: "Scheduled" },
              { value: "cancelled", label: "Cancelled" }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
