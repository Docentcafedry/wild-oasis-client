"use client";
import { isWithinInterval, eachDayOfInterval } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useReservationContext } from "../contexts/ReservationContext";
import "react-day-picker/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({
  cabin,
  minBookingLength,
  maxBookingLength,
  bookedDays,
}) {
  // CHANGE
  const { regularPrice, discount, numNights } = cabin;
  const range = { from: null, to: null };
  const defaultClassNames = getDefaultClassNames();

  const { reservation, setReservation } = useReservationContext();

  const numNightsReservation = eachDayOfInterval({
    start: reservation.from,
    end: reservation.to,
  }).length;
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        animate
        classNames={{
          selected: `text-primary-200`,
          root: `${defaultClassNames.root} shadow-lg p-3`,
          day: `group w-5 h-5 rounded-full ${defaultClassNames.day} `,
          caption_label: `text-primary-200`,
          range_end: `bg-accent-700`,
          range_start: `bg-accent-700`,
          range_middle: `bg-accent-700`,
        }}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        selected={reservation}
        onSelect={(date) => setReservation(date)}
        disabled={bookedDays}
        components={{
          /* Custom Button */
          DayButton: (props) => {
            const { day, ...buttonProps } = props;
            return (
              <button
                {...buttonProps}
                className="bg-primary-900 w-8 h-6 m-1 group-aria-selected:bg-accent-700 rounded-full"
              />
            );
          },
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNightsReservation ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="flex justify-between gap-2 items-center">
                <span className="text-lg font-bold uppercase">Total</span>

                <span className="text-2xl font-semibold">
                  ${regularPrice * numNightsReservation}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {reservation.from || reservation.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => setReservation({ from: undefined, to: undefined })}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
