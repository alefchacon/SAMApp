import ChipLabel from "../../components/ui/ChipLabel";
import SEX from "../../stores/sex";

const chipFemale = (
  <ChipLabel
    iconType={"female"}
    color="var(--pink)"
    backgroundColor="var(--light-pink)"
    width="100px"
  >
    Hembra
  </ChipLabel>
);

const chipMale = (
  <ChipLabel
    width="100px"
    iconType={"male"}
    color="var(--uv-blue)"
    backgroundColor="var(--light-blue)"
  >
    Macho
  </ChipLabel>
);

export default function ChipSex({ sex = SEX.FEMALE }) {
  switch (sex) {
    case SEX.FEMALE:
      return chipFemale;
    case SEX.MALE:
      return chipMale;
  }
}
