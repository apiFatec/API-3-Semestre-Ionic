import { NavBar } from "@/components/navBar";
import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ionichealth from "../../assets/Ionichealth.svg";
import downloadsolid from "../../assets/download-solid.svg";
import { Button } from "@/components/ui/button";
import React from "react";

export function AprovarDocumento() {
  return (
    <div className="grid min-h-screen">
  <section className="grid grid-cols-2" style={{ gridTemplateColumns: "1fr" }}>
    <img src={ionichealth} alt="logo ionic health" className="absolute ml-14" />
    <div className="relative mt-16">
      <div className="flex justify-end">
        <button className="mx-auto mb-2 flex justify-end gap-1 ml-auto hover:border-b-2 border-ionic-normal" style={{ marginLeft: "57%" }} >
          Baixar <img src={downloadsolid} alt="" />
        </button>
      </div>
      <div className="flex justify-center gap-16">
        <ScrollArea
          className="p-4"
          style={{
            width: "660px",
            height: "680px",
            borderRadius: "6px",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
        />
        <div className="flex items-end">
          <div className="flex items-center gap-8">
            <button className="hover:text-red-500">Negar</button>
            <Button className="bg-ionic-normal active:bg-ionic-pressed hover:bg-ionic-pressed h-12 font-normal text-1xl w-32 text-white shadow-md">
              Aprovar
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

  );
}
