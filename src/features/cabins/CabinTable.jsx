import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useTranslation } from "react-i18next";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [seachParams] = useSearchParams();
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  //============================ 1. Filter  ===========================
  const filterValue = seachParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabins) => cabins.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabins) => cabins.discount > 0);
  }

  //============================ 2. Sort  ===========================
  const sortedValue = seachParams.get("SortBy") || "startDate-asc";
  const [field, direction] = sortedValue.split("-");

  // direction
  const modifier = direction === "asc" ? 1 : -1;
  // field
  const sortedCabins =
    field === "name"
      ? filteredCabins.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);

  if (!cabins.length) return <Empty resourceName="Cabins" />;

  return (
    // compund component pattern
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>{t("Cabin")}</div>
        <div>{t("Capacity")}</div>
        <div>{t("Price")}</div>
        <div>{t("Discount")}</div>
        <div></div>
      </Table.Header>

      {/* render prop pattern */}
      <Table.Body
        // data={cabins}
        // data={filteredCabins}
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
