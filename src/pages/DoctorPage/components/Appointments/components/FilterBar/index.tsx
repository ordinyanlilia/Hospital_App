import "./FilterBar.css";
import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../../../../../Store/store";
import { setSearchValue, setStatusFilter } from "../../../../../../features/DoctorPageSlice/doctorPageSlice";
import type { AppDispatch, RootState } from "../../../../../../app/store";

const { Search } = Input;

const FilterBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, statusFilter } = useSelector(
    (state: RootState) => state.doctorPage
  );

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-contnet">
        <div className="input-search-patient">
          <Search
            placeholder="Patient's name"
            value={searchValue}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
            onSearch={(value) => dispatch(setSearchValue(value))}
            allowClear
          />
        </div>
        <div className="select-search">
          <Select
            value={statusFilter}
            style={{ width: 200 }}
            placeholder="All"
            onChange={(value) => dispatch(setStatusFilter(value))}
            options={[
              { value: "All", label: "All" },
              { value: "upcoming", label: "Upcoming" },
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
