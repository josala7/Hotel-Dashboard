import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { differenceInDays, isBefore, isDate, startOfToday } from "date-fns";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useCreateBooking } from "./useCreateBooking";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useGuests } from "./useGuests";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
const Formflex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* flex-wrap: wrap; */
  justify-content: space-around;
  padding: 1rem;
  gap: 2.4rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 5px;
  }
`;
const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;
function CreateBookingForm(onClosing) {
  const [wantsBreakfast, setWantsBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { cabins, isLoading: load1 } = useCabins();
  const { isLoading: load2, guests } = useGuests();
  const { settings, isLoading: load3 } = useSettings();
  const { createNewBooking, isCreating } = useCreateBooking();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  if (load1 || load2 || load3) return <Spinner />;
  function onSubmit(data) {
    const numNights = differenceInDays(
      new Date(data.endDate),
      new Date(data.startDate)
    );
    const today = startOfToday();
    //Filtering dates
    if (numNights < 1) {
      toast.error("Start date must be before end date");
      return;
    }
    if (numNights < settings.minBookingLength) {
      toast.error(
        `Minimum nights per booking are ${settings.minBookingLength}`
      );
      return;
    }
    if (numNights > settings.maxBookingLength) {
      toast.error(
        `Maximum nights per booking are ${settings.maxBookingLength}`
      );
      return;
    }
    if (isBefore(new Date(data.startDate), today)) {
      toast.error("You can't start a booking before today");
      return;
    }
    //cabinPrice
    const reservedCabin = cabins
      .filter((cabin) => cabin.id === Number(data.cabinId))
      .at(0);
    const cabinPrice =
      (reservedCabin?.regularPrice - reservedCabin?.discount) * numNights;

    //extrasPrice
    const extrasPrice = wantsBreakfast
      ? settings.breakfastPrice * numNights * data.numGuests
      : 0;
    //totalPrice
    const totalPrice = cabinPrice + extrasPrice;

    const finalData = {
      ...data,
      cabinPrice,
      extrasPrice,
      totalPrice,
      isPaid,
      numNights,
      cabinId: Number(data.cabinId),
      numGuests: Number(data.numGuests),
      guestId: Number(data.guestId),
      hasBreakfast: wantsBreakfast,
      status: "unconfirmed",
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };
    createNewBooking(finalData, {
      onSuccess: (data) => {
        navigate(`/bookings`);
      },
    });
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      // type={onClosing ? "modal" : "regular"}
    >
      <Formflex>
        {/* start date */}
        <FormRow label="startDate" error={errors?.startDate?.message}>
          <Label htmlFor="startDate"> start Date</Label>

          <Input
            disabled={isCreating}
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "This field is required",
              validate:
                isDate(getValues().startDate) || "You must choose a valid date",
            })}
          />
        </FormRow>
        {/* end date */}
        <FormRow label="endDate" error={errors?.endDate?.message}>
          <Label htmlFor="endDate">End Date</Label>

          <Input
            disabled={isCreating}
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "This field is required",
              validate:
                isDate(getValues().endDate) || "You must choose a valid date",
            })}
          />
        </FormRow>
      </Formflex>
      {/* cabin name */}
      <Formflex>
        <FormRow label="Select cabin">
          <Label htmlFor="cabinId">Select Cabin</Label>

          <StyledSelect
            disabled={isCreating}
            id="cabinId"
            {...register("cabinId")}
          >
            {cabins.map((cabin) => (
              <option key={cabin.id} value={cabin.id}>
                {cabin.name}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        {/* guest  */}
        <FormRow label="Select guest">
          <Label htmlFor="guestId">Select Guest</Label>

          <StyledSelect
            disabled={isCreating}
            id="guestId"
            {...register("guestId")}
          >
            {guests.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.fullName}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
      </Formflex>
      {/* Extra prices */}
      <Formflex>
        <FormRow>
          <Label htmlFor="extrasPrice">Extra Price</Label>
          <Input
            type="number"
            id="extrasPrice"
            disabled={isCreating}
            {...register("extrasPrice")}
          />
          {errors?.extrasPrice?.message && (
            <Error>{errors.extrasPrice.message}</Error>
          )}
        </FormRow>
        {/* total price */}
        <FormRow>
          <Label htmlFor="totalPrice"> Total Price</Label>
          <Input
            type="number"
            // disabled={isWorking}
            id="totalPrice"
            {...register("totalPrice", {
              required: "This field is required",
              min: 1,
            })}
          />

          {errors?.totalPrice?.message && (
            <Error>{errors.totalPrice.message}</Error>
          )}
        </FormRow>
      </Formflex>

      {/* hasBreakfast */}
      <Formflex>
        <FormRow>
          <Checkbox
            id="breakfast"
            onChange={() => setWantsBreakfast((e) => !e)}
            disabled={isCreating}
          >
            {" "}
            I want breakfast
          </Checkbox>

          {errors?.hasBreakfast?.message && (
            <Error>{errors.hasBreakfast.message}</Error>
          )}
        </FormRow>

        {/* isPaid */}
        <FormRow>
          <Checkbox
            id="isPaid"
            onChange={() => setIsPaid((e) => !e)}
            disabled={isCreating}
          >
            {" "}
            This booking is paid
          </Checkbox>
          {errors?.isPaid?.message && <Error>{errors.isPaid.message}</Error>}
        </FormRow>
      </Formflex>
      {/* observations or Description */}
      <FormRow>
        <Label htmlFor="observations">Description</Label>

        <Textarea
          type="text"
          id="observations"
          // defaultValue=""
          {...register("observations")}
          disabled={isCreating}
        />
        {errors?.observations?.message && (
          <Error>{errors.observations.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => onClosing?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
