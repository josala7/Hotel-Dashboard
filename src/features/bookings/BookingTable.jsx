import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useTranslation } from "react-i18next";

function BookingTable() {
  const { count, bookings, isLoading } = useBookings();
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>{t("Cabin")}</div>
          <div>{t("Guest")}</div>
          <div>{t("Dates")}</div>
          <div>{t("Status")}</div>
          <div>{t("Amount")}</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
