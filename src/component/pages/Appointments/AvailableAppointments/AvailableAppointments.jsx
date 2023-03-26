import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AppointmentModel from "../AppointmentModal/AppointmentModel";
import Options from "./Options";

const AvailableAppointments = ({ seletDate }) => {
  const [appointmentServes, setAppointmentServes] = useState([]);
  const [treatment, setTreatment] = useState(null);
  useEffect(() => {
    fetch("appointmentserves.json")
      .then((res) => res.json())
      .then((data) => setAppointmentServes(data));
  }, []);
  // const { data: appointmentServes = [] } = useQuery({
  //   queryKey: ["appointmentserves"],
  //   queryFn: () =>
  //     fetch("http://localhost:5000/appointmentserves").then((res) =>
  //       res.json()
  //     ),
  // });
  return (
    <div className="my-20 text-center">
      <p className="text-center my-5">
        You have selected Date: {format(seletDate, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {appointmentServes.map((serves) => (
          <Options
            serves={serves}
            key={serves._id}
            setTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <AppointmentModel
          treatment={treatment}
          seletDate={seletDate}
          setTreatment={setTreatment}
        />
      )}
    </div>
  );
};

export default AvailableAppointments;
