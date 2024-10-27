import EventContext from "@/context/Event/EventContext";
import { useContext, useState } from "react";

const formatarData = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function EventosTable() {
  const { events, currentEvent, setCurrentEvent } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(currentEvent);

  const handleSwitch = (value) => {
    setSelectedEvent(value);
    setCurrentEvent(value);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-950">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Data
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              >
                Selecionar
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((item) => (
              <tr key={item.uuid_evento}>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {item.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  {formatarData(new Date(item.date))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black text-center">
                  <input
                    type="checkbox"
                    checked={selectedEvent === item.uuid_evento}
                    onChange={() => handleSwitch(item.uuid_evento)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
