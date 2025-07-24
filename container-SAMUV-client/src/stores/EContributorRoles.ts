interface IContributorType {
  id: number;
  name: string;
}
export const EContributorTypes = Object.freeze({
  COLECTOR: { id: 1, name: "colector" },
  PREPARATOR: { id: 2, name: "preparator" },
});

export const getContributorTypeById = (id: number) => {
  return Object.values(EContributorTypes).find((type) => type.id === id);
};

export enum EContributorRoles {
  COLECTOR = 1,
  PREPARATOR = 2,
}

export default EContributorTypes;
