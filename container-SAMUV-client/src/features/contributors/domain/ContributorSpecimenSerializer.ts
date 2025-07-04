// DEV ONLY: we REALLY need to fix these fn attributes in the back.

export interface IContributorSpecimen2 {
  id?: number;
  contributor_id: number;
  contributor_role_id: number;
  specimen_id: number;
}

class ContributorSpecimenSerializer {
  contributor: number;
  contributor_role: number;
  specimen: number;
  constructor(data: IContributorSpecimen2) {
    this.contributor = data.contributor_id;
    this.contributor_role = data.contributor_role_id;
    this.specimen = data.specimen_id;
  }
}

export default ContributorSpecimenSerializer;
