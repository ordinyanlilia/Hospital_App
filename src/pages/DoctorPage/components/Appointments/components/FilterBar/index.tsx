import "./FilterBar.css";
import { Input } from "antd";
// import type { GetProps } from "antd";
import { Select } from "antd";

// type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

type FilterBarProps = {
  onSearch: (value: string) => void;
  setSearchValue:  (value: string) => void;
  setStatusFilter:  (value: string) => void;
};


const FilterBar: React.FC<FilterBarProps> = ({ setSearchValue, setStatusFilter, onSearch }) => {
  return (
    <div className="filter-bar-container">
      <div className="filter-bar-contnet">
        <div className="input-search-patient">
          <Search
            placeholder="Patient's name"
            onChange={(e)=> setSearchValue(e.target.value)}
            onSearch={(value) => {onSearch(value); setSearchValue(""); setStatusFilter("All")} }
          />
        </div>
        <div className="select-search">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="All"
            onChange={(value) => setStatusFilter(value)}
            options={[
              {
                value: "All",
                label: "All",
              },
              {
                value: "upcoming",
                label: "Upcoming",
              },
              {
                value: "visited",
                label: "Visited",
              },
              {
                value: "scheduled",
                label: "Scheduled",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
