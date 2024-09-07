import EventosTable from "@/components/AdminModule/Tables/EventosTable";
import Title from "@/components/ui/Title";

export default function Eventos() {

    return (
        <div className="md:px-8 pb-8">
          <Title title="Eventos" />
          <EventosTable/>
        </div>
    )
}
