import "./FilterBar.css";
import { Input, Select } from "antd";

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
  return (
    <div className="filter-bar-container">
      <div className="filter-bar-contnet">
        <div className="input-search-patient">
          <Search
            placeholder="Patient's name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(value) => setSearchValue(value)}
            allowClear
          />
        </div>
        <div className="select-search">
          <Select
            value={statusFilter}
            style={{ width: 200 }}
            placeholder="All"
            onChange={(value) => setStatusFilter(value)}
            options={[
              { value: "All", label: "All" },
              { value: "cancelled", label: "Cancelled" },
              { value: "visited", label: "Visited" },
              { value: "scheduled", label: "Scheduled" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
