import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    // <Filter/>
    <>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      {/* value's names must be equal to columns names in supabase to the sorting */}
      <SortBy
        options={[
          { value: "name-asc", label: "Sort By name (A-Z)" },
          { value: "name-desc", label: "Sort By name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By price (Low First)" },
          { value: "regularPrice-desc", label: "Sort By price (High First)" },
          { value: "maxCapacity-asc", label: "Sort By capacity (Low First)" },
          { value: "maxCapacity-desc", label: "Sort By capacity (High First)" },
        ]}
      />
    </>
  );
}

export default CabinTableOperations;
