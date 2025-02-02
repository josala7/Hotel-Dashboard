import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { useTranslation } from "react-i18next";

function Cabins() {
  //* instead of manually fetch the data , react query will do that
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  // const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t("All cabins")}</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <AddCabin />
        <CabinTable />
        {/* <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />} */}
      </Row>
    </>
  );
}

export default Cabins;
