import React from "react";
import DialogCustom from "@/components/ui/DialogControlled";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { BadgeCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const requiredBadge = (
  <BadgeCheck size={"1.2rem"} color="var(--primary)"></BadgeCheck>
);
export default function DialogNewSpecimen() {
  return (
    <DialogCustom
      open={true}
      title="Agregar espécimen"
      submitButton={<Button>Agregar espécimen</Button>}
      description={
        <p>
          Ingrese los datos del nuevo espécimen para la especie Desmodus
          Rotundus Mirinus. Los campos marcados con {requiredBadge} son
          obligatorios.
        </p>
      }
    >
      <form action="">
        <Tabs defaultValue="collection">
          <TabsList className="flex flex-row justify-between w-full">
            <TabsTrigger value="morphometrics">
              Medidas morfométricas
            </TabsTrigger>
            <TabsTrigger value="location">Ubicación</TabsTrigger>
            <TabsTrigger value="collection">Colecta</TabsTrigger>
          </TabsList>
          <TabsContent value="morphometrics">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Edad</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Edad</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Edad</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p>Ingrese las medidas del espécimen en centímetros</p>
              <div className="grid gap-5">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Largo total</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Largo total</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Largo total</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Largo total</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Largo total</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Largo total</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="location" className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <p>Coordenadas cartesianas</p>
              <div className="grid gap-5">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">UTM X {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">UTM Y {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">
                    Región UTM {requiredBadge}
                  </Label>
                  <Input id="length_total"></Input>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <p>Coordenadas geográficas</p>
              <div className="grid gap-5">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">
                    Latitud (LN) {requiredBadge}
                  </Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">
                    Longitud (LW) {requiredBadge}
                  </Label>
                  <Input type="number" id="length_total"></Input>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <p>Elevación</p>
              <div className="grid gap-5">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">
                    MSNM Google {requiredBadge}
                  </Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Altitud {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <p>Región</p>
              <div className="grid gap-5">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">País {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Estado {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Municipio</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Lugar específico</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Kilómetro</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <p>Instituto</p>
              <div className="grid gap-5">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">
                    MSNM Google {requiredBadge}
                  </Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Altitud {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Altitud {requiredBadge}</Label>
                  <Input type="number" id="length_total"></Input>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="collection">
            <div className="flex flex-col gap-3">
              <p>Colecta</p>
              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col w-[140px] gap-2">
                  <Label htmlFor="length_total">
                    Fecha de colecta {requiredBadge}
                  </Label>
                  <Input type="date" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-[110px] gap-3">
                  <Label htmlFor="length_total">Hora de colecta</Label>
                  <Input type="time" id="length_total"></Input>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-11">
                <Label htmlFor="length_total">Colector {requiredBadge}</Label>
                <p>Seleccione un colaborador existente, o agregue uno nuevo.</p>
                <div className="flex flex-row gap-1">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant={"outline"}>Agregar colaborador</Button>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col w-full gap-2 flex-5">
                  <Label htmlFor="length_total" className="py-[0.2rem]">
                    Número de colecta
                  </Label>
                  <Input type="number" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2 flex-10">
                  <Label htmlFor="length_total">
                    Naturaleza {requiredBadge}
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <p>Preparación</p>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-[140px] gap-2">
                  <Label htmlFor="length_total">Fecha de preparación</Label>
                  <Input type="date" id="length_total"></Input>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="length_total">Estado</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-11">
                <Label htmlFor="length_total">Preparador {requiredBadge}</Label>
                <p>Seleccione un colaborador existente, o agregue uno nuevo.</p>
                <div className="flex flex-row gap-1">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button variant={"outline"}>Agregar colaborador</Button>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="length_total">Observaciones</Label>
                <Input type="date" id="length_total"></Input>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </DialogCustom>
  );
}
